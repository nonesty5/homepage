"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { navLinks, siteConfig } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 });

  useEffect(() => {
    const main = document.querySelector("main");

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      main?.setAttribute("inert", "");
      main?.setAttribute("aria-hidden", "true");
    } else {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
    }

    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="transition-opacity duration-300 hover:opacity-60 flex-shrink-0"
          >
            <span className="text-[1.35rem] md:text-[1.6rem] font-bold tracking-tight leading-none text-foreground">
              Meridian<span className="green-dot">.</span>
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
                    prefetch={false}
                    className={`relative text-[0.8125rem] font-medium tracking-[0.08em] transition-colors duration-300 hover-underline ${
                      isActive ? "text-foreground" : "text-muted hover:text-foreground"
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
                prefetch={false}
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
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
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
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left"
          style={{ scaleX }}
        />
      </header>

      {/* Mobile Nav - Full Screen Overlay */}
      <div
        id="mobile-navigation"
        aria-hidden={!mobileOpen}
        aria-label="모바일 메뉴"
        aria-modal={mobileOpen ? true : undefined}
        role={mobileOpen ? "dialog" : undefined}
        className={`fixed inset-0 z-40 bg-background transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none"
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
                prefetch={false}
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-light tracking-[0.12em] transition-all duration-300 ${
                  mobileOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } ${isActive ? "text-foreground" : "text-muted hover:text-foreground"}`}
                style={{
                  transitionDelay: mobileOpen ? `${index * 35 + 40}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div
            className={`mt-6 flex items-center gap-3 transition-all duration-300 ${
              mobileOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: mobileOpen
                ? `${navLinks.length * 35 + 40}ms`
                : "0ms",
            }}
          >
            <Link
              href={siteConfig.pricingUrl}
              prefetch={false}
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
