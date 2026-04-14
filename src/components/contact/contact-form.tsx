"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  type: string;
  companyStage: string;
  bottleneck: string;
  desiredOutput: string;
  timeline: string;
  message: string;
}

const defaultForm: FormData = {
  name: "",
  email: "",
  phone: "",
  type: "전체 진단",
  companyStage: "법인을 막 세움",
  bottleneck: "현재 병목 진단 필요",
  desiredOutput: "운영 진단 및 우선순위 메모",
  timeline: "이번 달 안",
  message: "",
};

interface ContactFormProps {
  initialValues?: Partial<Pick<FormData, "type" | "bottleneck" | "desiredOutput">>;
}

export default function ContactForm({ initialValues }: ContactFormProps) {
  const [form, setForm] = useState<FormData>(() => ({
    ...defaultForm,
    ...initialValues,
  }));
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm(defaultForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="py-20 text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-foreground flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold tracking-tight mb-3">
          진단 요청이 접수되었습니다
        </h3>
        <p className="text-muted leading-relaxed mb-8">
          전달해 주신 병목과 결과물을 기준으로
          <br />
          적용 범위와 다음 단계를 정리해 회신드리겠습니다.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="inline-flex items-center text-sm font-medium tracking-wider hover-underline"
        >
          새 문의 작성
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-subtle font-medium mb-3">
            이름 *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full px-0 py-3 bg-transparent text-base border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-neutral-300"
            placeholder="홍길동"
          />
        </div>

        <div className="relative">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-subtle font-medium mb-3">
            이메일 *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full px-0 py-3 bg-transparent text-base border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-neutral-300"
            placeholder="example@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-subtle font-medium mb-3">
            전화번호
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="w-full px-0 py-3 bg-transparent text-base border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-neutral-300"
            placeholder="010-0000-0000"
          />
        </div>

        <div className="relative">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-subtle font-medium mb-3">
            현재 단계 *
          </label>
          <select
            required
            value={form.companyStage}
            onChange={(e) => updateField("companyStage", e.target.value)}
            className="w-full px-0 py-3 bg-transparent text-base border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors duration-300 appearance-none cursor-pointer"
          >
            <option value="법인을 막 세움">법인을 막 세움</option>
            <option value="매출 성장기">매출 성장기</option>
            <option value="중요한 결정 직전">중요한 결정 직전</option>
            <option value="기타">기타</option>
          </select>
          <div className="absolute right-0 bottom-4 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 5l3 3 3-3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-subtle font-medium mb-3">
            문의 유형 *
          </label>
          <select
            required
            value={form.type}
            onChange={(e) => updateField("type", e.target.value)}
            className="w-full px-0 py-3 bg-transparent text-base border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors duration-300 appearance-none cursor-pointer"
          >
            <option value="전체 진단">전체 진단</option>
            <option value="세무 기장">세무 기장</option>
            <option value="세무 조정">세무 조정</option>
            <option value="세무 자문">세무 자문</option>
            <option value="기업가치평가">기업가치평가</option>
            <option value="M&A · IPO 자문">M&A · IPO 자문</option>
            <option value="회계감사 · 회계자문">회계감사 · 회계자문</option>
          </select>
          <div className="absolute right-0 bottom-4 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 5l3 3 3-3" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-subtle font-medium mb-3">
            가장 큰 병목 *
          </label>
          <select
            required
            value={form.bottleneck}
            onChange={(e) => updateField("bottleneck", e.target.value)}
            className="w-full px-0 py-3 bg-transparent text-base border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors duration-300 appearance-none cursor-pointer"
          >
            <option value="현재 병목 진단 필요">현재 병목 진단 필요</option>
            <option value="결산 일정 지연">결산 일정 지연</option>
            <option value="기장 누락 · 계정 오분류">기장 누락 · 계정 오분류</option>
            <option value="신고 직전 쟁점 발견">신고 직전 쟁점 발견</option>
            <option value="세무조사 · 소명 대응">세무조사 · 소명 대응</option>
            <option value="지분 이동 · 승계 · 거래 비교표 필요">지분 이동 · 승계 · 거래 비교표 필요</option>
          </select>
          <div className="absolute right-0 bottom-4 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 5l3 3 3-3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-subtle font-medium mb-3">
            필요한 결과물 *
          </label>
          <select
            required
            value={form.desiredOutput}
            onChange={(e) => updateField("desiredOutput", e.target.value)}
            className="w-full px-0 py-3 bg-transparent text-base border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors duration-300 appearance-none cursor-pointer"
          >
            <option value="운영 진단 및 우선순위 메모">운영 진단 및 우선순위 메모</option>
            <option value="월별 재무 보고 체계">월별 재무 보고 체계</option>
            <option value="세무조정 검토 메모">세무조정 검토 메모</option>
            <option value="시나리오별 세부담 비교표">시나리오별 세부담 비교표</option>
            <option value="실행 순서안 및 체크리스트">실행 순서안 및 체크리스트</option>
          </select>
          <div className="absolute right-0 bottom-4 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 5l3 3 3-3" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-subtle font-medium mb-3">
            희망 시점 *
          </label>
          <select
            required
            value={form.timeline}
            onChange={(e) => updateField("timeline", e.target.value)}
            className="w-full px-0 py-3 bg-transparent text-base border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors duration-300 appearance-none cursor-pointer"
          >
            <option value="이번 주 안">이번 주 안</option>
            <option value="이번 달 안">이번 달 안</option>
            <option value="신고 시즌 전">신고 시즌 전</option>
            <option value="의사결정 전">의사결정 전</option>
            <option value="일정 협의 가능">일정 협의 가능</option>
          </select>
          <div className="absolute right-0 bottom-4 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 5l3 3 3-3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative">
        <label className="block text-[10px] tracking-[0.2em] uppercase text-subtle font-medium mb-3">
          현재 상황 *
        </label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          className="w-full px-0 py-3 bg-transparent text-base border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors duration-300 resize-none placeholder:text-neutral-300"
          placeholder="매출 규모, 기존 기장 여부, 가장 급한 이슈, 이미 정리된 자료가 있으면 함께 적어 주세요."
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-3 py-4 px-5 bg-red-50 border border-red-100">
          <span className="w-5 h-5 rounded-full border border-red-400 flex items-center justify-center flex-shrink-0">
            <span className="text-red-500 text-xs font-bold">!</span>
          </span>
          <p className="text-sm text-red-600">
            전송에 실패했습니다. 잠시 후 다시 시도해 주세요.
          </p>
        </div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group w-full md:w-auto inline-flex items-center justify-center px-12 py-4 bg-foreground text-white text-sm font-medium tracking-wider transition-all duration-300 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <span className="flex items-center gap-3">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              전송 중...
            </span>
          ) : (
            <>
              진단 요청 보내기
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
