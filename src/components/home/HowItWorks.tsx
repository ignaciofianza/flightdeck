"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Plane,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const steps = [
  {
    number: "01",
    eyebrow: "MAKE IT PERSONAL",
    title: "Your aircraft.",
    highlight: "Your preferences.",
    description:
      "Choose the aircraft you want to fly, your favorite airlines, and how much time you have. FlightDeck starts with the way you like to fly.",
    icon: SlidersHorizontal,
    image: "/images/how-cockpit.jpeg",
    imageAlt: "Commercial aircraft cockpit",
    detail: "AIRCRAFT / AIRLINE / DURATION",
  },
  {
    number: "02",
    eyebrow: "EXPLORE THE POSSIBILITIES",
    title: "Discover flights.",
    highlight: "Not just destinations.",
    description:
      "Explore real-world airline flights that match your preferences. Find something familiar or discover an entirely new place to fly.",
    icon: Search,
    image: "/images/how-discover.jpg",
    imageAlt: "Commercial aircraft at an airport",
    detail: "REAL-WORLD FLIGHT DISCOVERY",
  },
  {
    number: "03",
    eyebrow: "TAKE IT TO YOUR SIMULATOR",
    title: "Found your flight?",
    highlight: "Make it yours.",
    description:
      "Choose the flight that inspires you and use its information to prepare your simulation session with your preferred planning tools.",
    icon: Plane,
    image: "/images/how-departure.jpg",
    imageAlt: "Airliner cockpit during flight",
    detail: "FROM DISCOVERY TO DEPARTURE",
  },
] as const;

export function HowItWorks() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/6 bg-background px-6 py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute top-0 left-1/2 h-120 w-120 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-20 max-w-4xl sm:mb-28"
        >
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-9 bg-accent" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              The FlightDeck experience
            </span>
          </div>

          <h2 className="font-display text-5xl leading-[1.05] font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            From curiosity
            <br />
            <span className="text-accent">to the cockpit.</span>
          </h2>

          <p className="mt-8 max-w-xl text-base leading-8 text-zinc-400">
            Every great flight starts with an idea. FlightDeck helps you turn
            that idea into your next simulation adventure.
          </p>

          <div className="mt-10 flex items-center gap-3 text-zinc-500">
            <ArrowDown size={16} className="text-accent" />
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase">
              Explore the process
            </span>
          </div>
        </motion.div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-5 hidden w-px bg-white/10 lg:block"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isReversed = index % 2 !== 0;

            return (
              <motion.article
                key={step.number}
                initial={reducedMotion ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.75,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative mb-24 last:mb-0 lg:mb-36 lg:pl-20"
              >
                <div className="absolute top-7 left-2 hidden size-7 items-center justify-center rounded-full border border-accent/40 bg-background lg:flex">
                  <span className="size-2 rounded-full bg-accent shadow-[0_0_16px_rgba(100,150,255,0.5)]" />
                </div>

                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div
                    className={isReversed ? "order-1 lg:order-2" : "order-1"}
                  >
                    <div className="mb-7 flex items-center gap-4">
                      <span className="font-display text-7xl font-semibold tracking-tight text-white/10 sm:text-8xl">
                        {step.number}
                      </span>

                      <div className="flex size-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
                        <Icon
                          size={21}
                          strokeWidth={1.5}
                          className="text-accent"
                        />
                      </div>
                    </div>

                    <p className="mb-5 font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                      {step.eyebrow}
                    </p>

                    <h3 className="font-display text-4xl leading-tight font-semibold tracking-tight text-white sm:text-5xl">
                      {step.title}
                      <br />
                      <span className="text-zinc-500">{step.highlight}</span>
                    </h3>

                    <p className="mt-7 max-w-md text-base leading-8 text-zinc-400">
                      {step.description}
                    </p>

                    <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-6">
                      <span className="size-1.5 rounded-full bg-accent" />
                      <span className="font-mono text-[10px] tracking-[0.12em] text-zinc-500 uppercase">
                        {step.detail}
                      </span>
                    </div>
                  </div>

                  <div
                    className={isReversed ? "order-2 lg:order-1" : "order-2"}
                  >
                    <div className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-white/10 bg-[#111722] sm:aspect-5/4">
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#080C13]/75 via-transparent to-[#080C13]/20" />

                      <div className="absolute top-6 right-6 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md">
                        <ArrowUpRight size={18} />
                      </div>

                      <div className="absolute right-6 bottom-6 left-6 flex items-center justify-between border-t border-white/20 pt-4">
                        <span className="font-mono text-[10px] tracking-[0.15em] text-white/75 uppercase">
                          FlightDeck / {step.number}
                        </span>

                        <span className="font-mono text-[10px] text-white/60">
                          EXPLORE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-10 sm:mt-32 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
              Ready when you are
            </p>

            <p className="mt-3 font-display text-2xl font-medium text-white sm:text-3xl">
              The next flight is yours to discover.
            </p>
          </div>

          <a
            href="#features"
            className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-accent/50 hover:bg-white/5"
          >
            Explore FlightDeck
            <ArrowUpRight size={17} className="text-accent" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
