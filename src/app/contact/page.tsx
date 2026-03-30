import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import ContactForm from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "CONTACT",
  description: "문의 및 상담 예약",
};

const contactInfo = [
  { label: "Phone", value: siteConfig.phone },
  { label: "Fax", value: siteConfig.fax },
  { label: "Email", value: siteConfig.email },
  { label: "Address", value: siteConfig.address },
  { label: "Hours", value: "평일 09:00 - 18:00 (주말 및 공휴일 휴무)" },
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
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase animate-fade-in">
            Contact
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-fade-in">
            문의하기
          </h1>
          <div className="mt-6 h-px w-20 bg-neutral-600 animate-line-reveal" />
          <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed animate-fade-in-delay">
            궁금하신 사항이 있으시면 언제든지 연락해 주세요.
            <br />
            전문 상담을 통해 최적의 솔루션을 안내해 드립니다.
          </p>
        </div>
      </section>

      {/* Content: Asymmetric Layout */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Contact Form - Takes more space */}
            <div className="lg:col-span-7">
              <p className="text-xs tracking-[0.2em] text-muted mb-3 uppercase font-medium">
                문의 양식
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
                프로젝트에 대해
                <br />
                알려주세요
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info - Smaller sidebar */}
            <div className="lg:col-span-5">
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

                {/* Mini map placeholder */}
                <div className="mt-10 aspect-[16/10] bg-card border border-border flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm font-medium mb-1">강남파이낸스센터 22층</p>
                    <p className="text-xs text-subtle">
                      서울 강남구 테헤란로 152
                    </p>
                    <div className="mt-4 w-8 h-8 mx-auto rounded-full border border-border flex items-center justify-center">
                      <span className="text-xs text-muted font-bold">H</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
