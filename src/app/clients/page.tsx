import type { Metadata } from "next";
import Link from "next/link";
import { personas, services } from "@/lib/data";
import { AnimateOnScroll, LineReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "WHO",
  description:
    "설립 직후, 성장기, 중요한 결정 직전까지 대표가 겪는 세무 운영 병목과 결과물을 단계별로 정리합니다.",
};

export default function WhoPage() {
  return (
    <>
      <section className="py-32 md:py-44 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[16rem] font-bold leading-none tracking-tighter select-none">
            WHO
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimateOnScroll variant="fadeIn">
            <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase">
              Founder Lifecycle
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll variant="fadeUp" delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] max-w-4xl">
              어느 단계에서
              <br />
              어떤 병목이 생기는가
            </h1>
          </AnimateOnScroll>
          <div className="mt-6">
            <LineReveal className="h-0.5 w-20 bg-accent-bright" delay={0.3} />
          </div>
          <AnimateOnScroll variant="fadeUp" delay={0.4}>
            <p className="mt-8 text-lg text-neutral-400 max-w-3xl leading-relaxed">
              설립 직후에는 기준이 비고, 성장기에는 보고가 늦고, 큰 결정 앞에서는 비교표가
              필요합니다. 단계별로 막히는 지점과 먼저 받아야 하는 결과물을 정리합니다.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-0">
            {personas.map((persona, index) => {
              const isEven = index % 2 === 0;
              const num = String(index + 1).padStart(2, "0");
              const fitItems = persona.fitServices
                .map((slug) => services.find((service) => service.slug === slug))
                .filter((service): service is NonNullable<typeof service> => Boolean(service));

              return (
                <AnimateOnScroll key={persona.slug} variant="fadeUp">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-16 md:py-24 border-t border-border last:border-b items-start">
                    <div
                      className={`md:col-span-5 ${
                        isEven ? "md:col-start-1" : "md:col-start-8 md:row-start-1"
                      }`}
                    >
                      <p className="text-xs tracking-[0.3em] text-subtle uppercase font-medium mb-4">
                        {persona.englishLabel}
                      </p>
                      <div className="flex items-baseline gap-4">
                        <span className="text-5xl md:text-7xl font-bold tracking-tighter text-neutral-200">
                          {num}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                          {persona.title}
                        </h2>
                      </div>
                    </div>

                    <div
                      className={`md:col-span-6 ${
                        isEven ? "md:col-start-7" : "md:col-start-1 md:row-start-1"
                      }`}
                    >
                      <p className="text-muted leading-relaxed text-base md:text-lg">
                        {persona.description}
                      </p>

                      <div className="mt-8">
                        <p className="text-xs tracking-[0.2em] text-subtle uppercase font-medium mb-4">
                          현재 병목
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                          {persona.bottlenecks.map((item) => (
                            <p
                              key={item}
                              className="text-sm text-muted py-1 flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-border">
                        <p className="text-xs tracking-[0.2em] text-subtle uppercase font-medium mb-4">
                          먼저 받는 결과물
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                          {persona.outputs.map((item) => (
                            <p
                              key={item}
                              className="text-sm text-muted py-1 flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-border">
                        <p className="text-xs tracking-[0.2em] text-subtle uppercase font-medium mb-3">
                          Related Practice
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {fitItems.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              className="inline-flex items-center px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors duration-300"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <AnimateOnScroll variant="fadeIn">
        <section className="py-24 md:py-32 bg-foreground text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <AnimateOnScroll variant="fadeUp">
              <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase">
                Contact
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-3xl mx-auto leading-tight">
                지금 단계의 병목과
                <br />
                필요한 결과물을 정리해 보세요
              </h2>
              <p className="mt-6 text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                현재 상황과 가장 급한 이슈만 보내주시면 어디서부터 기장, 조정, 자문을 연결해야 하는지
                먼저 정리합니다.
              </p>
              <Link
                href="/contact"
                className="group mt-10 inline-flex items-center px-10 py-4 bg-white text-foreground text-sm font-medium tracking-wider transition-all duration-300 hover:bg-neutral-200 hover:tracking-widest"
              >
                내 상황 정리하기
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </AnimateOnScroll>
          </div>
        </section>
      </AnimateOnScroll>
    </>
  );
}
