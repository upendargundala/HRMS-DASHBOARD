"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* LEFT SIDE */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Image
                src="/lupira-logo.png" // optional
                alt="Lupira"
                width={170}
                height={170}
              />
              
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">
              Email ID/ Employee ID
            </label>
            <input
              type="text"
              placeholder="Enter your Email/Employee ID"
              className="w-full rounded-md border border-gray-500 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-500 focus:border-white"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="w-full rounded-md border border-gray-500 bg-transparent px-4 py-3 pr-10 text-sm outline-none placeholder:text-gray-500 focus:border-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 accent-white"
              />
              Remember me
            </label>
            <Link href="#" className="hover:text-white">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button className="w-full rounded-md bg-white py-3 text-sm font-semibold text-black hover:bg-gray-200 transition">
            Login
          </button>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hidden lg:block lg:w-1/2">
        <Image
          src="/login-laptop.png" // use your neon laptop image
          alt="Login Visual"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
