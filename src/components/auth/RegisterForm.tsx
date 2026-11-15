"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  AlertCircle,
  LoaderCircle,
  PlaneTakeoff,
  ShieldCheck,
} from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";
import { PasswordField } from "./PasswordField";

const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name."),
    email: z.email("Enter a valid email address."),
    password: z.string().min(8, "Password must contain at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-zinc-600 hover:border-white/20 focus:border-accent/60 focus:bg-white/[0.055] focus:ring-3 focus:ring-accent/10";

export function RegisterForm() {
  const reducedMotion = useReducedMotion();

  const [serverError, setServerError] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const onSubmit = async (values: RegisterValues) => {
    setServerError(null);

    try {
      const { error } = await authClient.signUp.email({
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });

      if (error) {
        setServerError(
          error.message || "Unable to create your account. Please try again.",
        );
        return;
      }

      setRegistered(true);
    } catch {
      setServerError(
        "Unable to connect to FlightDeck. Please try again shortly.",
      );
    }
  };

  if (registered) {
    return (
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-6"
      >
        <div className="mb-6 flex size-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
          <Check size={24} className="text-accent" />
        </div>

        <p className="mb-3 font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
          FlightDeck / Request received
        </p>

        <h1 className="font-display text-4xl font-semibold tracking-tight text-white">
          You&apos;re on the list
          <span className="text-accent">.</span>
        </h1>

        <p className="mt-4 text-sm leading-7 text-zinc-400">
          Your account has been created successfully. An administrator will
          review your request before you can access FlightDeck.
        </p>

        <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4">
          <ShieldCheck size={19} className="shrink-0 text-accent" />

          <div>
            <p className="text-sm font-medium text-white">Awaiting approval</p>

            <p className="mt-1 text-xs text-zinc-500">
              Your account is pending review.
            </p>
          </div>
        </div>

        <Link
          href="/login"
          className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-accent"
        >
          Back to sign in
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full"
    >
      {/* Heading */}
      <div className="mb-6">
        <div className="mb-4 inline-flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg border border-accent/20 bg-accent/8">
            <PlaneTakeoff size={16} strokeWidth={1.6} className="text-accent" />
          </span>

          <span className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
            FlightDeck / Join the crew
          </span>
        </div>

        <h1 className="font-display text-[clamp(2.25rem,3.5vw,3rem)] leading-[1.1] font-semibold tracking-[-0.055em] text-white">
          Start exploring<span className="text-accent">.</span>
        </h1>

        <p className="mt-3 max-w-sm text-[13px] leading-6 text-zinc-400">
          Create your account and request access to FlightDeck.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-3.5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-xs font-medium text-zinc-300"
            >
              Full name
            </label>

            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
              className={inputClassName}
            />

            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="mt-1.5 text-xs text-red-400"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-medium text-zinc-300"
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
                className="mt-1.5 text-xs text-red-400"
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
              autoComplete="new-password"
              placeholder="Create a password"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="mt-1.5 flex items-center gap-2">
              <span
                className={`flex size-4 items-center justify-center rounded-full border ${
                  password?.length >= 8
                    ? "border-accent/30 bg-accent/10 text-accent"
                    : "border-white/10 text-zinc-600"
                }`}
              >
                <Check size={10} strokeWidth={2.5} />
              </span>

              <span
                className={`text-[10px] ${
                  password?.length >= 8 ? "text-accent" : "text-zinc-500"
                }`}
              >
                At least 8 characters
              </span>
            </div>
          </div>

          {/* Confirm password */}
          <PasswordField
            id="confirmPassword"
            label="Confirm password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        {/* Server error */}
        {serverError && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/5 p-3.5"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" />

            <p className="text-xs leading-5 text-red-300">{serverError}</p>
          </div>
        )}

        {/* Approval notice */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-accent/10 bg-accent/[0.035] p-3.5">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-accent" />

          <p className="text-xs leading-5 text-zinc-400">
            New accounts require administrator approval.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group mt-5 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-background transition-all duration-200 hover:bg-zinc-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle size={17} className="animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Request access
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>
      </form>

      {/* Login */}
      <div className="mt-5 border-t border-white/8 pt-4">
        <p className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-white transition-colors hover:text-accent"
          >
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
