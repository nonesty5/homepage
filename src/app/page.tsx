import Link from "next/link";
import { services, clients, stats } from "@/lib/data";
import { siteConfig } from "@/lib/constants";
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

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-foreground text-white min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-32 w-full">
          <div className="max-w-4xl">
            <p className="text-xs tracking-[0.4em] text-neutral-500 mb-8 animate-fade-in uppercase">
              Certified Public Accountant Firm
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter animate-fade-in">
              {siteConfig.title}
            </h1>
            <div className="mt-6 h-px w-24 bg-neutral-600 animate-line-reveal" />
            <p className="mt-8 text-lg md:text-xl text-neutral-400 leading-relaxed max-w-xl animate-fade-in-delay">
              명확한 숫자, 확실한 신뢰.
              <br />
              세무 · 감사 · 자문 전문 회계법인
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-10 py-4 bg-white text-foreground text-sm font-medium tracking-wider transition-all duration-300 hover:bg-neutral-200 hover:tracking-widest"
              >
                문의하기
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center justify-center px-10 py-4 border border-neutral-700 text-sm font-medium tracking-wider transition-all duration-300 hover:border-white hover:tracking-widest"
              >
                서비스 보기
              </Link>
            </div>
          </div>

          {/* Large decorative text */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block">
            <p className="text-[12rem] font-bold leading-none text-neutral-800/30 tracking-tighter select-none">
              한결
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
                <p className="text-4xl md:text-5xl font-bold tracking-tight number-counter">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted tracking-wide">
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
            label="Service"
            title="전문 서비스"
            subtitle="고객의 상황에 맞는 최적의 솔루션을 제공합니다"
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
                <p className="mt-3 text-sm text-muted leading-relaxed">
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

      {/* Clients Marquee */}
      <section className="py-24 md:py-32 bg-card overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <SectionHeading
            label="Client"
            title="파트너사"
            subtitle="다양한 산업의 기업들과 함께 성장하고 있습니다"
          />
        </div>
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-card to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-card to-transparent z-10" />
          {/* Scrolling row */}
          <div className="flex gap-6 animate-[scroll_30s_linear_infinite]">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex-shrink-0 flex items-center justify-center px-12 py-8 border border-border bg-white min-w-[200px]"
              >
                <span className="text-sm font-medium text-muted whitespace-nowrap">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* Recent Blog */}
      {recentPosts.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              label="Blog"
              title="인사이트"
              subtitle="세무 · 회계 관련 최신 정보와 인사이트를 공유합니다"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post, i) => (
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
            H
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase">
            Get in Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            전문가와 상담하세요
          </h2>
          <p className="mt-6 text-neutral-400 text-lg max-w-xl mx-auto leading-relaxed">
            세무, 감사, 경영자문 등 어떤 분야든
            <br className="hidden md:block" />
            최적의 솔루션을 제안합니다.
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
        </div>
      </section>
    </>
  );
}
