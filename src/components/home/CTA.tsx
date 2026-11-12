"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, LockKeyhole } from "lucide-react";

export function CallToAction() {
  return (
    <section className="border-t border-white/6 px-6 py-28 sm:py-36">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <LockKeyhole size={24} strokeWidth={1.4} className="mb-8 text-accent" />

        <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Your next adventure
          <br />
          is waiting.
        </h2>

        <p className="mt-6 max-w-lg text-base leading-8 text-zinc-400">
          FlightDeck is a private platform built for flight simulation
          enthusiasts. Create an account and request access to get started.
        </p>

        <Link
          href="/register"
          className="group mt-9 inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          Request access
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </motion.div>
    </section>
  );
}
