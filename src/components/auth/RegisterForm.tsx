"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: RegisterValues) => {
    // TODO: Connect to the FlightDeck API.
    // The backend will create the account as PENDING.
    // Never grant access from the frontend.
    void values;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-10">
        <p className="mb-4 font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
          Join the platform
        </p>

        <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Request access.
        </h1>

        <p className="mt-4 text-sm leading-7 text-zinc-400">
          Create your account to join FlightDeck. Access is granted after
          approval.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-zinc-300"
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
              className="w-full rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/60"
            />

            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="mt-2 text-xs text-red-400"
              >
                {errors.name.message}
              </p>
            )}
          </div>

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

          <PasswordField
            id="password"
            label="Password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            error={errors.password?.message}
            {...register("password")}
          />

          <PasswordField
            id="confirmPassword"
            label="Confirm password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        <div className="mt-7 flex items-start gap-3 rounded-lg border border-white/6 bg-white/2 p-4">
          <LockKeyhole size={17} className="mt-0.5 shrink-0 text-accent" />

          <p className="text-xs leading-6 text-zinc-400">
            FlightDeck is an invite-only platform. Your account will remain
            pending until manually approved by an administrator.
          </p>
        </div>

        <button
          type="submit"
          className="group mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          Request access
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-white transition-colors hover:text-accent"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
