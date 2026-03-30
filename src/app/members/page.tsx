import type { Metadata } from "next";
import { members } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "MEMBER",
  description: "전문 인력을 소개합니다.",
};

export default function MembersPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm tracking-[0.3em] text-neutral-400 mb-4">
            MEMBER
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            전문가 소개
          </h1>
          <p className="mt-6 text-lg text-neutral-300 max-w-xl">
            풍부한 경험과 전문성을 갖춘 인력이 함께합니다.
          </p>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <div key={member.name} className="border border-border">
                {/* Profile placeholder */}
                <div className="aspect-[4/3] bg-card flex items-center justify-center">
                  <span className="text-6xl text-muted/30">
                    {member.name[0]}
                  </span>
                </div>
                <div className="p-8">
                  <h2 className="text-xl font-bold">{member.name}</h2>
                  <p className="mt-1 text-sm text-muted font-medium">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm text-muted leading-relaxed">
                    {member.description}
                  </p>
                  <div className="mt-6 pt-6 border-t border-border">
                    {member.career.map((item, i) => (
                      <p key={i} className="text-xs text-muted py-1">
                        &middot; {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
