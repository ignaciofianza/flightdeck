"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { authClient } from "@/lib/auth-client";

type ProtectedRouteProps = {
  children: React.ReactNode;
  access: "approved" | "pending";
};

type AccessState = "loading" | "allowed";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export function ProtectedRoute({ children, access }: ProtectedRouteProps) {
  const router = useRouter();
  const [state, setState] = useState<AccessState>("loading");

  useEffect(() => {
    let active = true;

    async function verifyAccess() {
      const session = await authClient.getSession();

      if (!active) return;

      if (!session.data?.user) {
        router.replace("/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/private/me`, {
          credentials: "include",
          cache: "no-store",
        });

        if (!active) return;

        if (response.status === 401) {
          router.replace("/login");
          return;
        }

        if (response.status === 403) {
          if (access === "approved") {
            router.replace("/pending");
          } else {
            setState("allowed");
          }

          return;
        }

        if (!response.ok) {
          throw new Error("Unable to verify access");
        }

        if (access === "pending") {
          router.replace("/dashboard");
          return;
        }

        setState("allowed");
      } catch {
        if (active) {
          router.replace("/login");
        }
      }
    }

    void verifyAccess();

    return () => {
      active = false;
    };
  }, [router, access]);

  if (state === "loading") {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background text-white">
        <LoaderCircle size={25} className="animate-spin text-accent" />

        <p className="font-mono text-[10px] tracking-[0.18em] text-zinc-500 uppercase">
          Verifying flight clearance
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
