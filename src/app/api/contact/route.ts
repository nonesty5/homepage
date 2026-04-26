import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/constants";

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  if (!isAllowedBrowserRequest(request)) {
    return jsonError("허용되지 않은 요청입니다.", 403);
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
    return NextResponse.json({ success: true });
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

  if (!name || !email || !message) {
    return jsonError("필수 항목을 입력해 주세요.", 400);
  }

  if (!EMAIL_PATTERN.test(email)) {
    return jsonError("이메일 형식을 확인해 주세요.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return jsonError("메일 전송 설정이 완료되지 않았습니다.", 500);
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `${siteConfig.name} <onboarding@resend.dev>`,
      to: [siteConfig.email],
      subject: `[홈페이지 문의] ${singleLine(type)} - ${singleLine(name)}`,
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email failed", error);
    return jsonError("메일 전송에 실패했습니다.", 500);
  }
}
