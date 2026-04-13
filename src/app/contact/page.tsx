import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import ContactForm from "@/components/contact/contact-form";
import { AnimateOnScroll, LineReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "CONTACT",
  description: "문의 및 상담 예약",
};

const contactInfo = [
  { label: "Phone", value: siteConfig.phone },
  { label: "Email", value: siteConfig.email },
  { label: "Location", value: siteConfig.location },
  { label: "Hours", value: "평일 09:00 - 18:00 · 사전 약속 권장" },
];

export default function ContactPage() {
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
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              문의하기
            </h1>
          </AnimateOnScroll>
          <div className="mt-6">
            <LineReveal className="h-0.5 w-20 bg-accent-bright" delay={0.3} />
          </div>
          <AnimateOnScroll variant="fadeUp" delay={0.4}>
            <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed">
              지금 고민되는 상황을 간단히 말씀해 주세요.
              <br />
              도울 수 있는 일인지 솔직하게 답변드리겠습니다.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Content: Asymmetric Layout */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Contact Form - Takes more space */}
            <AnimateOnScroll variant="fadeUp" className="lg:col-span-7">
              <p className="text-xs tracking-[0.2em] text-muted mb-3 uppercase font-medium">
                Inquiry Form
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
                케이스에 대해
                <br />
                간단히 알려주세요
              </h2>
              <ContactForm />
            </AnimateOnScroll>

            {/* Contact Info - Smaller sidebar */}
            <AnimateOnScroll variant="fadeUp" delay={0.2} className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <p className="text-xs tracking-[0.2em] text-muted mb-3 uppercase font-medium">
                  연락처 정보
                </p>
                <h2 className="text-2xl font-bold tracking-tight mb-10">
                  직접 연락하기
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
                      <p className="text-foreground leading-relaxed">
                        {info.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Affiliation Note */}
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
