"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock3, Plane, SlidersHorizontal } from "lucide-react";

type Route = {
  from: string;
  to: string;
  fromCity: string;
  toCity: string;
  aircraft: string;
  airline: string;
  minutes: number;
};
const routes: Route[] = [
  {
    from: "EDDM",
    to: "LOWW",
    fromCity: "Munich",
    toCity: "Vienna",
    aircraft: "A320neo",
    airline: "Lufthansa",
    minutes: 65,
  },
  {
    from: "EDDM",
    to: "EDDF",
    fromCity: "Munich",
    toCity: "Frankfurt",
    aircraft: "A320neo",
    airline: "Lufthansa",
    minutes: 65,
  },
  {
    from: "EGKK",
    to: "LEBL",
    fromCity: "London",
    toCity: "Barcelona",
    aircraft: "A320neo",
    airline: "easyJet",
    minutes: 125,
  },
  {
    from: "SUMU",
    to: "SBGR",
    fromCity: "Montevideo",
    toCity: "São Paulo",
    aircraft: "A320neo",
    airline: "LATAM",
    minutes: 155,
  },
  {
    from: "SBGR",
    to: "SBGL",
    fromCity: "São Paulo",
    toCity: "Rio de Janeiro",
    aircraft: "B737-800",
    airline: "GOL",
    minutes: 65,
  },
  {
    from: "EGSS",
    to: "EIDW",
    fromCity: "London",
    toCity: "Dublin",
    aircraft: "B737-800",
    airline: "Ryanair",
    minutes: 80,
  },
];
const field =
  "w-full rounded-xl border border-white/10 bg-[#171D28] px-4 py-3 text-sm text-white outline-none transition focus:border-accent/70";

export function FlightExplorerDemo() {
  const [aircraft, setAircraft] = useState("A320neo");
  const [airline, setAirline] = useState("Any airline");
  const [duration, setDuration] = useState(90);
  const airlines = useMemo(
    () => [
      "Any airline",
      ...new Set(
        routes.filter((r) => r.aircraft === aircraft).map((r) => r.airline),
      ),
    ],
    [aircraft],
  );
  const results = routes.filter(
    (r) =>
      r.aircraft === aircraft &&
      (airline === "Any airline" || r.airline === airline) &&
      r.minutes <= duration,
  );
  const changeAircraft = (value: string) => {
    setAircraft(value);
    setAirline("Any airline");
  };
  return (
    <div className="border-y border-white/8 bg-[#0D1119] py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[.22em] text-accent">
            02 / PERSONALIZE
          </p>
          <h2 className="font-display text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl">
            Your aircraft.
            <br />
            <span className="text-accent">Your rules.</span>
          </h2>
          <p className="mt-7 max-w-md text-base leading-8 text-zinc-400">
            Not every flight fits every simmer. Choose your aircraft, preferred
            airline, and how much time you have. Find a route worth flying.
          </p>
          <div className="mt-9 flex items-center gap-3 text-sm text-zinc-300">
            <SlidersHorizontal size={18} className="text-accent" /> Try the
            interactive preview
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#101722] shadow-[0_30px_100px_rgba(0,0,0,.25)]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <Plane size={17} className="text-accent" /> Flight explorer
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
              Interactive demo
            </span>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">
            <label className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Aircraft
              </span>
              <select
                className={field}
                value={aircraft}
                onChange={(e) => changeAircraft(e.target.value)}
              >
                <option>A320neo</option>
                <option>B737-800</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Airline
              </span>
              <select
                className={field}
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
              >
                {airlines.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </label>
            <div className="space-y-3 sm:col-span-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Maximum duration
                </span>
                <span className="font-mono text-xs text-white">
                  {Math.floor(duration / 60)}h{" "}
                  {String(duration % 60).padStart(2, "0")}m
                </span>
              </div>
              <input
                aria-label="Maximum flight duration"
                type="range"
                min="60"
                max="180"
                step="5"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-[#7BA7FF]"
              />
            </div>
          </div>
          <div className="border-t border-white/10 bg-[#0B111A] px-5 py-5 sm:px-7">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-white">
                Matching routes
              </span>
              <span className="font-mono text-xs text-accent">
                {results.length} found
              </span>
            </div>
            <div className="max-h-85 space-y-2 overflow-y-auto pr-1">
              {results.length ? (
                results.map((r) => (
                  <div
                    key={`${r.from}-${r.to}`}
                    className="rounded-xl border border-white/10 bg-white/3 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-xl font-semibold text-white">
                          {r.from}
                        </span>
                        <ArrowRight size={16} className="text-accent" />
                        <span className="font-display text-xl font-semibold text-white">
                          {r.to}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-zinc-400">
                        <Clock3 size={12} />
                        {r.minutes} min
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-zinc-500">
                      <span>
                        {r.fromCity} → {r.toCity}
                      </span>
                      <span>{r.airline}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-zinc-400">
                  No matches. Try a longer duration or another airline.
                </p>
              )}
            </div>
            <p className="mt-4 text-[10px] leading-5 text-zinc-600">
              Illustrative examples only — not verified live schedules.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
