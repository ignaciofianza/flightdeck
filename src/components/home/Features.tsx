"use client";

import { motion } from "motion/react";
import { Shuffle, SlidersHorizontal, PlaneTakeoff } from "lucide-react";

const features = [
  {
    number: "01",
    icon: Shuffle,
    title: "Real-world flights",
    description:
      "Discover actual airline routes and flight information to bring more realism to your simulator.",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    title: "Your aircraft. Your rules.",
    description:
      "Filter flights by aircraft, airline, and preferences. Find routes that fit the way you fly.",
  },
  {
    number: "03",
    icon: PlaneTakeoff,
    title: "Ready for departure",
    description:
      "Get the route and flight details you need to start planning your next simulation.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="relative scroll-mt-28 border-t border-white/6 px-6 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-5 font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
            The platform
          </p>

          <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Spend less time searching.
            <br />
            More time flying.
          </h2>

          <p className="mt-6 text-base leading-8 text-zinc-400">
            FlightDeck takes the guesswork out of choosing your next flight, so
            you can focus on what matters.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                }}
                className="group rounded-2xl border border-white/[0.07] bg-white/2 p-7 transition-colors hover:border-white/15 hover:bg-white/4"
              >
                <div className="mb-12 flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/4">
                    <Icon
                      size={20}
                      strokeWidth={1.6}
                      className="text-zinc-200"
                    />
                  </div>

                  <span className="font-mono text-xs text-zinc-600">
                    {feature.number}
                  </span>
                </div>

                <h3 className="font-display text-xl font-medium text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
