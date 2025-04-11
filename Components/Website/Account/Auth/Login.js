"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"

export default function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        // Simulate authentication
        setTimeout(() => {
            setIsLoading(false)
            // router.push("/dashboard")
        }, 1500)
    }

    return (
        <div className="min-h-[80vh] flex flex-col">
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                        <p className="mt-2 text-gray-600">Enter your credentials to access your dashboard</p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-6 rounded-xl bg-white p-8 shadow-md">
                            <div>
                                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="h-12 rounded-lg"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </Label>
                                    <Link
                                        href="/auth/forgot-password"
                                        className="text-sm font-medium text-[#29abe2] hover:text-[#0055a4]"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        className="h-12 rounded-lg"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-500" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-500" />
                                        )}
                                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-[#0055a4] hover:bg-[#004483] rounded-lg cursor-pointer"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing in..." : "Sign in"}
                                </Button>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link href="/auth/register" className="font-medium text-[#29abe2] hover:text-[#0055a4]">
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

