"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [email, setEmail] = useState("")
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        // Simulate password reset email
        setTimeout(() => {
            setIsLoading(false)
            setIsSubmitted(true)
        }, 1500)
    }

    return (
        <div className="min-h-[80vh] flex flex-col">
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">Reset your password</h2>
                        <p className="mt-2 text-gray-600">We'll send you a link to reset your password</p>
                    </div>

                    {isSubmitted ? (
                        <div className="rounded-xl bg-white p-8 shadow-sm">
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Check your email</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the
                                    instructions.
                                </p>
                                <div className="mt-6">
                                    <Button asChild className="w-full h-12 bg-[#0055a4] hover:bg-[#004483] rounded-lg">
                                        <Link href="/auth/login">Return to sign in</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-6 rounded-xl bg-white p-8 shadow-sm">
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Button
                                        type="submit"
                                        className="w-full h-12 bg-[#0055a4] hover:bg-[#004483] rounded-lg"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Sending reset link..." : "Send reset link"}
                                    </Button>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Remember your password?{" "}
                                    <Link href="/auth/login" className="font-medium text-[#29abe2] hover:text-[#0055a4]">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </main>
        </div>
    )
}

