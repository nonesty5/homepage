import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const currentIndex = services.findIndex((s) => s.slug === slug);
  const service = services[currentIndex];
  if (!service) notFound();

  const num = String(currentIndex + 1).padStart(2, "0");

  // Related services (exclude current, take up to 3)
  const related = services
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="py-32 md:py-44 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute right-12 top-1/2 -translate-y-1/2 text-[14rem] font-bold leading-none tracking-tighter select-none">
            {num}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-10 animate-fade-in">
            <Link href="/" className="hover:text-neutral-300 transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-neutral-300 transition-colors">
              SERVICE
            </Link>
            <span>/</span>
            <span className="text-neutral-300">{service.title}</span>
          </nav>

          <div className="flex items-baseline gap-5 animate-fade-in">
            <span className="text-5xl md:text-7xl font-bold tracking-tighter text-neutral-700">
              {num}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              {service.title}
            </h1>
          </div>
          <div className="mt-6 h-0.5 w-20 bg-accent-bright animate-line-reveal" />
          <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed animate-fade-in-delay">
            {service.description}
          </p>
        </div>
      </section>

      {/* Content + Side Nav */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Side Navigation */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                <p className="text-xs tracking-[0.2em] text-muted mb-4 uppercase font-medium">
                  Services
                </p>
                <nav className="space-y-0 border-l border-border">
                  {services.map((s, i) => {
                    const isActive = s.slug === slug;
                    return (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className={`block pl-5 py-3 text-sm transition-all duration-200 border-l-2 -ml-px ${
                          isActive
                            ? "border-l-foreground text-foreground font-medium"
                            : "border-l-transparent text-muted hover:text-foreground hover:border-l-neutral-300"
                        }`}
                      >
                        <span className="text-xs text-subtle mr-2">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.title}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-20">
              {/* I. Service Details */}
              <div>
                <div className="flex items-baseline gap-4 mb-10">
                  <span className="text-xs tracking-[0.2em] text-subtle uppercase font-medium">
                    I.
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight">
                    서비스 상세
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.details.map((detail, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-5 p-6 md:p-8 border border-border hover:border-foreground transition-colors duration-300 group"
                    >
                      <span className="text-sm font-bold text-subtle group-hover:text-foreground transition-colors flex-shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-base leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* II. Deliverables */}
              {service.deliverables && service.deliverables.length > 0 && (
                <div>
                  <div className="flex items-baseline gap-4 mb-10">
                    <span className="text-xs tracking-[0.2em] text-subtle uppercase font-medium">
                      II.
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight">
                      산출물
                    </h2>
                    <span className="text-xs text-subtle ml-2">
                      Deliverables
                    </span>
                  </div>
                  <div className="border border-border">
                    {service.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-5 p-5 md:p-6 border-b border-border last:border-b-0"
                      >
                        <span className="font-mono text-xs text-subtle mt-1 flex-shrink-0 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-base leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* III. Applicable Scenarios */}
              {service.applicableScenarios &&
                service.applicableScenarios.length > 0 && (
                  <div>
                    <div className="flex items-baseline gap-4 mb-10">
                      <span className="text-xs tracking-[0.2em] text-subtle uppercase font-medium">
                        III.
                      </span>
                      <h2 className="text-2xl font-bold tracking-tight">
                        적용 케이스
                      </h2>
                      <span className="text-xs text-subtle ml-2">
                        Typical Scenarios
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {service.applicableScenarios.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-4 py-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                          <p className="text-base text-muted leading-relaxed">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* IV. Related Regulations */}
              {service.regulations && service.regulations.length > 0 && (
                <div>
                  <div className="flex items-baseline gap-4 mb-10">
                    <span className="text-xs tracking-[0.2em] text-subtle uppercase font-medium">
                      IV.
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight">
                      관련 법령
                    </h2>
                    <span className="text-xs text-subtle ml-2">
                      Related Regulations
                    </span>
                  </div>
                  <div className="bg-card border border-border p-8 md:p-10">
                    <ul className="space-y-3">
                      {service.regulations.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-4 text-sm text-muted leading-relaxed"
                        >
                          <span className="font-mono text-xs text-subtle flex-shrink-0 tabular-nums mt-0.5">
                            §
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 pt-6 border-t border-border text-xs text-subtle leading-relaxed">
                      * 적용되는 법령 · 시행령 · 예규는 케이스에 따라 달라질 수 있습니다.
                      구체 조문 적용은 상담 단계에서 함께 검토합니다.
                    </p>
                  </div>
                </div>
              )}

              {/* CTA Box */}
              <div className="p-10 md:p-12 bg-foreground text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">
                      {service.title} 케이스를 상담하시려면
                    </h3>
                    <p className="mt-2 text-neutral-400 text-sm leading-relaxed">
                      현재 상황과 원하시는 산출물을 간단히 알려주시면, 적용 가능한지 먼저 답변드립니다.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center px-8 py-4 bg-white text-foreground text-sm font-medium tracking-wider transition-all duration-300 hover:bg-neutral-200 flex-shrink-0"
                  >
                    상담 신청
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>

              {/* Related Services */}
              <div>
                <h3 className="text-lg font-bold tracking-tight mb-8">
                  다른 전문 영역
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {related.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group p-6 border border-border hover:border-foreground transition-colors duration-300"
                    >
                      <span className="text-xs font-medium tracking-[0.2em] text-subtle">
                        {String(
                          services.findIndex((sv) => sv.slug === s.slug) + 1
                        ).padStart(2, "0")}
                      </span>
                      <h4 className="mt-3 font-bold">{s.title}</h4>
                      <p className="mt-2 text-xs text-muted line-clamp-2 leading-relaxed">
                        {s.description}
                      </p>
                      <span className="mt-4 inline-flex items-center text-xs text-muted group-hover:text-foreground transition-colors">
                        보기 &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
