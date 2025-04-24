"use client"
import React from "react"
import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import Image from "next/image"
import { MailIcon, Loader2, ArrowLeftIcon, CheckCircle2Icon } from "lucide-react"
import Link from "next/link"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!email) {
      setError("Please enter your email address")
      return
    }

    try {
      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Handle successful submission
      setIsSubmitted(true)
      console.log("Password reset email sent to:", email)
    } catch (err) {
      console.error("Password reset request failed", err)
      setError("Failed to send reset link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="flex w-full flex-col">
        <div className="relative mb-8 flex flex-col items-center">
          <div className="absolute -top-24 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#0055a4] to-[#39b0e5] p-[3px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
              <Image src="/Arksh Food.png" alt="ARKSH Logo" width={90} height={90} className="rounded-full" />
            </div>
          </div>

          <div className="mt-12 text-center">
            <h1 className="bg-gradient-to-r from-[#0055a4] to-[#39b0e5] bg-clip-text text-3xl font-bold text-transparent">
              Forgot Password
            </h1>
            <p className="mt-2 text-slate-500">
              {isSubmitted
                ? "Check your email for reset instructions"
                : "Enter your email to receive a password reset link"}
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="flex flex-col items-center space-y-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2Icon size={40} className="text-green-500" />
            </div>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-800">Reset Link Sent!</h2>
              <p className="mt-2 text-slate-500">
                We've sent a password reset link to <span className="font-medium text-[#0055a4]">{email}</span>. Please
                check your inbox and follow the instructions.
              </p>
            </div>

            <div className="mt-4 text-center text-sm text-slate-500">
              Didn't receive the email? Check your spam folder or{" "}
              <button
                onClick={() => setIsSubmitted(false)}
                className="font-medium text-[#39b0e5] transition-colors hover:text-[#0055a4]"
              >
                try again
              </button>
            </div>

            <Link
              href="/auth/login"
              className="mt-4 flex items-center text-sm font-medium text-[#0055a4] transition-colors hover:text-[#39b0e5]"
            >
              <ArrowLeftIcon size={16} className="mr-1" /> Back to login
            </Link>
          </div>
        ) : (
          <>
            {/* Error Message */}
            {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500">{error}</div>}

            {/* Forgot Password Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-[#0055a4]">
                  <MailIcon size={18} />
                </div>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="h-14 rounded-xl border-slate-200 bg-slate-50 pl-11 pr-4 text-base shadow-sm transition-all focus:border-[#39b0e5] focus:bg-white focus:shadow-md focus:shadow-blue-500/10 focus:ring-1 focus:ring-[#39b0e5]"
                  required
                />
                <label className="absolute -top-2 left-4 hidden bg-white px-1 text-xs font-medium text-[#0055a4] group-focus-within:block">
                  Email
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="relative h-14 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#0055a4] to-[#39b0e5] text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin" /> Sending...
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10">Send Reset Link</span>
                      <span className="absolute inset-0 -z-0 bg-gradient-to-r from-[#39b0e5] to-[#0055a4] opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Back to Login */}
            <div className="mt-8 text-center">
              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-1 text-sm font-medium text-[#0055a4] transition-colors hover:text-[#39b0e5]"
              >
                <ArrowLeftIcon size={16} /> Back to login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
