import Image from "next/image";
import { ArrowUpRight, Crosshair, Plane } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-142.5">
      <div className="absolute -inset-5 rounded-4xl bg-accent/5 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111722]">
        <div className="relative aspect-4/5 overflow-hidden sm:aspect-5/5 lg:aspect-4/5">
          <Image
            src="/images/hero-aircraft.avif"
            alt="Commercial aircraft in flight"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 570px"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#090B0F] via-[#090B0F]/20 to-transparent" />

          <div className="absolute top-6 right-6 left-6 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.18em] text-white/70 uppercase">
              FlightDeck / 001
            </span>

            <Crosshair size={20} strokeWidth={1} className="text-white/50" />
          </div>

          <div className="absolute right-6 bottom-7 left-6">
            <div className="mb-5 flex items-center gap-2">
              <Plane size={14} className="text-accent" />

              <span className="font-mono text-[10px] tracking-[0.18em] text-white/70 uppercase">
                Aviation / Exploration
              </span>
            </div>

            <h2 className="max-w-sm font-display text-3xl leading-tight font-medium tracking-tight text-white sm:text-4xl">
              Every flight begins
              <br />
              with a destination.
            </h2>

            <div className="mt-7 flex items-center justify-between border-t border-white/20 pt-5">
              <span className="font-mono text-[10px] tracking-widest text-white/60 uppercase">
                Made for simmers
              </span>

              <ArrowUpRight size={18} className="text-white/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
