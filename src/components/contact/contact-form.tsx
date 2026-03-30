"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    type: "세무",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

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
        setForm({ name: "", email: "", phone: "", type: "세무", message: "" });
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
          문의가 접수되었습니다
        </h3>
        <p className="text-muted leading-relaxed mb-8">
          빠른 시일 내에 답변 드리겠습니다.
          <br />
          감사합니다.
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
        {/* Name */}
        <div className="relative">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-subtle font-medium mb-3">
            이름 *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-0 py-3 bg-transparent text-base border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-neutral-300"
            placeholder="홍길동"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-subtle font-medium mb-3">
            이메일 *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-0 py-3 bg-transparent text-base border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-neutral-300"
            placeholder="example@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Phone */}
        <div className="relative">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-subtle font-medium mb-3">
            전화번호
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-0 py-3 bg-transparent text-base border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-neutral-300"
            placeholder="010-0000-0000"
          />
        </div>

        {/* Inquiry Type */}
        <div className="relative">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-subtle font-medium mb-3">
            문의 유형 *
          </label>
          <select
            required
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-0 py-3 bg-transparent text-base border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors duration-300 appearance-none cursor-pointer"
          >
            <option value="세무">세무</option>
            <option value="감사">감사</option>
            <option value="기장">기장</option>
            <option value="경영자문">경영자문</option>
            <option value="가치평가">가치평가</option>
            <option value="기타">기타</option>
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute right-0 bottom-4 pointer-events-none">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 5l3 3 3-3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="relative">
        <label className="block text-[10px] tracking-[0.2em] uppercase text-subtle font-medium mb-3">
          문의 내용 *
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-0 py-3 bg-transparent text-base border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors duration-300 resize-none placeholder:text-neutral-300"
          placeholder="문의하실 내용을 입력해 주세요."
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
              문의하기
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
