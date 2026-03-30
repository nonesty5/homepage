import type { Metadata } from "next";
import { clients } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "CLIENT",
  description: "함께 성장하고 있는 파트너사를 소개합니다.",
};

export default function ClientsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm tracking-[0.3em] text-neutral-400 mb-4">
            CLIENT
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            파트너사
          </h1>
          <p className="mt-6 text-lg text-neutral-300 max-w-xl">
            다양한 산업의 기업들과 함께 성장하고 있습니다.
          </p>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map((client) => (
              <div
                key={client.name}
                className="flex items-center justify-center p-12 border border-border hover:border-foreground transition-colors"
              >
                <span className="text-sm font-medium text-muted text-center">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-sm text-muted">
            * 고객사의 동의 하에 일부만 표시하고 있습니다.
          </p>
        </div>
      </section>
    </>
  );
}
