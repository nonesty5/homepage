import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "SERVICE",
  description: "세무, 감사, 자문 등 전문 회계 서비스를 제공합니다.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm tracking-[0.3em] text-neutral-400 mb-4">
            SERVICE
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            전문 서비스
          </h1>
          <p className="mt-6 text-lg text-neutral-300 max-w-xl">
            고객의 상황에 맞는 최적의 솔루션을 제공합니다.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group p-8 border border-border hover:border-foreground transition-colors"
              >
                <span className="text-3xl">{service.icon}</span>
                <h2 className="mt-4 text-xl font-bold">{service.title}</h2>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6">
                  {service.details.map((detail, i) => (
                    <p key={i} className="text-xs text-muted py-1">
                      &middot; {detail}
                    </p>
                  ))}
                </div>
                <span className="mt-6 inline-block text-xs font-medium tracking-wider text-muted group-hover:text-foreground transition-colors">
                  자세히 보기 →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
