"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function FeaturesCTA() {
  return (
    <div className="px-4 pb-6 sm:px-6 sm:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative isolate mx-auto flex min-h-120 max-w-[1600px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#111722] px-6 py-20 text-center sm:min-h-142.5"
      >
        <Image
          src="/images/features-final.jpg"
          alt="Aircraft flying above the clouds at sunrise"
          fill
          sizes="100vw"
          loading="eager"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#060A12]/55" />
        <div className="absolute inset-0 bg-linear-to-t from-[#060A12]/80 via-transparent to-[#060A12]/40" />
        <div className="relative z-10">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[.22em] text-white/75">
            04 / YOUR NEXT FLIGHT
          </p>
          <h2 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">
            The sky is waiting.
            <br />
            <span className="text-[#91B5FF]">Where to next?</span>
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-base leading-7 text-white/75">
            A new airport. A different aircraft. Another reason to fly.
          </p>
          <Link
            href="#"
            className="mt-9 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-background transition hover:bg-zinc-200"
          >
            Explore flights <ArrowUpRight size={17} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
