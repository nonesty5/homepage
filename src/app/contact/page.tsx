import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import ContactForm from "@/components/contact/contact-form";
import { AnimateOnScroll, LineReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "CONTACT",
  description: "현재 상황과 필요한 서비스를 알려주시면 적용 범위와 다음 단계를 정리해 드립니다.",
  alternates: {
    canonical: "/contact",
  },
};

const contactInfo = [
  { label: "Kakao", value: "카카오톡 채널", href: siteConfig.kakaoChannelUrl, external: true },
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "Location", value: siteConfig.location },
  { label: "Hours", value: "평일 09:00 - 18:00 · 사전 약속 권장" },
];

interface ContactPageProps {
  searchParams: Promise<{
    type?: string | string[];
    bottleneck?: string | string[];
    output?: string | string[];
    message?: string | string[];
  }>;
}

function getSingleValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const query = await searchParams;
  const type = getSingleValue(query.type);
  const bottleneck = getSingleValue(query.bottleneck);
  const desiredOutput = getSingleValue(query.output);
  const message = getSingleValue(query.message);
  const initialValues = {
    ...(type ? { type } : {}),
    ...(bottleneck ? { bottleneck } : {}),
    ...(desiredOutput ? { desiredOutput } : {}),
    ...(message ? { message } : {}),
  };

  return (
    <>
      {/* Hero */}
      <section className="py-32 md:py-44 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[16rem] font-bold leading-none tracking-tighter select-none">
            CONTACT
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimateOnScroll variant="fadeIn">
            <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase">
              Contact
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll variant="fadeUp" delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] max-w-4xl">
              현재 상황을 알려주세요
            </h1>
          </AnimateOnScroll>
          <div className="mt-6">
            <LineReveal className="h-0.5 w-20 bg-accent-bright" delay={0.3} />
          </div>
          <AnimateOnScroll variant="fadeUp" delay={0.4}>
            <p className="mt-8 text-lg text-neutral-400 max-w-3xl leading-relaxed">
              매출 규모, 기존 기장 여부, 가장 급한 이슈.
              <br />
              세 줄이면 충분합니다. 필요한 범위와 다음 단계를 회신드립니다.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-7">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
                문의 내용
              </h2>
              <ContactForm initialValues={initialValues} />
            </AnimateOnScroll>

            <AnimateOnScroll variant="fadeUp" delay={0.2} className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <p className="text-xs tracking-[0.2em] text-muted mb-3 uppercase font-medium">
                  Contact Details
                </p>
                <h2 className="text-2xl font-bold tracking-tight mb-10">
                  직접 연락처로 보내기
                </h2>
                <div className="space-y-0">
                  {contactInfo.map((info, i) => (
                    <div
                      key={i}
                      className="py-6 border-b border-border first:border-t"
                    >
                      <p className="text-[10px] tracking-[0.25em] text-subtle uppercase font-medium mb-2">
                        {info.label}
                      </p>
                      {"href" in info && info.href ? (
                        <a
                          href={info.href}
                          {...("external" in info && info.external
                            ? { target: "_blank", rel: "noreferrer noopener" }
                            : {})}
                          className="text-foreground leading-relaxed hover:text-accent transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground leading-relaxed">
                          {info.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-card border border-border">
                  <p className="text-[10px] tracking-[0.25em] text-subtle uppercase font-medium mb-3">
                    Affiliation Notice
                  </p>
                  <p className="text-xs text-muted leading-relaxed">
                    {siteConfig.affiliation}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
