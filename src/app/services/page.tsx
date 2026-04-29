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
              축은 기장 · 조정 · 자문.
              가치평가나 거래 자문이 필요한 순간엔 그쪽으로 이어집니다.
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

      {/* ─── 1년의 흐름 ─── */}
      <section className="py-24 md:py-32 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-muted mb-8 font-medium uppercase">
              Annual Flow
            </p>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl"
              style={{ wordBreak: "keep-all" }}
            >
              1년의 흐름.
            </h2>
            <div className="mt-8 h-px w-12 bg-accent" />
            <p className="mt-8 max-w-2xl text-base md:text-lg text-strong leading-[1.85]">
              매월 어느 일정이 돌아가고, 그 사이에 무엇을 하는지.
              기장은 매일, 신고는 분기, 자문은 결정이 닥칠 때.
            </p>
          </AnimateOnScroll>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {[
              {
                q: "Q1",
                months: "1 – 3월",
                deadlines: [
                  "1월 · 부가세 2기 확정신고",
                  "2월 · 면세사업장 현황",
                  "3월 · 법인세 신고 (12월 결산)",
                ],
                role: "전년 결산을 닫고, 법인세 절세 라인을 마무리. 새해 장부 기준을 다시 잡습니다.",
              },
              {
                q: "Q2",
                months: "4 – 6월",
                deadlines: [
                  "4월 · 부가세 1기 예정신고",
                  "5월 · 종합소득세 신고",
                  "6월 · 성실신고확인서 제출",
                ],
                role: "종소세 절세선을 다시 보고, 성실신고 라인을 잡습니다. 1분기 결산도 이때 점검.",
              },
              {
                q: "Q3",
                months: "7 – 9월",
                deadlines: [
                  "7월 · 부가세 1기 확정신고",
                  "8월 · 법인세 중간예납",
                  "원천세 매월 10일",
                ],
                role: "반기 결산을 끊고, 하반기 절세 방향을 다시 잡습니다. 자료도 이때 정돈.",
              },
              {
                q: "Q4",
                months: "10 – 12월",
                deadlines: [
                  "10월 · 부가세 2기 예정신고",
                  "11월 · 종합소득세 중간예납",
                  "12월 · 결산 사전 정리",
                ],
                role: "연말 결산을 미리 다듬어두고, 다음 해 그림을 그립니다. 큰 의사결정이 몰리는 분기.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-background p-8 md:p-10">
                <div className="flex items-baseline gap-3 mb-2">
                  <p className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                    {item.q}
                  </p>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted font-medium">
                    {item.months}
                  </p>
                </div>
                <div className="mt-6 h-px w-10 bg-accent" />
                <p className="mt-5 text-xs tracking-[0.18em] uppercase text-muted font-medium mb-3">
                  주요 일정
                </p>
                <ul className="space-y-2 text-sm text-strong">
                  {item.deadlines.map((d) => (
                    <li key={d} className="leading-relaxed">{d}</li>
                  ))}
                </ul>
                <p className="mt-6 pt-6 border-t border-border text-xs tracking-[0.18em] uppercase text-muted font-medium mb-3">
                  이 분기의 일
                </p>
                <p
                  className="text-sm md:text-sm text-strong leading-[1.7]"
                  style={{ wordBreak: "keep-all" }}
                >
                  {item.role}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs text-muted leading-relaxed">
            ※ 국세청 기준 주요 신고·납부 기한. 담당 법인의 신고 의무 및 마감일은 실제와 상이할 수 있습니다.
          </p>
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
                어디서부터 시작할지
                <br className="hidden md:block" />
                같이 짚어 보겠습니다
              </h2>
              <p className="mt-6 text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                지금 가장 급한 이슈 한 줄이면 충분합니다. 들어맞는 범위부터 추려 회신드립니다.
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
