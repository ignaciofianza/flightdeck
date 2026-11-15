import { ArrowUpRight, Plane, Radio } from "lucide-react";

type RouteIllustrationProps = {
  from?: string;
  to?: string;
  fromCity?: string;
  toCity?: string;
  aircraft?: string;
};

export function RouteIllustration({
  from = "SUMU",
  to = "SBGR",
  fromCity = "Montevideo",
  toCity = "São Paulo",
  aircraft = "A320neo",
}: RouteIllustrationProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#090E16] p-5 sm:p-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(105,155,255,0.12), transparent 65%)",
        }}
      />

      <div className="relative">
        <div className="mb-9 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio size={13} className="text-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              Route inspiration
            </span>
          </div>

          <span className="rounded border border-white/10 px-2 py-1 font-mono text-[9px] tracking-widest text-zinc-500">
            EXAMPLE
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {from}
            </p>
            <p className="mt-2 truncate text-xs text-zinc-500">{fromCity}</p>
          </div>

          <div className="flex min-w-0 flex-1 items-center px-1">
            <div className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgba(110,160,255,0.5)]" />

            <div className="h-px flex-1 bg-linear-to-r from-accent/60 to-accent/20" />

            <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10">
              <Plane size={17} className="rotate-45 text-accent" />
            </div>

            <div className="h-px flex-1 bg-linear-to-r from-accent/20 to-accent/60" />

            <div className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgba(110,160,255,0.5)]" />
          </div>

          <div className="min-w-0 text-right">
            <p className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {to}
            </p>
            <p className="mt-2 truncate text-xs text-zinc-500">{toCity}</p>
          </div>
        </div>

        <div className="mt-9 flex items-center justify-between border-t border-white/10 pt-5">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-600">
              Selected aircraft
            </p>
            <p className="mt-1.5 text-sm font-medium text-zinc-200">
              {aircraft}
            </p>
          </div>

          <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
            <ArrowUpRight size={16} className="text-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
