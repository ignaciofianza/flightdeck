"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Compass,
  LayoutDashboard,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Brand } from "@/components/ui/brand";
import { AccountMenu } from "./AccountMenu";
import { MobileNav } from "./Mobile-nav";

const navigation = [
  { label: "Home", id: "home" },
  { label: "Features", id: "features" },
  { label: "How it works", id: "how-it-works" },
] as const;

type SectionId = (typeof navigation)[number]["id"];

type AccessState = {
  approved: boolean;
  admin: boolean;
};

const SCROLL_TARGET_KEY = "flightdeck-scroll-target";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = useReducedMotion();

  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const user = session?.user;

  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const [scrolled, setScrolled] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);
  const [access, setAccess] = useState<AccessState | null>(null);
  const [accessLoading, setAccessLoading] = useState(false);

  const isPrivate =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings") ||
    pathname === "/pending";

  const isAuthenticated = Boolean(user);
  const isApproved = access?.approved === true;
  const isAdmin = access?.admin === true;

  useEffect(() => {
    if (!user?.id) return;

    const controller = new AbortController();

    const loadAccess = async () => {
      setAccessLoading(true);

      try {
        const approvedResponse = await fetch(`${API_URL}/api/private/me`, {
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });

        if (approvedResponse.status === 401) {
          setAccess({ approved: false, admin: false });
          return;
        }

        if (
          approvedResponse.status !== 200 &&
          approvedResponse.status !== 403
        ) {
          throw new Error("Unable to verify account access");
        }

        const approved = approvedResponse.ok;
        let admin = false;

        if (approved) {
          const adminResponse = await fetch(`${API_URL}/api/admin/me`, {
            credentials: "include",
            cache: "no-store",
            signal: controller.signal,
          });

          if (adminResponse.status !== 200 && adminResponse.status !== 403) {
            throw new Error("Unable to verify administrator role");
          }

          admin = adminResponse.ok;
        }

        if (!controller.signal.aborted) {
          setAccess({ approved, admin });
        }
      } catch {
        if (!controller.signal.aborted) {
          setAccess(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setAccessLoading(false);
        }
      }
    };

    void loadAccess();

    return () => controller.abort();
  }, [user?.id]);

  const scrollToSection = useCallback(
    (section: SectionId, animated = true) => {
      const behavior: ScrollBehavior =
        animated && !reducedMotion ? "smooth" : "instant";

      if (section === "home") {
        window.scrollTo({ top: 0, behavior });
        return;
      }

      document.getElementById(section)?.scrollIntoView({
        behavior,
        block: "start",
      });
    },
    [reducedMotion],
  );

  const handleNavigation = useCallback(
    (section: SectionId) => {
      if (pathname !== "/") {
        sessionStorage.setItem(SCROLL_TARGET_KEY, section);
        router.push("/");
        return;
      }

      scrollToSection(section);
    },
    [pathname, router, scrollToSection],
  );

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 24);

      if (pathname !== "/") return;

      const position = window.scrollY + 160;
      const features = document.getElementById("features");
      const howItWorks = document.getElementById("how-it-works");

      if (howItWorks && position >= howItWorks.offsetTop) {
        setActiveSection("how-it-works");
      } else if (features && position >= features.offsetTop) {
        setActiveSection("features");
      } else {
        setActiveSection("home");
      }
    };

    updateScrollState();

    window.addEventListener("scroll", updateScrollState, {
      passive: true,
    });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const target = sessionStorage.getItem(SCROLL_TARGET_KEY);
    if (!target) return;

    sessionStorage.removeItem(SCROLL_TARGET_KEY);

    if (
      target !== "home" &&
      target !== "features" &&
      target !== "how-it-works"
    ) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      scrollToSection(target, false);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, scrollToSection]);

  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);
    setSignOutError(null);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message || "Unable to sign out.");
      }

      setAccess(null);
      router.replace("/login");
      router.refresh();
    } catch {
      setSignOutError("Unable to sign out. Please try again.");
      setSigningOut(false);
    }
  };

  const accountLoading =
    sessionLoading || (isAuthenticated && (accessLoading || !access));

  return (
    <motion.header
      initial={reducedMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="sticky top-0 z-50 w-full"
    >
      <div
        className={`border-b backdrop-blur-2xl transition-colors duration-300 ${
          scrolled
            ? "border-white/10 bg-background/95"
            : "border-white/6 bg-background/85"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className={`mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 transition-[height] duration-300 sm:px-8 ${
            scrolled ? "h-17" : "h-20"
          }`}
        >
          <div className="flex shrink-0 items-center gap-5">
            <Brand priority />
            <div className="hidden h-7 w-px bg-white/10 xl:block" />
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {isPrivate ? (
              <>
                {isApproved && (
                  <Link
                    href="/dashboard"
                    className={`relative inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium ${
                      pathname === "/dashboard"
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <LayoutDashboard size={15} />
                    Dashboard
                    {pathname === "/dashboard" && (
                      <span className="absolute right-4 bottom-1 left-4 h-px bg-accent" />
                    )}
                  </Link>
                )}

                {!isApproved && (
                  <Link
                    href="/pending"
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] text-white"
                  >
                    <ShieldCheck size={15} />
                    Access status
                  </Link>
                )}

                {isApproved && (
                  <span
                    title="Coming soon"
                    className="inline-flex cursor-not-allowed items-center gap-2 px-4 py-2.5 text-[13px] text-zinc-600"
                  >
                    <Compass size={15} />
                    Discover flights
                  </span>
                )}
              </>
            ) : (
              navigation.map((item) => {
                const active = pathname === "/" && activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigation(item.id)}
                    aria-current={
                      active
                        ? item.id === "home"
                          ? "page"
                          : "location"
                        : undefined
                    }
                    className={`relative cursor-pointer rounded-lg px-4 py-2.5 text-[13px] font-medium transition-colors ${
                      active ? "text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {item.label}

                    {active && (
                      <motion.span
                        layoutId="navbar-active"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute right-4 bottom-1 left-4 h-px bg-accent"
                      />
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="hidden shrink-0 items-center gap-4 md:flex">
            {accountLoading ? (
              <LoaderCircle size={17} className="animate-spin text-zinc-500" />
            ) : user ? (
              <AccountMenu
                name={user.name || "FlightDeck Pilot"}
                email={user.email}
                isAdmin={isAdmin}
                isApproved={isApproved}
                signingOut={signingOut}
                onSignOut={handleSignOut}
              />
            ) : !isPrivate ? (
              <>
                <Link
                  href="/login"
                  className="text-[13px] font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  Sign in
                </Link>

                <Link
                  href="/register"
                  className="group inline-flex items-center gap-2 rounded-lg border border-white bg-white px-4 py-2.5 text-[13px] font-semibold text-black transition-colors hover:bg-zinc-200"
                >
                  Get access
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </>
            ) : null}
          </div>

          <MobileNav
            navigation={navigation}
            activeSection={pathname === "/" ? activeSection : null}
            onNavigate={handleNavigation}
            user={
              !accountLoading && user
                ? {
                    name: user.name || "FlightDeck Pilot",
                    email: user.email,
                  }
                : null
            }
            isAdmin={isAdmin}
            isApproved={isApproved}
            signingOut={signingOut}
            sessionLoading={accountLoading}
            onSignOut={handleSignOut}
          />
        </nav>

        {signOutError && (
          <div
            role="alert"
            className="mx-auto max-w-7xl px-6 pb-3 text-xs text-red-400 sm:px-8"
          >
            {signOutError}
          </div>
        )}
      </div>
    </motion.header>
  );
}
