"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { PasswordField } from "./PasswordField";

const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
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
    // TODO: Connect to the FlightDeck API.
    // The backend must validate credentials and account status.
    // Only APPROVED users can access the platform.
    void values;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Heading */}
      <div className="mb-10">
        <p className="mb-4 font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
          Welcome back
        </p>

        <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Sign in.
        </h1>

        <p className="mt-4 text-sm leading-7 text-zinc-400">
          Enter your credentials to access your FlightDeck account.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
              className="w-full rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/60"
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
          <div>
            <PasswordField
              id="password"
              label="Password"
              autoComplete="current-password"
              placeholder="Enter your password"
              error={errors.password?.message}
              labelAction={
                <Link
                  href="/forgot-password"
                  className="text-xs text-zinc-500 transition-colors hover:text-accent"
                >
                  Forgot password?
                </Link>
              }
              {...register("password")}
            />
          </div>
        </div>

        {/* Access notice */}
        <div className="mt-7 flex items-start gap-3 rounded-lg border border-white/6 bg-white/2 p-4">
          <LockKeyhole size={17} className="mt-0.5 shrink-0 text-accent" />

          <p className="text-xs leading-6 text-zinc-400">
            FlightDeck is a private platform. Access is available only to
            approved accounts.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}

          {!isSubmitting && (
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          )}
        </button>
      </form>

      {/* Register */}
      <p className="mt-8 text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-white transition-colors hover:text-accent"
        >
          Request access
        </Link>
      </p>
    </motion.div>
  );
}
