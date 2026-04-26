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
          <p className="pb-10 md:pb-14 text-[0.78rem] font-bold tracking-[0.18em] uppercase text-background/50">
            Meridian Advisory <span className="mx-2 text-background/25">·</span> 세무기장 <span className="mx-2 text-background/25">·</span> 자문
          </p>

          {/* Hero headline */}
          <AnimateOnScroll variant="fadeUp">
            <h1
              className="text-[2.8rem] sm:text-[3.8rem] md:text-[5.2rem] lg:text-[6.4rem] font-black leading-[1.02] tracking-[-0.03em] text-background max-w-[18ch]"
              style={{ wordBreak: "keep-all" }}
            >
              흩어진 숫자를,
              <br />
              하나의 <span className="text-accent">결정</span>으로
              <span className="green-dot">.</span>
            </h1>
            <p className="mt-8 text-[1.05rem] md:text-[1.2rem] leading-[1.7] text-background/70 max-w-[52ch]" style={{ wordBreak: "keep-all" }}>
              정밀한 장부 위에서만, 신고와 자문이 제 힘을 냅니다.
            </p>
          </AnimateOnScroll>

          {/* Main grid: left CTA / right live calendar */}
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-20">
            {/* LEFT — document image + CTA */}
            <AnimateOnScroll variant="fadeUp" delay={0.15} className="md:col-span-7">
              <figure className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/hero-document.png"
                  alt="세무신고 검토 자료"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </figure>
              {/* Single CTA + sidecar link */}
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-baseline gap-2 text-[1.1rem] text-background border-b-2 border-background hover:border-accent hover:text-accent transition-colors pb-0.5"
                >
                  기장 이관 상담하기
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/services"
                  className="text-[0.95rem] text-background/50 hover:text-background transition-colors"
                >
                  ↳ 서비스 전체 보기
                </Link>
              </div>
            </AnimateOnScroll>

            {/* RIGHT — Live tax deadline calendar */}
            <AnimateOnScroll variant="fadeUp" delay={0.28} className="md:col-span-5 md:pl-10 md:border-l border-background/15">
              <div className="flex items-baseline justify-between mb-8">
                <p className="text-[0.74rem] font-bold tracking-[0.18em] uppercase text-background">
                  이번 분기 주요 일정
                </p>
                <p className="text-[0.72rem] tracking-[0.14em] uppercase text-background/35 tabular-nums">
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
                        <span className="text-[1rem] md:text-[1.05rem] text-background leading-tight" style={{ wordBreak: "keep-all" }}>
                          {d.label}
                        </span>
                        <span className={`text-[0.78rem] font-bold tabular-nums tracking-wide ${urgent ? "text-accent" : "text-background/45"}`}>
                          D-{daysAway}
                        </span>
                      </div>
                      <span className="text-[0.8rem] text-background/35 tabular-nums">{dateText}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 text-[0.72rem] leading-[1.65] text-background/35">
                국세청 기준 주요 신고·납부 기한. 담당 법인의 신고 의무 및 마감일은 실제와 상이할 수 있습니다.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── WHY MERIDIAN — 4가지 원칙 ─── */}
      <section className="py-24 md:py-36 bg-background border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-7">
              <p className="eyebrow mb-8">Why Meridian</p>
              <h2
                className="text-[2.4rem] md:text-[3.6rem] lg:text-[4.4rem] font-black leading-[1] tracking-[-0.03em] text-foreground max-w-[16ch]"
                style={{ wordBreak: "keep-all" }}
              >
                한 사람의 시각이
                <br />
                만드는 차이<span className="green-dot">.</span>
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-5 lg:pt-6">
              <p
                className="text-[1.05rem] md:text-[1.15rem] leading-[1.85] text-muted"
                style={{ wordBreak: "keep-all" }}
              >
                대형 법인이 줄 수 없는 깊이, 1인 사무소가 가질 수 없는 시각.
                메리디안은 그 사이에서 일합니다.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {[
              {
                num: "01",
                title: "시각의 깊이",
                body: "외부감사·M&A 딜 구조 설계 9년. 같은 장부에서 의사결정의 양면을 동시에 봅니다.",
              },
              {
                num: "02",
                title: "직접 책임",
                body: "어시스턴트가 작성하고 회계사가 서명하는 방식이 아닙니다. 한 사람이 끝까지.",
              },
              {
                num: "03",
                title: "구조로 마찰을",
                body: "자동화할 수 있는 건 자동화합니다. 회계사가 직접 코딩해 마찰을 걷어냅니다.",
              },
              {
                num: "04",
                title: "한 사람 단위",
                body: "광고비와 마케팅 인력에 쓸 비용을, 본업의 작업 시간에 씁니다.",
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
                  className="mt-5 text-sm md:text-[0.95rem] text-strong leading-[1.75]"
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
                className="text-[2.4rem] md:text-[3.6rem] lg:text-[4.4rem] font-black leading-[1] tracking-[-0.03em] text-foreground max-w-[14ch]"
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
                className="text-[1.05rem] md:text-[1.1rem] leading-[1.7] text-muted max-w-[40ch]"
                style={{ wordBreak: "keep-all" }}
              >
                모든 의사결정의 기준은 세무기장에서 시작합니다. 정확한 장부에서 출발해야 신고 · 조정 · 자문 · 가치평가의 결과가 신뢰할 수 있습니다.
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
                    <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-muted group-hover:text-background/60 transition-colors">
                      {String(index + 1).padStart(2, "0")} — {enMap[service.slug]}
                    </span>
                    {service.slug === "tax-bookkeeping" && (
                      <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.18em] uppercase bg-accent text-accent-foreground px-2.5 py-1">
                        Core Practice
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-[1.7rem] md:text-[2rem] font-black leading-[1.1] tracking-[-0.02em] text-foreground group-hover:text-background transition-colors"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {service.title}
                    <span className="green-dot">.</span>
                  </h3>
                  <p
                    className="mt-6 text-[0.95rem] leading-[1.7] text-muted group-hover:text-background/70 transition-colors max-w-[38ch]"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {service.description}
                  </p>
                  <span className="mt-10 inline-flex items-center gap-2 text-[0.8rem] font-bold tracking-[0.14em] uppercase text-foreground group-hover:text-accent transition-colors">
                    {service.cta}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="py-24 md:py-36 bg-background border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-24">
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-7">
              <p className="eyebrow mb-8">Our Team</p>
              <h2
                className="text-[2.4rem] md:text-[3.6rem] lg:text-[4.4rem] font-black leading-[1] tracking-[-0.03em] text-foreground"
                style={{ wordBreak: "keep-all" }}
              >
                팀으로 움직입니다
                <span className="green-dot">.</span>
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-5 lg:pt-6">
              <p
                className="text-[1.05rem] md:text-[1.1rem] leading-[1.7] text-muted"
                style={{ wordBreak: "keep-all" }}
              >
                기장 담당자와 자문 회계사가 한 팀 안에 있습니다. 숫자가 만들어지는 자리와 판단이 내려지는 자리가 같은 기준으로 연결됩니다.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {/* 박민상 */}
            <AnimateOnScroll variant="fadeUp" className="bg-background p-10 md:p-12">
              <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-muted mb-6">
                Founder · CPA
              </p>
              <h3 className="text-[2rem] md:text-[2.4rem] font-black leading-[1.05] tracking-[-0.025em] text-foreground">
                박민상<span className="green-dot">.</span>
              </h3>
              <p
                className="mt-5 text-[0.95rem] leading-[1.75] text-muted max-w-[36ch]"
                style={{ wordBreak: "keep-all" }}
              >
                Big4 감사·세무·가치평가 기준을 기장에 그대로 적용합니다. 대표님의 다음 결정을 위한 장부를 만듭니다.
              </p>
              <ul className="mt-8 space-y-2.5">
                {["세무 기장 · 신고", "세무 조정 · 자문", "기업가치평가 · M&A · IPO"].map((area) => (
                  <li key={area} className="flex items-start gap-3 text-[0.9rem] text-foreground leading-relaxed">
                    <span className="green-dot mt-0.5 flex-shrink-0 text-[1.1rem]">.</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>

            {/* Ledger */}
            <AnimateOnScroll variant="fadeUp" delay={0.1} className="bg-card p-10 md:p-12">
              <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-muted mb-6">
                세무기장 전담
              </p>
              <h3 className="text-[2rem] md:text-[2.4rem] font-black leading-[1.05] tracking-[-0.025em] text-foreground">
                Ledger<span className="green-dot">.</span>
              </h3>
              <p
                className="mt-5 text-[0.95rem] leading-[1.75] text-muted max-w-[36ch]"
                style={{ wordBreak: "keep-all" }}
              >
                실무 기장을 전담합니다. 자료 수집부터 장부 마감, 신고 일정 운영까지 빠짐없이 챙깁니다.
              </p>
              <ul className="mt-8 space-y-2.5">
                {["법인·개인사업자 월별 기장", "부가세·원천세 신고 운영", "증빙 점검 · 장부 마감"].map((area) => (
                  <li key={area} className="flex items-start gap-3 text-[0.9rem] text-foreground leading-relaxed">
                    <span className="green-dot mt-0.5 flex-shrink-0 text-[1.1rem]">.</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll variant="fadeUp" delay={0.1}>
            <div className="mt-10">
              <Link
                href="/members"
                className="group inline-flex items-center gap-2 text-[0.85rem] font-bold tracking-[0.14em] uppercase text-foreground border-b-2 border-foreground hover:border-accent hover:text-accent transition-colors pb-1"
              >
                팀 전체 보기
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
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
                <h2 className="text-[3rem] md:text-[4.8rem] lg:text-[5.6rem] font-black leading-[0.96] tracking-[-0.035em] text-foreground">
                  박민상<span className="green-dot">.</span>
                </h2>
                <p className="mt-4 text-[0.95rem] font-bold tracking-[0.12em] uppercase text-muted">
                  {lead.role} · KICPA 2017
                </p>

                <div
                  className="mt-12 space-y-6 text-[1.05rem] md:text-[1.1rem] leading-[1.8] text-strong max-w-[58ch]"
                  style={{ wordBreak: "keep-all" }}
                >
                  <p>
                    삼정과 EY한영에서 감사·세무조정·가치평가의 검토 기준을 익혔습니다. 그 기준을 세무기장에 그대로 적용합니다.
                  </p>
                  <p>
                    대부분의 세무기장이 <span className="text-muted">&lsquo;작업&rsquo;</span>으로 처리될 때, 메리디안은 <strong className="font-bold text-foreground">&lsquo;검토&rsquo;</strong>로 다룹니다. 계정 분류 하나, 증빙 하나도 그 다음 신고·자문·의사결정에 어떻게 연결될지를 먼저 생각합니다.
                  </p>
                  <p>
                    그래서 메리디안의 장부는 단순한 기록이 아닙니다. <strong className="font-bold text-foreground">대표님의 다음 결정을 위한 재료</strong>입니다.
                  </p>
                </div>

                {lead.practiceAreas && (
                  <div className="mt-14 pt-10 border-t border-border">
                    <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted mb-6">Practice areas</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                      {lead.practiceAreas.map((area) => (
                        <li key={area} className="flex items-start gap-3 text-[0.95rem] text-foreground leading-relaxed">
                          <span className="green-dot mt-1.5 flex-shrink-0 text-[1.2rem]">.</span>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href="/about"
                  className="group mt-14 inline-flex items-center gap-3 text-[0.95rem] font-semibold text-foreground border-b-2 border-foreground hover:border-accent hover:text-accent transition-colors pb-1.5"
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
        <section className="py-24 md:py-36 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex items-end justify-between gap-8 mb-14 md:mb-20">
              <div>
                <p className="eyebrow mb-8">Our thinking</p>
                <h2
                  className="text-[2.2rem] md:text-[3.4rem] lg:text-[4rem] font-black leading-[1.02] tracking-[-0.03em] text-foreground"
                  style={{ wordBreak: "keep-all" }}
                >
                  최근 인사이트
                  <span className="green-dot">.</span>
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden md:inline-flex items-center gap-2 text-[0.85rem] font-bold tracking-[0.14em] uppercase text-foreground border-b-2 border-foreground hover:border-accent hover:text-accent transition-colors pb-1"
              >
                모든 글 보기 →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border-y border-border">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-background p-8 md:p-10 hover:bg-card transition-colors duration-300"
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
                    <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-accent">
                      {post.category}
                    </span>
                    <span className="text-subtle">·</span>
                    <span className="text-[0.8rem] text-muted tabular-nums">{post.date}</span>
                  </div>
                  <h3
                    className="text-[1.4rem] md:text-[1.55rem] font-bold leading-[1.25] tracking-[-0.015em] text-foreground group-hover:text-accent transition-colors"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {post.title}
                  </h3>
                  {post.description && (
                    <p
                      className="mt-4 text-[0.95rem] leading-[1.65] text-muted line-clamp-3"
                      style={{ wordBreak: "keep-all" }}
                    >
                      {post.description}
                    </p>
                  )}
                  <span className="mt-8 inline-flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.14em] uppercase text-foreground group-hover:text-accent transition-colors">
                    자세히 보기
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href="/blog"
              className="mt-10 md:hidden inline-flex items-center gap-2 text-[0.85rem] font-bold tracking-[0.14em] uppercase text-foreground border-b-2 border-foreground pb-1"
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
            <p className="text-[0.75rem] font-bold tracking-[0.18em] uppercase text-background/60 flex items-center gap-3 mb-10">
              <span className="inline-block w-10 h-[3px] bg-accent" />
              Let&rsquo;s connect
            </p>
            <h2
              className="text-[2.6rem] md:text-[4.4rem] lg:text-[5.6rem] font-black leading-[0.98] tracking-[-0.035em] max-w-[20ch]"
              style={{ wordBreak: "keep-all" }}
            >
              지금 어떤 결정을
              <br />
              앞두고 계신가요
              <span className="green-dot">.</span>
            </h2>
            <p
              className="mt-10 text-[1.1rem] md:text-[1.25rem] leading-[1.65] text-background/75 max-w-[48ch]"
              style={{ wordBreak: "keep-all" }}
            >
              결정 전에 숫자를 먼저 확인하십시오. 구체적인 상황일수록 빠르게 검토합니다.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <div className="mt-14 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-5 font-bold text-[0.95rem] hover:bg-accent-bright transition-colors duration-300"
              >
                문의하기
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href={siteConfig.pricingUrl}
                className="group inline-flex items-center gap-3 border-2 border-background/30 text-background px-10 py-5 font-bold text-[0.95rem] hover:border-accent hover:text-accent transition-colors duration-300"
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
