import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import SectionHeading from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "ABOUT",
  description: `${siteConfig.name} 소개 - 비전과 철학`,
};

const milestones = [
  { year: "2024", title: "한결회계법인 설립", desc: "강남 파이낸스센터에 본사 설립" },
  { year: "2018", title: "세무법인 경력", desc: "중견 세무법인 파트너 역임" },
  { year: "2013", title: "Big4 회계법인", desc: "삼일회계법인 감사본부 매니저" },
  { year: "2009", title: "Big4 입사", desc: "삼일회계법인 입사" },
  { year: "2008", title: "공인회계사 등록", desc: "제43회 공인회계사 시험 합격" },
];

const coreValues = [
  {
    number: "01",
    title: "정확성",
    description:
      "숫자 하나에도 타협하지 않습니다. 철저한 검증과 정밀한 분석으로 오류 없는 결과를 보장합니다.",
  },
  {
    number: "02",
    title: "신뢰",
    description:
      "고객과의 약속을 지키는 것이 최우선입니다. 투명한 소통과 성실한 업무 수행으로 신뢰를 쌓아갑니다.",
  },
  {
    number: "03",
    title: "전문성",
    description:
      "Big4 회계법인 출신의 깊은 전문 역량으로, 복잡한 문제도 명쾌하게 해결합니다.",
  },
  {
    number: "04",
    title: "고객 중심",
    description:
      "모든 서비스는 고객의 관점에서 시작합니다. 맞춤형 솔루션으로 실질적인 가치를 창출합니다.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-32 md:py-44 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[18rem] font-bold leading-none tracking-tighter select-none">
            ABOUT
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase animate-fade-in">
            About Us
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] animate-fade-in max-w-4xl">
            한결같은 마음으로
            <br />
            한결같은 서비스를
          </h1>
          <div className="mt-8 h-px w-20 bg-neutral-600 animate-line-reveal" />
          <p className="mt-8 text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl animate-fade-in-delay">
            고객의 사업을 깊이 이해하고, 세무와 감사 분야에서 가장 정확하고
            신뢰할 수 있는 파트너가 되는 것을 목표로 합니다.
          </p>
        </div>
      </section>

      {/* Why Us - 3 Key Differentiators */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="Why Us"
            title="왜 한결회계법인인가"
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mt-12">
            <div className="group">
              <p className="text-6xl md:text-7xl font-bold tracking-tighter text-neutral-200 group-hover:text-foreground transition-colors duration-500">
                01
              </p>
              <h3 className="mt-4 text-xl font-bold tracking-tight">
                Big4 출신 전문가
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                삼일회계법인 등 국내 최고 회계법인에서 쌓은 깊이 있는 전문 역량으로
                복잡한 문제를 명쾌하게 풀어냅니다.
              </p>
            </div>
            <div className="group">
              <p className="text-6xl md:text-7xl font-bold tracking-tighter text-neutral-200 group-hover:text-foreground transition-colors duration-500">
                02
              </p>
              <h3 className="mt-4 text-xl font-bold tracking-tight">
                맞춤형 솔루션
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                일률적인 서비스가 아닌, 각 기업의 상황과 목표에 맞춘
                최적의 세무 · 회계 솔루션을 설계합니다.
              </p>
            </div>
            <div className="group">
              <p className="text-6xl md:text-7xl font-bold tracking-tighter text-neutral-200 group-hover:text-foreground transition-colors duration-500">
                03
              </p>
              <h3 className="mt-4 text-xl font-bold tracking-tight">
                장기적 파트너십
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                단기적인 절세가 아닌, 기업의 지속적인 성장을 함께 고민하는
                진정한 비즈니스 파트너입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Our Approach */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] text-muted mb-4 uppercase">
                Our Approach
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                원칙에 기반한
                <br />
                체계적 접근
              </h2>
              <div className="mt-6 h-px w-16 bg-border" />
            </div>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border text-sm font-bold">
                  01
                </div>
                <div>
                  <h4 className="font-bold mb-1">현황 진단</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    고객사의 현재 재무 상태와 비즈니스 환경을 정밀 진단합니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border text-sm font-bold">
                  02
                </div>
                <div>
                  <h4 className="font-bold mb-1">전략 수립</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    진단 결과를 바탕으로 최적의 세무 · 회계 전략을 수립합니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border text-sm font-bold">
                  03
                </div>
                <div>
                  <h4 className="font-bold mb-1">실행 및 관리</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    전략을 실행하고 지속적으로 모니터링하며 관리합니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border text-sm font-bold">
                  04
                </div>
                <div>
                  <h4 className="font-bold mb-1">성과 검증</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    실행 결과를 검증하고 개선점을 도출하여 지속 발전시킵니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Timeline */}
      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="History"
            title="연혁"
            subtitle="대표 공인회계사의 주요 경력사항입니다"
          />
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-0">
              {milestones.map((item, i) => (
                <div
                  key={i}
                  className="relative pl-14 md:pl-20 py-8 group"
                >
                  {/* Dot */}
                  <div className="absolute left-[11px] md:left-[27px] top-10 w-[10px] h-[10px] rounded-full border-2 border-foreground bg-white group-hover:bg-foreground transition-colors duration-300" />
                  <p className="text-xs tracking-[0.2em] text-muted font-medium mb-2">
                    {item.year}
                  </p>
                  <h3 className="text-lg font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="Core Values"
            title="핵심 가치"
            subtitle="우리의 모든 업무를 관통하는 가치입니다"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {coreValues.map((value) => (
              <div
                key={value.number}
                className="bg-white p-10 md:p-12 group hover:bg-card transition-colors duration-300"
              >
                <span className="text-xs font-medium tracking-[0.2em] text-subtle">
                  {value.number}
                </span>
                <h3 className="mt-4 text-xl font-bold tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] text-neutral-500 mb-4 uppercase">
                Location
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                오시는 길
              </h2>
              <div className="mt-6 h-px w-16 bg-neutral-700" />
              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-xs tracking-[0.2em] text-neutral-500 mb-2 uppercase">
                    Address
                  </p>
                  <p className="text-lg text-neutral-300">{siteConfig.address}</p>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] text-neutral-500 mb-2 uppercase">
                    Contact
                  </p>
                  <p className="text-neutral-300">
                    Tel. {siteConfig.phone}
                  </p>
                  <p className="text-neutral-300">
                    Fax. {siteConfig.fax}
                  </p>
                  <p className="text-neutral-300">
                    Email. {siteConfig.email}
                  </p>
                </div>
              </div>
            </div>
            {/* Map placeholder */}
            <div className="aspect-[4/3] bg-neutral-800 border border-neutral-700 flex items-center justify-center">
              <div className="text-center">
                <p className="text-neutral-500 text-sm tracking-wider">
                  강남파이낸스센터
                </p>
                <p className="mt-1 text-neutral-600 text-xs">
                  서울특별시 강남구 테헤란로 152
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
