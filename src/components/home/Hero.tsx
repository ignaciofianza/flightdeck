"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDown, Radio } from "lucide-react";

import { HeroVisual } from "./HeroVisual";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(80,120,190,0.07),transparent_60%)]"
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-80px)] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="relative z-10"
        >
          <div className="mb-9 inline-flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-lg border border-accent/20 bg-accent/5">
              <Radio size={15} className="text-accent" />
            </span>

            <span className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
              Built for flight simulation
            </span>
          </div>

          <h1 className="max-w-2xl font-display text-[clamp(3.5rem,6vw,6.25rem)] leading-[1.04] font-semibold tracking-[-0.065em] text-white">
            The world
            <br />
            is yours
            <br />
            <span className="text-accent">to fly.</span>
          </h1>

          <p className="mt-8 max-w-lg text-base leading-8 text-zinc-400 sm:text-lg">
            Discover real-world flights, explore new destinations, and find the
            perfect route for your next simulation.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
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
              href="/#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            >
              How it works
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-3 border-t border-white/8 pt-6">
            <span className="size-1.5 rounded-full bg-accent" />

            <p className="font-mono text-[10px] tracking-[0.12em] text-zinc-500 uppercase">
              Discover. Plan. Fly.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease,
          }}
          className="min-w-0"
        >
          <HeroVisual />
        </motion.div>
      </div>

      <a
        href="#features"
        aria-label="Discover features"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-600 transition-colors hover:text-white lg:flex"
      >
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase">
          Scroll to explore
        </span>
        <ArrowDown size={15} />
      </a>
    </section>
  );
}
