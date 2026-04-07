import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig, heroImages } from "@/lib/constants";
import SectionHeading from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "ABOUT",
  description: `${siteConfig.name} 소개 — 시작과 철학, 그리고 함께하는 사람.`,
};

const milestones = [
  {
    year: "2026",
    title: "메리디안 어드바이저리 시작",
    desc: "스타트업 · 사업가 · 자산가를 위한 부티크 자문 브랜드 출범",
  },
  {
    year: "2025",
    title: "동성회계법인",
    desc: "공인회계사 · 자문 (2025.10 ~ )",
  },
  {
    year: "2023",
    title: "한영회계법인 VME",
    desc: "Valuation, Modeling & Economics Services 본부 (2023.09 ~ 2025.09)",
  },
  {
    year: "2021",
    title: "NH투자증권 IB",
    desc: "IB1사업부 Heavy Industry부 (2021.11 ~ 2023.08)",
  },
  {
    year: "2017",
    title: "삼정회계법인",
    desc: "정보통신사업1본부 감사팀 (2017.09 ~ 2021.11) · 同年 KICPA 합격",
  },
];

const coreValues = [
  {
    number: "01",
    title: "정직",
    description:
      "도울 수 없는 일은 도울 수 없다고 말씀드립니다. 화려한 약속 대신, 지킬 수 있는 자문을 드리는 것이 부티크가 가져야 할 첫 번째 원칙이라고 믿습니다.",
  },
  {
    number: "02",
    title: "깊이",
    description:
      "감사 · 자본시장 · 가치평가, 어느 한 축만으로는 풀리지 않는 의사결정이 많습니다. 세 축을 모두 거쳐온 시각으로 한 사람의 깊이를 만듭니다.",
  },
  {
    number: "03",
    title: "가까움",
    description:
      "보고서를 메일로 던지는 자문이 아니라, 의사결정의 현장 옆에 함께 있는 자문을 지향합니다. 가장 가까운 거리에서 가장 정확하게 답하는 것이 메리디안의 약속입니다.",
  },
  {
    number: "04",
    title: "장기 관점",
    description:
      "한 번의 거래 · 한 번의 신고가 아닌, 사업과 자산의 장기 라이프사이클을 함께 보는 자문을 추구합니다. 단발성 솔루션은 단발성으로만 작동합니다.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-32 md:py-44 bg-foreground text-white relative overflow-hidden">
        {heroImages.about && (
          <>
            <Image
              src={heroImages.about}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center animate-ken-burns-left"
              style={{ filter: "saturate(0.55) brightness(0.65) contrast(1.05)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/70 pointer-events-none" />
          </>
        )}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[18rem] font-bold leading-none tracking-tighter select-none">
            ABOUT
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase animate-fade-in">
            About
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] animate-fade-in max-w-4xl">
            가장 가까이서,
            <br />
            가장 정확하게.
          </h1>
          <div className="mt-8 h-0.5 w-20 bg-accent-bright animate-line-reveal" />
          <p className="mt-8 text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl animate-fade-in-delay">
            메리디안 어드바이저리는 한 사람의 깊은 경험에서 시작된
            회계 · 재무 자문 부티크입니다. 보고서를 던지는 자문이 아닌,
            의사결정의 가장 가까운 자리에 있는 자문을 지향합니다.
          </p>
        </div>
      </section>

      {/* Why Us - 3 Key Differentiators */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="Why Us"
            title="왜 메리디안인가"
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mt-12">
            <div className="group">
              <p className="text-6xl md:text-7xl font-bold tracking-tighter text-neutral-200 group-hover:text-foreground transition-colors duration-500">
                01
              </p>
              <h3 className="mt-4 text-xl font-bold tracking-tight">
                Big4 + IB + VME 융합
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                삼정 감사본부, NH투자증권 IB, 한영 가치평가본부(VME)를
                모두 거친 한 사람의 시각. 분리된 자문이 아닌
                연결된 자문이 가능합니다.
              </p>
            </div>
            <div className="group">
              <p className="text-6xl md:text-7xl font-bold tracking-tighter text-neutral-200 group-hover:text-foreground transition-colors duration-500">
                02
              </p>
              <h3 className="mt-4 text-xl font-bold tracking-tight">
                Founder가 직접 자문
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                주니어에게 맡기지 않습니다. Founder가 처음부터 끝까지
                직접 케이스를 듣고, 직접 모델을 만들고, 직접 답합니다.
                작기 때문에 가능한 방식입니다.
              </p>
            </div>
            <div className="group">
              <p className="text-6xl md:text-7xl font-bold tracking-tighter text-neutral-200 group-hover:text-foreground transition-colors duration-500">
                03
              </p>
              <h3 className="mt-4 text-xl font-bold tracking-tight">
                법정 업무는 정식 채널로
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                자문은 메리디안에서, 회계감사 · 세무신고 등 법정 업무는
                동성회계법인을 통해 정식으로 수행됩니다. 자문과 실행이
                분리되지 않는 구조입니다.
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
                자문은 결국
                <br />
                대화에서 시작합니다
              </h2>
              <div className="mt-6 h-px w-16 bg-border" />
              <p className="mt-6 text-muted leading-relaxed">
                템플릿이 아니라 대화에서 시작합니다.
                각 케이스마다 같은 질문은 없고, 같은 답도 없습니다.
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border text-sm font-bold">
                  01
                </div>
                <div>
                  <h4 className="font-bold mb-1">대화 (Discovery)</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    무료 30분. 어떤 문제이고 어디까지 진행됐는지 듣습니다.
                    저희가 도울 수 있는 일인지 솔직하게 답합니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border text-sm font-bold">
                  02
                </div>
                <div>
                  <h4 className="font-bold mb-1">제안 (Scoping)</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    범위 · 산출물 · 일정 · 비용을 구체적으로 제안드립니다.
                    숨은 비용이나 모호한 약속은 없습니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border text-sm font-bold">
                  03
                </div>
                <div>
                  <h4 className="font-bold mb-1">수행 (Engagement)</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    Founder가 직접 분석 · 모델링 · 보고서 작성을 수행합니다.
                    중간 점검 미팅을 통해 방향을 함께 확인합니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border text-sm font-bold">
                  04
                </div>
                <div>
                  <h4 className="font-bold mb-1">사후 (Follow-up)</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    프로젝트 종료 후에도 관련 이슈에 대한 후속 질문은 무료로 받습니다.
                    필요 시 동성회계법인을 통해 정식 신고 · 감사로 연결합니다.
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
            title="발자취"
            subtitle="Founder 박민상의 주요 경력"
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
            label="Principles"
            title="네 가지 약속"
            subtitle="모든 자문에 관통하는 원칙입니다"
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

      {/* Affiliation Disclosure */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs tracking-[0.3em] text-neutral-500 mb-4 uppercase">
                Affiliation
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                동성회계법인과의
                <br />
                관계
              </h2>
              <div className="mt-6 h-px w-16 bg-neutral-700" />
            </div>
            <div className="space-y-6 text-neutral-300 leading-relaxed">
              <p>
                <strong className="text-white">메리디안 어드바이저리</strong>는
                박민상 공인회계사가 운영하는 부티크 자문 브랜드이며, 별도 법인이 아닙니다.
              </p>
              <p>
                박민상 공인회계사는 <strong className="text-white">동성회계법인</strong> 소속으로,
                회계감사 · 세무신고 등 법정 업무는 모두 동성회계법인 명의로 정식 수행됩니다.
                메리디안 어드바이저리는 자문 활동과 인사이트 발신을 위한 개인 브랜드 공간입니다.
              </p>
              <p className="text-neutral-400 text-sm">
                * 본 사이트의 어떠한 표현도 별도 회계법인 · 세무법인을 사칭하지 않으며,
                공인회계사법 및 세무사법상 자격이 필요한 업무는 정식 채널을 통해서만 수행됩니다.
              </p>
              <div className="pt-6 mt-6 border-t border-neutral-800 space-y-1">
                <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase">
                  Direct Contact
                </p>
                <p className="text-neutral-300">Tel. {siteConfig.phone}</p>
                <p className="text-neutral-300">Email. {siteConfig.email}</p>
                <p className="text-neutral-500 text-sm pt-1">{siteConfig.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
