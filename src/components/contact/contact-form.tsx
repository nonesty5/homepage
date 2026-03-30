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
      <div className="p-8 border border-border text-center">
        <h3 className="text-xl font-bold mb-2">문의가 접수되었습니다</h3>
        <p className="text-muted">빠른 시일 내에 답변 드리겠습니다.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium underline"
        >
          새 문의 작성
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">이름 *</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-foreground transition-colors"
          placeholder="홍길동"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">이메일 *</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-foreground transition-colors"
          placeholder="example@email.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">전화번호</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-foreground transition-colors"
          placeholder="010-0000-0000"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">문의 유형 *</label>
        <select
          required
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-foreground transition-colors"
        >
          <option value="세무">세무</option>
          <option value="감사">감사</option>
          <option value="기장">기장</option>
          <option value="경영자문">경영자문</option>
          <option value="가치평가">가치평가</option>
          <option value="기타">기타</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">문의 내용 *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
          placeholder="문의하실 내용을 입력해 주세요."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          전송에 실패했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 bg-foreground text-white text-sm font-medium tracking-wider hover:bg-neutral-800 transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "전송 중..." : "문의하기"}
      </button>
    </form>
  );
}
