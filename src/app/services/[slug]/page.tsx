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
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/services"
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            ← 서비스 목록
          </Link>
          <div className="mt-8">
            <span className="text-4xl">{service.icon}</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
              {service.title}
            </h1>
            <p className="mt-6 text-lg text-neutral-300 max-w-xl">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">서비스 상세</h2>
          <div className="space-y-4">
            {service.details.map((detail, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 border border-border"
              >
                <span className="text-lg font-bold text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg">{detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-card border border-border text-center">
            <h3 className="text-xl font-bold mb-4">상담이 필요하신가요?</h3>
            <p className="text-muted mb-6">
              {service.title}에 대한 전문 상담을 받아보세요.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-foreground text-white text-sm font-medium tracking-wider hover:bg-neutral-800 transition-colors"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
