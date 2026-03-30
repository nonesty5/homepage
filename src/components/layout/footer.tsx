import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/constants";

export default function Footer() {
  const serviceLinks = [
    { label: "세무 자문", href: "/services" },
    { label: "회계 감사", href: "/services" },
    { label: "경영 컨설팅", href: "/services" },
    { label: "기업 설립", href: "/services" },
  ];

  return (
    <footer className="bg-foreground text-white">
      {/* Brand Statement */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16">
        <p className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-snug max-w-3xl">
          Beyond Numbers,
          <br />
          <span className="text-neutral-500">Building Trust.</span>
        </p>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-neutral-800" />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-base font-bold tracking-[0.12em] uppercase mb-5">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
            <div className="mt-6 space-y-1">
              <p className="text-xs text-neutral-500">
                대표: {siteConfig.representative}
              </p>
              <p className="text-xs text-neutral-500">
                사업자등록번호: {siteConfig.businessNumber}
              </p>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-neutral-400 mb-5">
              Services
            </h3>
            <nav className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Menu Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-neutral-400 mb-5">
              Menu
            </h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-neutral-400 mb-5">
              Contact
            </h3>
            <div className="flex flex-col gap-3 text-sm text-neutral-400">
              <p>
                <span className="text-neutral-500 text-xs uppercase tracking-wider">Tel</span>
                <br />
                {siteConfig.phone}
              </p>
              <p>
                <span className="text-neutral-500 text-xs uppercase tracking-wider">Fax</span>
                <br />
                {siteConfig.fax}
              </p>
              <p>
                <span className="text-neutral-500 text-xs uppercase tracking-wider">Email</span>
                <br />
                {siteConfig.email}
              </p>
              <p className="mt-2 leading-relaxed">
                <span className="text-neutral-500 text-xs uppercase tracking-wider">Address</span>
                <br />
                {siteConfig.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-neutral-800" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-neutral-500 tracking-wide">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p className="text-xs text-neutral-600">
          Seoul, South Korea
        </p>
      </div>
    </footer>
  );
}
