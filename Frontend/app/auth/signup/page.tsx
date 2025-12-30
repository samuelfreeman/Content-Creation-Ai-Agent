"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Start generating blog posts in seconds</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 text-sm mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-lg text-gray-600 text-sm border border-gray-300 focus:ring-2 focus:ring-gray-900 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-lg border text-gray-600 text-sm border-gray-300 focus:ring-2 focus:ring-gray-900 outline-none transition-all"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 text-gray-600 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 outline-none transition-all"
              placeholder="password"
            />
          </div>
          <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mt-2 shadow-md">
            Get Started
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-gray-900 font-bold hover:underline">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}