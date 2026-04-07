import type { Metadata } from "next";
import Link from "next/link";
import { personas, services } from "@/lib/data";

export const metadata: Metadata = {
  title: "WHO",
  description: "스타트업, 사업가, 자산가를 위한 회계 · 재무 자문 부티크.",
};

export default function WhoPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-32 md:py-44 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[16rem] font-bold leading-none tracking-tighter select-none">
            WHO
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase animate-fade-in">
            Who We Serve
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] animate-fade-in max-w-3xl">
            누구를 위한
            <br />
            자문인가
          </h1>
          <div className="mt-6 h-px w-20 bg-accent animate-line-reveal" />
          <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed animate-fade-in-delay">
            모두를 위한 자문은 결국 누구에게도 도움이 되지 않습니다.
            메리디안은 다음 세 종류의 의사결정자에게 집중합니다.
          </p>
        </div>
      </section>

      {/* Personas */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-0">
            {personas.map((persona, index) => {
              const isEven = index % 2 === 0;
              const num = String(index + 1).padStart(2, "0");
              const fitItems = persona.fitServices
                .map((slug) => services.find((s) => s.slug === slug))
                .filter((s): s is NonNullable<typeof s> => Boolean(s));

              return (
                <div
                  key={persona.slug}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-16 md:py-24 border-t border-border last:border-b items-start"
                >
                  {/* Left: number + title */}
                  <div
                    className={`md:col-span-5 ${
                      isEven ? "md:col-start-1" : "md:col-start-8 md:row-start-1"
                    }`}
                  >
                    <p className="text-xs tracking-[0.3em] text-subtle uppercase font-medium mb-4">
                      {persona.englishLabel}
                    </p>
                    <div className="flex items-baseline gap-4">
                      <span className="text-5xl md:text-7xl font-bold tracking-tighter text-neutral-200">
                        {num}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                        {persona.title}
                      </h2>
                    </div>
                  </div>

                  {/* Right: description + needs + fit services */}
                  <div
                    className={`md:col-span-6 ${
                      isEven ? "md:col-start-7" : "md:col-start-1 md:row-start-1"
                    }`}
                  >
                    <p className="text-muted leading-relaxed text-base md:text-lg">
                      {persona.description}
                    </p>

                    <div className="mt-8">
                      <p className="text-xs tracking-[0.2em] text-subtle uppercase font-medium mb-4">
                        주로 도와드리는 일
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {persona.needs.map((need, i) => (
                          <p
                            key={i}
                            className="text-sm text-muted py-1 flex items-start gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-foreground mt-2 flex-shrink-0" />
                            {need}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                      <p className="text-xs tracking-[0.2em] text-subtle uppercase font-medium mb-3">
                        Related Practice
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {fitItems.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="inline-flex items-center px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors duration-300"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase">
            Get in Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-2xl mx-auto leading-tight">
            본인의 상황과 맞는지
            <br />
            먼저 이야기 나눠보세요
          </h2>
          <p className="mt-6 text-neutral-400 max-w-xl mx-auto leading-relaxed">
            첫 30분 미팅은 무료입니다. 본인의 상황을 간단히 말씀해 주시면,
            저희가 도울 수 있는지 솔직하게 답변드립니다.
          </p>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center px-10 py-4 bg-white text-foreground text-sm font-medium tracking-wider transition-all duration-300 hover:bg-neutral-200 hover:tracking-widest"
          >
            상담 신청하기
            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
