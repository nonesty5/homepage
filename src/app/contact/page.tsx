import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import ContactForm from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "CONTACT",
  description: "문의 및 상담 예약",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm tracking-[0.3em] text-neutral-400 mb-4">
            CONTACT
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            문의하기
          </h1>
          <p className="mt-6 text-lg text-neutral-300 max-w-xl">
            궁금하신 사항이 있으시면 언제든지 연락해 주세요.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-8">문의 양식</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-8">연락처 정보</h2>
              <div className="space-y-6">
                <div className="p-6 border border-border">
                  <h3 className="font-bold mb-2">전화</h3>
                  <p className="text-muted">{siteConfig.phone}</p>
                </div>
                <div className="p-6 border border-border">
                  <h3 className="font-bold mb-2">팩스</h3>
                  <p className="text-muted">{siteConfig.fax}</p>
                </div>
                <div className="p-6 border border-border">
                  <h3 className="font-bold mb-2">이메일</h3>
                  <p className="text-muted">{siteConfig.email}</p>
                </div>
                <div className="p-6 border border-border">
                  <h3 className="font-bold mb-2">주소</h3>
                  <p className="text-muted">{siteConfig.address}</p>
                </div>
                <div className="p-6 border border-border">
                  <h3 className="font-bold mb-2">상담 가능 시간</h3>
                  <p className="text-muted">
                    평일 09:00 - 18:00 (주말 및 공휴일 휴무)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
