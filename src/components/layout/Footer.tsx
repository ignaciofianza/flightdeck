import Link from "next/link";
import { ArrowUpRight, Globe2, Mail, MapPin, MoveUpRight } from "lucide-react";

import { Brand } from "@/components/ui/brand";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Get access", href: "/register" },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-background">
      <div className="pointer-events-none absolute top-0 right-0 h-100 w-100 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 sm:px-8 sm:pt-28">
        {/* Editorial header */}
        <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-2 lg:items-end lg:gap-20">
          <div>
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                Made for the love of flying
              </span>
            </div>

            <h2 className="font-display text-4xl leading-tight font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Keep exploring.
              <br />
              <span className="text-zinc-500">Keep flying.</span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-md text-base leading-8 text-zinc-400">
              A little less time searching for flights. A lot more time doing
              what you love. Discover the world, one flight at a time.
            </p>

            <Link
              href="/register"
              className="group mt-8 inline-flex items-center gap-3 border-b border-accent/60 pb-2 text-sm font-medium text-white transition-colors hover:border-white"
            >
              Join FlightDeck
              <ArrowUpRight
                size={17}
                className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Navigation and brand */}
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <div>
            <Brand />

            <p className="mt-5 max-w-xs text-sm leading-7 text-zinc-400">
              Less searching. More flying.
              <br />
              Built for those who love aviation.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-zinc-500">
              <MapPin size={14} className="text-accent" />
              <span className="font-mono text-[11px]">Made in Uruguay 🇺🇾</span>
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-mono text-[11px] tracking-[0.16em] text-zinc-500 uppercase">
              Navigation
            </h3>

            <nav
              aria-label="Footer navigation"
              className="flex flex-col items-start gap-4"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  {link.label}
                  <ArrowUpRight
                    size={13}
                    className="text-accent opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-6 font-mono text-[11px] tracking-[0.16em] text-zinc-500 uppercase">
              Say hello
            </h3>

            <a
              href="mailto:ignacio@ignaciofianza.com"
              className="group inline-flex items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-white"
            >
              <Mail size={16} className="text-accent" />
              ignacio@ignaciofianza.com
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <p className="mt-5 max-w-xs text-sm leading-7 text-zinc-500">
              Questions, feedback, or just want to talk aviation? My inbox is
              open.
            </p>

            <div className="mt-8 flex items-center gap-2 text-zinc-600">
              <Globe2 size={14} />
              <span className="font-mono text-[10px] tracking-wide uppercase">
                Built for simmers worldwide
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-wide text-zinc-500">
            © {new Date().getFullYear()} FlightDeck.
          </p>

          <a
            href="https://ignaciofianza.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-wide text-zinc-500 transition-colors hover:text-white"
          >
            Designed & developed by
            <span className="text-zinc-300">Ignacio Fianza</span>
            <MoveUpRight
              size={13}
              className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
