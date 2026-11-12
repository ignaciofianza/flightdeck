import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

import { Brand } from "@/components/ui/brand";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Get access", href: "/register" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/6 bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:px-8 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-[1fr_auto_auto] md:gap-20">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Brand />

            <p className="mt-5 max-w-xs text-sm leading-7 text-zinc-400">
              Less searching. More flying.
              <br />
              Built for those who love aviation.
            </p>

            <div className="mt-6 flex items-center gap-2 text-zinc-500">
              <MapPin size={14} className="text-accent" />

              <span className="font-mono text-[11px]">Made in Uruguay 🇺🇾</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 font-display text-sm font-semibold text-white">
              Explore
            </h3>

            <nav
              aria-label="Footer navigation"
              className="flex flex-col items-start gap-3"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-display text-sm font-semibold text-white">
              Get in touch
            </h3>

            <a
              href="mailto:ignacio@ignaciofianza.com"
              className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              <Mail size={15} className="text-accent" />
              ignacio@ignaciofianza.com
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <p className="mt-4 max-w-60 text-xs leading-6 text-zinc-600">
              Questions, suggestions, or just want to talk aviation? My inbox is
              open.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/6 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-wide text-zinc-500">
            © {new Date().getFullYear()} FlightDeck.
          </p>

          <p className="font-mono text-[10px] tracking-wide text-zinc-500">
            Designed & developed by{" "}
            <a
              href="https://ignaciofianza.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 transition-colors hover:text-accent"
            >
              Ignacio Fianza
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
