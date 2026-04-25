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
                외부감사를 수백 건 하면 눈이 생깁니다.
                장부에서 그 회사의 의사결정 방식이 보이고,
                어디서 문제가 시작됐는지가 보입니다.
              </p>
              <p className="mt-5">
                M&A 딜 구조를 설계하면 또 다른 게 보입니다.
                같은 숫자가 협상 테이블에서 어떻게 해석되는지,
                어떤 구조가 세금 부담을 키우는지.
              </p>
              <p className="mt-5 text-neutral-400">
                삼정과 한영에서 쌓은 9년이 그 시각을 만들었습니다.
                Meridian은 그걸 직접 씁니다.
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
                장부에서
                <br />
                먼저 읽히는 것들.
              </h2>
              <div className="mt-8 h-px w-12 bg-border" />
              <div className="mt-10 space-y-6 text-base md:text-lg text-strong leading-[1.9]">
                <p>
                  세무기장을 1년 내내 들여다보면, 어디서 세금이 만들어지고
                  어떤 지출이 실익 없이 사라지는지가 보입니다.
                  신고서를 연말에 정리하는 사람이 아니라,
                  숫자가 만들어지는 과정 전체를 보는 사람이 됩니다.
                </p>
                <p>
                  지분 이전, 가업승계, M&A — 재무자문이 필요한 순간에도
                  기장을 계속 보던 사람이 함께하면 같은 숫자를 훨씬 빠르게 읽습니다.
                  이미 흐름을 알고 있으니, 따로 설명할 필요가 없습니다.
                </p>
                <p>
                  처음부터 끝까지 같은 사람이 보는 이유입니다.
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
              시스템이 할 것,
              <br />
              사람이 할 것.
            </h2>
            <div className="mt-8 h-px w-12 bg-border" />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <div className="mt-12 space-y-7 text-base md:text-lg text-strong leading-[1.9]">
              <p>
                세무 업무에는 구조화할 수 있는 부분이 많습니다.
                그 부분을 반복적인 수작업으로 처리하면,
                사람의 판단이 필요한 곳에 쓰일 시간이 줄어듭니다.
              </p>
              <p>
                저는 AI 코딩 도구를 활용해 클라이언트 업무에 맞는
                자동화 시스템을 직접 설계합니다.
                회계사가 직접 구조를 짜면 전달 오류가 없고,
                그 시간에 실질적인 절세 전략을 세울 수 있습니다.
              </p>
              <p>
                시스템이 처리할 수 있는 건 시스템에 맡기고,
                판단이 필요한 곳에 집중합니다.
                그게 클라이언트에게 더 나은 자문이 됩니다.
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
