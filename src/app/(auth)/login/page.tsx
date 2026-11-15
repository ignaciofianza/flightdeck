import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  CircleDot,
  LockKeyhole,
  Mail,
  PlaneTakeoff,
} from "lucide-react";

import { Brand } from "@/components/ui/brand";

export const metadata: Metadata = {
  title: "Awaiting Clearance | FlightDeck",
  description:
    "FlightDeck authentication is currently under development. Sign in and registration are not available yet.",
};

const systems = [
  {
    label: "Authentication",
    status: "In development",
  },
  {
    label: "Registration",
    status: "Not available",
  },
] as const;

export default function AuthUnavailablePage() {
  return (
    <main className="relative isolate flex min-h-svh flex-col overflow-hidden bg-background text-white">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/auth-background.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />

        <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/70" />
      </div>

      {/* Decorative grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-7 sm:px-8 sm:py-9">
        <Brand priority />

        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-medium text-zinc-300 transition-colors hover:text-white sm:text-sm"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to home
        </Link>
      </header>

      {/* Main content */}
      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-16 sm:px-8 lg:py-24">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Editorial content */}
          <div>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 font-mono text-[10px] tracking-wider text-amber-300 uppercase">
                <CircleDot size={12} />
                Pending clearance
              </span>

              <span className="font-mono text-[10px] tracking-[0.15em] text-zinc-500 uppercase">
                FlightDeck / Pre-launch
              </span>
            </div>

            <h1 className="font-display text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              Not yet
              <br />
              cleared for
              <br />
              <span className="text-accent">takeoff.</span>
            </h1>

            <p className="mt-8 max-w-lg text-base leading-8 text-zinc-300 sm:text-lg">
              We&apos;re building the next chapter of FlightDeck. Authentication
              and registration aren&apos;t available just yet.
            </p>

            <p className="mt-4 max-w-md text-sm leading-7 text-zinc-500">
              The platform is still in development. Thanks for being here while
              we get everything ready for departure.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Explore FlightDeck
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <a
                href="mailto:ignacio@ignaciofianza.com"
                className="group inline-flex items-center gap-2 px-3 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
              >
                <Mail size={16} className="text-accent" />
                Contact developer
              </a>
            </div>
          </div>

          {/* Status board */}
          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-accent/5 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111722]/90 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div className="flex items-center gap-3">
                  <PlaneTakeoff
                    size={18}
                    strokeWidth={1.5}
                    className="text-accent"
                  />

                  <span className="font-mono text-[11px] tracking-[0.14em] text-zinc-300 uppercase">
                    System status
                  </span>
                </div>

                <span className="font-mono text-[10px] text-zinc-600">
                  FD / AUTH
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
                    <LockKeyhole
                      size={25}
                      strokeWidth={1.4}
                      className="text-accent"
                    />
                  </div>

                  <div>
                    <p className="font-mono text-[10px] tracking-[0.14em] text-zinc-500 uppercase">
                      Access control
                    </p>

                    <h2 className="mt-1 font-display text-xl font-semibold text-white">
                      Awaiting activation
                    </h2>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
                  <div className="grid grid-cols-2 border-b border-white/10 px-5 py-4">
                    <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
                      System
                    </span>

                    <span className="text-right font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
                      Status
                    </span>
                  </div>

                  {systems.map((system, index) => (
                    <div
                      key={system.label}
                      className={`grid grid-cols-2 items-center gap-3 px-5 py-5 ${
                        index !== systems.length - 1
                          ? "border-b border-white/10"
                          : ""
                      }`}
                    >
                      <span className="text-sm font-medium text-zinc-200">
                        {system.label}
                      </span>

                      <span className="flex items-center justify-end gap-2 text-right font-mono text-[10px] text-amber-300 uppercase">
                        <span className="size-1.5 shrink-0 rounded-full bg-amber-400" />
                        {system.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex items-start gap-3">
                  <CircleDot
                    size={15}
                    className="mt-0.5 shrink-0 text-accent"
                  />

                  <p className="text-xs leading-6 text-zinc-500">
                    Access is currently disabled while FlightDeck is under
                    development. No action is required.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 bg-white/3 px-6 py-4">
                <span className="font-mono text-[10px] tracking-wider text-zinc-600 uppercase">
                  FlightDeck / Development
                </span>

                <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
                  Pre-launch
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-3 border-t border-white/10 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-[10px] tracking-wide text-zinc-500">
          © {new Date().getFullYear()} FlightDeck.
        </p>

        <p className="font-mono text-[10px] tracking-[0.12em] text-zinc-500 uppercase">
          Made in Uruguay 🇺🇾 · Built for simmers
        </p>
      </footer>
    </main>
  );
}
