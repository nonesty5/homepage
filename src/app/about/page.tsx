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
                저는 회계사로 9년을 일했습니다.
                그동안 장부와 신고서만으로 끝나지 않는 문제들을 자주 만났습니다.
              </p>
              <p className="mt-5">
                세무도, 회계도, 재무자문도, 결국 사업하는 사람 옆에서
                복잡한 상황을 함께 정리하는 일입니다.
              </p>
              <p className="mt-5 text-neutral-400">
                Meridian은 그 일을 제 이름으로 직접 해 보려고 만든 부티크 자문 브랜드입니다.
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
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <p className="text-xs tracking-[0.35em] text-muted mb-8 font-medium">
                01 &nbsp;·&nbsp; SEAMLESS
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
                  세무, 회계, 재무자문은 본래 하나의 일입니다.
                  매일의 장부에서 시작해 세무 신고로 정리되고,
                  그 숫자 위에서 의사결정이 내려지고,
                  끝에는 가치평가와 재무자문으로 이어집니다.
                </p>
                <p>
                  그런데 실무에서 이 일들은 너무 자주 끊깁니다.
                  기장하는 사람이 따로, 신고하는 사람이 따로, 자문하는 사람이 또 따로입니다.
                  그 사이의 틈에서 숫자는 누락되고, 맥락은 잊히고, 의사결정은 느려집니다.
                </p>
                <p>
                  저는 이 틈이 싫었습니다.
                  전문가를 아무리 많이 붙여도, 한 사람이 끝까지 보지 않으면 이 틈은 메워지지 않습니다.
                </p>
                <p>
                  그래서 제 이름으로 이 일을 직접 해 보기로 했습니다.
                  세무부터 재무자문까지, 한 사람이 끝까지 책임지는 방식으로요.
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
              <p className="text-xs tracking-[0.35em] text-muted mb-8 font-medium">
                02 &nbsp;·&nbsp; METHOD
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.2]">
                방법론은 거창할
                <br />
                필요 없습니다.
              </h2>
              <div className="mt-8 h-px w-12 bg-border" />
            </AnimateOnScroll>

            {/* 우측 — 본문 */}
            <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-7 text-base md:text-lg text-strong leading-[1.9]">
                <p>
                  저에게 중요한 건 결론입니다.
                  지금 맞닥뜨린 문제를 실용적으로 풀 수 있으면, 방법론은 거창할 필요가 없습니다.
                </p>
                <p>
                  그리고 한 가지 더.
                  해결할 수 있는 문제를 인력으로만 막으려는 방식은, 이미 한계에 부딪혔습니다.
                  사람이 매번 확인하고 소통해서 마찰을 줄이는 방식으로는,
                  빠르게 움직이는 비즈니스의 속도를 이기지 못합니다.
                  저 역시 그렇게 해 봤고, 그 한계를 현장에서 확인했습니다.
                </p>
                <p>
                  그래서 저는 그 마찰을 시스템으로 치웁니다.
                  파이썬 스크립트, 실시간 대시보드, 업무 흐름의 재설계 —
                  문제의 구조를 바꿔서 풀 수 있으면 그 방식을 씁니다.
                  인적인 성실함만으로는 메워지지 않는 영역이 있습니다.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─────────────────────────────────────────
          § 4. In Practice — 사례는 에세이에
         ───────────────────────────────────────── */}
      <section className="py-28 md:py-44">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <div className="mb-14 md:mb-20">
              <p className="text-xs tracking-[0.35em] text-muted mb-8 font-medium">
                03 &nbsp;·&nbsp; IN PRACTICE
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.2] max-w-3xl">
                실제로 한 일들은
                <br />
                에세이에 적어두었습니다.
              </h2>
              <div className="mt-8 h-px w-12 bg-border" />
              <p className="mt-8 text-base md:text-lg text-muted leading-[1.85] max-w-2xl">
                여기서 제가 해결한 사례를 나열하지는 않았습니다.
                어떤 문제를 어떻게 풀었는지는, 글로 남겨두는 편이 더 정확합니다.
              </p>
            </div>
          </AnimateOnScroll>

          {/* 에세이 카드 */}
          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <Link
              href="/blog/system-agent-frictional-cost"
              className="group block border border-border bg-card p-10 md:p-16 hover-lift transition-colors hover:border-foreground/40"
            >
              <div className="flex items-center gap-4 text-xs tracking-[0.25em] text-muted uppercase mb-8">
                <span>Essay</span>
                <span className="h-px w-6 bg-border" />
                <span>2026.04</span>
                <span className="h-px w-6 bg-border" />
                <span>자문철학</span>
              </div>

              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.25] text-foreground">
                마찰 비용을 지우는 일 —
                <br />
                &lsquo;시스템 에이전트&rsquo;로서의 진화
              </h3>

              <p className="mt-8 text-base md:text-lg text-strong leading-[1.85] max-w-3xl">
                연간 600건이 넘는 프리랜서 계약과 정산을 메신저와 수기 작업에 의존하던 곳.
                저는 전문가로서 직접 챙기려 노력했지만, 사람이 매번 확인하는 방식은
                비즈니스의 속도를 이기지 못했습니다.
                그래서 저는 파이썬으로 전용 시스템을 직접 만들었습니다.
              </p>

              <div className="mt-10 inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase font-medium text-foreground">
                <span className="hover-underline">Read the essay</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          </AnimateOnScroll>
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
                    박민상 공인회계사가 운영하는 부티크 자문 브랜드이며, 별도 법인이 아닙니다.
                  </p>
                  <p>
                    박민상 공인회계사는 <strong className="text-white">동성회계법인</strong> 소속으로,
                    회계감사 · 세무 기장 · 세무 조정 · 세무 신고 등 법정 업무는 모두 동성회계법인 명의로 정식 수행됩니다.
                    메리디안 택스 어드바이저리는 자문 활동과 인사이트 발신을 위한 개인 브랜드 공간입니다.
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
