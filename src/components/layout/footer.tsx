import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{siteConfig.name}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              {siteConfig.description}
            </p>
            <p className="text-sm text-neutral-400">
              대표: {siteConfig.representative}
            </p>
            <p className="text-sm text-neutral-400">
              사업자등록번호: {siteConfig.businessNumber}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold tracking-wider mb-4">MENU</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold tracking-wider mb-4">CONTACT</h3>
            <div className="flex flex-col gap-2 text-sm text-neutral-400">
              <p>Tel. {siteConfig.phone}</p>
              <p>Fax. {siteConfig.fax}</p>
              <p>Email. {siteConfig.email}</p>
              <p className="mt-2">{siteConfig.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
