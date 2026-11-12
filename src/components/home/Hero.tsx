"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDown, Plane } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center overflow-hidden px-6 py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(75,115,185,0.07),transparent_60%)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2">
          <Plane size={13} className="text-accent" />
          <span className="font-mono text-[10px] tracking-[0.16em] text-zinc-400 uppercase">
            Built for flight simulation
          </span>
        </div>

        <h1 className="max-w-4xl font-display text-[clamp(3.2rem,7vw,6.5rem)] leading-[1.05] font-semibold tracking-[-0.055em] text-white">
          Not sure where
          <br />
          to fly <span className="text-accent">next?</span>
        </h1>

        <p className="mt-8 max-w-xl font-sans text-base leading-8 text-zinc-400 sm:text-lg">
          Discover real-world flights tailored to your aircraft, airline, and
          preferences. Less searching, more flying.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/register"
            className="group inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            Find your next flight
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            href="/#features"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/5"
          >
            Explore features
          </Link>
        </div>

        <p className="mt-7 font-mono text-[10px] tracking-wide text-zinc-600">
          PRIVATE ACCESS · BUILT FOR SIMMERS
        </p>
      </motion.div>

      <a
        href="#features"
        aria-label="Scroll to features"
        className="absolute bottom-8 flex flex-col items-center gap-2 text-zinc-600 transition-colors hover:text-zinc-300"
      >
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase">
          Discover
        </span>
        <ArrowDown size={16} />
      </a>
    </section>
  );
}
