"use client";

import { useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: string;
  error?: string;
  labelAction?: ReactNode;
};

export function PasswordField({
  label,
  error,
  labelAction,
  id,
  className = "",
  disabled,
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className="w-full">
      {/* Label */}
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-xs font-medium text-zinc-300">
          {label}
        </label>

        {labelAction && <div className="text-xs">{labelAction}</div>}
      </div>

      {/* Input */}
      <div className="group relative">
        <input
          {...props}
          id={id}
          disabled={disabled}
          type={visible ? "text" : "password"}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : props["aria-describedby"]}
          className={[
            "w-full rounded-xl border bg-white/[0.035]",
            "px-4 py-3 pr-13 text-sm text-white",
            "outline-none transition-all duration-200",
            "placeholder:text-zinc-600",
            "hover:border-white/20",
            "focus:bg-white/5.5",
            "focus:ring-3 focus:ring-accent/10",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-400/40 focus:border-red-400/60 focus:ring-red-400/10"
              : "border-white/10 focus:border-accent/60",
            className,
          ].join(" ")}
        />

        {/* Visibility toggle */}
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          aria-controls={id}
          className={[
            "absolute top-1/2 right-2.5",
            "flex size-9 -translate-y-1/2",
            "cursor-pointer items-center justify-center",
            "rounded-lg text-zinc-500",
            "transition-all duration-200",
            "hover:bg-white/5 hover:text-white",
            "focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-accent/50",
            "disabled:cursor-not-allowed disabled:opacity-40",
          ].join(" ")}
        >
          {visible ? (
            <EyeOff size={17} strokeWidth={1.7} />
          ) : (
            <Eye size={17} strokeWidth={1.7} />
          )}
        </button>
      </div>

      {/* Validation error */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-xs leading-5 text-red-400"
        >
          <span
            aria-hidden="true"
            className="size-1 shrink-0 rounded-full bg-red-400"
          />

          {error}
        </p>
      )}
    </div>
  );
}
