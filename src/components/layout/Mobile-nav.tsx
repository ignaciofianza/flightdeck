"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Menu,
  Settings,
  Shield,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

type SectionId = "home" | "features" | "how-it-works";

type NavigationItem = {
  label: string;
  id: SectionId;
};

type MobileNavProps = {
  navigation: readonly NavigationItem[];
  activeSection: SectionId | null;
  onNavigate: (section: SectionId) => void;
  user?: {
    name: string;
    email: string;
  } | null;
  isAdmin?: boolean;
  isApproved?: boolean;
  signingOut?: boolean;
  sessionLoading?: boolean;
  onSignOut?: () => void;
};

export function MobileNav({
  navigation,
  activeSection,
  onNavigate,
  user,
  isAdmin = false,
  isApproved = false,
  signingOut = false,
  sessionLoading = false,
  onSignOut,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const menuId = useId();
  const pathname = usePathname();

  const isPrivate =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings") ||
    pathname === "/pending";

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const close = () => setOpen(false);

  const initials =
    user?.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "FD";

  const linkClass =
    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white";

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
            : "border-white/10 bg-white/5 text-white hover:bg-white/10"
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
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="absolute top-15 right-0 z-50 max-h-[calc(100svh-6rem)] w-[min(22rem,calc(100vw-2.5rem))] overflow-y-auto rounded-2xl border border-white/10 bg-[#10151d] p-5 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                  FlightDeck
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {isPrivate
                    ? "Flight operations"
                    : "Flight discovery platform"}
                </p>
              </div>

              <span className="flex size-8 items-center justify-center rounded-full border border-accent/20 bg-accent/10">
                <span className="size-1.5 rounded-full bg-accent" />
              </span>
            </div>

            {isPrivate ? (
              <div className="flex flex-col gap-1">
                <Link
                  href={isApproved ? "/dashboard" : "/pending"}
                  onClick={close}
                  className={linkClass}
                >
                  {isApproved ? (
                    <LayoutDashboard size={17} />
                  ) : (
                    <ShieldCheck size={17} />
                  )}
                  {isApproved ? "Dashboard" : "Access status"}
                </Link>

                {isApproved && (
                  <span className="flex items-center gap-3 px-3 py-3 text-sm text-zinc-600">
                    <Compass size={17} />
                    Discover flights
                    <span className="ml-auto text-[10px]">Soon</span>
                  </span>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {navigation.map((item, index) => {
                  const active = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        close();
                        onNavigate(item.id);
                      }}
                      aria-current={active ? "location" : undefined}
                      className={`group flex w-full cursor-pointer items-center gap-4 rounded-xl px-3 py-3.5 text-left ${
                        active
                          ? "bg-accent/10 text-white"
                          : "text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      <span className="font-mono text-[10px] text-accent/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-lg font-medium">
                        {item.label}
                      </span>
                      <ArrowUpRight size={16} className="text-zinc-500" />
                    </button>
                  );
                })}
              </div>
            )}

            <div className="mt-5 border-t border-white/10 pt-5">
              {sessionLoading ? (
                <div className="flex justify-center py-5">
                  <LoaderCircle
                    size={18}
                    className="animate-spin text-accent"
                  />
                </div>
              ) : user ? (
                <>
                  <div className="mb-4 flex items-center gap-3 px-2">
                    <div className="flex size-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-xs font-semibold text-accent">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-zinc-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {!isPrivate && (
                    <Link
                      href={isApproved ? "/dashboard" : "/pending"}
                      onClick={close}
                      className={linkClass}
                    >
                      <LayoutDashboard size={17} />
                      {isApproved ? "Dashboard" : "Access status"}
                    </Link>
                  )}

                  <div className="flex items-center gap-3 px-3 py-3 text-sm text-zinc-600">
                    <UserRound size={17} />
                    My profile
                    <span className="ml-auto text-[10px]">Soon</span>
                  </div>

                  <div className="flex items-center gap-3 px-3 py-3 text-sm text-zinc-600">
                    <Settings size={17} />
                    Settings
                    <span className="ml-auto text-[10px]">Soon</span>
                  </div>

                  {isAdmin && (
                    <Link href="/admin" onClick={close} className={linkClass}>
                      <Shield size={17} className="text-accent" />
                      Administration
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      close();
                      onSignOut?.();
                    }}
                    disabled={signingOut}
                    className="mt-3 flex w-full cursor-pointer items-center gap-3 rounded-xl border border-red-400/15 px-3 py-3 text-left text-sm text-red-400 disabled:opacity-50"
                  >
                    {signingOut ? (
                      <LoaderCircle size={17} className="animate-spin" />
                    ) : (
                      <LogOut size={17} />
                    )}
                    {signingOut ? "Signing out..." : "Sign out"}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={close} className={linkClass}>
                    Sign in
                    <ArrowUpRight size={15} className="ml-auto" />
                  </Link>

                  <Link
                    href="/register"
                    onClick={close}
                    className="mt-3 flex items-center justify-between rounded-xl bg-white px-5 py-4 text-sm font-semibold text-black hover:bg-zinc-200"
                  >
                    Get access
                    <ArrowRight size={18} />
                  </Link>
                </>
              )}
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="font-mono text-[9px] tracking-wider text-zinc-600 uppercase">
                Made in Uruguay 🇺🇾 · Discover. Explore. Fly.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
