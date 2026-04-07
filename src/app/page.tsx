import Image from "next/image";
import Link from "next/link";
import { services, personas, stats, members } from "@/lib/data";
import { siteConfig, heroImages } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";
import SectionHeading from "@/components/ui/section-heading";

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
      <section className="relative bg-foreground text-white min-h-screen flex items-center overflow-hidden">
        {/* Background image (cityscape) — natural color, slightly desaturated and darkened */}
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
            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/70 pointer-events-none" />
          </>
        )}
        <div className="max-w-7xl mx-auto px-6 py-32 w-full relative z-10">
          <div className="max-w-4xl">
            <p className="text-xs tracking-[0.4em] text-neutral-500 mb-8 animate-fade-in uppercase">
              Boutique Tax &amp; Advisory · Seoul
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter animate-fade-in">
              {siteConfig.title}
            </h1>
            <div className="mt-6 h-0.5 w-24 bg-accent-bright animate-line-reveal" />
            <p className="mt-8 text-lg md:text-xl text-neutral-400 leading-relaxed max-w-xl animate-fade-in-delay">
              세무 기장 · 세무 조정 · 세무 자문부터
              <br />
              기업가치평가 · M&amp;A까지, 가장 가까운 파트너.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-10 py-4 bg-white text-foreground text-sm font-medium tracking-wider transition-all duration-300 hover:bg-neutral-200 hover:tracking-widest"
              >
                무료 상담 신청
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center justify-center px-10 py-4 border border-neutral-700 text-sm font-medium tracking-wider transition-all duration-300 hover:border-white hover:tracking-widest"
              >
                전문 영역 보기
              </Link>
            </div>
          </div>

          {/* Large decorative text */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block">
            <p className="text-[16rem] font-bold leading-none text-neutral-800/30 tracking-tighter select-none">
              M
            </p>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center md:text-left animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <p className="text-3xl md:text-4xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted tracking-wide leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="Practice"
            title="전문 영역"
            subtitle="가치평가 · M&A · IPO · 모델링 · 세무 자문"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative p-8 md:p-10 bg-white border-l-2 border-l-transparent hover:border-l-foreground transition-all duration-300"
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
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      {lead && (
        <section className="py-24 md:py-32 border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Photo */}
              <div className="lg:col-span-5">
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
              </div>
              {/* Info */}
              <div className="lg:col-span-7">
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
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {lead.career.slice(0, 6).map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-sm text-muted leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
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
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Who We Serve */}
      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="Who We Serve"
            title="누구를 위한 자문인가"
            subtitle="모두를 위한 자문은 결국 누구에게도 도움이 되지 않습니다."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mt-12">
            {personas.map((persona, i) => (
              <Link
                key={persona.slug}
                href="/clients"
                className="group bg-white p-10 md:p-12 hover:bg-card transition-colors duration-300"
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
            ))}
          </div>
        </div>
      </section>

      {/* Recent Insights */}
      {recentPosts.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              label="Insights"
              title="최근 인사이트"
              subtitle="회계 · 세무 · 자본시장에 대한 노트를 정기적으로 발행합니다"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
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
              ))}
            </div>
            <div className="mt-14 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium tracking-wider hover-underline"
              >
                모든 글 보기 &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 md:py-40 bg-foreground text-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold leading-none tracking-tighter select-none">
            M
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase">
            Get in Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            첫 30분은 무료입니다
          </h2>
          <p className="mt-6 text-neutral-400 text-lg max-w-xl mx-auto leading-relaxed">
            본인의 상황을 간단히 말씀해 주시면,
            <br className="hidden md:block" />
            저희가 도울 수 있는지 솔직하게 답변드립니다.
          </p>
          <div className="mt-4 mx-auto w-12 h-px bg-neutral-700" />
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center px-10 py-4 bg-white text-foreground text-sm font-medium tracking-wider transition-all duration-300 hover:bg-neutral-200 hover:tracking-widest"
          >
            상담 신청
            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
