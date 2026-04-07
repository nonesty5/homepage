import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "PRACTICE",
  description: "기업가치평가, M&A, IPO 준비, 재무 모델링, 세무 자문 — 박민상 공인회계사가 직접 수행하는 자문 영역.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-32 md:py-44 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[16rem] font-bold leading-none tracking-tighter select-none">
            SERVICE
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase animate-fade-in">
            Practice
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-fade-in">
            전문 영역
          </h1>
          <div className="mt-6 h-0.5 w-20 bg-accent-bright animate-line-reveal" />
          <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed animate-fade-in-delay">
            가치평가 · M&amp;A · IPO 준비 · 재무 모델링 · 세무 자문.
            <br />
            Big4 감사 + IB + VME 경력을 결합해 직접 자문드립니다.
          </p>
        </div>
      </section>

      {/* Services - Alternating Layout */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-0">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              const num = String(index + 1).padStart(2, "0");

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group block border-t border-border last:border-b"
                >
                  <div
                    className={`py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${
                      isEven ? "" : "md:direction-rtl"
                    }`}
                  >
                    {/* Number + Title side */}
                    <div
                      className={`md:col-span-5 ${
                        isEven ? "md:col-start-1" : "md:col-start-8"
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-5xl md:text-7xl font-bold tracking-tighter text-neutral-200 group-hover:text-foreground transition-colors duration-500">
                          {num}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    {/* Description + Details side */}
                    <div
                      className={`md:col-span-6 ${
                        isEven ? "md:col-start-7" : "md:col-start-1"
                      }`}
                    >
                      <p className="text-muted leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.details.map((detail, i) => (
                          <p
                            key={i}
                            className="text-sm text-subtle py-1 flex items-start gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-subtle mt-2 flex-shrink-0" />
                            {detail}
                          </p>
                        ))}
                      </div>
                      <span className="mt-6 inline-flex items-center text-xs font-medium tracking-wider text-muted group-hover:text-foreground transition-colors duration-300">
                        자세히 보기
                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            본인의 케이스가 어디에 해당하는지
            <br className="hidden md:block" />
            먼저 이야기 나눠보세요
          </h2>
          <p className="mt-6 text-neutral-400 max-w-xl mx-auto leading-relaxed">
            첫 30분 미팅은 무료입니다. 도움이 될 수 있는지 솔직하게 답변드립니다.
          </p>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center px-10 py-4 bg-white text-foreground text-sm font-medium tracking-wider transition-all duration-300 hover:bg-neutral-200 hover:tracking-widest"
          >
            상담 신청
            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
