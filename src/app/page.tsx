import Image from "next/image";
import Link from "next/link";
import { services, members } from "@/lib/data";
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

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);
  const lead = members.find((member) => !member.placeholder);
  const coreServices = services.slice(0, 3);

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
                Tax Advisory
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
                세무 기장부터 자문까지,
                <br />
                한 사람이 이어서 봅니다
              </h1>
            </AnimateOnScroll>
            <div className="mt-6">
              <LineReveal delay={0.35} />
            </div>
            <AnimateOnScroll variant="fadeUp" delay={0.4}>
              <p className="mt-8 text-lg md:text-xl text-neutral-400 leading-relaxed max-w-3xl">
                기장에서 만든 숫자를 신고와 의사결정까지 끊기지 않게 검토합니다.
                <br />
                담당자가 바뀌어 처음부터 다시 설명할 필요가 없습니다.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" delay={0.46}>
              <p className="mt-5 text-sm md:text-base text-neutral-500 leading-relaxed max-w-3xl">
                Big4 출신 공인회계사가 직접 검토하고, 법정 업무는 동성회계법인 명의로 수행됩니다.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" delay={0.56}>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <HeroCtaButton href="/services" variant="primary">
                  서비스 범위 보기
                </HeroCtaButton>
                <HeroCtaButton href="/contact" variant="outline">
                  문의하기
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

      {/* ─── Core Services ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <SectionHeading
              title="기장 · 조정 · 자문"
              subtitle="세 가지 실무를 한 사람이 이어서 봅니다. 기장에서 만든 숫자가 신고와 의사결정까지 그대로 연결됩니다."
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

      {/* ─── Founder ─── */}
      {lead && (
        <section className="py-24 md:py-32 bg-card">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 bg-card border border-border overflow-hidden">
                {lead.image ? (
                  <img
                    src={lead.image}
                    alt={`${lead.name} ${lead.role}`}
                    className="w-full"
                    style={{ aspectRatio: "3/4", objectFit: "cover", objectPosition: "top" }}
                  />
                ) : (
                  <div className="flex items-center justify-center" style={{ aspectRatio: "3/4" }}>
                    <span className="text-[12rem] font-bold text-neutral-200/60 select-none">
                      {lead.name[0]}
                    </span>
                  </div>
                )}
              </div>

              <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:col-span-7">
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
                  href="/about"
                  className="group mt-12 inline-flex items-center text-sm font-medium tracking-wider hover-underline"
                >
                  더 알아보기
                  <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      )}

      {/* ─── Blog ─── */}
      {recentPosts.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <AnimateOnScroll>
              <SectionHeading
                title="최근 글"
                subtitle="실무에서 자주 만나는 세무 · 회계 이슈를 정리합니다."
              />
            </AnimateOnScroll>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="border border-border hover:border-foreground transition-all duration-300 hover-lift">
                      {post.coverImage && (
                        <div className="aspect-[16/9] overflow-hidden border-b border-border">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      )}
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

      {/* ─── Situations ─── */}
      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <SectionHeading
              title="이런 상황이라면 도움이 됩니다"
            />
          </AnimateOnScroll>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mt-12">
            {[
              {
                situation: "신고할 때마다 급하게 맞추고 끝납니다",
                detail: "조정 항목이 뭐였는지, 공제를 왜 안 받았는지 물어보면 답이 없습니다. 검토 기록이 남아야 다음 신고 때 근거가 됩니다.",
              },
              {
                situation: "기장하는 곳과 자문하는 곳이 다릅니다",
                detail: "지분 정리, 승계, 자산 이전을 검토하려면 기장 데이터가 바로 필요한데, 담당이 다르면 숫자 맞추는 데만 시간이 걸립니다.",
              },
              {
                situation: "매출이 커졌는데 세무가 그대로입니다",
                detail: "거래가 늘고 직원이 생기면 기장만으로는 부족합니다. 월별 보고와 조정 검토가 함께 돌아가야 숫자를 믿고 판단할 수 있습니다.",
              },
              {
                situation: "법인을 처음 세웠는데 뭐부터 해야 할지 모릅니다",
                detail: "부가세 · 원천세 일정, 비용 처리 기준, 대표 급여 설계까지 — 초기에 기준을 잡아두면 이후 기장과 신고가 훨씬 수월해집니다.",
              },
            ].map((item, index) => (
              <StaggerItem key={item.situation}>
                <div className="h-full bg-white p-8 md:p-10">
                  <p className="text-xs tracking-[0.24em] text-subtle uppercase font-medium">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 text-lg md:text-xl font-bold tracking-tight leading-snug">
                    {item.situation}
                  </h3>
                  <p className="mt-4 text-sm text-muted leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <AnimateOnScroll variant="fadeIn">
        <section className="py-32 md:py-40 bg-foreground text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold leading-none tracking-tighter select-none">
              M
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <AnimateOnScroll variant="fadeUp">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                현재 상황을 알려주시면
                <br />
                필요한 범위부터 정리합니다
              </h2>
              <p className="mt-6 text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
                매출 규모, 기존 기장 여부, 가장 급한 이슈만 알려주세요.
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
