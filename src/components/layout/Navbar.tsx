"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { Brand } from "@/components/ui/brand";
import { MobileNav } from "./Mobile-nav";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="border-b border-white/6 bg-background/85 backdrop-blur-2xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 sm:px-8"
        >
          <div className="flex shrink-0 items-center gap-5">
            <Brand />

            <div className="hidden h-6 w-px bg-white/10 lg:block" />
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const active = item.href === "/" && pathname === "/";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-lg px-4 py-2.5 text-[13px] font-medium transition-colors ${
                    active ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.label}

                  {active && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute right-4 bottom-1 left-4 h-px bg-accent"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-4 md:flex">
            <Link
              href="/login"
              className="text-[13px] font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-lg border border-white bg-white px-4 py-2.5 text-[13px] font-semibold text-black transition-all hover:bg-zinc-200"
            >
              Get access
              <ArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <MobileNav navigation={navigation} />
        </nav>
      </div>
    </motion.header>
  );
}
