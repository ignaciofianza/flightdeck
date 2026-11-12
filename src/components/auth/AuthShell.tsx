import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, PlaneTakeoff } from "lucide-react";

import { Brand } from "@/components/ui/brand";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between">
          <Brand />

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            Home
          </Link>
        </div>

        <main className="flex flex-1 items-center justify-center py-16">
          <div className="w-full max-w-105">{children}</div>
        </main>

        <p className="font-mono text-[10px] text-zinc-600">
          © {new Date().getFullYear()} FlightDeck
        </p>
      </div>

      <aside className="relative hidden overflow-hidden border-l border-white/6 bg-[#10151D] lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,rgba(125,170,255,0.10),transparent_65%)]"
        />

        <div className="relative flex items-center gap-2">
          <PlaneTakeoff size={17} className="text-accent" />

          <span className="font-mono text-[11px] tracking-[0.18em] text-zinc-400 uppercase">
            FlightDeck / Access
          </span>
        </div>

        <div className="relative max-w-xl">
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
            Discover. Plan. Fly.
          </p>

          <h2 className="font-display text-5xl leading-[1.1] font-semibold tracking-tight text-white xl:text-6xl">
            Your next flight
            <br />
            starts here.
          </h2>

          <p className="mt-7 max-w-md text-base leading-8 text-zinc-400">
            Discover real-world flights, explore new routes, and spend less time
            searching for your next adventure.
          </p>
        </div>

        <div className="relative flex items-center gap-3 border-t border-white/10 pt-7">
          <LockKeyhole size={16} className="text-accent" />

          <div>
            <p className="text-sm font-medium text-white">Private by design</p>

            <p className="mt-1 text-xs text-zinc-500">
              All accounts require approval before access.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
