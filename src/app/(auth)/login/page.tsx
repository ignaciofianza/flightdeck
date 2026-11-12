import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  LockKeyhole,
  Construction,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "Authentication is not available yet on FlightDeck.",
};

export default function AuthUnavailablePage() {
  return (
    <main className="flex min-h-svh flex-col bg-background px-6">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between py-8">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-white"
        >
          FlightDeck<span className="text-accent">.</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={15} />
          Back to home
        </Link>
      </header>

      <section className="flex flex-1 items-center justify-center py-20">
        <div className="w-full max-w-xl text-center">
          <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-2xl border border-accent/20 bg-accent/5">
            <LockKeyhole size={27} strokeWidth={1.5} className="text-accent" />
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2">
            <Construction size={13} className="text-accent" />

            <span className="font-mono text-[10px] tracking-[0.15em] text-zinc-400 uppercase">
              Development in progress
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Not quite ready
            <br />
            for <span className="text-accent">takeoff.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-md text-base leading-8 text-zinc-400">
            Sign in and registration are currently unavailable during this stage
            of FlightDeck&apos;s development.
          </p>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-zinc-500">
            We&apos;re working on bringing these features online. Thanks for
            your patience while we prepare for departure.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              Return to home
              <ArrowUpRight size={16} />
            </Link>

            <a
              href="mailto:ignacio@ignaciofianza.com"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            >
              Contact developer
            </a>
          </div>

          <div className="mt-16 border-t border-white/6 pt-7">
            <p className="font-mono text-[10px] tracking-[0.16em] text-zinc-600 uppercase">
              FlightDeck / Authentication / Coming soon
            </p>
          </div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-6xl py-8 text-center">
        <p className="font-mono text-[10px] text-zinc-600">
          © {new Date().getFullYear()} FlightDeck. Built for flight simulation.
        </p>
      </footer>
    </main>
  );
}
