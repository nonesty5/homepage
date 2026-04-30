import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig, heroImages } from "@/lib/constants";
import { AnimateOnScroll, LineReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "ABOUT",
  description:
    "박민상 공인회계사가 직접 운영하는 부티크 세무·재무 자문. 매일의 장부에서 신고와 자문까지 한 자리에서.",
  alternates: {
    canonical: "/about",
  },
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
              preload
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
              Prime Meridian
            </p>
          </AnimateOnScroll>

          <div className="mt-10">
            <LineReveal className="h-px w-24 bg-accent-bright" delay={0.4} />
          </div>

          <AnimateOnScroll variant="fadeUp" delay={0.5}>
            <div className="mt-10 max-w-2xl text-lg md:text-xl text-neutral-300 leading-[1.85]">
              <p>
                기장하는 사람과 자문하는 사람이 다르면, 그 사이에서 자료가 끊깁니다.
              </p>
              <p className="mt-5">
                매일 본 장부가 그대로 자문의 근거가 됩니다.
                메리디안은 그 일을 한 사람이 맡습니다.
              </p>
              <p className="mt-5 text-neutral-400">
                기장이 자문이 되고, 자문이 다음 결정의 자료가 되는 자리입니다.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── § 2. 자오선 메타포 (Brand Statement) ─── */}
      <section className="py-28 md:py-40 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-muted mb-12 font-medium uppercase text-center">
              The Meridian
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.1}>
            <p
              className="text-3xl md:text-5xl lg:text-5xl font-bold leading-[1.25] tracking-tight text-center text-foreground"
              style={{ wordBreak: "keep-all" }}
            >
              본초자오선<span className="text-accent">.</span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-2xl font-medium text-muted" style={serif}>
                Prime Meridian
              </span>
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.2}>
            <div className="mt-16 max-w-2xl mx-auto text-center space-y-7">
              <p
                className="text-base md:text-lg text-strong leading-[1.95]"
                style={{ wordBreak: "keep-all" }}
              >
                영국 그리니치 천문대를 지나는 <strong className="text-foreground">경도 0°선</strong>.
                세계의 시간은 여기서 출발합니다.
                런던도, 서울도, 뉴욕도 이 한 선에 시각을 맞춥니다.
              </p>

              <div className="h-px w-12 bg-accent mx-auto" />

              <p
                className="text-base md:text-lg text-strong leading-[1.95]"
                style={{ wordBreak: "keep-all" }}
              >
                사업의 모든 결정에도 그런 <strong className="text-foreground">기준선</strong>이 필요합니다.
              </p>

              <p
                className="text-base md:text-lg text-muted leading-[1.95]"
                style={{ wordBreak: "keep-all" }}
              >
                기장이 정확해야 신고가 섭니다.
                신고가 서야 자문이 서고, 그 위에 결정이 놓입니다.
                기준선이 어긋나면 위에 쌓은 것도 함께 어긋납니다.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.3}>
            <p
              className="mt-16 text-xl md:text-2xl lg:text-2xl font-bold leading-[1.5] tracking-tight text-center text-foreground max-w-2xl mx-auto"
              style={{ wordBreak: "keep-all" }}
            >
              <span className="text-accent">그 기준선</span>을 맡는 자리입니다.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── § 3. Portrait (Founder) ─── */}
      <section className="py-20 md:py-28 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[1/1] overflow-hidden bg-card max-w-md mx-auto lg:mx-0">
                <Image
                  src="/images/founder.webp"
                  alt="박민상 공인회계사"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <AnimateOnScroll variant="fadeUp" className="lg:col-span-7">
              <p className="text-xs tracking-[0.3em] text-muted mb-6 font-medium uppercase">
                Founder · CPA
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                박민상<span className="green-dot">.</span>
              </h2>
              <div className="mt-8 h-px w-12 bg-accent" />
              <p
                className="mt-10 text-base md:text-lg text-strong leading-[1.85] max-w-xl"
                style={{ wordBreak: "keep-all" }}
              >
                대부분의 세무기장이 <span className="text-muted">&lsquo;작업&rsquo;</span>에 머무를 때,
                여기선 <strong className="text-foreground">&lsquo;검토&rsquo;</strong>로 다룹니다.
                계정 분류 하나, 증빙 하나도 그 다음 신고·자문·의사결정에
                어떻게 연결될지를 먼저 봅니다.
                그래서 결산 시즌에 새로 발견되는 것이 적습니다.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── § 4. 메리디안의 약속 ─── */}
      <section className="py-24 md:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-muted mb-8 font-medium uppercase">
              Our Promise
            </p>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl"
              style={{ wordBreak: "keep-all" }}
            >
              메리디안의 약속<span className="green-dot">.</span>
            </h2>
            <div className="mt-8 h-px w-12 bg-accent" />
            <p
              className="mt-10 text-base md:text-lg text-strong leading-[1.85] max-w-2xl"
              style={{ wordBreak: "keep-all" }}
            >
              세무사·회계사와 연락이 닿지 않는다, 서류 회신이 늦다, 답을 받아도 믿기 어렵다, 응대가 불친절하다.
              자주 듣는 이야기입니다. 그 원인 대부분은 직원 한 사람에게 역량을 넘어선 거래처가 배정된 데 있습니다.
              메리디안은 그 구조 자체를 다르게 두기로 했습니다.
            </p>
          </AnimateOnScroll>

          {/* 두 가지 약속 */}
          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {[
              {
                num: "01",
                title: "천천히 갑니다",
                body:
                  "욕심내지 않습니다. 직원의 교육·훈련 비용을 고객에게 전가하지 않습니다.",
              },
              {
                num: "02",
                title: "책임은 회계사가 집니다",
                body:
                  "서비스 품질에 대한 책임은 전적으로 회계사가 집니다. 직원에게 전가하지 않습니다.",
              },
            ].map((item) => (
              <div key={item.num} className="bg-background p-10 md:p-12">
                <p className="text-xs tracking-[0.3em] text-muted mb-6 font-medium">
                  약속 {item.num}
                </p>
                <h3
                  className="text-2xl md:text-2xl font-bold text-foreground leading-tight"
                  style={{ wordBreak: "keep-all" }}
                >
                  {item.title}
                </h3>
                <div className="mt-6 h-px w-10 bg-accent" />
                <p
                  className="mt-6 text-base text-strong leading-[1.85]"
                  style={{ wordBreak: "keep-all" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* 어떻게 지키는가 */}
          <div className="mt-24 md:mt-32">
            <AnimateOnScroll variant="fadeUp">
              <p className="text-xs tracking-[0.35em] text-muted mb-8 font-medium uppercase">
                How we keep it
              </p>
              <h3
                className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] max-w-3xl"
                style={{ wordBreak: "keep-all" }}
              >
                이 약속을 지키는 방식<span className="green-dot">.</span>
              </h3>
              <div className="mt-8 h-px w-12 bg-accent" />
            </AnimateOnScroll>

            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
              {[
                {
                  num: "01",
                  title: "직원에게 생각할 시간을 만듭니다",
                  body:
                    "고객과의 소통에 더 많은 시간을 쓸 수 있도록, 단순·반복 작업은 자체 개발 솔루션으로 자동화·체계화합니다. 한 사람에게 일정 수 이상의 거래처를 배정하지 않습니다.",
                },
                {
                  num: "02",
                  title: "염가경쟁을 하지 않습니다",
                  body:
                    "염가 수임은 정당한 대가를 지불한 고객이 받아야 할 서비스 품질을 떨어뜨립니다. 정당한 대가로 일을 받고 지속가능하게 운영하는 것 — 지금 메리디안과 함께하는 고객과의 약속입니다.",
                },
                {
                  num: "03",
                  title: "회계사가 직접 많이 일합니다",
                  body:
                    "적게 일하고 많이 벌겠다는 욕심을 버립니다. 열심히 일하고, 그 시간을 고객·직원과 함께 보냅니다.",
                },
              ].map((item) => (
                <div key={item.num} className="bg-background p-10 md:p-12">
                  <p className="text-xs tracking-[0.3em] text-muted mb-6 font-medium">
                    {item.num}
                  </p>
                  <h4
                    className="text-xl md:text-xl font-bold text-foreground leading-tight"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {item.title}
                  </h4>
                  <div className="mt-6 h-px w-10 bg-accent" />
                  <p
                    className="mt-6 text-sm md:text-sm text-strong leading-[1.85]"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── § 5. 차별화 비교표 ─── */}
      <section className="py-28 md:py-40 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-neutral-500 mb-8 font-medium uppercase">
              Comparison
            </p>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl"
              style={{ wordBreak: "keep-all" }}
            >
              누구와 준비하느냐에 따라
              <br />
              결과는 달라집니다.
            </h2>
            <div className="mt-10 h-px w-16 bg-accent-bright" />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <div className="mt-16 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[560px]">
                <thead>
                  <tr className="border-b border-neutral-700">
                    <th className="py-5 pr-6 text-xs tracking-[0.2em] uppercase text-neutral-500 font-medium w-1/3"></th>
                    <th className="py-5 px-6 text-xs tracking-[0.2em] uppercase text-neutral-500 font-medium w-1/3">
                      저가 기장 사무소
                    </th>
                    <th className="py-5 px-6 text-xs tracking-[0.2em] uppercase text-white font-bold w-1/3">
                      Meridian
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  {[
                    {
                      label: "관점",
                      low: "가격 경쟁력 중심",
                      meridian: "대표 본업의 시간 확보",
                    },
                    {
                      label: "누가 답하나",
                      low: "사무 직원",
                      meridian: "공인회계사 직접",
                    },
                    {
                      label: "기술 활용",
                      low: "수기 · 단순 전산",
                      meridian: "내부 AI · 업무 맞춤 자동화",
                    },
                    {
                      label: "소통 방식",
                      low: "담당자 연결 지연",
                      meridian: "회계사 직접 답신",
                    },
                    {
                      label: "비용이 가는 곳",
                      low: "인건비 절감",
                      meridian: "회계사의 작업 시간",
                    },
                  ].map((row, i) => (
                    <tr key={row.label} className={i < 4 ? "border-b border-neutral-800" : ""}>
                      <td className="py-6 pr-6 font-medium text-white">{row.label}</td>
                      <td className="py-6 px-6 text-neutral-400">{row.low}</td>
                      <td className="py-6 px-6 text-white font-medium">{row.meridian}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── § 6. Affiliation ─── */}
      <AnimateOnScroll variant="fadeIn">
        <section className="py-24 md:py-32 bg-background border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <AnimateOnScroll variant="fadeUp">
                <p className="text-xs tracking-[0.3em] text-muted mb-4 uppercase">
                  Affiliation
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-foreground">
                  동성회계법인과의
                  <br />
                  관계
                </h2>
                <div className="mt-6 h-px w-16 bg-accent" />
              </AnimateOnScroll>
              <AnimateOnScroll variant="fadeUp" delay={0.15}>
                <div className="space-y-6 text-strong leading-[1.85]">
                  <p>
                    <strong className="text-foreground">메리디안 택스 어드바이저리</strong>는
                    박민상 공인회계사가 직접 운영하는 개인 자문 브랜드입니다.
                    별도 법인이 아닙니다.
                  </p>
                  <p>
                    박민상 공인회계사는{" "}
                    <strong className="text-foreground">동성회계법인</strong> 소속입니다.
                    회계감사 · 세무 기장 · 세무 조정 · 세무 신고 등 법정 업무는
                    모두 동성회계법인 명의로 수행됩니다.
                  </p>
                  <div className="pt-6 mt-6 border-t border-border space-y-1">
                    <p className="text-xs tracking-[0.2em] text-muted uppercase">
                      Direct Contact
                    </p>
                    <p className="text-foreground">
                      Kakao.{" "}
                      <a
                        href={siteConfig.kakaoChannelUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="hover:text-accent transition-colors underline-offset-2 hover:underline"
                      >
                        카카오톡 채널
                      </a>
                    </p>
                    <p className="text-foreground">Email. {siteConfig.email}</p>
                    <p className="text-muted text-sm pt-1">
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
