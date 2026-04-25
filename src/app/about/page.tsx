import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig, heroImages } from "@/lib/constants";
import { AnimateOnScroll, LineReveal, StaggerChildren, StaggerItem, ImageReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "ABOUT",
  description:
    "박민상 공인회계사(삼정·한영 출신) — 세무기장부터 재무자문까지, 고객이 실제 현장에서 겪는 불편함을 직접 찾아 고칩니다. 메리디안 택스 어드바이저리.",
};

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };

export default function AboutPage() {
  return (
    <>
      {/* ─── § 1. Hero ─── */}
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

        <div className="hidden md:block absolute top-0 bottom-0 right-[12%] w-px bg-white/10" />

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
                기장을 하다 보면 고객이 어디서 불편한지가 보입니다.
                그리고 그 불편함의 상당수가, 생각보다 훨씬 쉽게 고쳐집니다.
              </p>
              <p className="mt-5">
                삼정과 한영에서 9년을 일할 때는 잘 보이지 않던 것들입니다.
                큰 조직 안에 있으면 고객의 실제 현장과 거리가 생기거든요.
              </p>
              <p className="mt-5 text-neutral-400">
                Meridian은 그 거리를 없애려고 만들었습니다.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── § 2. Career Background ─── */}
      <section className="py-20 md:py-28 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll variant="fadeIn">
            <p className="text-xs tracking-[0.35em] text-muted mb-12 font-medium uppercase">
              Background
            </p>
          </AnimateOnScroll>

          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {[
              {
                num: "01",
                firm: "삼정회계법인",
                sub: "KPMG",
                work: "외부감사 · 내부통제",
              },
              {
                num: "02",
                firm: "NH투자증권",
                sub: "",
                work: "IB · 기업금융 자문",
              },
              {
                num: "03",
                firm: "한영회계법인",
                sub: "EY",
                work: "Valuation · M&A · EA",
              },
              {
                num: "04",
                firm: "동성회계법인",
                sub: "현재",
                work: "세무기장 · 자문 · Meridian",
              },
            ].map((item) => (
              <StaggerItem key={item.num}>
                <div className="bg-background p-8 md:p-10 h-full">
                  <p className="text-xs tracking-[0.3em] text-muted mb-6 font-medium">
                    {item.num}
                    {item.sub && (
                      <span className="ml-3 text-neutral-400">{item.sub}</span>
                    )}
                  </p>
                  <p className="text-base md:text-lg font-bold text-foreground leading-tight">
                    {item.firm}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.work}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── § 3. 처음에 맞춰두는 것들 ─── */}
      <section className="relative py-28 md:py-44">
        <div className="hidden lg:block absolute top-0 bottom-0 right-[8%] w-px bg-border" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* 좌 — 텍스트 */}
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-5">
              <p className="text-xs tracking-[0.35em] text-muted mb-8 font-medium">
                01
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.2]">
                처음에
                <br />
                맞춰두는 것들.
              </h2>
              <div className="mt-8 h-px w-12 bg-border" />
              <div className="mt-10 space-y-6 text-base md:text-lg text-strong leading-[1.9]">
                <p>
                  처음 만나면 보통 이런 얘기부터 합니다.
                  법인카드는 사업 관련 지출만 쓰는 걸로 맞춥시다.
                  사업자 카드와 통장은 등록해두세요.
                </p>
                <p>
                  간단한 얘기처럼 들리지만, 이걸 처음부터 맞춰두지 않으면
                  1년치 장부가 꼬이고 뒤처리에 배의 시간이 들어갑니다.
                </p>
                <p>
                  그 약속을 받아두는 사람이 재무자문까지 계속 이어가면 —
                  매번 처음부터 설명할 필요가 없습니다.
                </p>
              </div>
            </AnimateOnScroll>

            {/* 우 — 창업자 사진 */}
            <div className="lg:col-span-6 lg:col-start-7">
              <ImageReveal>
                <div className="relative aspect-[4/5] overflow-hidden bg-card">
                  <Image
                    src="/images/founder.png"
                    alt="박민상 공인회계사"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
              </ImageReveal>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── § 4. 기본 위에, 하나 더 ─── */}
      <section className="relative py-28 md:py-44 bg-card">
        <div className="hidden lg:block absolute top-0 bottom-0 left-[8%] w-px bg-border" />

        <div className="max-w-3xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-muted mb-8 font-medium">
              02
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.2]">
              기본 위에,
              <br />
              하나 더.
            </h2>
            <div className="mt-8 h-px w-12 bg-border" />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <div className="mt-12 space-y-7 text-base md:text-lg text-strong leading-[1.9]">
              <p>
                솔직히 말하면, 세무기장 자체는 크게 다를 게 없습니다.
                감면과 공제를 빠짐없이 챙기고, 세무 질문에 빠르게 답하는 것 —
                그건 어떤 세무대리인이든 해야 하는 기본입니다.
              </p>
              <p>
                저는 그 기본 위에 하나를 더 합니다.
                고객이 실제 현장에서 부딪히는 불편함을 찾아서 직접 고치는 것.
              </p>
              <p>
                AI 코딩 도구를 활용하면 생각보다 적은 공수로 큰 변화를 만들 수
                있습니다. 정산 자동화, 매출 대시보드, 실시간 리포트 —
                만들고 나면 고객이 느끼는 개선 효과가 기대 이상입니다.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── § 5. Affiliation ─── */}
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
                <div className="space-y-6 text-neutral-300 leading-[1.85]">
                  <p>
                    <strong className="text-white">메리디안 택스 어드바이저리</strong>는
                    박민상 공인회계사가 직접 운영하는 개인 자문 브랜드입니다.
                    별도 법인이 아닙니다.
                  </p>
                  <p>
                    박민상 공인회계사는{" "}
                    <strong className="text-white">동성회계법인</strong> 소속입니다.
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
                    <p className="text-neutral-500 text-sm pt-1">
                      {siteConfig.location}
                    </p>
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
