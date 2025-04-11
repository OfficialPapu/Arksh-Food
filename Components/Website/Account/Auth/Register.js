"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Checkbox } from "@/Components/ui/checkbox"

export default function Register() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        // Simulate registration
        setTimeout(() => {
            setIsLoading(false)
            router.push("/auth/signin")
        }, 1500)
    }

    return (
        <div className="min-h-[80vh] flex flex-col">
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
                        <p className="mt-2 text-gray-600">Join ARKSH to access our services</p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-6 rounded-xl bg-white p-8 shadow-sm">
                            <div>
                                <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full name
                                </Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="h-12 rounded-lg"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <Label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                                    Number
                                </Label>
                                <Input
                                    id="number"
                                    name="number"
                                    type="number"
                                    required
                                    className="h-12 rounded-lg"
                                    placeholder="+97798XXXXXXX"
                                />
                            </div>

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
                                <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="off"
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
                                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="off"
                                    required
                                    className="h-12 rounded-lg"
                                />
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <Checkbox id="terms" required />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-medium text-gray-700">
                                        I agree to the{" "}
                                        <Link href="#" className="text-[#29abe2] hover:text-[#0055a4]">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="#" className="text-[#29abe2] hover:text-[#0055a4]">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-[#0055a4] hover:bg-[#004483] rounded-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Creating account..." : "Create account"}
                                </Button>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link href="/auth/login" className="font-medium text-[#29abe2] hover:text-[#0055a4]">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

