import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import SectionHeading from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "ABOUT",
  description: `${siteConfig.name} 소개 - 비전과 철학`,
};

const milestones = [
  { year: "2024", text: "사무소 설립" },
  { year: "2020", text: "대형 회계법인 시니어 매니저" },
  { year: "2015", text: "대형 회계법인 입사" },
  { year: "2014", text: "공인회계사 자격 취득" },
  { year: "2012", text: "경영학과 졸업" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm tracking-[0.3em] text-neutral-400 mb-4">
            ABOUT
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            신뢰와 전문성으로
            <br />
            함께 성장합니다
          </h1>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">비전</h2>
              <p className="text-muted leading-relaxed text-lg">
                고객의 사업을 깊이 이해하고, 세무와 감사 분야에서 가장 정확하고
                신뢰할 수 있는 파트너가 되는 것을 목표로 합니다.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">철학</h2>
              <p className="text-muted leading-relaxed text-lg">
                단순한 수치 너머의 가치를 봅니다. 고객의 성장이 곧 우리의
                성장이라는 신념으로, 맞춤형 솔루션을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="연혁" />
          <div className="max-w-2xl mx-auto">
            {milestones.map((item, i) => (
              <div
                key={i}
                className="flex gap-8 py-6 border-b border-border last:border-0"
              >
                <span className="text-lg font-bold w-20 shrink-0">
                  {item.year}
                </span>
                <span className="text-muted text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="오시는 길" />
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-muted mb-2">{siteConfig.address}</p>
            <p className="text-muted">
              Tel. {siteConfig.phone} | Email. {siteConfig.email}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
