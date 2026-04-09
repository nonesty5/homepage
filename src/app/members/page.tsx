import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { members } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "PEOPLE",
  description: "메리디안 택스 어드바이저리의 사람을 소개합니다.",
};

export default function PeoplePage() {
  const lead = members.find((m) => !m.placeholder);
  const placeholders = members.filter((m) => m.placeholder);

  return (
    <>
      {/* Hero */}
      <section className="py-32 md:py-44 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[16rem] font-bold leading-none tracking-tighter select-none">
            PEOPLE
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase animate-fade-in">
            People
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-fade-in">
            함께하는 사람
          </h1>
          <div className="mt-6 h-0.5 w-20 bg-accent-bright animate-line-reveal" />
          <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed animate-fade-in-delay">
            고객의 문제를 끝까지 책임지는 사람들.
            한 사람의 깊이에서 시작해, 신뢰할 수 있는 동료와 함께 성장합니다.
          </p>
        </div>
      </section>

      {/* Founder */}
      {lead && (
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Photo */}
              <div className="aspect-[3/4] bg-card border border-border flex items-center justify-center relative overflow-hidden">
                {lead.image ? (
                  <Image
                    src={lead.image}
                    alt={`${lead.name} ${lead.role}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center"
                    priority
                  />
                ) : (
                  <>
                    <span className="text-[10rem] md:text-[14rem] font-bold text-neutral-200/60 select-none">
                      {lead.name[0]}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-card to-transparent" />
                  </>
                )}
              </div>
              {/* Info */}
              <div>
                <p className="text-xs tracking-[0.3em] text-muted mb-4 uppercase">
                  Founder
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {lead.name}
                </h2>
                <p className="mt-2 text-muted font-medium">{lead.role}</p>
                <div className="mt-6 h-px w-16 bg-accent" />
                <p className="mt-6 text-muted leading-relaxed text-lg">
                  {lead.description}
                </p>

                {lead.practiceAreas && lead.practiceAreas.length > 0 && (
                  <div className="mt-10">
                    <p className="text-xs tracking-[0.2em] text-subtle mb-4 uppercase font-medium">
                      전문 영역 · Practice Areas
                    </p>
                    <div className="space-y-3">
                      {lead.practiceAreas.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <p className="text-sm text-muted leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {lead.credentials && lead.credentials.length > 0 && (
                  <div className="mt-10">
                    <p className="text-xs tracking-[0.2em] text-subtle mb-4 uppercase font-medium">
                      자격 · 학력
                    </p>
                    <div className="space-y-3">
                      {lead.credentials.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <p className="text-sm text-muted leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-10">
                  <p className="text-xs tracking-[0.2em] text-subtle mb-4 uppercase font-medium">
                    경력
                  </p>
                  <div className="space-y-3">
                    {lead.experience.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <p className="text-sm text-muted leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {placeholders.length > 0 && (
        <>
          <hr className="section-divider" />

          {/* Coming Soon — TBD collaborators */}
          <section className="py-24 md:py-32 bg-card">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading
                label="Joining Soon"
                title="함께하실 분을 모십니다"
                align="left"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                {placeholders.map((member, idx) => (
                  <div
                    key={`${member.name}-${idx}`}
                    className="border border-dashed border-border bg-white p-10 md:p-12 group hover:border-foreground transition-colors duration-300"
                  >
                    <div className="flex items-center gap-6 mb-6">
                      <div className="relative w-20 h-20 rounded-full bg-card border border-dashed border-border flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold text-subtle">
                          ?
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.25em] text-subtle uppercase font-medium mb-1">
                          {member.role}
                        </p>
                        <h3 className="text-lg font-bold tracking-tight">
                          {member.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-6">
                      {member.description}
                    </p>
                    <div className="pt-6 border-t border-border">
                      {member.experience.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 mb-2">
                          <span className="w-1 h-1 rounded-full bg-subtle mt-2 flex-shrink-0" />
                          <p className="text-xs text-muted leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center text-xs font-medium tracking-wider hover-underline"
                    >
                      관심 있으시면 연락주세요
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
