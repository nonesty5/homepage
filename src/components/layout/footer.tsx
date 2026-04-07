import Link from "next/link";
import { siteConfig, navLinks, imageCredits } from "@/lib/constants";

export default function Footer() {
  const practiceLinks = [
    { label: "기업가치평가", href: "/services/valuation" },
    { label: "M&A 자문", href: "/services/ma-advisory" },
    { label: "IPO 준비 자문", href: "/services/ipo-readiness" },
    { label: "재무 모델링 · 사업계획", href: "/services/financial-modeling" },
    { label: "세무 · 자산 자문", href: "/services/tax-advisory" },
  ];

  return (
    <footer className="bg-foreground text-white">
      {/* Brand Statement — editorial pulled quote */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono-meta text-[10px] uppercase text-neutral-500 tabular-figures">
            Colophon
          </span>
          <span className="h-px w-12 bg-neutral-800" />
        </div>
        <p className="font-serif-display text-4xl md:text-5xl lg:text-7xl font-light italic leading-[1.05] tracking-tight max-w-4xl">
          The Closest
          <br />
          Partner
          <br />
          <span className="text-neutral-500">in Every Decision.</span>
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
            <h3 className="font-serif-display text-3xl font-light tracking-tight mb-1">
              {siteConfig.title}
            </h3>
            <p className="font-mono-meta text-[10px] uppercase text-neutral-500 mb-6">
              {siteConfig.name}
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              {siteConfig.tagline}
            </p>
            <div className="mt-6 pt-6 border-t border-neutral-800 space-y-1">
              <p className="font-mono-meta text-[10px] uppercase text-neutral-500">
                Founder
              </p>
              <p className="text-sm text-neutral-300">
                {siteConfig.founder}
                <span className="text-neutral-600"> · KICPA</span>
              </p>
            </div>
          </div>

          {/* Practice Column */}
          <div>
            <h3 className="font-mono-meta text-[10px] uppercase text-neutral-500 mb-5">
              I · Practice
            </h3>
            <nav className="flex flex-col gap-3">
              {practiceLinks.map((link) => (
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
            <h3 className="font-mono-meta text-[10px] uppercase text-neutral-500 mb-5">
              II · Menu
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
            <h3 className="font-mono-meta text-[10px] uppercase text-neutral-500 mb-5">
              III · Contact
            </h3>
            <div className="flex flex-col gap-4 text-sm text-neutral-400">
              <p>
                <span className="font-mono-meta text-[10px] text-neutral-600 uppercase block mb-1">Tel</span>
                <span className="tabular-figures">{siteConfig.phone}</span>
              </p>
              <p>
                <span className="font-mono-meta text-[10px] text-neutral-600 uppercase block mb-1">Email</span>
                {siteConfig.email}
              </p>
              <p>
                <span className="font-mono-meta text-[10px] text-neutral-600 uppercase block mb-1">Location</span>
                {siteConfig.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Affiliation Disclosure */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-neutral-800" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 space-y-4">
        <p className="text-xs text-neutral-500 leading-relaxed max-w-4xl">
          <span className="text-neutral-400 font-medium">Affiliation Notice.</span>{" "}
          {siteConfig.affiliation}
        </p>
        {imageCredits.length > 0 && (
          <p className="text-[11px] text-neutral-600 leading-relaxed max-w-4xl">
            <span className="text-neutral-500 font-medium uppercase tracking-wider">
              Image Credits ·{" "}
            </span>
            {imageCredits.map((credit, i) => (
              <span key={credit.title}>
                {i > 0 && " · "}
                <a
                  href={credit.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-400 transition-colors"
                >
                  {credit.title}
                </a>
                {" by "}
                {credit.photographer}
                {" ("}
                {credit.license}
                {")"}
              </span>
            ))}
          </p>
        )}
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
