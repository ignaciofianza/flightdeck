"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleX,
  Clock3,
  LockKeyhole,
  PlaneTakeoff,
  ShieldCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/layout/Navbar";

type AccessStatus = "pending" | "rejected";

type TimelineStep = {
  number: string;
  title: string;
  description: string;
  state: "completed" | "current" | "locked";
};

const pendingSteps: TimelineStep[] = [
  {
    number: "01",
    title: "Account created",
    description: "Your registration was successful.",
    state: "completed",
  },
  {
    number: "02",
    title: "Awaiting review",
    description: "An administrator will review your request.",
    state: "current",
  },
  {
    number: "03",
    title: "Cleared for departure",
    description: "Access FlightDeck once approved.",
    state: "locked",
  },
];

const rejectedSteps: TimelineStep[] = [
  {
    number: "01",
    title: "Account created",
    description: "Your registration was successful.",
    state: "completed",
  },
  {
    number: "02",
    title: "Review completed",
    description: "Your request has been reviewed.",
    state: "completed",
  },
  {
    number: "03",
    title: "Access denied",
    description: "Your request was not approved.",
    state: "current",
  },
];

function AccessPageContent({
  status,
  isPreview,
}: {
  status: AccessStatus;
  isPreview: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const rejected = status === "rejected";

  const steps = rejected ? rejectedSteps : pendingSteps;

  const accentText = rejected ? "text-red-400" : "text-accent";

  return (
    <div className="flex min-h-svh flex-col bg-background text-white">
      <Navbar />

      {isPreview && (
        <div className="border-b border-amber-400/15 bg-amber-400/5 px-6 py-2.5 text-center font-mono text-[10px] tracking-wider text-amber-300 uppercase">
          Development preview · No account changes
        </div>
      )}

      <main className="relative flex flex-1 items-center overflow-hidden px-6 py-16 sm:px-10 lg:py-20">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${
            rejected
              ? "bg-[radial-gradient(ellipse_at_80%_25%,rgba(248,113,113,0.07),transparent_45%)]"
              : "bg-[radial-gradient(ellipse_at_80%_25%,rgba(125,170,255,0.075),transparent_45%)]"
          }`}
        />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          {/* Editorial content */}
          <motion.section
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mb-9 inline-flex items-center gap-3">
              <span
                className={`flex size-9 items-center justify-center rounded-xl border ${
                  rejected
                    ? "border-red-400/20 bg-red-400/10"
                    : "border-accent/20 bg-accent/10"
                }`}
              >
                {rejected ? (
                  <CircleX size={18} className="text-red-400" />
                ) : (
                  <PlaneTakeoff
                    size={17}
                    strokeWidth={1.6}
                    className="text-accent"
                  />
                )}
              </span>

              <span
                className={`font-mono text-[10px] tracking-[0.2em] uppercase ${accentText}`}
              >
                FlightDeck / Access request
              </span>
            </div>

            <h1 className="max-w-xl font-display text-[clamp(3.2rem,6vw,5.5rem)] leading-[1.02] font-semibold tracking-[-0.06em]">
              {rejected ? (
                <>
                  Clearance
                  <br />
                  <span className="text-red-400">denied.</span>
                </>
              ) : (
                <>
                  You&apos;re
                  <br />
                  almost
                  <br />
                  <span className="text-accent">cleared.</span>
                </>
              )}
            </h1>

            <p className="mt-8 max-w-md text-sm leading-8 text-zinc-400 sm:text-base">
              {rejected
                ? "Your access request has been reviewed, but it was not approved. Your account remains restricted, and access to FlightDeck is unavailable."
                : "Your account is ready. We're just waiting for final clearance before you can start exploring real-world flights and destinations."}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-zinc-200"
              >
                Return to home
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <span className="inline-flex items-center gap-2 text-xs text-zinc-500">
                <LockKeyhole size={14} />
                Restricted access
              </span>
            </div>

            {isPreview && (
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
                <span className="mr-2 font-mono text-[10px] text-zinc-500 uppercase">
                  Preview:
                </span>

                <Link
                  href="/pending?preview=pending"
                  className={`rounded-lg border px-3 py-2 text-xs transition-colors ${
                    !rejected
                      ? "border-accent/30 bg-accent/10 text-accent"
                      : "border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  Pending
                </Link>

                <Link
                  href="/pending?preview=rejected"
                  className={`rounded-lg border px-3 py-2 text-xs transition-colors ${
                    rejected
                      ? "border-red-400/30 bg-red-400/10 text-red-400"
                      : "border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  Rejected
                </Link>
              </div>
            )}
          </motion.section>

          {/* Clearance panel */}
          <motion.section
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-label="Account approval status"
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#11151c] shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-6 sm:px-8">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-zinc-500 uppercase">
                  FlightDeck / Clearance
                </p>

                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                  Access status
                </h2>
              </div>

              <span
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${
                  rejected
                    ? "border-red-400/20 bg-red-400/8"
                    : "border-amber-400/20 bg-amber-400/8"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    rejected ? "bg-red-400" : "bg-amber-400"
                  }`}
                />

                <span
                  className={`font-mono text-[10px] tracking-wider uppercase ${
                    rejected ? "text-red-300" : "text-amber-300"
                  }`}
                >
                  {rejected ? "Rejected" : "Pending"}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-5 border-b border-white/10 px-6 py-6 sm:px-8">
              <div>
                <p className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                  Destination
                </p>
                <p className="mt-2 font-display text-xl font-medium">
                  FlightDeck
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                  Clearance
                </p>
                <p
                  className={`mt-2 font-display text-xl font-medium ${
                    rejected ? "text-red-300" : "text-amber-300"
                  }`}
                >
                  {rejected ? "Denied" : "In review"}
                </p>
              </div>
            </div>

            <div className="px-6 py-8 sm:px-8">
              <p className="mb-7 font-mono text-[10px] tracking-[0.18em] text-zinc-500 uppercase">
                Your access journey
              </p>

              <div>
                {steps.map((step, index) => {
                  const completed = step.state === "completed";
                  const current = step.state === "current";

                  return (
                    <div
                      key={step.number}
                      className="relative flex gap-5 pb-8 last:pb-0"
                    >
                      {index !== steps.length - 1 && (
                        <div
                          aria-hidden="true"
                          className={`absolute top-9 bottom-0 left-4.25 w-px ${
                            completed ? "bg-accent/50" : "bg-white/10"
                          }`}
                        />
                      )}

                      <span
                        className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border ${
                          completed
                            ? "border-accent/40 bg-accent/15 text-accent"
                            : current
                              ? rejected
                                ? "border-red-400/40 bg-red-400/10 text-red-400"
                                : "border-amber-400/40 bg-amber-400/10 text-amber-300"
                              : "border-white/10 bg-white/5 text-zinc-600"
                        }`}
                      >
                        {completed ? (
                          <Check size={16} strokeWidth={2} />
                        ) : current && rejected ? (
                          <CircleX size={16} />
                        ) : current ? (
                          <Clock3 size={16} />
                        ) : (
                          <LockKeyhole size={14} />
                        )}
                      </span>

                      <div className="min-w-0 pt-0.5">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3
                            className={`text-sm font-medium ${
                              step.state === "locked"
                                ? "text-zinc-500"
                                : "text-white"
                            }`}
                          >
                            {step.title}
                          </h3>

                          {current && (
                            <span
                              className={`font-mono text-[9px] tracking-wider uppercase ${
                                rejected ? "text-red-400" : "text-amber-300"
                              }`}
                            >
                              {rejected ? "Denied" : "Current"}
                            </span>
                          )}
                        </div>

                        <p className="mt-1.5 text-xs leading-6 text-zinc-500">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-white/10 bg-white/2.5 px-6 py-5 sm:px-8">
              {rejected ? (
                <CircleX size={17} className="shrink-0 text-red-400" />
              ) : (
                <ShieldCheck size={17} className="shrink-0 text-accent" />
              )}

              <p className="text-xs leading-6 text-zinc-400">
                {rejected
                  ? "Your account does not currently have access to FlightDeck."
                  : "Your account is secured while approval is pending."}
              </p>

              <ArrowRight
                size={15}
                className="ml-auto shrink-0 text-zinc-600"
              />
            </div>
          </motion.section>
        </div>
      </main>

      <footer className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 border-t border-white/8 px-6 py-6 sm:px-8">
        <span className="font-mono text-[10px] text-zinc-600">
          © {new Date().getFullYear()} FlightDeck
        </span>

        <span className="font-mono text-[9px] tracking-[0.14em] text-zinc-600 uppercase">
          Discover. Explore. Fly.
        </span>
      </footer>
    </div>
  );
}

function PendingPageInner() {
  const searchParams = useSearchParams();

  const preview = searchParams.get("preview");

  const isPreview =
    process.env.NODE_ENV === "development" &&
    (preview === "pending" || preview === "rejected");

  const status: AccessStatus =
    isPreview && preview === "rejected" ? "rejected" : "pending";

  if (isPreview) {
    return <AccessPageContent status={status} isPreview />;
  }

  return (
    <ProtectedRoute access="pending">
      <AccessPageContent status="pending" isPreview={false} />
    </ProtectedRoute>
  );
}

export default function PendingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center bg-background text-zinc-400">
          Loading access status...
        </div>
      }
    >
      <PendingPageInner />
    </Suspense>
  );
}
