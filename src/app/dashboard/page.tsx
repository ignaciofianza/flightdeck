
"use client";

import Link from "next/link";
import { ArrowUpRight, Compass, PlaneTakeoff } from "lucide-react";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/layout/Navbar";

export default function DashboardPage() {
  return (
    <ProtectedRoute access="approved">
      <div className="min-h-svh bg-background text-white">
        <Navbar />

        <main className="mx-auto max-w-6xl px-6 py-20 sm:px-12">
          <div className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            <PlaneTakeoff size={16} />
            Cleared for departure
          </div>

          <h1 className="max-w-3xl font-display text-5xl font-semibold tracking-tight sm:text-7xl">
            Your flight deck<span className="text-accent">.</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-400">
            You&apos;re cleared to explore FlightDeck. Your next destination
            starts here.
          </p>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-surface p-8">
              <Compass size={24} className="text-accent" />

              <h2 className="mt-6 font-display text-2xl font-semibold">
                Discover flights
              </h2>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Explore real-world routes and find inspiration for your
                next simulation.
              </p>

              <span className="mt-8 inline-flex items-center gap-2 text-xs text-zinc-500">
                Coming soon
                <ArrowUpRight size={15} />
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface p-8">
              <PlaneTakeoff size={24} className="text-accent" />

              <h2 className="mt-6 font-display text-2xl font-semibold">
                Your journeys
              </h2>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Your personal space for discovering and organizing flights.
              </p>

              <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 text-xs text-zinc-400 transition-colors hover:text-white"
              >
                Back to home
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
