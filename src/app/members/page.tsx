import type { Metadata } from "next";
import { members } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "MEMBER",
  description: "전문 인력을 소개합니다.",
};

export default function MembersPage() {
  const lead = members[0];
  const others = members.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="py-32 md:py-44 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[16rem] font-bold leading-none tracking-tighter select-none">
            MEMBER
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase animate-fade-in">
            Member
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-fade-in">
            전문가 소개
          </h1>
          <div className="mt-6 h-px w-20 bg-neutral-600 animate-line-reveal" />
          <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed animate-fade-in-delay">
            풍부한 경험과 전문성을 갖춘 인력이 함께합니다.
          </p>
        </div>
      </section>

      {/* Lead Member - Horizontal Layout */}
      {lead && (
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Avatar */}
              <div className="aspect-[3/4] bg-card border border-border flex items-center justify-center relative overflow-hidden">
                <span className="text-[10rem] md:text-[14rem] font-bold text-neutral-200/60 select-none">
                  {lead.name[0]}
                </span>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-card to-transparent" />
              </div>
              {/* Info */}
              <div>
                <p className="text-xs tracking-[0.3em] text-muted mb-4 uppercase">
                  Representative
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {lead.name}
                </h2>
                <p className="mt-2 text-muted font-medium">{lead.role}</p>
                <div className="mt-6 h-px w-16 bg-border" />
                <p className="mt-6 text-muted leading-relaxed text-lg">
                  {lead.description}
                </p>
                <div className="mt-10">
                  <p className="text-xs tracking-[0.2em] text-subtle mb-4 uppercase font-medium">
                    Career
                  </p>
                  <div className="space-y-3">
                    {lead.career.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
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

      {others.length > 0 && (
        <>
          <hr className="section-divider" />

          {/* Other Members - Grid */}
          <section className="py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading
                label="Team"
                title="구성원"
                align="left"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {others.map((member) => (
                  <div
                    key={member.name}
                    className="border border-border hover:border-foreground transition-colors duration-300 group"
                  >
                    {/* Avatar Circle */}
                    <div className="p-8 md:p-10 flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-foreground text-white flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold">
                          {member.name[0]}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{member.name}</h3>
                        <p className="mt-1 text-sm text-muted">{member.role}</p>
                      </div>
                    </div>
                    <div className="px-8 md:px-10 pb-8 md:pb-10">
                      <p className="text-sm text-muted leading-relaxed mb-6">
                        {member.description}
                      </p>
                      <div className="pt-6 border-t border-border">
                        <p className="text-xs tracking-[0.15em] text-subtle mb-3 uppercase">
                          Career
                        </p>
                        {member.career.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 mb-2">
                            <span className="w-1 h-1 rounded-full bg-subtle mt-2 flex-shrink-0" />
                            <p className="text-xs text-muted leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
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
