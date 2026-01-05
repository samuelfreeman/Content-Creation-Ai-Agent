"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hidden, setHidden] = useState(true);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const response = await axios.post("http://localhost:5000/login", {
      email,
      password,
    },
     { withCredentials: true }
  );
  
    console.log("Login successful:", response.data);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message || "Something went wrong");
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Something went wrong");
    }
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Log in to your Promptly account</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border text-gray-600 text-sm border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div>
              <input 
                type={ hidden ? "password" :"text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-gray-600 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 outline-none transition-all"
                placeholder="password"
                required
              />
              <button 
              className="absolute translate-y-3/4 -translate-x-12"
              onClick={() => setHidden(!hidden)}>
                {hidden ?
              <FaRegEyeSlash size={16} color="black" /> :
              <FaRegEye size={16} color="black" />}
              </button>
                         </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className={`w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mt-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-gray-900 font-bold hover:underline">
            Sign up for free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
