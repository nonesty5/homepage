import Link from "next/link";
import Image from "next/image";
import { services, members } from "@/lib/data";
import { siteConfig } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";
import { AnimateOnScroll } from "@/components/motion";

export const revalidate = 3600;

const coreOrder = [
  "tax-bookkeeping",
  "tax-adjustment",
  "tax-advisory",
  "valuation",
  "transaction-advisory",
  "audit-advisory",
];

const enMap: Record<string, string> = {
  "tax-bookkeeping": "Bookkeeping",
  "tax-adjustment": "Tax Adjustment",
  "tax-advisory": "Tax Advisory",
  "valuation": "Valuation",
  "transaction-advisory": "M&A · IPO",
  "audit-advisory": "Audit Advisory",
};

type TaxDeadline = { label: string; date: Date };

function getUpcomingTaxDeadlines(from: Date, count = 4): TaxDeadline[] {
  const y = from.getFullYear();
  const m = from.getMonth();
  const all: TaxDeadline[] = [
    // 원천세 — 매월 10일 (3개월치만 후보로)
    { label: "원천세 납부", date: new Date(y, m, 10) },
    { label: "원천세 납부", date: new Date(y, m + 1, 10) },
    { label: "원천세 납부", date: new Date(y, m + 2, 10) },
    // 부가세
    { label: "부가세 1기 예정신고", date: new Date(y, 3, 25) },
    { label: "부가세 1기 확정신고", date: new Date(y, 6, 25) },
    { label: "부가세 2기 예정신고", date: new Date(y, 9, 25) },
    { label: "부가세 2기 확정신고", date: new Date(y + 1, 0, 25) },
    // 주요 연간
    { label: "법인세 신고 (12월 결산)", date: new Date(y, 2, 31) },
    { label: "종합소득세 신고", date: new Date(y, 4, 31) },
    { label: "성실신고확인서 제출", date: new Date(y, 5, 30) },
  ];
  return all
    .filter((d) => d.date.getTime() >= from.getTime())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, count);
}

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);
  const lead = members.find((m) => !m.placeholder);
  const orderedServices = coreOrder
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const today = new Date();
  const upcoming = getUpcomingTaxDeadlines(today, 4);
  const dateStamp = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;
  const dayMs = 86_400_000;

  return (
    <>
      {/* ─── HERO — Memo format (NOT a SaaS template) ─── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-surface border-b border-background/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Eyebrow */}
          <p className="pb-10 md:pb-14 text-xs font-bold tracking-[0.18em] uppercase text-background/50">
            Meridian Advisory <span className="mx-2 text-background/25">·</span> 세무기장 <span className="mx-2 text-background/25">·</span> 자문
          </p>

          {/* Hero headline */}
          <AnimateOnScroll variant="fadeUp">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] tracking-[-0.03em] text-background max-w-[18ch]"
              style={{ wordBreak: "keep-all" }}
            >
              흩어진 숫자를,
              <br />
              하나의 <span className="text-accent">결정</span>으로
              <span className="green-dot">.</span>
            </h1>
            <p className="mt-8 text-base md:text-lg leading-[1.7] text-background/70 max-w-[52ch]" style={{ wordBreak: "keep-all" }}>
              장부를 매일 본 사람이 신고하고, 그 사람이 자문합니다.
            </p>
          </AnimateOnScroll>

          {/* Main grid: left CTA / right live calendar */}
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-20">
            {/* LEFT — document image + CTA */}
            <AnimateOnScroll variant="fadeUp" delay={0.15} className="md:col-span-7">
              <figure className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/hero-document.webp"
                  alt="세무신고 검토 자료"
                  fill
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </figure>
              {/* Single CTA + sidecar link */}
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-baseline gap-2 text-base text-background border-b-2 border-background hover:border-accent hover:text-accent transition-colors pb-0.5"
                >
                  기장 이관 상담하기
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/services"
                  className="text-sm text-background/50 hover:text-background transition-colors"
                >
                  ↳ 서비스 전체 보기
                </Link>
              </div>
            </AnimateOnScroll>

            {/* RIGHT — Live tax deadline calendar */}
            <AnimateOnScroll variant="fadeUp" delay={0.28} className="md:col-span-5 md:pl-10 md:border-l border-background/15">
              <div className="flex items-baseline justify-between mb-8">
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-background">
                  이번 분기 주요 일정
                </p>
                <p className="text-xs tracking-[0.14em] uppercase text-background/35 tabular-nums">
                  as of {dateStamp}
                </p>
              </div>
              <ul>
                {upcoming.map((d, i) => {
                  const daysAway = Math.ceil((d.date.getTime() - today.getTime()) / dayMs);
                  const dateText = `${d.date.getFullYear()}.${String(d.date.getMonth() + 1).padStart(2, "0")}.${String(d.date.getDate()).padStart(2, "0")}`;
                  const urgent = daysAway <= 7;
                  return (
                    <li key={`${d.label}-${i}`} className="border-t border-background/15 first:border-t-0 py-4">
                      <div className="flex items-baseline justify-between gap-3 mb-1">
                        <span className="text-base md:text-base text-background leading-tight" style={{ wordBreak: "keep-all" }}>
                          {d.label}
                        </span>
                        <span className={`text-xs font-bold tabular-nums tracking-wide ${urgent ? "text-accent" : "text-background/45"}`}>
                          D-{daysAway}
                        </span>
                      </div>
                      <span className="text-xs text-background/35 tabular-nums">{dateText}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 text-xs leading-[1.65] text-background/35">
                국세청 기준 주요 신고·납부 기한. 담당 법인의 신고 의무 및 마감일은 실제와 상이할 수 있습니다.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── 업종별 / 클라이언트 유형 ─── */}
      <section className="py-24 md:py-36 bg-background border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 md:mb-20">
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-7">
              <p className="eyebrow mb-8">Built for</p>
              <h2
                className="text-4xl md:text-5xl lg:text-5xl font-black leading-[1.05] tracking-[-0.03em] text-foreground"
                style={{ wordBreak: "keep-all" }}
              >
                어떤 분과 일하나<span className="green-dot">.</span>
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-5 lg:pt-6">
              <p
                className="text-base md:text-lg leading-[1.85] text-muted"
                style={{ wordBreak: "keep-all" }}
              >
                단계와 영역에 따라 필요한 자문이 다릅니다.
                결정 하나의 무게가 큰 분들의 자리에서 일합니다.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {[
              {
                num: "01",
                title: "법인 대표",
                desc: "스타트업 · 중소기업 · 성장기 법인",
                services: [
                  "법인세 · 부가세 · 원천세",
                  "절세 전략 설계",
                  "비상장주식 가치평가",
                  "법인 전환 · 설립 자문",
                ],
              },
              {
                num: "02",
                title: "개인사업자 · 프리랜서",
                desc: "고소득 전문직 · 1인 사업자",
                services: [
                  "종합소득세 · 부가세",
                  "4대보험 · 원천세",
                  "절세 전략",
                  "성실신고 대응",
                ],
              },
              {
                num: "03",
                title: "자산가 (개인)",
                desc: "양도 · 증여 · 상속 단계",
                services: [
                  "양도세 · 증여세 · 상속세",
                  "자산 이전 설계",
                  "가업승계 사전 점검",
                  "다주택 · 부동산 절세",
                ],
              },
              {
                num: "04",
                title: "M&A · IPO 검토",
                desc: "거래 · 상장 준비 단계",
                services: [
                  "기업 가치평가",
                  "M&A 재무실사 (FDD)",
                  "IPO 사전 회계 정비",
                  "거래 구조 자문",
                ],
              },
            ].map((item) => (
              <div key={item.num} className="bg-background p-8 md:p-10">
                <p className="text-xs tracking-[0.3em] text-muted mb-6 font-medium">
                  {item.num}
                </p>
                <h3 className="text-xl md:text-xl font-bold text-foreground leading-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted" style={{ wordBreak: "keep-all" }}>
                  {item.desc}
                </p>
                <div className="mt-6 h-px w-10 bg-accent" />
                <ul className="mt-6 space-y-2 text-sm md:text-sm text-strong">
                  {item.services.map((s) => (
                    <li key={s} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-muted mt-0.5">·</span>
                      <span style={{ wordBreak: "keep-all" }}>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MANIFESTO PULL QUOTE ─── */}
      <section className="py-24 md:py-36 bg-foreground text-background relative overflow-hidden">
        <div className="hidden lg:block absolute top-1/2 left-[8%] w-px h-32 bg-accent-bright/40 -translate-y-1/2" />
        <div className="hidden lg:block absolute top-1/2 right-[8%] w-px h-32 bg-accent-bright/40 -translate-y-1/2" />

        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-background/40 text-center mb-12">
              Manifesto
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll variant="fadeUp" delay={0.1}>
            <p
              className="text-3xl md:text-5xl lg:text-5xl font-bold leading-[1.35] tracking-tight text-center"
              style={{ wordBreak: "keep-all" }}
            >
              세금은 <span className="text-accent-bright">&lsquo;내는 것&rsquo;</span>이 아니라
              <br />
              <span className="text-accent-bright">&lsquo;설계하는 것&rsquo;</span>입니다<span className="green-dot">.</span>
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll variant="fadeUp" delay={0.2}>
            <p
              className="mt-12 text-base md:text-lg text-background/60 text-center max-w-2xl mx-auto leading-[1.85]"
              style={{ wordBreak: "keep-all" }}
            >
              매일의 기장이 검토가 되고, 검토가 자문이 되고, 자문이 다음 결정의 근거가 됩니다.
              그 흐름을 끊지 않는 일이 메리디안의 본업입니다.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── PAIN POINTS — 익숙한 상황 ─── */}
      <section className="py-24 md:py-36 bg-card border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 md:mb-20">
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-8">
              <p className="eyebrow mb-8">기장하고 있는데도</p>
              <h2
                className="text-4xl md:text-5xl lg:text-5xl font-black leading-[1.05] tracking-[-0.03em] text-foreground"
                style={{ wordBreak: "keep-all" }}
              >
                이런 적, 익숙하시죠<span className="green-dot">.</span>
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-4 lg:pt-6">
              <p
                className="text-base md:text-lg leading-[1.85] text-muted"
                style={{ wordBreak: "keep-all" }}
              >
                세무사무소에 맡겨도 손이 가는 일이 있습니다.
                그런 일을 줄이는 자리에서 일합니다.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {[
              {
                num: "01",
                pain: "장부 잔액이 안 맞는데, 그걸 회사 담당자가 매번 맞춰야 합니다.",
                ans: "매월 점검합니다. 잔액이 어긋나면 회계사가 먼저 봅니다.",
              },
              {
                num: "02",
                pain: "기장은 하고 있는데, 절세 가능한 항목을 결산 때 알게 됩니다.",
                ans: "절세 항목은 결산 때 발견하면 늦습니다. 매일의 기장에서 미리 잡힙니다.",
              },
              {
                num: "03",
                pain: "세무 질문이 있어도 담당자한테 연결되기까지 며칠 걸립니다.",
                ans: "회계사가 직접 답합니다. 사무 직원을 거치지 않습니다.",
              },
              {
                num: "04",
                pain: "신고 결과를 받았는데, 왜 이 금액인지 설명해주는 사람이 없습니다.",
                ans: "신고 후 결과 보고서로 산출 근거와 절세 포인트를 설명합니다.",
              },
            ].map((item) => (
              <div key={item.num} className="bg-background p-8 md:p-10">
                <p className="text-xs tracking-[0.3em] text-muted mb-5 font-medium">
                  CASE {item.num}
                </p>
                <p
                  className="text-base md:text-lg font-bold text-foreground leading-[1.5]"
                  style={{ wordBreak: "keep-all" }}
                >
                  &ldquo;{item.pain}&rdquo;
                </p>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs tracking-[0.18em] uppercase text-accent font-bold mb-3">
                    Meridian&apos;s answer
                  </p>
                  <p
                    className="text-sm md:text-sm text-strong leading-[1.75]"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {item.ans}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR PROMISE — 약속 압축본 ─── */}
      <section className="py-24 md:py-36 bg-background border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-7">
              <p className="eyebrow mb-8">Our Promise</p>
              <h2
                className="text-4xl md:text-5xl lg:text-5xl font-black leading-[1.05] tracking-[-0.03em] text-foreground max-w-[18ch]"
                style={{ wordBreak: "keep-all" }}
              >
                메리디안이 지키는
                <br />
                두 가지 약속<span className="green-dot">.</span>
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-5 lg:pt-6">
              <p
                className="text-base md:text-lg leading-[1.85] text-muted"
                style={{ wordBreak: "keep-all" }}
              >
                연락이 닿지 않는다, 회신이 늦다, 응대가 불친절하다.
                자주 듣는 이야기입니다. 그 원인은 대개 한 사람에게 역량을 넘어서는 거래처가 배정된 데 있습니다.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
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
              <div key={item.num} className="bg-background p-8 md:p-12">
                <p className="text-xs tracking-[0.3em] text-muted mb-6 font-medium">
                  약속 {item.num}
                </p>
                <h3
                  className="text-xl md:text-2xl font-bold text-foreground leading-tight"
                  style={{ wordBreak: "keep-all" }}
                >
                  {item.title}
                </h3>
                <div className="mt-6 h-px w-10 bg-accent" />
                <p
                  className="mt-6 text-sm md:text-base text-strong leading-[1.85]"
                  style={{ wordBreak: "keep-all" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6">
            {[
              {
                title: "직원에게 생각할 시간을",
                body: "단순·반복 작업은 자체 솔루션으로 자동화. 한 사람에게 일정 수 이상의 거래처를 배정하지 않습니다.",
              },
              {
                title: "염가경쟁을 하지 않습니다",
                body: "염가 수임은 정당한 대가를 낸 고객의 서비스 품질을 떨어뜨립니다.",
              },
              {
                title: "회계사가 직접 많이 일합니다",
                body: "적게 일하고 많이 벌겠다는 욕심을 버립니다. 그 시간을 고객·직원과 함께 보냅니다.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-border pt-6">
                <h4
                  className="text-base md:text-lg font-bold text-foreground leading-tight"
                  style={{ wordBreak: "keep-all" }}
                >
                  {item.title}
                </h4>
                <p
                  className="mt-3 text-sm text-muted leading-[1.75]"
                  style={{ wordBreak: "keep-all" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <AnimateOnScroll variant="fadeIn" delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                href="/about"
                className="inline-flex items-baseline gap-2 text-sm tracking-[0.15em] uppercase font-medium text-foreground hover-underline"
              >
                메리디안의 약속 자세히 보기
                <span aria-hidden className="transition-transform duration-300">→</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── WHY MERIDIAN — 4가지 원칙 ─── */}
      <section className="py-24 md:py-36 bg-background border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-7">
              <p className="eyebrow mb-8">Why Meridian</p>
              <h2
                className="text-4xl md:text-5xl lg:text-5xl font-black leading-[1] tracking-[-0.03em] text-foreground max-w-[16ch]"
                style={{ wordBreak: "keep-all" }}
              >
                한 사람의 시각이
                <br />
                만드는 차이<span className="green-dot">.</span>
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-5 lg:pt-6">
              <p
                className="text-base md:text-lg leading-[1.85] text-muted"
                style={{ wordBreak: "keep-all" }}
              >
                대형 법인의 분업으로는 안 보이는 자리, 1인 사무소의 시야로는 안 닿는 자리.
                그 사이에서 일합니다.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {[
              {
                num: "01",
                title: "전문가의 판단",
                body: "사업의 맥락은 알고리즘도 사무 직원도 읽지 못합니다. 회계사가 직접 봅니다.",
              },
              {
                num: "02",
                title: "기술은 내부 도구로",
                body: "반복 작업은 시스템에 맡깁니다. 회계사는 자문에 집중합니다.",
              },
              {
                num: "03",
                title: "직접 응답",
                body: "챗봇이나 사무 직원을 거치지 않습니다. 작업한 회계사가 직접 답합니다.",
              },
              {
                num: "04",
                title: "본업에 투자",
                body: "광고와 영업 인력에 쓸 비용을 회계사의 작업 시간으로 돌립니다.",
              },
            ].map((item) => (
              <div key={item.num} className="bg-background p-8 md:p-10">
                <p className="text-xs tracking-[0.3em] text-muted mb-6 font-medium">
                  원칙 {item.num}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                  {item.title}
                </h3>
                <p
                  className="mt-5 text-sm md:text-sm text-strong leading-[1.75]"
                  style={{ wordBreak: "keep-all" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <AnimateOnScroll variant="fadeIn" delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                href="/about"
                className="inline-flex items-baseline gap-2 text-sm tracking-[0.15em] uppercase font-medium text-foreground hover-underline"
              >
                메리디안의 4가지 원칙 더 보기
                <span aria-hidden className="transition-transform duration-300">→</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-24 md:py-36 bg-card">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-24">
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-7">
              <p className="eyebrow mb-8">What we do</p>
              <h2
                className="text-4xl md:text-5xl lg:text-5xl font-black leading-[1] tracking-[-0.03em] text-foreground max-w-[14ch]"
                style={{ wordBreak: "keep-all" }}
              >
                장부가 정밀하면,
                <br />
                결정이 달라집니다
                <span className="green-dot">.</span>
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-5 lg:pt-6">
              <p
                className="text-base md:text-base leading-[1.7] text-muted max-w-[40ch]"
                style={{ wordBreak: "keep-all" }}
              >
                모든 의사결정의 기준선은 장부입니다. 장부가 정확해야 신고·조정·자문·가치평가가 흔들리지 않습니다.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {orderedServices.map((service, index) => (
              <AnimateOnScroll
                key={service.slug}
                variant="fadeUp"
                delay={index * 0.05}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative block h-full bg-background p-10 md:p-12 hover:bg-foreground hover:text-background transition-colors duration-400"
                >
                  <div className="flex items-start justify-between mb-8">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted group-hover:text-background/60 transition-colors">
                      {String(index + 1).padStart(2, "0")} · {enMap[service.slug]}
                    </span>
                    {service.slug === "tax-bookkeeping" && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.18em] uppercase bg-accent text-accent-foreground px-2.5 py-1">
                        Core Practice
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-2xl md:text-2xl font-black leading-[1.1] tracking-[-0.02em] text-foreground group-hover:text-background transition-colors"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {service.title}
                    <span className="green-dot">.</span>
                  </h3>
                  <p
                    className="mt-6 text-sm leading-[1.7] text-muted group-hover:text-background/70 transition-colors max-w-[38ch]"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {service.description}
                  </p>
                  <span className="mt-10 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-foreground group-hover:text-accent transition-colors">
                    {service.cta}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MID-PAGE CTA ─── */}
      <section className="py-16 md:py-20 bg-foreground text-background border-y border-background/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimateOnScroll variant="fadeUp">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
              <h3
                className="text-[1.6rem] md:text-2xl lg:text-4xl font-black leading-[1.15] tracking-[-0.025em] max-w-[26ch]"
                style={{ wordBreak: "keep-all" }}
              >
                지금 기장 상황부터 점검해 드립니다<span className="green-dot">.</span>
              </h3>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 flex-shrink-0">
                <Link
                  href="/contact"
                  className="group inline-flex items-baseline gap-2 text-base md:text-base text-background border-b-2 border-background hover:border-accent hover:text-accent transition-colors pb-1"
                >
                  무료 진단 요청
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href={siteConfig.pricingUrl}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  ↳ 견적 계산기
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── PRINCIPAL (Founder) ─── */}
      {lead && (
        <section className="py-24 md:py-36 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <p className="eyebrow mb-14 md:mb-20">Principal</p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <AnimateOnScroll variant="fadeUp" className="lg:col-span-5">
                {lead.image ? (
                  <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                    <Image
                      src={lead.image}
                      alt={`${lead.name} ${lead.role}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="aspect-[3/4] bg-card" />
                )}
              </AnimateOnScroll>

              <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-7">
                <h2 className="text-4xl md:text-6xl lg:text-6xl font-black leading-[0.96] tracking-[-0.035em] text-foreground">
                  박민상<span className="green-dot">.</span>
                </h2>
                <p className="mt-4 text-sm font-bold tracking-[0.12em] uppercase text-muted">
                  {lead.role} · KICPA
                </p>

                <div
                  className="mt-12 space-y-6 text-base md:text-base leading-[1.8] text-strong max-w-[58ch]"
                  style={{ wordBreak: "keep-all" }}
                >
                  <p>
                    장부 한 줄을 어떻게 적느냐가 다음 결정의 근거가 됩니다.
                    계정 분류 하나, 증빙 하나도 그 무게로 다룹니다.
                  </p>
                  <p>
                    그래서 장부가 곧 자료입니다.
                    <strong className="font-bold text-foreground"> 대표가 다음 결정을 내릴 때 펼쳐 보는 자료.</strong>
                  </p>
                </div>

                {lead.practiceAreas && (
                  <div className="mt-14 pt-10 border-t border-border">
                    <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted mb-6">Practice areas</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                      {lead.practiceAreas.map((area) => (
                        <li key={area} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                          <span className="green-dot mt-1.5 flex-shrink-0 text-lg">.</span>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href="/about"
                  className="group mt-14 inline-flex items-center gap-3 text-sm font-semibold text-foreground border-b-2 border-foreground hover:border-accent hover:text-accent transition-colors pb-1.5"
                >
                  프로필 전체 보기
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      )}

      {/* ─── INSIGHTS / BLOG ─── */}
      {recentPosts.length > 0 && (
        <section className="py-24 md:py-36 bg-card border-t border-border">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex items-end justify-between gap-8 mb-14 md:mb-20">
              <div>
                <p className="eyebrow mb-8">Our thinking</p>
                <h2
                  className="text-4xl md:text-5xl lg:text-5xl font-black leading-[1.02] tracking-[-0.03em] text-foreground"
                  style={{ wordBreak: "keep-all" }}
                >
                  최근 인사이트
                  <span className="green-dot">.</span>
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden md:inline-flex items-center gap-2 text-sm font-bold tracking-[0.14em] uppercase text-foreground border-b-2 border-foreground hover:border-accent hover:text-accent transition-colors pb-1"
              >
                모든 글 보기 →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border-y border-border">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-background p-8 md:p-10 hover:bg-foreground hover:text-background transition-colors duration-300"
                >
                  {post.coverImage && (
                    <div className="relative aspect-[16/10] overflow-hidden mb-6 -mx-8 md:-mx-10 -mt-8 md:-mt-10">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-bold tracking-[0.18em] uppercase text-accent">
                      {post.category}
                    </span>
                    <span className="text-subtle">·</span>
                    <span className="text-xs text-muted tabular-nums">{post.date}</span>
                  </div>
                  <h3
                    className="text-xl md:text-2xl font-bold leading-[1.25] tracking-[-0.015em] text-foreground group-hover:text-accent transition-colors"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {post.title}
                  </h3>
                  {post.description && (
                    <p
                      className="mt-4 text-sm leading-[1.65] text-muted line-clamp-3"
                      style={{ wordBreak: "keep-all" }}
                    >
                      {post.description}
                    </p>
                  )}
                  <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-foreground group-hover:text-accent transition-colors">
                    자세히 보기
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href="/blog"
              className="mt-10 md:hidden inline-flex items-center gap-2 text-sm font-bold tracking-[0.14em] uppercase text-foreground border-b-2 border-foreground pb-1"
            >
              모든 글 보기 →
            </Link>
          </div>
        </section>
      )}

      {/* ─── CONTACT CTA ─── */}
      <section className="py-28 md:py-44 bg-foreground text-background relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
          <AnimateOnScroll variant="fadeUp">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-background/60 flex items-center gap-3 mb-10">
              <span className="inline-block w-10 h-[3px] bg-accent" />
              Let&rsquo;s connect
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.98] tracking-[-0.035em] max-w-[20ch]"
              style={{ wordBreak: "keep-all" }}
            >
              지금 어떤 결정을
              <br />
              앞두고 계신가요
              <span className="green-dot">.</span>
            </h2>
            <p
              className="mt-10 text-base md:text-[1.25rem] leading-[1.65] text-background/75 max-w-[48ch]"
              style={{ wordBreak: "keep-all" }}
            >
              결정 전에 숫자부터 보십시오. 상황이 구체적일수록 검토는 빨라집니다.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <div className="mt-14 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-5 font-bold text-sm hover:bg-accent-bright transition-colors duration-300"
              >
                문의하기
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href={siteConfig.pricingUrl}
                className="group inline-flex items-center gap-3 border-2 border-background/30 text-background px-10 py-5 font-bold text-sm hover:border-accent hover:text-accent transition-colors duration-300"
              >
                월 기장 견적 계산기
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
