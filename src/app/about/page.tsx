import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig, heroImages } from "@/lib/constants";
import { AnimateOnScroll, LineReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "ABOUT",
  description:
    "메리디안 택스 어드바이저리. 단순 신고 대행이 아닌 세무 관리. 매일의 장부에서 신고와 자문까지, 한 사람이 끝까지 책임지는 부티크 세무·재무 자문.",
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
              본초자오선
            </p>
          </AnimateOnScroll>

          <div className="mt-10">
            <LineReveal className="h-px w-24 bg-accent-bright" delay={0.4} />
          </div>

          <AnimateOnScroll variant="fadeUp" delay={0.5}>
            <div className="mt-10 max-w-2xl text-lg md:text-xl text-neutral-300 leading-[1.85]">
              <p>
                신고만 처리해주는 곳이 아닙니다.
              </p>
              <p className="mt-5">
                매일 장부 보는 사람이 자문 자리까지 같이 갑니다.
                기장도 신고도 자문도, 같은 사람의 일입니다.
              </p>
              <p className="mt-5 text-neutral-400">
                메리디안은 그 흐름을 끝까지 책임지는 자리입니다.
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
              className="text-3xl md:text-5xl lg:text-[3.2rem] font-bold leading-[1.25] tracking-tight text-center text-foreground"
              style={{ wordBreak: "keep-all" }}
            >
              본초자오선<span className="text-accent">.</span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-[2rem] font-medium text-muted" style={serif}>
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
                세계의 모든 시간이 이 한 선에서 출발합니다.
                런던도 서울도 뉴욕도 결국 이 선을 기준으로 시각을 맞춥니다.
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
                기장이 정확해야 신고가 서고, 신고가 서야 자문이 서고,
                자문이 서야 결정이 흔들리지 않습니다.
                기준선이 흔들리면, 그 위에 쌓인 모든 것이 흔들립니다.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.3}>
            <p
              className="mt-16 text-xl md:text-2xl lg:text-[1.7rem] font-bold leading-[1.5] tracking-tight text-center text-foreground max-w-2xl mx-auto"
              style={{ wordBreak: "keep-all" }}
            >
              메리디안은 <span className="text-accent">사업의 기준선</span>이 되는 자리에 섭니다.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── § 3. Portrait (Founder) ─── */}
      <section className="py-20 md:py-28 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-card max-w-md mx-auto lg:mx-0">
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
                대부분의 세무기장이 <span className="text-muted">&lsquo;작업&rsquo;</span>으로 처리될 때,
                메리디안은 <strong className="text-foreground">&lsquo;검토&rsquo;</strong>로 다룹니다.
                계정 분류 하나, 증빙 하나도 그 다음 신고·자문·의사결정에
                어떻게 연결될지를 먼저 봅니다.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── § 4. 4가지 원칙 (Compressed Grid) ─── */}
      <section className="py-24 md:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-muted mb-8 font-medium uppercase">
              Principles
            </p>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl"
              style={{ wordBreak: "keep-all" }}
            >
              일하는 4가지 방식.
            </h2>
            <div className="mt-8 h-px w-12 bg-accent" />
          </AnimateOnScroll>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {[
              {
                num: "01",
                title: "전문가의 판단",
                body: "사업 맥락은 알고리즘이 읽지 못합니다. 사무 직원도 그렇습니다. 회계사가 직접 봅니다.",
              },
              {
                num: "02",
                title: "기술은 내부 도구로",
                body: "고객이 새 앱을 익힐 일은 없습니다. AI는 메리디안 내부에서, 정밀한 계산과 검토를 위해 씁니다.",
              },
              {
                num: "03",
                title: "직접 응답",
                body: "챗봇과 사무 직원을 거치지 않습니다. 실제 작업하는 회계사가 직접 답합니다.",
              },
              {
                num: "04",
                title: "본업에 투자",
                body: "광고비와 마케팅 인력에 쓸 돈을, 회계사의 작업 시간에 씁니다. 가치는 광고가 아니라 작업에 있습니다.",
              },
            ].map((item) => (
              <div key={item.num} className="bg-background p-10 md:p-12">
                <p className="text-xs tracking-[0.3em] text-muted mb-6 font-medium">
                  원칙 {item.num}
                </p>
                <h3 className="text-2xl md:text-[1.7rem] font-bold text-foreground leading-tight">
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
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-neutral-700">
                    <th className="py-5 pr-6 text-xs tracking-[0.2em] uppercase text-neutral-500 font-medium w-1/4"></th>
                    <th className="py-5 px-6 text-xs tracking-[0.2em] uppercase text-neutral-500 font-medium w-1/4">
                      저가 기장 사무소
                    </th>
                    <th className="py-5 px-6 text-xs tracking-[0.2em] uppercase text-neutral-500 font-medium w-1/4">
                      대형 회계법인
                    </th>
                    <th className="py-5 px-6 text-xs tracking-[0.2em] uppercase text-white font-bold w-1/4">
                      Meridian
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  {[
                    {
                      label: "서비스 철학",
                      low: "가격 경쟁력 중심",
                      big: "분업화된 처리",
                      meridian: "고객 본업 몰입",
                    },
                    {
                      label: "누가 응답하나",
                      low: "사무 직원",
                      big: "어시스턴트 → 파트너",
                      meridian: "공인회계사 직접",
                    },
                    {
                      label: "기술 활용",
                      low: "수기 · 단순 전산",
                      big: "표준 ERP",
                      meridian: "내부 AI · 맞춤 자동화",
                    },
                    {
                      label: "소통 방식",
                      low: "담당자 연결 지연",
                      big: "정기 미팅 중심",
                      meridian: "회계사 직접 응답",
                    },
                    {
                      label: "비용 가치",
                      low: "인건비 절감",
                      big: "광고 · 인프라",
                      meridian: "본업의 작업 시간",
                    },
                  ].map((row, i) => (
                    <tr key={row.label} className={i < 4 ? "border-b border-neutral-800" : ""}>
                      <td className="py-6 pr-6 font-medium text-white">{row.label}</td>
                      <td className="py-6 px-6 text-neutral-400">{row.low}</td>
                      <td className="py-6 px-6 text-neutral-400">{row.big}</td>
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
                    <p className="text-foreground">Tel. {siteConfig.phone}</p>
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
