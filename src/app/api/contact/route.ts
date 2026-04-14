import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      type,
      companyStage,
      bottleneck,
      desiredOutput,
      timeline,
      message,
    } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "필수 항목을 입력해 주세요." },
        { status: 400 }
      );
    }

    // Send email via Resend
    await resend.emails.send({
      from: `${siteConfig.name} <onboarding@resend.dev>`,
      to: [siteConfig.email],
      subject: `[홈페이지 문의] ${escapeHtml(type)} - ${escapeHtml(name)}`,
      html: `
        <h2>새로운 문의가 접수되었습니다</h2>
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
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(type || "-")}</td>
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
  } catch {
    return NextResponse.json(
      { error: "이메일 전송에 실패했습니다." },
      { status: 500 }
    );
  }
}
