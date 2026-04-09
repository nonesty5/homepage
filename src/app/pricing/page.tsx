import type { Metadata } from "next";
import PricingCalculator from "@/components/pricing/calculator";

export const metadata: Metadata = {
  title: "PRICING",
  description:
    "법인·개인사업자 예상 수임료를 6개의 질문으로 계산합니다. 업종, 매출, 직원 수 입력만으로 월 기장료와 연 신고/조정료를 즉시 안내합니다.",
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-32 md:py-44 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[16rem] font-bold leading-none tracking-tighter select-none">
            PRICING
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase animate-fade-in">
            Lean Fee Flow
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-fade-in">
            예상 수임료 계산
          </h1>
          <div className="mt-6 h-0.5 w-20 bg-accent-bright animate-line-reveal" />
          <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed animate-fade-in-delay">
            복잡한 표를 읽지 않아도 됩니다.
            <br />
            6개의 질문에 답하면 월 기장료와 연 신고/조정료가 바로 나옵니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-delay-2">
            <span className="text-[0.7rem] uppercase tracking-[0.15em] px-3 py-1.5 border border-neutral-700 text-neutral-400">
              6개 질문
            </span>
            <span className="text-[0.7rem] uppercase tracking-[0.15em] px-3 py-1.5 border border-neutral-700 text-neutral-400">
              업종 검색
            </span>
            <span className="text-[0.7rem] uppercase tracking-[0.15em] px-3 py-1.5 border border-neutral-700 text-neutral-400">
              실시간 예상 금액
            </span>
            <span className="text-[0.7rem] uppercase tracking-[0.15em] px-3 py-1.5 border border-neutral-700 text-neutral-400">
              공유 가능한 링크
            </span>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <PricingCalculator />
        </div>
      </section>

      {/* Insight strip */}
      <section className="py-16 md:py-24 border-t border-border bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <article>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted">01</span>
              <h3 className="mt-3 text-lg font-bold tracking-tight">
                질문은 줄이고, 판단 기준은 남깁니다
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                고객은 업종, 매출, 직원 수처럼 스스로 바로 답할 수 있는 정보만 입력하고, 내부 단가 구조는 계산기 안에서 자동 반영합니다.
              </p>
            </article>
            <article>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted">02</span>
              <h3 className="mt-3 text-lg font-bold tracking-tight">
                업종은 검색형으로, 금액은 슬라이더로
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                검색형 업종 선택과 스냅형 슬라이더로 숫자 타이핑을 줄이고, 답변 피로도를 낮췄습니다.
              </p>
            </article>
            <article>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted">03</span>
              <h3 className="mt-3 text-lg font-bold tracking-tight">
                복잡한 케이스는 무리하게 확정하지 않습니다
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                외감, 연결, 해외거래, 수정신고 같은 예외 상황은 계산기에서 단가를 강제로 확정하지 않고 상담으로 넘깁니다.
              </p>
            </article>
          </div>

          <p className="mt-12 text-xs text-subtle leading-relaxed max-w-3xl">
            이 화면은 공개용 수임료 계산 프로토타입입니다. 실제 보수는 자료 상태, 응답 속도, 신고 이력, 계약 범위에 따라 협의 후 확정될 수 있습니다.
          </p>
        </div>
      </section>
    </>
  );
}
