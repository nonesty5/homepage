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
    title: "메리디안 택스 어드바이저리 시작",
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
            대표님은 사업에만
            <br />
            집중하실 수 있도록.
          </h1>
          <div className="mt-8 h-0.5 w-20 bg-accent-bright animate-line-reveal" />
          <p className="mt-8 text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl animate-fade-in-delay">
            세무 · 회계 · 가치평가 · M&amp;A를 한 곳에서 다루는 범전문가 집단.
            사업을 하며 마주하는 복잡한 문제들을 대신 맡아,
            대표님이 본업에만 집중할 수 있도록 합니다.
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
                일상 세무가 중심
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                매월 장부를 직접 보기 때문에, 중요한 의사결정 앞에서
                새로 설명할 필요가 없습니다.
                이미 숫자를 알고 있는 사람이 자문까지 이어갑니다.
              </p>
            </div>
            <div className="group">
              <p className="text-6xl md:text-7xl font-bold tracking-tighter text-neutral-200 group-hover:text-foreground transition-colors duration-500">
                02
              </p>
              <h3 className="mt-4 text-xl font-bold tracking-tight">
                기장부터 가치평가까지
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                세무 신고를 위해 한 곳, 가치평가를 위해 또 한 곳 —
                따로 맡기실 필요 없이, 한 사람이 일관되게 다룹니다.
              </p>
            </div>
            <div className="group">
              <p className="text-6xl md:text-7xl font-bold tracking-tighter text-neutral-200 group-hover:text-foreground transition-colors duration-500">
                03
              </p>
              <h3 className="mt-4 text-xl font-bold tracking-tight">
                장부 바깥까지 직접 해결합니다
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                신고서 작성에서 끝나지 않습니다.
                사업을 하며 마주하는 행정 · 규제 · 의사결정의 복잡함을
                대신 감당해, 대표님이 본업에만 집중할 수 있도록 돕습니다.
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
                문제 해결은
                <br />
                대화에서 시작합니다
              </h2>
              <div className="mt-6 h-px w-16 bg-border" />
              <p className="mt-6 text-muted leading-relaxed">
                같은 업종이라도 대표님마다 상황은 다릅니다.
                일률적인 절세 팁이 아니라, 지금 사업 현장에서 실제로 걸리는 문제를 먼저 파악하고
                거기서부터 풀어갑니다.
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border text-sm font-bold">
                  01
                </div>
                <div>
                  <h4 className="font-bold mb-1">대화</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    지금 어떤 상황이고, 무엇이 필요한지 먼저 듣습니다.
                    도울 수 있는 일인지 솔직하게 답합니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border text-sm font-bold">
                  02
                </div>
                <div>
                  <h4 className="font-bold mb-1">제안</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    범위 · 산출물 · 일정 · 비용을 구체적으로 제안합니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border text-sm font-bold">
                  03
                </div>
                <div>
                  <h4 className="font-bold mb-1">수행</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    장부 · 신고 · 모델링은 물론, 사업 현장에서 필요한 일이라면
                    범위를 넘어서라도 직접 챙깁니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border text-sm font-bold">
                  04
                </div>
                <div>
                  <h4 className="font-bold mb-1">사후</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    종료 후에도 관련 후속 질문은 받습니다.
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
                <strong className="text-white">메리디안 택스 어드바이저리</strong>는
                박민상 공인회계사가 운영하는 부티크 자문 브랜드이며, 별도 법인이 아닙니다.
              </p>
              <p>
                박민상 공인회계사는 <strong className="text-white">동성회계법인</strong> 소속으로,
                회계감사 · 세무 기장 · 세무 조정 · 세무 신고 등 법정 업무는 모두 동성회계법인 명의로 정식 수행됩니다.
                메리디안 택스 어드바이저리는 자문 활동과 인사이트 발신을 위한 개인 브랜드 공간입니다.
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
