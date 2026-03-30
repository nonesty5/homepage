"use client";

import { useState } from "react";
import { clients } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";

export default function ClientsPage() {
  const allIndustries = Array.from(
    new Set(clients.map((c) => c.industry))
  );
  const categories = ["전체", ...allIndustries];
  const [activeCategory, setActiveCategory] = useState("전체");

  const filteredClients =
    activeCategory === "전체"
      ? clients
      : clients.filter((c) => c.industry === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="py-32 md:py-44 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[16rem] font-bold leading-none tracking-tighter select-none">
            CLIENT
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase animate-fade-in">
            Client
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-fade-in">
            파트너사
          </h1>
          <div className="mt-6 h-px w-20 bg-neutral-600 animate-line-reveal" />
          <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed animate-fade-in-delay">
            다양한 산업의 기업들과 함께 성장하고 있습니다.
          </p>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Industry Filter */}
          <div className="flex flex-wrap gap-3 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs font-medium tracking-wider transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-foreground text-white"
                    : "bg-card text-muted hover:bg-neutral-200 border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
            {filteredClients.map((client) => (
              <div
                key={client.name}
                className="flex flex-col items-center justify-center p-10 md:p-14 bg-white hover:bg-card transition-colors duration-300 group"
              >
                {/* Client initial as logo placeholder */}
                <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center mb-4 group-hover:border-foreground transition-colors duration-300">
                  <span className="text-lg font-bold text-muted group-hover:text-foreground transition-colors">
                    {client.name[0]}
                  </span>
                </div>
                <span className="text-sm font-medium text-muted text-center group-hover:text-foreground transition-colors duration-300">
                  {client.name}
                </span>
                <span className="mt-2 text-[10px] tracking-wider text-subtle uppercase">
                  {client.industry}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-14 text-center text-sm text-subtle">
            * 고객사의 동의 하에 일부만 표시하고 있습니다.
          </p>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase">
            Trust
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-2xl mx-auto leading-tight">
            신뢰를 바탕으로
            <br />
            함께 성장합니다
          </h2>
          <p className="mt-6 text-neutral-400 max-w-xl mx-auto leading-relaxed">
            한결회계법인은 모든 고객사와 장기적인 파트너십을 구축하여
            지속 가능한 성장을 함께 만들어갑니다.
          </p>
        </div>
      </section>
    </>
  );
}
