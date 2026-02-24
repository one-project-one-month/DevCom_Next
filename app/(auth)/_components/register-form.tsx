"use client";

import { useState } from "react";
import { Eye, EyeOff, LoaderCircle, Mail, ShieldCheck, User } from "lucide-react";

import { SocialAuthButtons } from "@/app/(auth)/_components/social-auth-buttons";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the terms to create an account.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    setSuccess("Account created (mock). Connect this form to your register API.");
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-3">
        <label className="grid gap-1">
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Full name</span>
          <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-950">
            <User className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Email</span>
          <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-950">
            <Mail className="h-4 w-4 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.dev"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Password</span>
          <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-950">
            <ShieldCheck className="h-4 w-4 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              className="w-full bg-transparent text-sm outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="rounded p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </label>

        <label className="inline-flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input type="checkbox" checked={agreeTerms} onChange={(event) => setAgreeTerms(event.target.checked)} />
          I agree to the community guidelines and terms.
        </label>

        {error ? <p className="text-xs text-red-600 dark:text-red-300">{error}</p> : null}
        {success ? <p className="text-xs text-emerald-600 dark:text-emerald-300">{success}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-70"
        >
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
          Create Account
        </button>
      </form>

      <div className="relative py-1">
        <div className="h-px bg-slate-200 dark:bg-slate-700" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3 text-xs text-slate-500 dark:bg-slate-900 dark:text-slate-400">
          or continue with
        </span>
      </div>

      <SocialAuthButtons mode="register" />
    </div>
  );
}
