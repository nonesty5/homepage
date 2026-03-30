import Link from "next/link";
import { services, clients } from "@/lib/data";
import { getAllPosts } from "@/lib/posts";
import SectionHeading from "@/components/ui/section-heading";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-foreground text-white min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.3em] text-neutral-400 mb-6 animate-fade-in">
              CERTIFIED PUBLIC ACCOUNTANT
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight animate-fade-in">
              사업의 시작부터
              <br />
              기업의 정점까지
            </h1>
            <p className="mt-8 text-lg md:text-xl text-neutral-300 leading-relaxed max-w-xl animate-fade-in-delay">
              세무와 감사의 전문 파트너로서, 정확하고 신뢰할 수 있는 회계
              서비스를 제공합니다.
            </p>
            <div className="mt-10 flex gap-4 animate-fade-in-delay-2">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 bg-white text-foreground text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors"
              >
                문의하기
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-3 border border-neutral-600 text-sm font-medium tracking-wider hover:border-white transition-colors"
              >
                서비스 보기
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
      </section>

      {/* Services Preview */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="SERVICE"
            subtitle="고객의 상황에 맞는 최적의 솔루션을 제공합니다"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group p-8 border border-border hover:border-foreground transition-colors"
              >
                <span className="text-2xl">{service.icon}</span>
                <h3 className="mt-4 text-lg font-bold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {service.description}
                </p>
                <span className="mt-4 inline-block text-xs font-medium tracking-wider text-muted group-hover:text-foreground transition-colors">
                  자세히 보기 →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="CLIENT"
            subtitle="함께 성장하고 있는 파트너사입니다"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clients.map((client) => (
              <div
                key={client.name}
                className="flex items-center justify-center p-8 border border-border bg-white text-sm font-medium text-muted"
              >
                {client.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog */}
      {recentPosts.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              title="BLOG"
              subtitle="세무·회계 관련 최신 정보와 인사이트를 공유합니다"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border border-border hover:border-foreground transition-colors"
                >
                  <div className="p-8">
                    <span className="text-xs font-medium tracking-wider text-muted">
                      {post.category}
                    </span>
                    <h3 className="mt-3 text-lg font-bold leading-snug group-hover:underline">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted line-clamp-2">
                      {post.description}
                    </p>
                    <p className="mt-4 text-xs text-muted">{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="text-sm font-medium tracking-wider hover:underline"
              >
                모든 글 보기 →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            전문가와 상담하세요
          </h2>
          <p className="mt-4 text-neutral-400 text-lg max-w-xl mx-auto">
            세무, 감사, 경영자문 등 어떤 분야든 최적의 솔루션을 제안합니다.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center px-8 py-3 bg-white text-foreground text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors"
          >
            문의하기
          </Link>
        </div>
      </section>
    </>
  );
}
