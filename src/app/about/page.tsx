import type { Metadata } from "next";
import Image from "next/image";
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
          § 1. Hero
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
                9년 일하면서 클라이언트한테 자주 했던 말 중 하나가
                &ldquo;그건 담당자한테 확인해 볼게요&rdquo;였습니다.
              </p>
              <p className="mt-5">
                그 말을 할 때마다 조금씩 불편했습니다.
                담당자가 바뀌거나 물어볼 사람이 달라지면,
                그때까지 쌓인 맥락이 그냥 사라지니까요.
              </p>
              <p className="mt-5 text-neutral-400">
                Meridian은 그 말을 최대한 안 하려고 만들었습니다.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          § 2. 하나의 흐름
         ───────────────────────────────────────── */}
      <section className="relative py-28 md:py-44">
        <div className="hidden lg:block absolute top-0 bottom-0 right-[8%] w-px bg-border" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
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

            <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-7 text-base md:text-lg text-strong leading-[1.9]">
                <p>
                  장부를 쭉 보던 사람이 결산도 하고, 신고도 하고,
                  다음 해 계획도 같이 본다면 — 설명을 다시 할 필요가 없습니다.
                  1년치 흐름이 이미 머릿속에 있으니까요.
                </p>
                <p>
                  문제는 대부분의 구조가 그렇지 않다는 겁니다.
                  기장 담당, 신고 담당, 자문 담당이 나뉘면 각자 자기 파트는 잘 합니다.
                  하지만 전체를 연결하는 사람이 없으면,
                  그 연결이 고스란히 클라이언트 몫이 됩니다.
                </p>
                <p>
                  저는 그 연결을 끊지 않는 걸 기본으로 삼습니다.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─────────────────────────────────────────
          § 3. 일하는 방식
         ───────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 bg-card">
        <div className="hidden lg:block absolute top-0 bottom-0 left-[8%] w-px bg-border" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-4">
              <p className="text-xs tracking-[0.35em] text-muted mb-8 font-medium">
                02
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.2]">
                사람만으로
                <br />
                안 되면, 구조로.
              </h2>
              <div className="mt-8 h-px w-12 bg-border" />
            </AnimateOnScroll>

            <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-7 text-base md:text-lg text-strong leading-[1.9]">
                <p>
                  회계사가 해야 하는 진짜 일은 자문입니다.
                  그런데 자동화할 수 있는 단순 작업을 매번 수작업으로 하고 있으면 —
                  그 시간이 결국 자문 시간을 잡아먹습니다.
                </p>
                <p>
                  600건이 넘는 계약 정산을 메신저로 처리하던 곳이 있었습니다.
                  사람이 열심히 해도 매달 누락이 생겼습니다.
                  파이썬으로 전용 시스템을 직접 만들었습니다.
                  회계사가 직접 짜면 중간에 잘못 전달되는 일이 없습니다.
                </p>
                <p>
                  자동화할 수 있는 건 자동화합니다.
                  그래야 진짜 필요한 일에 시간을 씁니다.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          § 4. Affiliation
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
                <div className="space-y-6 text-neutral-300 leading-[1.85]">
                  <p>
                    <strong className="text-white">메리디안 택스 어드바이저리</strong>는
                    박민상 공인회계사가 직접 운영하는 개인 자문 브랜드입니다.
                    별도 법인이 아닙니다.
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
