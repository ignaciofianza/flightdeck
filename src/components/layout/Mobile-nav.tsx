"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";

type NavigationItem = {
  label: string;
  href: string;
};

type MobileNavProps = {
  navigation: NavigationItem[];
};

export function MobileNav({ navigation }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className="flex size-10 items-center justify-center rounded-lg text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-14 z-50 w-[min(20rem,calc(100vw-2.5rem))] rounded-xl border border-white/10 bg-[#15171c] p-3 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="my-3 border-t border-white/10" />

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm text-zinc-300 hover:bg-white/5"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm font-medium text-black"
            >
              Request access
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
