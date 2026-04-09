"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { navLinks, siteConfig } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="transition-opacity duration-300 hover:opacity-60 flex-shrink-0"
          >
            <span
              className="text-xl md:text-2xl font-semibold tracking-[0.08em] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              MERIDIAN
            </span>
          </Link>

          {/* Desktop Nav + Pricing + Client Login */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-10">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[0.8125rem] font-medium tracking-[0.08em] transition-colors duration-300 hover:text-foreground hover-underline ${
                      isActive ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href={siteConfig.pricingUrl}
                className="text-[0.75rem] font-medium tracking-[0.08em] uppercase px-4 py-2 border border-border text-muted hover:text-foreground hover:border-foreground transition-colors duration-300"
              >
                Pricing
              </Link>
              <a
                href={siteConfig.clientPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.75rem] font-medium tracking-[0.08em] uppercase px-4 py-2 border border-border text-muted hover:text-foreground hover:border-foreground transition-colors duration-300"
              >
                Client Login
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            <div className="relative w-5 h-3.5">
              <span
                className={`absolute left-0 top-0 block w-5 h-[1.5px] bg-foreground transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileOpen ? "rotate-45 top-1/2 -translate-y-1/2" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 block w-5 h-[1.5px] bg-foreground transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileOpen ? "-rotate-45 top-1/2 -translate-y-1/2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Nav - Full Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-light tracking-[0.12em] transition-all duration-500 ${
                  mobileOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } ${isActive ? "text-foreground" : "text-muted hover:text-foreground"}`}
                style={{
                  transitionDelay: mobileOpen ? `${index * 60 + 150}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div
            className={`mt-6 flex items-center gap-3 transition-all duration-500 ${
              mobileOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: mobileOpen
                ? `${navLinks.length * 60 + 150}ms`
                : "0ms",
            }}
          >
            <Link
              href={siteConfig.pricingUrl}
              onClick={() => setMobileOpen(false)}
              className="text-xs tracking-[0.12em] uppercase px-6 py-3 border border-border text-muted"
            >
              Pricing
            </Link>
            <a
              href={siteConfig.clientPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="text-xs tracking-[0.12em] uppercase px-6 py-3 border border-border text-muted"
            >
              Client Login
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
