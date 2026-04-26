import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig, heroImages } from "@/lib/constants";
import { AnimateOnScroll, LineReveal, ImageReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "ABOUT",
  description:
    "메리디안 택스 어드바이저리 — 단순 신고 대행이 아닌 세무 관리. 기장에서 신고, 자문까지 한 사람이 끝까지 책임지는 부티크 세무·재무 자문.",
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
                단순 신고 대행이 아닙니다.<br />
                <strong className="text-white">세무 관리입니다.</strong>
              </p>
              <p className="mt-6">
                매일의 장부에서 신고와 자문까지,
                끊김 없이 이어지는 흐름.
              </p>
              <p className="mt-6 text-neutral-400">
                Meridian은 그 흐름을 한 사람이 끝까지 책임지는 자리입니다.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── § 2. 4가지 원칙 — Intro ─── */}
      <section className="py-24 md:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-muted mb-8 font-medium uppercase">
              Principles
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl"
              style={{ wordBreak: "keep-all" }}
            >
              Meridian이
              <br />
              일하는 4가지 방식.
            </h2>
            <div className="mt-10 h-px w-16 bg-accent" />
            <p className="mt-10 max-w-2xl text-base md:text-lg text-strong leading-[1.9]">
              누구와 준비하느냐에 따라 결과는 달라집니다.
              메리디안의 일하는 방식에는 네 가지 원칙이 있습니다.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── 원칙 01. 전문가의 판단 ─── */}
      <section className="relative py-28 md:py-40">
        <div className="hidden lg:block absolute top-0 bottom-0 right-[8%] w-px bg-border" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-5">
              <p className="text-xs tracking-[0.35em] text-muted mb-6 font-medium">
                원칙 01
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.2]">
                전문가의 판단.
              </h3>
              <div className="mt-8 h-px w-12 bg-border" />
              <div className="mt-10 space-y-6 text-base md:text-lg text-strong leading-[1.9]">
                <p>
                  어떤 알고리즘도 사업의 맥락과 고민의 깊이를
                  완벽히 이해할 수 없습니다.
                </p>
                <p>
                  메리디안은 사무 직원이나 자동화 시스템이 판단을 내리는 곳이
                  아닙니다.
                  사업의 맥락을 깊이 읽고, 그 위에서 의사결정의 근거를 만드는 것은
                  <strong> 회계사 본인의 일</strong>입니다.
                </p>
                <p>
                  정확성 위에 시각을 얹습니다.
                  지식보다 신뢰를 먼저 전합니다.
                </p>
              </div>
            </AnimateOnScroll>

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

      {/* ─── 원칙 02. 기술은 내부 도구로 ─── */}
      <section className="py-28 md:py-40 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-muted mb-6 font-medium">
              원칙 02
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.2]">
              기술은 내부 도구로.
            </h3>
            <div className="mt-8 h-px w-12 bg-border" />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <div className="mt-12 space-y-6 text-base md:text-lg text-strong leading-[1.9]">
              <p>
                복잡한 세무 처리를 위해 새 앱이나 플랫폼 학습이 필요하지 않습니다.
                기술은 클라이언트가 익혀야 할 시스템이 아닙니다.
              </p>
              <p>
                AI 코딩 도구는 메리디안 내부에서
                <strong> 정밀한 계산과 오차 없는 검토</strong>를 위해 작동합니다.
                반복적인 정산, 매출 집계, 자료 점검 — 자동화할 수 있는 작업은
                클라이언트별 맞춤 구조로 짜서 처리합니다.
              </p>
              <p>
                자동화는 목적이 아니라 수단입니다.
                회계사의 시간을 진짜 자문에 쓰기 위해 마찰을 걷어냅니다.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── 원칙 03. 직접 응답 ─── */}
      <section className="py-28 md:py-40 bg-card">
        <div className="max-w-3xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-muted mb-6 font-medium">
              원칙 03
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.2]">
              직접 응답.
            </h3>
            <div className="mt-8 h-px w-12 bg-border" />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <div className="mt-12 space-y-6 text-base md:text-lg text-strong leading-[1.9]">
              <p>
                복잡한 세무, 챗봇과 대화할 필요가 없습니다.
                사무 직원이 1차로 받고 회계사가 나중에 검토하는 구조도 아닙니다.
              </p>
              <p>
                <strong>실제 작업을 하는 회계사가 직접 응답합니다.</strong>
                질문 한 번에 1년치 장부 흐름이 답변에 담깁니다.
                매번 처음부터 설명할 필요가 없고,
                담당자가 바뀌어 맥락이 사라질 일도 없습니다.
              </p>
              <p>
                지분 정리든, 가업승계든, 딜이든 —
                재무자문이 필요한 순간에도 같은 사람이 함께합니다.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── 원칙 04. 본업에 투자 ─── */}
      <section className="py-28 md:py-40 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-muted mb-6 font-medium">
              원칙 04
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.2]">
              본업에 투자.
            </h3>
            <div className="mt-8 h-px w-12 bg-border" />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <div className="mt-12 space-y-6 text-base md:text-lg text-strong leading-[1.9]">
              <p>
                광고비, 마케팅 인력, 화려한 앱 개발에 쓸 비용을
                <strong> 회계사의 작업 시간과 클라이언트별 맞춤 설계</strong>에 씁니다.
              </p>
              <p>
                메리디안의 가치는 광고에 있지 않습니다.
                매일의 기장 정확성, 신고 전 점검의 깊이,
                자문 한 번의 무게 — 본업의 작업에 있습니다.
              </p>
              <p>
                작업이 좋으면 고객이 다음 결정에서 다시 부릅니다.
                메리디안의 성장은 그 한 번의 신뢰에서 시작합니다.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── § 3. 사업 단계별 흐름 ─── */}
      <section className="py-28 md:py-40 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-muted mb-8 font-medium uppercase">
              Lifecycle
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl"
              style={{ wordBreak: "keep-all" }}
            >
              사업 단계마다
              <br />
              필요한 것은 다릅니다.
            </h2>
            <div className="mt-10 h-px w-16 bg-accent" />
            <p className="mt-10 max-w-2xl text-base md:text-lg text-strong leading-[1.9]">
              시작에는 정리가, 성장에는 절세가, 결정의 순간에는 가치 판단이 필요합니다.
              메리디안은 단계마다 필요한 자문을 같은 흐름 위에서 제공합니다.
            </p>
          </AnimateOnScroll>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {[
              {
                stage: "01",
                label: "Start",
                title: "사업의 시작",
                items: [
                  "사업자 등록",
                  "세무기장 시작",
                  "부가가치세 신고",
                  "원천세 · 4대보험",
                ],
              },
              {
                stage: "02",
                label: "Growth",
                title: "사업의 성장",
                items: [
                  "법인 설립 · 전환",
                  "절세 전략 설계",
                  "경영 자료 정리",
                  "세무조사 대응",
                ],
              },
              {
                stage: "03",
                label: "Decision",
                title: "의사결정의 순간",
                items: [
                  "기업 가치평가",
                  "M&A 자문",
                  "자산 승계 플랜",
                  "오너기업 CFO 자문",
                ],
              },
            ].map((item) => (
              <div key={item.stage} className="bg-background p-8 md:p-12">
                <p className="text-xs tracking-[0.3em] text-muted mb-2 font-medium uppercase">
                  {item.stage} · {item.label}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  {item.title}
                </h3>
                <div className="mt-8 h-px w-10 bg-accent" />
                <ul className="mt-8 space-y-3 text-sm md:text-[0.95rem] text-strong">
                  {item.items.map((it) => (
                    <li key={it} className="flex items-baseline gap-3">
                      <span className="text-muted">·</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── § 4. 차별화 비교표 ─── */}
      <section className="py-28 md:py-40 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-neutral-500 mb-8 font-medium uppercase">
              Comparison
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl"
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

      {/* ─── § 5. 4대 명제 (Pull Quotes) ─── */}
      <section className="py-32 md:py-44 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-muted mb-16 font-medium uppercase text-center">
              Meridian은 이렇게 봅니다
            </p>
          </AnimateOnScroll>

          <div className="space-y-20 md:space-y-28">
            {[
              {
                num: "01",
                quote:
                  "기장은 결산이 아니라, 1년치 의사결정이 누적된 기록입니다.",
              },
              {
                num: "02",
                quote:
                  "신고서는 마감이 아니라, 다음 해의 출발선입니다.",
              },
              {
                num: "03",
                quote:
                  "절세는 이벤트가 아니라, 매일의 기장에서 미리 만들어집니다.",
              },
              {
                num: "04",
                quote:
                  "고객에게 필요한 것은 보고서가 아니라, 결정의 근거입니다.",
              },
            ].map((item, i) => (
              <AnimateOnScroll key={item.num} variant="fadeUp" delay={i * 0.05}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                  <div className="md:col-span-2">
                    <p
                      className="text-5xl md:text-6xl font-light text-accent leading-none"
                      style={serif}
                    >
                      {item.num}
                    </p>
                  </div>
                  <div className="md:col-span-10">
                    <p
                      className="text-2xl md:text-3xl lg:text-[2.25rem] font-medium leading-[1.4] text-foreground"
                      style={{ wordBreak: "keep-all" }}
                    >
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── § 6. Affiliation ─── */}
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
