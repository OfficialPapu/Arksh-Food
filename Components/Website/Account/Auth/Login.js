"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Checkbox } from "@/Components/ui/checkbox"
import Image from "next/image"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, Loader2 } from "lucide-react"
import Link from "next/link"
import axios from "@/lib/axios"
import { useDispatch } from "react-redux"
import { Login } from "@/Components/Redux/ClientSlices/LoginSlice"
import { useRouter, useSearchParams } from "next/navigation"
import Hashids from 'hashids';
export function LoginForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter();
    const searchParams = useSearchParams();
    const hashids = new Hashids(process.env.NEXT_PUBLIC_HASH_SALT, 10);
    const encoded = searchParams.get('r');
    const hexCode = hashids.decodeHex(encoded);
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        try {
            setIsLoading(true)
            let UserDetails = { Email: email, Password: password, isAdmin: false };
            const response = await axios.post("api/auth/login", UserDetails);
            if (response.status === 200) {
                UserDetails = { ...response.data };
                dispatch(Login(UserDetails));
                router.push(Buffer.from(hexCode, 'hex').toString() ? Buffer.from(hexCode, 'hex').toString() : "/");
            }

        } catch (err) {
            console.log(err);
            setError(err.response.data || "Something went wrong")
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
                            Welcome Back
                        </h1>
                        <p className="mt-2 text-slate-500">Sign in to continue to your account</p>
                    </div>
                </div>

                {/* Error Message */}
                {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500">{error}</div>}

                {/* Login Form */}
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
                            required
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

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" className="border-slate-300 text-[#0055a4] focus:ring-[#39b0e5]" />
                            <label htmlFor="remember" className="text-sm text-slate-600">
                                Remember me
                            </label>
                        </div>
                        <Link
                            href="/auth/forgot-password"
                            className="text-sm font-medium text-[#39b0e5] transition-colors hover:text-[#0055a4]"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="relative h-14 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#0055a4] to-[#39b0e5] text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 size={18} className="animate-spin" /> Signing In...
                                </span>
                            ) : (
                                <>
                                    <span className="relative z-10">Sign In</span>
                                    <span className="absolute inset-0 -z-0 bg-gradient-to-r from-[#39b0e5] to-[#0055a4] opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
                                </>
                            )}
                        </Button>
                    </div>
                </form>

                <div className="my-8 flex items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="mx-4 flex-shrink text-sm text-slate-400">or</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm">
                    <p className="text-slate-600">
                        Don't have an account?{" "}
                        <Link href="/auth/register" className="font-semibold text-[#0055a4] transition-colors hover:text-[#39b0e5]">
                            Create an account
                        </Link>
                    </p>
                </div>

                {/* Terms */}
                <div className="mt-8 text-center text-xs text-slate-500">
                    By signing in, you agree to{" "}
                    <a href="#" className="text-[#39b0e5] transition-colors hover:text-[#0055a4]">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#39b0e5] transition-colors hover:text-[#0055a4]">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </div>
    )
}
