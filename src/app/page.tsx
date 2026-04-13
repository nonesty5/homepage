import Image from "next/image";
import Link from "next/link";
import { services, personas, members } from "@/lib/data";
import { siteConfig, heroImages } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";
import SectionHeading from "@/components/ui/section-heading";
import { AnimateOnScroll, StaggerChildren, staggerItemVariants, LineReveal, ImageReveal, TiltCard } from "@/components/motion";
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

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);
  const lead = members.find((m) => !m.placeholder);

  return (
    <>
      {/* Hero Section */}
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
                Boutique Tax &amp; Advisory · Seoul
              </p>
            </AnimateOnScroll>
            <HeroTextReveal
              text={siteConfig.title}
              className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-[0.04em]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            />
            <div className="mt-6">
              <LineReveal delay={0.4} />
            </div>
            <AnimateOnScroll variant="fadeUp" delay={0.35}>
              <p className="mt-8 text-lg md:text-xl text-neutral-400 leading-relaxed max-w-xl">
                세무 · 가치평가 · M&amp;A를 한 사람이 끝까지 봅니다.
                <br />
                <span className="text-neutral-500" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Stay Focused. Build Your Business.
                </span>
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" delay={0.5}>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <HeroCtaButton href="/contact" variant="primary">
                  이야기 나눠보기
                </HeroCtaButton>
                <HeroCtaButton href="/services" variant="outline">
                  전문 영역 보기
                </HeroCtaButton>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Large decorative text */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block">
            <p className="text-[16rem] font-bold leading-none text-neutral-800/30 tracking-tighter select-none">
              M
            </p>
          </div>
        </div>
      </HeroParallax>

      {/* Services Preview */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <SectionHeading
              label="Practice"
              title="전문 영역"
              subtitle="매달의 기장에서 시작해, 세무 신고, 가치평가, 거래 자문까지 — 끊기지 않는 하나의 흐름으로"
            />
          </AnimateOnScroll>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map((service, index) => (
              <StaggerItem key={service.slug}>
                <TiltCard>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative block p-8 md:p-10 bg-white border-l-2 border-l-transparent hover:border-l-foreground transition-all duration-300"
                  >
                    <ServiceNumber index={index} />
                    <h3 className="mt-4 text-xl font-bold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-4">
                      {service.description}
                    </p>
                    <span className="mt-6 inline-flex items-center text-xs font-medium tracking-wider text-muted group-hover:text-foreground transition-colors duration-300">
                      자세히 보기
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <SectionHeading
              label="Process"
              title="어떻게 시작되나요"
              subtitle="복잡한 절차는 없습니다. 세 단계면 충분합니다."
              align="center"
            />
          </AnimateOnScroll>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mt-16 max-w-4xl mx-auto">
            {[
              {
                num: "01",
                title: "상황을 말씀해 주세요",
                desc: "지금 어떤 상황인지, 어디가 불편한지 편하게 이야기해 주시면 됩니다. 형식은 없습니다.",
              },
              {
                num: "02",
                title: "방향을 제시합니다",
                desc: "도울 수 있는 일인지, 어떤 방식이 맞는지 솔직하게 말씀드립니다. 무리한 제안은 하지 않습니다.",
              },
              {
                num: "03",
                title: "실행합니다",
                desc: "합의된 범위 안에서 끝까지 직접 수행합니다. 진행 상황은 그때그때 공유됩니다.",
              },
            ].map((step) => (
              <StaggerItem key={step.num}>
                <div className="text-center">
                  <span className="text-4xl font-bold tracking-tighter text-neutral-200">
                    {step.num}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Founder */}
      {lead && (
        <section className="py-24 md:py-32 border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Photo */}
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
              {/* Info */}
              <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-7">
                <p className="text-xs tracking-[0.4em] text-muted mb-6 uppercase">
                  Founder
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
                {lead.credentials && lead.credentials.length > 0 && (
                  <div className="mt-10">
                    <p className="text-xs tracking-[0.2em] text-subtle mb-3 uppercase font-medium">
                      자격 · 학력
                    </p>
                    <div className="space-y-2">
                      {lead.credentials.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="w-1 h-1 rounded-full bg-accent mt-2.5 flex-shrink-0" />
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
                    {lead.experience.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-accent mt-2.5 flex-shrink-0" />
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

      {/* Who We Serve */}
      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <SectionHeading
              label="Who We Serve"
              title="누구를 위한 자문인가"
              subtitle="같은 서비스라도 상황에 따라 필요한 깊이가 다릅니다."
            />
          </AnimateOnScroll>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mt-12">
            {personas.map((persona, i) => (
              <StaggerItem key={persona.slug}>
                <Link
                  href="/clients"
                  className="group block bg-white p-10 md:p-12 hover:bg-card transition-colors duration-300"
                >
                  <p className="text-xs tracking-[0.25em] text-subtle uppercase font-medium">
                    {String(i + 1).padStart(2, "0")} · {persona.englishLabel}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight">
                    {persona.title}
                  </h3>
                  <p className="mt-4 text-sm text-muted leading-relaxed line-clamp-4">
                    {persona.description}
                  </p>
                  <span className="mt-8 inline-flex items-center text-xs font-medium tracking-wider text-muted group-hover:text-foreground transition-colors duration-300">
                    자세히 보기
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Recent Insights */}
      {recentPosts.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <AnimateOnScroll>
              <SectionHeading
                label="Insights"
                title="최근 글"
                subtitle="현장에서 마주한 문제를, 풀어낸 방식 그대로 기록합니다"
              />
            </AnimateOnScroll>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <div className="border border-border hover:border-foreground transition-all duration-300 hover-lift">
                      <div className="p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-block px-3 py-1 text-[10px] font-medium tracking-wider bg-card text-muted uppercase">
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

      {/* CTA Section */}
      <AnimateOnScroll variant="fadeIn">
        <section className="py-32 md:py-40 bg-foreground text-white relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold leading-none tracking-tighter select-none">
              M
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <AnimateOnScroll variant="fadeUp">
              <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase">
                Get in Touch
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                고민이 있으시다면,
                <br />
                이야기부터 나눠보세요
              </h2>
              <p className="mt-6 text-neutral-400 text-lg max-w-xl mx-auto leading-relaxed">
                상황을 간단히 말씀해 주시면, 도울 수 있는 일인지 솔직하게 답변드립니다.
              </p>
              <div className="mt-4 mx-auto w-12 h-px bg-neutral-700" />
              <Link
                href="/contact"
                className="group mt-10 inline-flex items-center px-10 py-4 bg-white text-foreground text-sm font-medium tracking-wider transition-all duration-300 hover:bg-neutral-200 hover:tracking-widest"
              >
                문의하기
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
