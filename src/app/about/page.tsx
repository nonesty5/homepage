import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, heroImages } from "@/lib/constants";
import { AnimateOnScroll, LineReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "ABOUT",
  description: `${siteConfig.name} — 박민상 공인회계사의 부티크 자문 브랜드. 세무 · 회계 · 재무자문이 끊기지 않는 하나의 흐름이 되도록.`,
};

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };

export default function AboutPage() {
  return (
    <>
      {/* ─────────────────────────────────────────
          § 1. Hero — Meridian 이름의 뜻
         ───────────────────────────────────────── */}
      <section className="py-32 md:py-44 bg-foreground text-white relative overflow-hidden">
        {heroImages.about && (
          <>
            <Image
              src={heroImages.about}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center animate-ken-burns-left"
              style={{ filter: "saturate(0.55) brightness(0.6) contrast(1.05)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/75 pointer-events-none" />
          </>
        )}

        {/* 자오선 수직선 모티프 */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-[12%] w-px bg-white/10 origin-top animate-line-reveal"
          style={{ transform: "scaleY(1)" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimateOnScroll variant="fadeIn">
            <p className="text-xs tracking-[0.4em] text-neutral-500 mb-10 uppercase">
              About
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.1}>
            <h1
              className="text-7xl md:text-[9rem] lg:text-[11rem] font-semibold leading-[0.9] tracking-tight"
              style={serif}
            >
              Meridian.
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeIn" delay={0.3}>
            <p className="mt-6 text-sm md:text-base tracking-[0.35em] text-neutral-400 uppercase">
              본초자오선
            </p>
          </AnimateOnScroll>

          <div className="mt-10">
            <LineReveal className="h-px w-24 bg-accent-bright" delay={0.4} />
          </div>

          <AnimateOnScroll variant="fadeUp" delay={0.5}>
            <div className="mt-10 max-w-2xl text-lg md:text-xl text-neutral-300 leading-[1.85]">
              <p>
                회계사로 9년을 일하면서 딱 하나가 계속 마음에 걸렸습니다.
              </p>
              <p className="mt-5">
                세무하는 사람, 자문하는 사람, 살펴보는 사람이 다 따로라는 것.
                사업하시는 분들은 매번 처음부터 설명해야 했고,
                그 사이에서 맥락은 조용히 사라졌습니다.
              </p>
              <p className="mt-5 text-neutral-400">
                숫자는 맥락이 있어야 의미가 생깁니다.
                Meridian은 그 맥락이 끊기지 않게 하려고 만들었습니다.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          § 2. 왜 Meridian을 만들었는가 — Seamless
         ───────────────────────────────────────── */}
      <section className="relative py-28 md:py-44">
        {/* 우측 수직선 모티프 */}
        <div className="hidden lg:block absolute top-0 bottom-0 right-[8%] w-px bg-border" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* 좌측 — 라벨 + 제목 */}
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-4">
              <p className="text-xs tracking-[0.35em] text-muted mb-8 font-medium">
                01
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.2]">
                본래
                <br />
                하나의 일입니다.
              </h2>
              <div className="mt-8 h-px w-12 bg-border" />
            </AnimateOnScroll>

            {/* 우측 — 본문 */}
            <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-7 text-base md:text-lg text-strong leading-[1.9]">
                <p>
                  장부를 1년 내내 들여다본 사람은 압니다.
                  어디서 돈이 새는지, 어느 달에 자금이 쪼이는지.
                  그 흐름을 모르는 사람이 신고서를 쓰면 숫자는 맞아도 맥락은 빠집니다.
                </p>
                <p>
                  세무, 회계, 재무자문은 원래 이어져 있는 일입니다.
                  그런데 실무에서는 너무 자주 끊깁니다.
                  기장하는 사람, 신고하는 사람, 자문하는 사람이 제각각이면 —
                  그 사이에서 사라지는 건 언제나 중요한 맥락입니다.
                </p>
                <p>
                  전문가를 여럿 쓰는 것보다, 한 사람이 처음부터 끝까지 보는 게
                  더 나을 때가 있습니다.
                  Meridian이 그 방식을 택한 이유입니다.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─────────────────────────────────────────
          § 3. 방법에 대한 생각 — Pragmatism + Systems
         ───────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 bg-surface">
        {/* 좌측 수직선 모티프 (반대쪽) */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-[8%] w-px bg-border" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* 좌측 — 라벨 + 제목 */}
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <p className="text-xs tracking-[0.35em] text-background/40 mb-8 font-medium">
                02
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.2] text-background">
                성실함만으로는
                <br />
                안 되는 게 있습니다.
              </h2>
              <div className="mt-8 h-px w-12 bg-background/20" />
            </AnimateOnScroll>

            {/* 우측 — 본문 */}
            <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-7 text-base md:text-lg text-background/75 leading-[1.9]">
                <p>
                  성실하게 하면 다 된다고 오래 믿었습니다.
                  그런데 현장에서 보면, 사람이 아무리 부지런해도
                  구조가 나쁘면 새어나갑니다.
                </p>
                <p>
                  연간 600건이 넘는 계약과 정산을 메신저로 처리하던 회사가 있었습니다.
                  매출 집계를 매번 수작업으로 하고, 누락이 생기면 또 수작업으로 찾았습니다.
                  다들 열심히 했는데도 계속 빠졌습니다.
                </p>
                <p>
                  저는 그게 사람 문제가 아니라 구조 문제라고 봤습니다.
                  파이썬 스크립트 하나, 대시보드 하나로 막히던 마찰이
                  사라지는 경우가 생각보다 많습니다.
                  거창한 솔루션이 아니어도 됩니다.
                  지금 문제에 맞는 방법이면 됩니다.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          § 5. Affiliation — 동성회계법인과의 관계
         ───────────────────────────────────────── */}
      <AnimateOnScroll variant="fadeIn">
        <section className="py-24 md:py-32 bg-foreground text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <AnimateOnScroll variant="fadeUp">
                <p className="text-xs tracking-[0.3em] text-neutral-500 mb-4 uppercase">
                  Affiliation
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  동성회계법인과의
                  <br />
                  관계
                </h2>
                <div className="mt-6 h-px w-16 bg-neutral-700" />
              </AnimateOnScroll>
              <AnimateOnScroll variant="fadeUp" delay={0.15}>
                <div className="space-y-6 text-neutral-300 leading-relaxed">
                  <p>
                    <strong className="text-white">메리디안 택스 어드바이저리</strong>는
                    박민상 공인회계사가 직접 운영하는 개인 자문 브랜드입니다. 별도 법인이 아닙니다.
                  </p>
                  <p>
                    박민상 공인회계사는 <strong className="text-white">동성회계법인</strong> 소속입니다.
                    회계감사 · 세무 기장 · 세무 조정 · 세무 신고 등 법정 업무는
                    모두 동성회계법인 명의로 수행됩니다.
                    메리디안은 그 위에서 자문과 인사이트를 직접 전하기 위한 공간입니다.
                  </p>
                  <div className="pt-6 mt-6 border-t border-neutral-800 space-y-1">
                    <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase">
                      Direct Contact
                    </p>
                    <p className="text-neutral-300">Tel. {siteConfig.phone}</p>
                    <p className="text-neutral-300">Email. {siteConfig.email}</p>
                    <p className="text-neutral-500 text-sm pt-1">{siteConfig.location}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </>
  );
}
