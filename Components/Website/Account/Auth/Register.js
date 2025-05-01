"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Checkbox } from "@/Components/ui/checkbox"
import Image from "next/image"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon, Loader2, PhoneCall } from "lucide-react"
import Link from "next/link"
import axios from "@/lib/axios"
import { useRouter } from "next/navigation"

export function RegisterForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy")
      return
    }

    if (mobile.length < 10) {
      setError("Mobile number must be at least 10 digits")
      return
    }
    if (mobile.length > 15) {
      setError("Mobile number must be at most 15 digits")
      return
    }

    try {
      setIsLoading(true)
      const UserDetails = {
        Name: fullName,
        Email: email,
        Mobile: mobile,
        Password: password,
      }
      const response = await axios.post("api/auth/register", UserDetails);
      if (response.status === 201) {
        setSuccess("Account created successfully! Redirecting to login...")
        setFullName("");
        setEmail("");
        setMobile("");
        setPassword("");
        setConfirmPassword("");
        setAgreeTerms(false);
        setError("");
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    } catch (err) {
      setSuccess("");
      setError(err.response?.data?.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="flex w-full flex-col">
        {/* Logo and Heading Section */}
        <div className="relative mb-8 flex flex-col items-center">
          <div className="absolute -top-24 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#0055a4] to-[#39b0e5] p-[3px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
              <Image src="/Arksh Food.png" alt="ARKSH Logo" width={90} height={90} className="rounded-full !m-0" />
            </div>
          </div>

          <div className="mt-12 text-center">
            <h1 className="bg-gradient-to-r from-[#0055a4] to-[#39b0e5] bg-clip-text text-3xl font-bold text-transparent">
              Create Account
            </h1>
            <p className="mt-2 text-slate-500">Join ARKSH and get started today</p>
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500">{error}</div>}
        {success && <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-500">{success}</div>}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-[#0055a4]">
              <UserIcon size={18} />
            </div>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="h-14 rounded-xl border-slate-200 bg-slate-50 pl-11 pr-4 text-base shadow-sm transition-all focus:border-[#39b0e5] focus:bg-white focus:shadow-md focus:shadow-blue-500/10 focus:ring-1 focus:ring-[#39b0e5]"
            />
            <label className="absolute -top-2 left-4 hidden bg-white px-1 text-xs font-medium text-[#0055a4] group-focus-within:block">
              Full Name
            </label>
          </div>

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
            />
            <label className="absolute -top-2 left-4 hidden bg-white px-1 text-xs font-medium text-[#0055a4] group-focus-within:block">
              Email
            </label>
          </div>

          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-[#0055a4]">
              <PhoneCall size={18} />
            </div>
            <Input
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile Number"
              className="h-14 rounded-xl border-slate-200 bg-slate-50 pl-11 pr-4 text-base shadow-sm transition-all focus:border-[#39b0e5] focus:bg-white focus:shadow-md focus:shadow-blue-500/10 focus:ring-1 focus:ring-[#39b0e5]"
            />
            <label className="absolute -top-2 left-4 hidden bg-white px-1 text-xs font-medium text-[#0055a4] group-focus-within:block">
              Mobile Number
            </label>
          </div>

          {/* Password Field */}
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-[#0055a4]">
              <LockIcon size={18} />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-14 rounded-xl border-slate-200 bg-slate-50 pl-11 pr-12 text-base shadow-sm transition-all focus:border-[#39b0e5] focus:bg-white focus:shadow-md focus:shadow-blue-500/10 focus:ring-1 focus:ring-[#39b0e5]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-[#0055a4]"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
            <label className="absolute -top-2 left-4 hidden bg-white px-1 text-xs font-medium text-[#0055a4] group-focus-within:block">
              Password
            </label>
          </div>

          {/* Confirm Password Field */}
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-[#0055a4]">
              <LockIcon size={18} />
            </div>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="h-14 rounded-xl border-slate-200 bg-slate-50 pl-11 pr-12 text-base shadow-sm transition-all focus:border-[#39b0e5] focus:bg-white focus:shadow-md focus:shadow-blue-500/10 focus:ring-1 focus:ring-[#39b0e5]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-[#0055a4]"
            >
              {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
            <label className="absolute -top-2 left-4 hidden bg-white px-1 text-xs font-medium text-[#0055a4] group-focus-within:block">
              Confirm Password
            </label>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked === true)}
              className="mt-1 border-slate-300 text-[#0055a4] focus:ring-[#39b0e5]"
            />
            <label htmlFor="terms" className="text-sm text-slate-600">
              I agree to {" "}
              <a href="#" className="text-[#39b0e5] transition-colors hover:text-[#0055a4]">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#39b0e5] transition-colors hover:text-[#0055a4]">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Register Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="relative h-14 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#0055a4] to-[#39b0e5] text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" /> Creating Account...
                </span>
              ) : (
                <>
                  <span className="relative z-10">Create Account</span>
                  <span className="absolute inset-0 -z-0 bg-gradient-to-r from-[#39b0e5] to-[#0055a4] opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="mx-4 flex-shrink text-sm text-slate-400">or</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm">
          <p className="text-slate-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-[#0055a4] transition-colors hover:text-[#39b0e5]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
