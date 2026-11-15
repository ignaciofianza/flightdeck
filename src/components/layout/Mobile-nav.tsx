"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";

type NavigationItem = {
  label: string;
  id: "home" | "features" | "how-it-works";
};

type MobileNavProps = {
  navigation: readonly NavigationItem[];
  activeSection: NavigationItem["id"] | null;
  onNavigate: (section: NavigationItem["id"]) => void;
};

export function MobileNav({
  navigation,
  activeSection,
  onNavigate,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleItemClick = (section: NavigationItem["id"]) => {
    setOpen(false);
    onNavigate(section);
  };

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls={menuId}
        className={`flex size-11 cursor-pointer items-center justify-center rounded-xl border transition-colors ${
          open
            ? "border-accent/40 bg-accent/10 text-accent"
            : "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
        }`}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={
              reducedMotion ? false : { opacity: 0, y: -12, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.98 }
            }
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-15 right-0 z-50 w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-white/10 bg-[#101722] p-5 shadow-2xl"
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                  FlightDeck
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Flight discovery platform
                </p>
              </div>

              <span className="flex size-8 items-center justify-center rounded-full border border-accent/20 bg-accent/10">
                <span className="size-1.5 rounded-full bg-accent" />
              </span>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-1">
              {navigation.map((item, index) => {
                const active = activeSection === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={reducedMotion ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleItemClick(item.id)}
                      aria-current={
                        active
                          ? item.id === "home"
                            ? "page"
                            : "location"
                          : undefined
                      }
                      className={`group flex w-full cursor-pointer items-center gap-4 rounded-xl px-3 py-4 text-left transition-colors ${
                        active
                          ? "bg-accent/10 text-white"
                          : "text-zinc-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] ${
                          active ? "text-accent" : "text-zinc-600"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="flex-1 font-display text-xl font-medium tracking-tight">
                        {item.label}
                      </span>

                      {active ? (
                        <span className="size-1.5 rounded-full bg-accent" />
                      ) : (
                        <ArrowUpRight
                          size={17}
                          className="text-zinc-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Account */}
            <div className="mt-5 border-t border-white/10 pt-5">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                Sign in
                <ArrowUpRight size={15} />
              </Link>

              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="group mt-3 flex items-center justify-between rounded-xl bg-white px-5 py-4 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Get access
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-mono text-[9px] tracking-[0.12em] text-zinc-600 uppercase">
                Made in Uruguay 🇺🇾
              </span>

              <span className="font-mono text-[9px] tracking-[0.12em] text-zinc-600 uppercase">
                Discover. Explore. Fly.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
