import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig, heroImages } from "@/lib/constants";
import { AnimateOnScroll, LineReveal, StaggerChildren, StaggerItem, ImageReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "ABOUT",
  description:
    "박민상 공인회계사(삼정·한영 출신) — 세무기장부터 재무자문까지, 고객이 실제 현장에서 겪는 불편함을 직접 찾아 고칩니다. 메리디안 택스 어드바이저리.",
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
                감사를 하면 보입니다.<br />
                그 회사 사람들이 어떻게 결정해왔는지.<br />
                장부에 다 나옵니다.
              </p>
              <p className="mt-5">
                M&A 딜을 하면 또 봅니다.<br />
                같은 숫자가 협상 테이블 위에서 어떻게 달라지는지.
              </p>
              <p className="mt-5 text-neutral-400">
                삼정에서 시작해, 한영에서 마쳤습니다.<br />
                9년 동안 그걸 봤습니다.<br />
                Meridian은 그 눈으로 직접 합니다.
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
                note: "수백 개 회사의 1년을 장부에서 봤습니다.",
              },
              {
                num: "02",
                firm: "NH투자증권",
                sub: "",
                work: "IB · 기업금융",
                note: "숫자가 협상 무기가 되는 자리를 봤습니다.",
              },
              {
                num: "03",
                firm: "한영회계법인",
                sub: "EY",
                work: "Valuation · M&A · EA",
                note: "회사가 어떤 값으로 읽히는지 배웠습니다.",
              },
              {
                num: "04",
                firm: "동성회계법인",
                sub: "현재",
                work: "세무기장 · 자문 · Meridian",
                note: "지금은 직접 합니다.",
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
                  <p className="mt-1 text-sm text-muted">{item.work}</p>
                  <p className="mt-4 text-sm text-strong leading-relaxed">{item.note}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── § 3. 메리디안 4가지 원칙 — Intro ─── */}
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
              한 사람의 시각이
              <br />
              만드는 차이.
            </h2>
            <div className="mt-10 h-px w-16 bg-accent" />
            <p className="mt-10 max-w-2xl text-base md:text-lg text-strong leading-[1.9]">
              메리디안이 일하는 방식에는 네 가지 원칙이 있습니다.
              규모로 만들 수 없는 것을 시각의 깊이로,
              인력으로 메우지 못하는 것을 구조로 풀어냅니다.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── 원칙 01. 시각의 깊이 (with founder photo) ─── */}
      <section className="relative py-28 md:py-40">
        <div className="hidden lg:block absolute top-0 bottom-0 right-[8%] w-px bg-border" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-5">
              <p className="text-xs tracking-[0.35em] text-muted mb-6 font-medium">
                원칙 01
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.2]">
                시각의 깊이.
              </h3>
              <div className="mt-8 h-px w-12 bg-border" />
              <div className="mt-10 space-y-6 text-base md:text-lg text-strong leading-[1.9]">
                <p>
                  세무기장은 어디서나 같은 작업처럼 보입니다.
                  매월 들어온 거래를 분류하고, 부가세를 신고하고, 결산을 하는 일.
                </p>
                <p>
                  그러나 같은 장부에서, <strong>어떤 의사결정이 만들어지고 있는지</strong>를
                  동시에 읽는 사람은 드뭅니다.
                  외부감사를 통해 한 회사의 1년을 통째로 본 경험,
                  M&A 딜을 통해 같은 숫자가 협상 테이블에서 어떻게 다르게 읽히는지를 본 경험 —
                  이 둘을 가진 사람만이 매일의 기장에서 그 양면을 동시에 봅니다.
                </p>
                <p>
                  Meridian은 그 시각을 매일의 작업에 가져옵니다.
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

      {/* ─── 원칙 02. 직접 책임 ─── */}
      <section className="py-28 md:py-40 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-muted mb-6 font-medium">
              원칙 02
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.2]">
              직접 책임.
            </h3>
            <div className="mt-8 h-px w-12 bg-border" />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <div className="mt-12 space-y-6 text-base md:text-lg text-strong leading-[1.9]">
              <p>
                대형 법인에서 일할 때 자주 봤습니다.
                어시스턴트가 작성한 자료를 매니저가 검토하고,
                파트너가 마지막에 서명하는 구조.
                클라이언트는 보통 파트너 얼굴을 자주 봤지만,
                실제로 일을 한 사람은 따로 있었습니다.
              </p>
              <p>
                Meridian은 그 구조의 반대입니다.
                처음 듣는 질문도, 1년치 장부 정리도, 절세 전략도 —
                <strong>한 사람이 끝까지 봅니다.</strong>
              </p>
              <p>
                매번 처음부터 설명할 필요가 없습니다.
                담당자가 바뀌어 맥락이 사라질 일도 없습니다.
                지분 정리든, 가업승계든, 딜이든 —
                재무자문이 필요한 순간에 그 흐름을 이미 알고 있는 사람이 함께합니다.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── 원칙 03. 구조로 마찰을 ─── */}
      <section className="py-28 md:py-40 bg-card">
        <div className="max-w-3xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-muted mb-6 font-medium">
              원칙 03
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.2]">
              구조로 마찰을 줄인다.
            </h3>
            <div className="mt-8 h-px w-12 bg-border" />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <div className="mt-12 space-y-6 text-base md:text-lg text-strong leading-[1.9]">
              <p>
                회계사가 해야 하는 진짜 일은 자문입니다.
                그런데 자동화할 수 있는 단순 작업을 매번 수작업으로 하고 있으면 —
                그 시간이 결국 자문 시간을 잡아먹습니다.
              </p>
              <p>
                프리랜서 600명과 일하는 고객이 있었습니다.
                정산을 메신저로 했습니다. 사람이 매달 일일이 확인했습니다.
                열심히 했는데도 매달 빠졌습니다.
              </p>
              <p>
                <strong>구조의 문제였습니다. 사람의 문제가 아니라.</strong>
                파이썬으로 정산 시스템을 직접 만들었습니다. 이후로는 빠지지 않습니다.
              </p>
              <p>
                AI 코딩 도구가 나오면서 이 작업은 더 빨라졌습니다.
                회계사가 직접 짜면 중간에 잘못 전달될 일이 없고,
                그 시간을 절세 전략을 세우는 데 씁니다.
                이런 식의 개선이 생각보다 많습니다.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── 원칙 04. 한 사람 단위 ─── */}
      <section className="py-28 md:py-40 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs tracking-[0.35em] text-muted mb-6 font-medium">
              원칙 04
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.2]">
              한 사람 단위.
            </h3>
            <div className="mt-8 h-px w-12 bg-border" />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <div className="mt-12 space-y-6 text-base md:text-lg text-strong leading-[1.9]">
              <p>
                대형 법인이 줄 수 없는 깊이가 있습니다.
                대형 법인에 가면 한 회사를 끝까지 들여다보기 어렵습니다.
                업무는 분업되어 있고, 클라이언트와의 거리는 멀어집니다.
              </p>
              <p>
                1인 사무소가 가질 수 없는 시각도 있습니다.
                Big 4·IB의 환경에서만 쌓이는 통합적 시각,
                대형 딜에서만 부딪히는 복잡한 의사결정의 경험.
                평생 단독 사무소만 있으면 그 시각은 자랍니다.
              </p>
              <p>
                <strong>Meridian은 그 사이에 있습니다.</strong>
                대형의 시각으로, 1인의 직접성으로 일합니다.
                광고비와 마케팅 인력에 쓸 비용을, 회계사 본인의 작업 시간에 씁니다.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <hr className="section-divider" />

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
              메리디안이
              <br />
              다른 선택지와 다른 점.
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
                      label: "누가 검토하나",
                      low: "사무 직원",
                      big: "어시스턴트 → 파트너",
                      meridian: "공인회계사 직접",
                    },
                    {
                      label: "시각의 폭",
                      low: "세무 신고만",
                      big: "분야별 분업",
                      meridian: "세무 · 재무 · M&A 통합",
                    },
                    {
                      label: "시스템 · 자동화",
                      low: "수작업 처리",
                      big: "표준 ERP",
                      meridian: "클라이언트별 맞춤 코딩",
                    },
                    {
                      label: "의사소통",
                      low: "담당자 연결 지연",
                      big: "정기 미팅 중심",
                      meridian: "회계사 직접 응답",
                    },
                    {
                      label: "Big 4 경험",
                      low: "없음",
                      big: "있음 (분업된 형태)",
                      meridian: "있음 (감사 + IB + Valuation)",
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
              메리디안은 이렇게 봅니다
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
