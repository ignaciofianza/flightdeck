"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Clock3, PlaneTakeoff } from "lucide-react";

export function FlightDetailsShowcase() {
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:py-32 lg:grid-cols-2 lg:items-center lg:gap-20">
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative min-h-[440px] overflow-hidden rounded-3xl border border-white/10 bg-[#121926] sm:min-h-[570px]"
      >
        <Image
          src="/images/features-cockpit.webp"
          alt="Airliner cockpit at dusk"
          fill
          sizes="(max-width: 1024px) 100vw, 600px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090B0F]/90 via-transparent to-transparent" />
        <div className="absolute bottom-7 left-7 right-7">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/60">
            The journey starts here
          </p>
          <p className="mt-3 font-display text-3xl font-semibold text-white">
            Ready for departure.
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[.22em] text-accent">
          03 / FLIGHT DETAILS
        </p>
        <h2 className="font-display text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl">
          From inspiration
          <br />
          <span className="text-accent">to departure.</span>
        </h2>
        <p className="mt-7 max-w-lg text-base leading-8 text-zinc-400">
          Turn an idea into a route. See the airports, aircraft, and airline
          together before you head into your simulator.
        </p>
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#111722] p-5 sm:p-7">
          <div className="mb-7 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Flight preview
            </span>
            <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-accent">
              Example
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-3xl font-semibold text-white">
                EDDM
              </p>
              <p className="mt-1 text-xs text-zinc-500">Munich</p>
            </div>
            <div className="flex flex-1 items-center gap-2 text-accent">
              <span className="h-px flex-1 bg-accent/30" />
              <PlaneTakeoff size={20} />
              <span className="h-px flex-1 bg-accent/30" />
            </div>
            <div className="text-right">
              <p className="font-display text-3xl font-semibold text-white">
                LOWW
              </p>
              <p className="mt-1 text-xs text-zinc-500">Vienna</p>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                Aircraft
              </p>
              <p className="mt-2 text-sm text-white">A320neo</p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                Airline
              </p>
              <p className="mt-2 text-sm text-white">Lufthansa</p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-zinc-400">
            <span className="flex items-center gap-2">
              <Clock3 size={14} className="text-accent" /> Example duration: 65
              min
            </span>
            <ArrowRight size={16} className="text-accent" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
