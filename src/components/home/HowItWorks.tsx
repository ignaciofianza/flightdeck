"use client";

import { motion } from "motion/react";
import { SlidersHorizontal, Search, PlaneTakeoff } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: SlidersHorizontal,
    title: "Set your preferences",
    description:
      "Choose your aircraft, airline, departure airport, and other preferences.",
  },
  {
    number: "02",
    icon: Search,
    title: "Discover a real flight",
    description:
      "Find a matching real-world route with useful flight information.",
  },
  {
    number: "03",
    icon: PlaneTakeoff,
    title: "Take it to the skies",
    description:
      "Bring your flight into your favorite simulator and get ready for departure.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 border-t border-white/6 px-6 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-5 font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
            The process
          </p>

          <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            From idea to takeoff.
          </h2>

          <p className="mt-6 text-base leading-8 text-zinc-400">
            Finding your next flight shouldn&apos;t be the hardest part of
            flying. Three simple steps, and you&apos;re ready to go.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <div
            aria-hidden="true"
            className="absolute top-6 bottom-6 left-5.75 w-px bg-white/10"
          />

          <div className="relative space-y-14">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.12,
                  }}
                  className="flex items-start gap-6 sm:gap-9"
                >
                  <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#111722]">
                    <Icon size={19} strokeWidth={1.6} className="text-accent" />
                  </div>

                  <div className="pt-1">
                    <span className="font-mono text-[11px] tracking-wider text-accent">
                      STEP {step.number}
                    </span>

                    <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-white">
                      {step.title}
                    </h3>

                    <p className="mt-3 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
