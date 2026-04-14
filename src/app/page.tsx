import Image from "next/image";
import Link from "next/link";
import { services, personas, members } from "@/lib/data";
import { siteConfig, heroImages } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";
import SectionHeading from "@/components/ui/section-heading";
import { AnimateOnScroll, StaggerChildren, LineReveal, ImageReveal, TiltCard } from "@/components/motion";
import HeroTextReveal from "@/components/home/hero-text-reveal";
import HeroParallax from "@/components/home/hero-parallax";
import HeroCtaButton from "@/components/home/hero-cta-button";
import { StaggerItem } from "@/components/motion/stagger-item";

function ServiceNumber({ index }: { index: number }) {
  return (
    <span className="text-xs font-medium tracking-[0.2em] text-muted">
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

const bottlenecks = [
  {
    title: "결산 일정이 계속 밀립니다",
    description:
      "자료 요청 방식과 계정 기준이 없으면 월 숫자가 늦어지고, 신고 직전 수정이 반복됩니다.",
  },
  {
    title: "기장 누락과 계정 오분류가 쌓입니다",
    description:
      "거래는 늘어나는데 정리 기준이 없으면 장부 신뢰가 떨어지고, 숫자를 의사결정에 바로 쓰기 어려워집니다.",
  },
  {
    title: "신고 직전에 쟁점이 한꺼번에 드러납니다",
    description:
      "세무조정 포인트를 늦게 찾으면 공제 · 감면 검토와 소명 근거가 모두 약해집니다.",
  },
  {
    title: "중요한 결정을 숫자로 비교하지 못합니다",
    description:
      "지분 이동, 승계, 자산 이전은 실행 전에 세부담과 순서를 표로 비교해야 판단이 빨라집니다.",
  },
];

const resultAssets = [
  {
    label: "01",
    title: "월별 재무 보고 체계",
    description:
      "매월 어떤 자료를 언제 받고 무엇을 확인할지 정리해, 결산과 신고가 미뤄지지 않도록 만듭니다.",
    items: ["시산표 · 재무제표", "마감 일정표", "계정 처리 기준 메모"],
  },
  {
    label: "02",
    title: "세무조정 검토 메모",
    description:
      "조정 항목, 공제 · 감면 적용 여부, 제출 기준을 문서로 남겨 신고 직전의 불확실성을 줄입니다.",
    items: ["주요 조정 항목 정리", "공제 · 감면 검토표", "전기 대비 차이 분석 메모"],
  },
  {
    label: "03",
    title: "의사결정 비교표",
    description:
      "안별 세부담과 실행 순서를 표로 비교해 대표가 선택하고 바로 움직일 수 있게 정리합니다.",
    items: ["시나리오별 세부담 비교", "권고안", "후속 실행 체크리스트"],
  },
];

const processSteps = [
  {
    num: "01",
    label: "Diagnosis",
    title: "병목을 먼저 정리합니다",
    desc: "현재 장부 상태, 신고 일정, 자료 흐름을 확인해 어디서 시간과 리스크가 새는지 찾습니다.",
    note: "결과물: 병목 목록, 일정 리스크, 우선순위 메모",
  },
  {
    num: "02",
    label: "Setup",
    title: "운영 기준을 세웁니다",
    desc: "자료 요청 루틴, 계정 처리 기준, 월별 보고 포맷을 정해 대표가 매번 다시 설명하지 않게 만듭니다.",
    note: "결과물: 자료 요청 리스트, 마감 일정표, 보고 체계",
  },
  {
    num: "03",
    label: "Operate",
    title: "기장 · 조정 · 자문을 같은 흐름으로 운영합니다",
    desc: "월 기장에서 만든 숫자를 신고와 주요 의사결정까지 이어서 검토합니다.",
    note: "결과물: 신고 검토 메모, 비교표, 실행 체크리스트",
  },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);
  const lead = members.find((member) => !member.placeholder);
  const coreServices = services.slice(0, 3);
  const serviceTitleBySlug = new Map(services.map((service) => [service.slug, service.title]));

  return (
    <>
      <HeroParallax
        backgroundContent={
          <>
            {heroImages.home && (
              <>
                <Image
                  src={heroImages.home}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center animate-ken-burns-right"
                  style={{ filter: "saturate(0.55) brightness(0.65) contrast(1.05)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/70 pointer-events-none" />
              </>
            )}
          </>
        }
      >
        <div className="max-w-7xl mx-auto px-6 py-32 w-full">
          <div className="max-w-4xl">
            <AnimateOnScroll variant="fadeIn" delay={0}>
              <p className="text-xs tracking-[0.4em] text-neutral-500 mb-8 uppercase">
                Representative Tax Operating System
              </p>
            </AnimateOnScroll>
            <HeroTextReveal
              as="div"
              text={siteConfig.title}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-none tracking-[0.18em] text-neutral-300"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            />
            <AnimateOnScroll variant="fadeUp" delay={0.18}>
              <h1 className="mt-8 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight max-w-4xl">
                결산 지연, 기장 누락,
                <br />
                세무 리스크를 줄이는 세무 운영 체계
              </h1>
            </AnimateOnScroll>
            <div className="mt-6">
              <LineReveal delay={0.35} />
            </div>
            <AnimateOnScroll variant="fadeUp" delay={0.4}>
              <p className="mt-8 text-lg md:text-xl text-neutral-400 leading-relaxed max-w-3xl">
                월 기장, 세무조정, 주요 세무 의사결정을 같은 데이터로 관리합니다.
                <br />
                대표는 매번 다른 사람에게 다시 설명하지 않고, 바로 확인하고 결정할 수 있습니다.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" delay={0.46}>
              <p className="mt-5 text-sm md:text-base text-neutral-500 leading-relaxed max-w-3xl">
                Big4 출신 공인회계사가 직접 검토하고, 법정 업무는 동성회계법인 명의로 정식 수행됩니다.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" delay={0.5}>
              <div className="mt-8 flex flex-wrap gap-2">
                {["세무 기장", "세무 조정", "세무 자문"].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.18em] text-neutral-300 uppercase"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" delay={0.56}>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <HeroCtaButton href="/contact" variant="primary">
                  현재 병목 진단받기
                </HeroCtaButton>
                <HeroCtaButton href="/services" variant="outline">
                  핵심 서비스 보기
                </HeroCtaButton>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block">
            <p className="text-[16rem] font-bold leading-none text-neutral-800/30 tracking-tighter select-none">
              M
            </p>
          </div>
        </div>
      </HeroParallax>

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <SectionHeading
              label="Bottlenecks"
              title="이런 순간에 세무 운영이 흔들립니다"
              subtitle="대표가 자주 겪는 문제는 대부분 기준 부재, 마감 지연, 비교표 부재로 정리됩니다."
            />
          </AnimateOnScroll>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-border">
            {bottlenecks.map((item, index) => (
              <StaggerItem key={item.title}>
                <div className="h-full bg-white p-8 md:p-10">
                  <p className="text-xs tracking-[0.24em] text-subtle uppercase font-medium">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 text-xl font-bold tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <SectionHeading
              label="Core Practice"
              title="병목은 세 가지 실무 축으로 정리됩니다"
              subtitle="메리디안의 중심은 세무 기장 · 세무 조정 · 세무 자문입니다. 기장에서 만든 숫자를 신고와 의사결정까지 같은 데이터로 이어갑니다."
            />
          </AnimateOnScroll>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {coreServices.map((service, index) => (
              <StaggerItem key={service.slug}>
                <TiltCard>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative block h-full p-8 md:p-10 bg-white border-l-2 border-l-transparent hover:border-l-foreground transition-all duration-300"
                  >
                    <ServiceNumber index={index} />
                    <h3 className="mt-4 text-xl font-bold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-[10px] tracking-[0.24em] text-subtle uppercase font-medium">
                        대표가 받는 결과물
                      </p>
                      <div className="mt-4 space-y-2">
                        {service.deliverables.slice(0, 2).map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <span className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                            <p className="text-sm text-muted leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className="mt-6 inline-flex items-center text-xs font-medium tracking-wider text-muted group-hover:text-foreground transition-colors duration-300">
                      {service.cta}
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <div className="mt-10 flex justify-center">
              <Link
                href="/services"
                className="inline-flex items-center text-sm font-medium tracking-wider hover-underline"
              >
                가치평가 · 거래 자문까지 전체 보기
                <span className="ml-2">&rarr;</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <SectionHeading
              label="Deliverables"
              title="대표가 실제로 받는 결과물"
              subtitle="설명만 남는 자문보다 문서와 표로 남는 결과물이 중요합니다. 메리디안은 핵심 의사결정에 바로 쓰이는 산출물을 만듭니다."
            />
          </AnimateOnScroll>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resultAssets.map((asset) => (
              <StaggerItem key={asset.label}>
                <div className="h-full border border-border bg-white p-8 md:p-10">
                  <p className="text-xs tracking-[0.24em] text-subtle uppercase font-medium">
                    {asset.label}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight">
                    {asset.title}
                  </h3>
                  <p className="mt-4 text-sm text-muted leading-relaxed">
                    {asset.description}
                  </p>
                  <div className="mt-8 pt-6 border-t border-border space-y-3">
                    {asset.items.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                        <p className="text-sm text-muted leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <SectionHeading
              label="Process"
              title="문의 후에는 이 순서로 정리합니다"
              subtitle="처음부터 모든 자료가 완벽할 필요는 없습니다. 현재 병목과 원하는 결과물부터 확인합니다."
              align="center"
            />
          </AnimateOnScroll>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mt-16">
            {processSteps.map((step) => (
              <StaggerItem key={step.num}>
                <div className="h-full bg-white p-8 md:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-4xl font-bold tracking-tighter text-neutral-200">
                      {step.num}
                    </span>
                    <span className="text-[10px] tracking-[0.28em] text-subtle uppercase font-medium">
                      {step.label}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm text-muted leading-relaxed">
                    {step.desc}
                  </p>
                  <p className="mt-6 pt-6 border-t border-border text-sm text-strong leading-relaxed">
                    {step.note}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <div className="mt-10 max-w-3xl mx-auto text-center">
              <p className="text-sm md:text-base text-muted leading-relaxed">
                처음은 세무 기장 하나로 시작해도 됩니다. 필요한 시점에 세무조정과 세무 자문이 같은
                데이터 위에서 이어지도록 설계합니다.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {lead && (
        <section className="py-24 md:py-32 bg-card">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <ImageReveal className="lg:col-span-5" direction="up">
                <div className="relative aspect-[3/4] bg-card border border-border overflow-hidden">
                  {lead.image ? (
                    <Image
                      src={lead.image}
                      alt={`${lead.name} ${lead.role}`}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[12rem] font-bold text-neutral-200/60 select-none">
                        {lead.name[0]}
                      </span>
                    </div>
                  )}
                </div>
              </ImageReveal>

              <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-7">
                <p className="text-xs tracking-[0.4em] text-muted mb-6 uppercase">
                  Who Reviews It
                </p>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05]">
                  {lead.name}
                </h2>
                <p className="mt-3 text-sm tracking-[0.15em] text-muted uppercase">
                  {lead.role}
                </p>
                <div className="mt-8 h-px w-16 bg-accent" />
                <p className="mt-8 text-base md:text-lg text-muted leading-relaxed max-w-2xl">
                  {lead.description}
                </p>
                <p className="mt-5 text-sm md:text-base text-strong leading-relaxed max-w-2xl">
                  핵심은 월별 숫자, 신고 검토, 의사결정 자료를 같은 사람이 이어서 본다는 점입니다.
                </p>
                {lead.credentials && lead.credentials.length > 0 && (
                  <div className="mt-10">
                    <p className="text-xs tracking-[0.2em] text-subtle mb-3 uppercase font-medium">
                      자격 · 학력
                    </p>
                    <div className="space-y-2">
                      {lead.credentials.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <span className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                          <p className="text-sm text-muted leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-8">
                  <p className="text-xs tracking-[0.2em] text-subtle mb-3 uppercase font-medium">
                    경력
                  </p>
                  <div className="space-y-2">
                    {lead.experience.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                        <p className="text-sm text-muted leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  href="/members"
                  className="group mt-12 inline-flex items-center text-sm font-medium tracking-wider hover-underline"
                >
                  전체 프로필 보기
                  <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <SectionHeading
              label="Lifecycle"
              title="대표의 단계가 달라도 운영 체계는 끊기지 않아야 합니다"
              subtitle="설립 직후에는 기준을 세우고, 성장기에는 보고 체계를 만들고, 큰 결정을 앞두면 비교표와 권고안을 받습니다."
            />
          </AnimateOnScroll>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mt-12">
            {personas.map((persona, index) => {
              const fitTitles = persona.fitServices.flatMap((slug) => {
                const title = serviceTitleBySlug.get(slug);
                return title ? [title] : [];
              });

              return (
                <StaggerItem key={persona.slug}>
                  <div className="h-full bg-white p-10 md:p-12">
                    <p className="text-xs tracking-[0.25em] text-subtle uppercase font-medium">
                      {String(index + 1).padStart(2, "0")} · {persona.englishLabel}
                    </p>
                    <h3 className="mt-4 text-2xl font-bold tracking-tight">
                      {persona.title}
                    </h3>
                    <p className="mt-4 text-sm text-muted leading-relaxed">
                      {persona.description}
                    </p>
                    <div className="mt-8 pt-6 border-t border-border">
                      <p className="text-xs tracking-[0.2em] text-subtle uppercase font-medium mb-4">
                        현재 병목
                      </p>
                      <div className="space-y-2">
                        {persona.bottlenecks.map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <span className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                            <p className="text-sm text-muted leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-border">
                      <p className="text-xs tracking-[0.2em] text-subtle uppercase font-medium mb-4">
                        먼저 받는 결과물
                      </p>
                      <div className="space-y-2">
                        {persona.outputs.map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <span className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                            <p className="text-sm text-muted leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {fitTitles.map((title) => (
                        <span
                          key={`${persona.slug}-${title}`}
                          className="inline-flex items-center px-3 py-1.5 text-xs border border-border text-subtle"
                        >
                          {title}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
          <AnimateOnScroll variant="fadeUp" delay={0.15}>
            <div className="mt-10 text-center">
              <p className="text-sm md:text-base text-muted leading-relaxed max-w-3xl mx-auto">
                지금 어느 단계에 있든 시작은 같습니다. 현재 병목과 원하는 결과물만 말씀해 주시면
                어디서부터 기장, 조정, 자문을 연결해야 하는지 먼저 정리합니다.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center mt-8 text-sm font-medium tracking-wider hover-underline"
              >
                내 상황 진단받기
                <span className="ml-2">&rarr;</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section className="py-24 md:py-32 bg-card">
          <div className="max-w-7xl mx-auto px-6">
            <AnimateOnScroll>
              <SectionHeading
                label="Insights"
                title="최근 글"
                subtitle="현장에서 반복되는 병목과 해결 방식을 기록합니다"
              />
            </AnimateOnScroll>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="border border-border hover:border-foreground transition-all duration-300 hover-lift">
                      <div className="p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-block px-3 py-1 text-[10px] font-medium tracking-wider bg-white text-muted uppercase">
                            {post.category}
                          </span>
                          <span className="text-xs text-subtle">{post.date}</span>
                        </div>
                        <h3 className="text-lg font-bold leading-snug tracking-tight group-hover:underline decoration-1 underline-offset-4">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-sm text-muted line-clamp-2 leading-relaxed">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
            <AnimateOnScroll variant="fadeIn" delay={0.2}>
              <div className="mt-14 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-sm font-medium tracking-wider hover-underline"
                >
                  모든 글 보기 &rarr;
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      <AnimateOnScroll variant="fadeIn">
        <section className="py-32 md:py-40 bg-foreground text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold leading-none tracking-tighter select-none">
              M
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <AnimateOnScroll variant="fadeUp">
              <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase">
                Contact
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                현재 병목과 원하는 결과물을
                <br />
                먼저 보내주세요
              </h2>
              <p className="mt-6 text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
                매출 규모, 기존 기장 여부, 가장 급한 이슈만 알려주시면 적용 범위와 다음 단계부터
                정리합니다.
              </p>
              <div className="mt-4 mx-auto w-12 h-px bg-neutral-700" />
              <Link
                href="/contact"
                className="group mt-10 inline-flex items-center px-10 py-4 bg-white text-foreground text-sm font-medium tracking-wider transition-all duration-300 hover:bg-neutral-200 hover:tracking-widest"
              >
                현재 상황 보내기
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </AnimateOnScroll>
          </div>
        </section>
      </AnimateOnScroll>
    </>
  );
}
