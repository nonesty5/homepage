import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import {
  BOTTLENECK_OPTIONS,
  COMPANY_STAGE_OPTIONS,
  CONTACT_TYPE_OPTIONS,
  DESIRED_OUTPUT_OPTIONS,
  TIMELINE_OPTIONS,
  isKnownContactOption,
} from "@/lib/contact-options";
import { siteConfig } from "@/lib/constants";

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_WINDOW = "10 m";
const RATE_LIMIT_MAX = 5;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_SUBMISSION_MS = 900;
const MAX_SUBMISSION_MS = 12 * 60 * 60 * 1000;
const MAX_MESSAGE_URLS = 3;
const ALLOWED_METHODS = "OPTIONS, POST";
const METHOD_HEADERS = {
  Allow: ALLOWED_METHODS,
  "Cache-Control": "no-store",
};
const REQUIRE_SHARED_RATE_LIMIT =
  process.env.CONTACT_RATE_LIMIT_REQUIRE_SHARED === "true";

type RateLimitScope = "ip" | "email";
type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
  unavailable?: boolean;
};

const memoryRateLimit = new Map<string, { count: number; resetAt: number }>();
const upstashRedis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;
const upstashLimiters = upstashRedis
  ? {
      ip: new Ratelimit({
        redis: upstashRedis,
        limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX, RATE_LIMIT_WINDOW),
        prefix: "homepage:contact:ip",
      }),
      email: new Ratelimit({
        redis: upstashRedis,
        limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX, RATE_LIMIT_WINDOW),
        prefix: "homepage:contact:email",
      }),
    }
  : null;
let lastRateLimitWarningAt = 0;

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

function readContactOption<T extends readonly string[]>(
  data: Record<string, unknown>,
  key: string,
  options: T,
  maxLength = 120
) {
  const value = readString(data, key, maxLength);
  return isKnownContactOption(value, options) ? value : "";
}

function readNumber(data: Record<string, unknown>, key: string) {
  const value = data[key];
  return typeof value === "number" ? value : Number.NaN;
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ");
}

function parseAllowedOrigins(value: string | undefined) {
  if (!value) return [];

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
    .flatMap((origin) => {
      try {
        return [new URL(origin).origin];
      } catch {
        return [];
      }
    });
}

const allowedRequestOrigins = new Set([
  new URL(siteConfig.url).origin,
  ...parseAllowedOrigins(process.env.CONTACT_ALLOWED_ORIGINS),
  ...(process.env.NODE_ENV === "production"
    ? []
    : [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3100",
        "http://127.0.0.1:3100",
      ]),
]);

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
    return allowedRequestOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

function getByteLength(value: string) {
  return new TextEncoder().encode(value).byteLength;
}

async function readLimitedText(request: NextRequest) {
  const reader = request.body?.getReader();
  if (!reader) return { text: "", tooLarge: false };

  const decoder = new TextDecoder();
  let totalBytes = 0;
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      return { text: "", tooLarge: true };
    }
    text += decoder.decode(value, { stream: true });
  }

  text += decoder.decode();
  return { text, tooLarge: false };
}

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function summarizeError(error: unknown) {
  const summary: Record<string, string | number | boolean> = {};
  if (error instanceof Error) {
    summary.name = error.name;
  }
  if (isRecord(error)) {
    for (const key of ["name", "code", "status", "statusCode"]) {
      const value = error[key];
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        summary[key] = value;
      }
    }
  }
  return Object.keys(summary).length > 0 ? summary : { name: "UnknownError" };
}

function warnRateLimitFallback(error: unknown) {
  const now = Date.now();
  if (now - lastRateLimitWarningAt < 60_000) return;
  lastRateLimitWarningAt = now;
  console.warn("Contact rate limit fallback", summarizeError(error));
}

function logEmailFailure(error: unknown) {
  console.error("Contact email failed", summarizeError(error));
}

function withinMemoryRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  for (const [rateKey, entry] of memoryRateLimit) {
    if (entry.resetAt <= now) memoryRateLimit.delete(rateKey);
  }

  const current = memoryRateLimit.get(key);
  if (!current) {
    memoryRateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((current.resetAt - now) / 1000)
      ),
    };
  }
  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

async function withinRateLimit(
  scope: RateLimitScope,
  key: string
): Promise<RateLimitResult> {
  const limiter = upstashLimiters?.[scope];
  if (limiter) {
    try {
      const result = await limiter.limit(key);
      return {
        allowed: result.success,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((result.reset - Date.now()) / 1000)
        ),
      };
    } catch (error) {
      warnRateLimitFallback(error);
      if (REQUIRE_SHARED_RATE_LIMIT) {
        return {
          allowed: false,
          retryAfterSeconds: 60,
          unavailable: true,
        };
      }
    }
  }

  if (REQUIRE_SHARED_RATE_LIMIT) {
    return {
      allowed: false,
      retryAfterSeconds: 60,
      unavailable: true,
    };
  }

  return withinMemoryRateLimit(`${scope}:${key}`);
}

function rateLimitError(limit: RateLimitResult) {
  if (limit.unavailable) {
    return jsonError("요청 제한 시스템을 확인 중입니다. 잠시 후 다시 시도해 주세요.", 503, {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  return jsonError("요청이 많습니다. 잠시 후 다시 시도해 주세요.", 429, {
    "Retry-After": String(limit.retryAfterSeconds),
  });
}

function jsonError(
  message: string,
  status: number,
  headers?: Record<string, string>
) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...headers,
      },
    }
  );
}

function methodNotAllowed() {
  return NextResponse.json(
    { error: "허용되지 않는 메서드입니다." },
    {
      status: 405,
      headers: METHOD_HEADERS,
    }
  );
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: METHOD_HEADERS,
  });
}

export function HEAD() {
  return new Response(null, {
    status: 405,
    headers: METHOD_HEADERS,
  });
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;

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
  if (contentLengthHeader) {
    const contentLength = Number(contentLengthHeader);
    if (!Number.isFinite(contentLength) || contentLength < 0) {
      return jsonError("요청 본문 길이가 올바르지 않습니다.", 400);
    }
    if (contentLength > MAX_BODY_BYTES) {
      return jsonError("문의 내용이 너무 깁니다.", 413);
    }
  }

  const clientKey = getClientKey(request);
  const ipLimit = await withinRateLimit("ip", clientKey);
  if (!ipLimit.allowed) {
    return rateLimitError(ipLimit);
  }

  let rawBody = "";
  try {
    const result = await readLimitedText(request);
    if (result.tooLarge) {
      return jsonError("문의 내용이 너무 깁니다.", 413);
    }
    rawBody = result.text;
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
  const type = readContactOption(body, "type", CONTACT_TYPE_OPTIONS, 80);
  const companyStage = readContactOption(
    body,
    "companyStage",
    COMPANY_STAGE_OPTIONS,
    80
  );
  const bottleneck = readContactOption(body, "bottleneck", BOTTLENECK_OPTIONS);
  const desiredOutput = readContactOption(
    body,
    "desiredOutput",
    DESIRED_OUTPUT_OPTIONS
  );
  const timeline = readContactOption(body, "timeline", TIMELINE_OPTIONS, 80);
  const message = readString(body, "message", 4000);
  const startedAt = readNumber(body, "startedAt");
  const elapsedMs = Date.now() - startedAt;

  if (!name || !email || !message) {
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

  const emailLimit = await withinRateLimit("email", email);
  if (!emailLimit.allowed) {
    return rateLimitError(emailLimit);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return jsonError("메일 전송 설정이 완료되지 않았습니다.", 500);
  }

  try {
    const resend = new Resend(apiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const optionalLines = [
      type ? `문의 유형: ${type}` : null,
      companyStage ? `현재 단계: ${companyStage}` : null,
      bottleneck ? `가장 큰 병목: ${bottleneck}` : null,
      desiredOutput ? `원하는 결과물: ${desiredOutput}` : null,
      timeline ? `희망 시점: ${timeline}` : null,
    ].filter((line): line is string => Boolean(line));

    const text = [
      "새로운 홈페이지 문의가 접수되었습니다.",
      "",
      `이름: ${name}`,
      `이메일: ${email}`,
      `전화번호: ${phone || "-"}`,
      ...optionalLines,
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
          ${[
            type ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">문의 유형</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(type)}</td></tr>` : "",
            companyStage ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">현재 단계</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(companyStage)}</td></tr>` : "",
            bottleneck ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">가장 큰 병목</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(bottleneck)}</td></tr>` : "",
            desiredOutput ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">원하는 결과물</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(desiredOutput)}</td></tr>` : "",
            timeline ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">희망 시점</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(timeline)}</td></tr>` : "",
          ].filter(Boolean).join("")}
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
    logEmailFailure(error);
    return jsonError("메일 전송에 실패했습니다.", 500);
  }
}
