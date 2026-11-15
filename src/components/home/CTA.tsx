"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, MoveUpRight } from "lucide-react";

export function CallToAction() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-background">
      <div className="relative min-h-170 sm:min-h-190 lg:min-h-210">
        <Image
          src="/images/cta-departure.jpg"
          alt="Airliner taking off against a dramatic evening sky"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Gradients for readability */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#080B11]/95 via-[#080B11]/65 to-[#080B11]/15" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#080B11] via-transparent to-[#080B11]/25" />

        <div className="relative z-10 mx-auto flex min-h-170 max-w-7xl flex-col justify-between px-6 py-14 sm:min-h-190 sm:py-20 lg:min-h-210">
          {/* Top label */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-accent" />
              <span className="font-mono text-[11px] tracking-[0.18em] text-white/75 uppercase">
                FlightDeck / Your next chapter
              </span>
            </div>

            <MoveUpRight
              size={22}
              strokeWidth={1.4}
              className="text-white/50"
            />
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-5xl py-20"
          >
            <p className="mb-7 font-mono text-xs tracking-[0.2em] text-accent uppercase">
              Your next flight starts here
            </p>

            <h2 className="font-display text-6xl leading-[0.95] font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-9xl">
              The sky
              <br />
              is calling<span className="text-accent">.</span>
            </h2>

            <p className="mt-9 max-w-lg text-base leading-8 text-white/75 sm:text-lg">
              Discover real-world flights, explore new possibilities, and find
              your next reason to take off.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/register"
                className="group inline-flex items-center gap-4 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition-colors hover:bg-accent hover:text-white"
              >
                Request access
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <span className="font-mono text-[10px] tracking-[0.12em] text-white/60 uppercase">
                Built for flight simmers
              </span>
            </div>
          </motion.div>

          {/* Bottom metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6">
            <span className="font-mono text-[10px] tracking-[0.16em] text-white/60 uppercase">
              FLIGHTDECK © 2026
            </span>

            <span className="font-mono text-[10px] tracking-[0.16em] text-white/60 uppercase">
              Discover more. Fly further.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
