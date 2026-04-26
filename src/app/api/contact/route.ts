import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/constants";

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_SUBMISSION_MS = 900;
const MAX_SUBMISSION_MS = 12 * 60 * 60 * 1000;
const MAX_MESSAGE_URLS = 3;

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readString(
  data: Record<string, unknown>,
  key: string,
  maxLength: number
) {
  const value = data[key];
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function readNumber(data: Record<string, unknown>, key: string) {
  const value = data[key];
  return typeof value === "number" ? value : Number.NaN;
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ");
}

function getRequestOrigin(request: NextRequest) {
  const host =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    request.headers.get("host");
  if (!host) return null;

  const protocol =
    request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || "https";
  return `${protocol}://${host}`;
}

function isAllowedBrowserRequest(request: NextRequest) {
  const secFetchSite = request.headers.get("sec-fetch-site");
  if (
    secFetchSite &&
    !["same-origin", "same-site", "none"].includes(secFetchSite)
  ) {
    return false;
  }

  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const allowedOrigins = new Set(
      [siteConfig.url, getRequestOrigin(request)]
        .filter((value): value is string => Boolean(value))
        .map((value) => new URL(value).origin)
    );

    return allowedOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

function getByteLength(value: string) {
  return new TextEncoder().encode(value).byteLength;
}

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function withinRateLimit(key: string) {
  const now = Date.now();
  for (const [rateKey, entry] of rateLimit) {
    if (entry.resetAt <= now) rateLimit.delete(rateKey);
  }

  const current = rateLimit.get(key);
  if (!current) {
    rateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX) return false;
  current.count += 1;
  return true;
}

function jsonError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function POST(request: NextRequest) {
  if (!isAllowedBrowserRequest(request)) {
    return jsonError("허용되지 않은 요청입니다.", 403);
  }

  const userAgent = request.headers.get("user-agent")?.trim() ?? "";
  if (!userAgent || userAgent.length > 512) {
    return jsonError("요청 헤더가 올바르지 않습니다.", 400);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonError("JSON 형식으로 요청해 주세요.", 415);
  }

  const contentLengthHeader = request.headers.get("content-length");
  const contentLength = contentLengthHeader ? Number(contentLengthHeader) : 0;
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonError("문의 내용이 너무 깁니다.", 413);
  }

  const clientKey = getClientKey(request);
  if (!withinRateLimit(clientKey)) {
    return jsonError("요청이 많습니다. 잠시 후 다시 시도해 주세요.", 429);
  }

  let rawBody = "";
  try {
    rawBody = await request.text();
  } catch {
    return jsonError("요청 본문을 읽을 수 없습니다.", 400);
  }

  if (getByteLength(rawBody) > MAX_BODY_BYTES) {
    return jsonError("문의 내용이 너무 깁니다.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonError("JSON 본문을 확인해 주세요.", 400);
  }

  if (!isRecord(body)) {
    return jsonError("요청 본문 형식이 올바르지 않습니다.", 400);
  }

  const honeypot = readString(body, "website", 256);
  if (honeypot) {
    return NextResponse.json(
      { success: true },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  const name = readString(body, "name", 80);
  const email = readString(body, "email", 254).toLowerCase();
  const phone = readString(body, "phone", 40);
  const type = readString(body, "type", 80) || "문의";
  const companyStage = readString(body, "companyStage", 80);
  const bottleneck = readString(body, "bottleneck", 120);
  const desiredOutput = readString(body, "desiredOutput", 120);
  const timeline = readString(body, "timeline", 80);
  const message = readString(body, "message", 4000);
  const startedAt = readNumber(body, "startedAt");
  const elapsedMs = Date.now() - startedAt;

  if (
    !name ||
    !email ||
    !message ||
    !type ||
    !companyStage ||
    !bottleneck ||
    !desiredOutput ||
    !timeline
  ) {
    return jsonError("필수 항목을 입력해 주세요.", 400);
  }

  if (!EMAIL_PATTERN.test(email)) {
    return jsonError("이메일 형식을 확인해 주세요.", 400);
  }

  if (
    !Number.isFinite(startedAt) ||
    elapsedMs < MIN_SUBMISSION_MS ||
    elapsedMs > MAX_SUBMISSION_MS
  ) {
    return jsonError("문의 양식을 새로고침한 뒤 다시 시도해 주세요.", 400);
  }

  const messageUrlCount = message.match(/https?:\/\//gi)?.length ?? 0;
  if (messageUrlCount > MAX_MESSAGE_URLS) {
    return jsonError("문의 내용의 링크 수를 줄여 주세요.", 400);
  }

  if (!withinRateLimit(`${clientKey}:${email}`)) {
    return jsonError("요청이 많습니다. 잠시 후 다시 시도해 주세요.", 429);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return jsonError("메일 전송 설정이 완료되지 않았습니다.", 500);
  }

  try {
    const resend = new Resend(apiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const text = [
      "새로운 홈페이지 문의가 접수되었습니다.",
      "",
      `이름: ${name}`,
      `이메일: ${email}`,
      `전화번호: ${phone || "-"}`,
      `문의 유형: ${type}`,
      `현재 단계: ${companyStage || "-"}`,
      `가장 큰 병목: ${bottleneck || "-"}`,
      `원하는 결과물: ${desiredOutput || "-"}`,
      `희망 시점: ${timeline || "-"}`,
      "",
      message,
    ].join("\n");

    await resend.emails.send({
      from: `${siteConfig.name} <${fromEmail}>`,
      to: [siteConfig.email],
      replyTo: email,
      subject: `[홈페이지 문의] ${singleLine(type)} - ${singleLine(name)}`,
      text,
      html: `
        <h2>새로운 문의가 접수되었습니다.</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">이름</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">이메일</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">전화번호</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(phone || "-")}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">문의 유형</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(type)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">현재 단계</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(companyStage || "-")}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">가장 큰 병목</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(bottleneck || "-")}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">원하는 결과물</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(desiredOutput || "-")}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">희망 시점</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(timeline || "-")}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">내용</td>
            <td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${escapeHtml(message)}</td>
          </tr>
        </table>
      `,
    });

    return NextResponse.json(
      { success: true },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Contact email failed", error);
    return jsonError("메일 전송에 실패했습니다.", 500);
  }
}
