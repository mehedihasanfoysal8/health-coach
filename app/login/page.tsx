"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LS_EMAIL_KEY = "demo_email";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return;
        // No API — just stash email locally and go to dashboard
        setSubmitting(true);
        try {
            localStorage.setItem(LS_EMAIL_KEY, email.trim());
            router.push("/dashboard");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="-mt-16 sm:-mt-12 pb-16 bg-white flex flex-col justify-center sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow-lg sm:rounded-lg sm:px-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-[#237591]">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm sm:text-base text-gray-600">
                            Please sign in to your account
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={onSubmit}>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-[#185F9D]"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded pr-10 focus:outline-none focus:ring-0 focus:border-[#185F9D]"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible((v) => !v)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    aria-label={passwordVisible ? "Hide password" : "Show password"}
                                >
                                    {/* Eye (show) */}
                                    {!passwordVisible ? (
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    ) : (
                                        // Eye off (hide)
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-red-600 accent-[#185F9D] focus:ring-red-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <Link href="#" className="text-sm text-red-600 hover:text-red-700">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="text-white bg-[#185F9D] hover:bg-[#185F9D] w-full font-bold text-base rounded px-6 sm:px-8 py-2 cursor-pointer mr-2"
                            disabled={submitting || !email}
                        >
                            {submitting ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <a href="#" className="font-medium text-red-600 hover:text-red-700">
                            Sign up now
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
