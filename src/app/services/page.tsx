import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data";
import { AnimateOnScroll, LineReveal } from "@/components/motion";
import StickyScrollServices from "@/components/services/sticky-scroll-services";

export const metadata: Metadata = {
  title: "PRACTICE",
  description:
    "세무 기장 · 세무조정 · 세무 자문을 중심으로, 필요 시 가치평가와 거래 자문까지 연결합니다.",
  alternates: {
    canonical: "/services",
  },
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
          <AnimateOnScroll variant="fadeIn">
            <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase">
              Practice
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll variant="fadeUp" delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] max-w-4xl">
              서비스 범위
            </h1>
          </AnimateOnScroll>
          <div className="mt-6">
            <LineReveal className="h-0.5 w-20 bg-accent-bright" delay={0.3} />
          </div>
          <AnimateOnScroll variant="fadeUp" delay={0.4}>
            <p className="mt-8 text-lg text-neutral-400 max-w-3xl leading-relaxed">
              세무 기장 · 세무 조정 · 세무 자문을 중심으로,
              필요할 때 가치평가와 거래 자문까지 연결합니다.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Services - Sticky Scroll Layout */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <StickyScrollServices services={services} />
        </div>
      </section>

      {/* CTA */}
      <AnimateOnScroll variant="fadeIn">
        <section className="py-24 md:py-32 bg-foreground text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <AnimateOnScroll variant="fadeUp">
              <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase">
                Contact
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                현재 상황을 알려주시면
                <br className="hidden md:block" />
                필요한 범위부터 정리합니다
              </h2>
              <p className="mt-6 text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                매출 규모, 기존 기장 여부, 가장 급한 이슈만 알려주세요.
              </p>
              <Link
                href="/contact"
                className="group mt-10 inline-flex items-center px-10 py-4 bg-white text-foreground text-sm font-medium tracking-wider transition-all duration-300 hover:bg-neutral-200 hover:tracking-widest"
              >
                문의하기
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </AnimateOnScroll>
          </div>
        </section>
      </AnimateOnScroll>
    </>
  );
}
