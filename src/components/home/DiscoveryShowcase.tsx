"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Plane } from "lucide-react";

export function DiscoveryShowcase() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-28 pb-24 sm:pt-36 sm:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end"
      >
        <div>
          <p className="mb-5 font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
            01 / DISCOVER
          </p>

          <h2 className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            A world of routes.
            <br />
            <span className="text-accent">Waiting for you.</span>
          </h2>
        </div>

        <p className="max-w-xs text-sm leading-7 text-zinc-400">
          From familiar airports to somewhere entirely new. Discover routes
          inspired by real-world aviation.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative isolate min-h-107.5 overflow-hidden rounded-3xl border border-white/10 bg-[#111722] sm:min-h-135"
      >
        <Image
          src="/images/features-discovery.jpg"
          alt="LATAM Airbus A320 flying above the clouds"
          fill
          loading="eager"
          sizes="(max-width: 1280px) 100vw, 1152px"
          className="object-cover object-center"
        />

        {/* Gradient optimized for top-aligned content */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#080C13]/75 via-transparent to-[#080C13]/35" />

        {/* Route information */}
        <div className="absolute inset-x-6 top-8 z-10 sm:inset-x-10 sm:top-10">
          <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-white/75 uppercase">
            Route inspiration / 001
          </p>

          <div className="flex flex-wrap items-center gap-3 text-white sm:gap-6">
            <span className="font-display text-4xl font-semibold sm:text-6xl">
              SUMU
            </span>

            <span className="flex items-center gap-2 text-accent sm:gap-3">
              <span className="h-px w-5 bg-accent/70 sm:w-12" />
              <Plane size={21} className="rotate-45" />
              <span className="h-px w-5 bg-accent/70 sm:w-12" />
            </span>

            <span className="font-display text-4xl font-semibold sm:text-6xl">
              SBGR
            </span>
          </div>

          <p className="mt-4 text-sm text-white/80">
            Montevideo → São Paulo · Example route
          </p>
        </div>

        {/* Bottom action */}
        <div className="absolute right-6 bottom-6 z-10 sm:right-10 sm:bottom-10">
          <a
            href="#flight-explorer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-5 py-3 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-black/65"
          >
            Explore destinations
            <ArrowUpRight size={15} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
