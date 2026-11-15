"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Settings,
  Shield,
  UserRound,
} from "lucide-react";

type AccountMenuProps = {
  name: string;
  email: string;
  isAdmin: boolean;
  isApproved: boolean;
  signingOut: boolean;
  onSignOut: () => void;
};

export function AccountMenu({
  name,
  email,
  isAdmin,
  isApproved,
  signingOut,
  onSignOut,
}: AccountMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "FD";

  const itemClass =
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-zinc-300 transition-colors hover:bg-white/5 hover:text-white";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-2.5 py-2 transition-all ${
          open
            ? "border-accent/30 bg-white/7"
            : "border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5"
        }`}
      >
        <span className="flex size-8 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 font-display text-[11px] font-semibold text-accent">
          {initials}
        </span>

        <span className="hidden max-w-32 truncate text-[13px] font-medium text-white lg:block">
          {name.split(" ")[0]}
        </span>

        <ChevronDown
          size={14}
          className={`text-zinc-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Account"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute top-[calc(100%+12px)] right-0 z-60 w-72 overflow-hidden rounded-2xl border border-white/10 bg-surface p-2 shadow-2xl shadow-black/50"
          >
            <div className="flex items-center gap-3 px-3 py-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 font-display text-sm font-semibold text-accent">
                {initials}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {name}
                </p>
                <p className="mt-1 truncate text-xs text-zinc-500">{email}</p>
              </div>
            </div>

            <div className="mx-3 mb-2 flex items-center gap-2">
              <span
                className={`size-1.5 rounded-full ${
                  isApproved ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />
              <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
                {isApproved ? "Approved account" : "Pending approval"}
              </span>
              {isAdmin && (
                <span className="ml-auto rounded-md border border-accent/20 px-2 py-0.5 font-mono text-[9px] text-accent uppercase">
                  Admin
                </span>
              )}
            </div>

            <div className="my-2 h-px bg-white/10" />

            <div className="flex flex-col gap-0.5">
              <Link
                role="menuitem"
                href={isApproved ? "/dashboard" : "/pending"}
                onClick={() => setOpen(false)}
                className={`${itemClass} ${
                  pathname === "/dashboard" || pathname === "/pending"
                    ? "bg-accent/8 text-accent"
                    : ""
                }`}
              >
                <LayoutDashboard size={16} />
                {isApproved ? "Dashboard" : "Access status"}
              </Link>

              <span
                aria-disabled="true"
                title="Coming soon"
                className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-zinc-600"
              >
                <UserRound size={16} />
                My profile
                <span className="ml-auto font-mono text-[9px] uppercase">
                  Soon
                </span>
              </span>

              <span
                aria-disabled="true"
                title="Coming soon"
                className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-zinc-600"
              >
                <Settings size={16} />
                Settings
                <span className="ml-auto font-mono text-[9px] uppercase">
                  Soon
                </span>
              </span>

              {isAdmin && (
                <Link
                  role="menuitem"
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className={itemClass}
                >
                  <Shield size={16} className="text-accent" />
                  Administration
                </Link>
              )}
            </div>

            <div className="my-2 h-px bg-white/10" />

            <button
              type="button"
              role="menuitem"
              disabled={signingOut}
              onClick={() => {
                setOpen(false);
                onSignOut();
              }}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-red-400 transition-colors hover:bg-red-400/8 disabled:opacity-50"
            >
              {signingOut ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <LogOut size={16} />
              )}
              {signingOut ? "Signing out..." : "Sign out"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
