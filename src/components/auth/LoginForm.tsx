
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  AlertCircle,
  LoaderCircle,
  Radio,
  ShieldCheck,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";
import { PasswordField } from "./PasswordField";

const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

type LoginValues = z.infer<typeof loginSchema>;

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition-all duration-200 placeholder:text-zinc-600 hover:border-white/20 focus:border-accent/60 focus:bg-white/[0.055] focus:ring-3 focus:ring-accent/10";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export function LoginForm() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setServerError(null);

    try {
      const { error } = await authClient.signIn.email({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });

      if (error) {
        setServerError(
          error.code === "INVALID_EMAIL_OR_PASSWORD"
            ? "Invalid email or password. Please try again."
            : error.message || "Unable to sign in. Please try again.",
        );
        return;
      }

      const response = await fetch(`${API_URL}/api/private/me`, {
        credentials: "include",
        cache: "no-store",
      });

      if (response.status === 403) {
        router.replace("/pending");
        return;
      }

      if (!response.ok) {
        setServerError(
          "We couldn't verify your account access. Please try again.",
        );
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setServerError(
        "Unable to connect to FlightDeck. Please try again shortly.",
      );
    }
  };

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full"
    >
      {/* Heading */}
      <div className="mb-8">
        <div className="mb-5 inline-flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg border border-accent/20 bg-accent/8">
            <Radio
              size={16}
              strokeWidth={1.6}
              className="text-accent"
            />
          </span>

          <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-accent uppercase">
            FlightDeck / Welcome back
          </span>
        </div>

        <h1 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.055em] text-white">
          Ready to fly<span className="text-accent">.</span>
        </h1>

        <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-400">
          Sign in to your account and continue discovering
          real-world flights.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-medium text-zinc-300"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
              className={inputClassName}
            />

            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-2 text-xs text-red-400"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <PasswordField
            id="password"
            label="Password"
            autoComplete="current-password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />
        </div>

        {/* Server error */}
        {serverError && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/5 p-4"
          >
            <AlertCircle
              size={17}
              className="mt-0.5 shrink-0 text-red-400"
            />

            <p className="text-xs leading-6 text-red-300">
              {serverError}
            </p>
          </div>
        )}

        {/* Access notice */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-accent/10 bg-accent/[0.035] p-4">
          <ShieldCheck
            size={17}
            className="mt-0.5 shrink-0 text-accent"
          />

          <p className="text-xs leading-6 text-zinc-400">
            FlightDeck is currently in private access.
            Only approved accounts can enter.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group mt-6 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-white px-5 py-4 text-sm font-semibold text-background transition-all duration-200 hover:bg-zinc-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle size={17} className="animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </form>

      {/* Registration */}
      <div className="mt-7 border-t border-white/8 pt-6">
        <p className="text-center text-sm text-zinc-500">
          New to FlightDeck?{" "}
          <Link
            href="/register"
            className="inline-flex items-center gap-1 font-medium text-white transition-colors hover:text-accent"
          >
            Request access
            <ArrowUpRight size={14} />
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
