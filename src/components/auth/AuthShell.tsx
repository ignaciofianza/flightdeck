import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, PlaneTakeoff, Radio } from "lucide-react";

import { Brand } from "@/components/ui/brand";

type AuthVariant = "login" | "register";

type AuthShellProps = {
  children: ReactNode;
  variant: AuthVariant;
};

const content = {
  login: {
    image: "/images/auth-background.jpg",
    imageAlt: "Airport control tower at sunset",
    eyebrow: "FlightDeck / Returning pilot",
    title: (
      <>
        Welcome back
        <br />
        <span className="text-accent">aboard.</span>
      </>
    ),
    description:
      "Your next destination is waiting. Pick up where you left off and get back to exploring.",
    footer: "Ready for your next departure",
    code: "FD / SIGN IN",
  },
  register: {
    image: "/images/auth-register.jpg",
    imageAlt: "Aircraft parked at an airport terminal",
    eyebrow: "FlightDeck / New explorer",
    title: (
      <>
        Every journey
        <br />
        starts <span className="text-accent">here.</span>
      </>
    ),
    description:
      "Discover real-world routes, explore new destinations, and make every flight count.",
    footer: "Your adventure begins here",
    code: "FD / REGISTER",
  },
} satisfies Record<
  AuthVariant,
  {
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: ReactNode;
    description: string;
    footer: string;
    code: string;
  }
>;

export function AuthShell({ children, variant }: AuthShellProps) {
  const page = content[variant];
  const isRegister = variant === "register";

  return (
    <div className="grid min-h-svh bg-background text-white lg:grid-cols-[1fr_0.9fr]">
      {/* LEFT SIDE */}
      <section className="flex min-h-svh min-w-0 flex-col px-6 sm:px-12 lg:px-14 xl:px-20">
        <header className="flex shrink-0 items-center justify-between gap-6 py-6 lg:py-7">
          <Brand priority />

          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />
            Home
          </Link>
        </header>

        <main
          className={`flex flex-1 items-center justify-center ${
            isRegister ? "py-6 lg:py-7" : "py-10"
          }`}
        >
          <div className="w-full max-w-105">{children}</div>
        </main>

        <footer className="flex shrink-0 items-center justify-between gap-4 py-5">
          <p className="font-mono text-[10px] text-zinc-600">
            © {new Date().getFullYear()} FlightDeck
          </p>

          <span className="font-mono text-[9px] tracking-wider text-zinc-600 uppercase">
            {page.code}
          </span>
        </footer>
      </section>

      {/* RIGHT SIDE */}
      <aside className="relative hidden min-h-svh min-w-0 overflow-hidden border-l border-white/10 lg:block">
        <Image
          src={page.image}
          alt={page.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover object-center"
        />

        {/* Image gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/25 to-background/10" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,transparent_10%,rgba(9,11,15,0.3)_100%)]" />

        {/* Editorial content */}
        <div className="relative z-10 flex h-full min-h-svh flex-col px-8 py-8 xl:px-12 xl:py-10">
          {/* Top */}
          <div className="flex shrink-0 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {isRegister ? (
                <PlaneTakeoff
                  size={16}
                  strokeWidth={1.5}
                  className="text-accent"
                />
              ) : (
                <Radio size={16} strokeWidth={1.5} className="text-accent" />
              )}

              <span className="font-mono text-[10px] tracking-[0.16em] text-white/75 uppercase">
                FlightDeck / Access
              </span>
            </div>

            <span className="font-mono text-[10px] text-white/45">
              {page.code}
            </span>
          </div>

          <div className="min-h-8 flex-1" />

          {/* Bottom content */}
          <div className="max-w-lg shrink-0">
            <p className="mb-4 font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
              {page.eyebrow}
            </p>

            <h2
              className={`font-display font-semibold tracking-[-0.055em] ${
                isRegister
                  ? "text-[clamp(2.25rem,3vw,3.5rem)] leading-[1.1]"
                  : "text-[clamp(2.5rem,3.5vw,4rem)] leading-[1.08]"
              }`}
            >
              {page.title}
            </h2>

            <p className="mt-4 max-w-sm text-[13px] leading-6 text-zinc-200">
              {page.description}
            </p>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/20 pt-4">
              <div className="flex items-center gap-3">
                <span className="size-1.5 shrink-0 rounded-full bg-accent" />

                <span className="font-mono text-[9px] tracking-widest text-white/65 uppercase">
                  {page.footer}
                </span>
              </div>

              <ArrowUpRight size={16} className="shrink-0 text-accent" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
