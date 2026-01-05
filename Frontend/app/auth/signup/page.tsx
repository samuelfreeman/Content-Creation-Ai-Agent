"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";


export default function SignUpPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(true);
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        fullname,
        email,
        password,
      });
      setFullname("");
      setEmail("");
      setPassword("");
      setHidden(true);

      console.log(res.data);
      alert("Account created successfully");
       router.push("/generate");
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error(axiosError.response?.data);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Start generating content in seconds</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium text-gray-700 text-sm mb-1">
              Full Name
            </label>
            <input 
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-600 text-sm border border-gray-300 focus:ring-2 focus:ring-gray-900 outline-none transition-all"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border text-gray-600 text-sm border-gray-300 focus:ring-2 focus:ring-gray-900 outline-none transition-all"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
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
                type="button"
                className="absolute translate-y-3/4 -translate-x-12"
                onClick={() => setHidden(!hidden)}>
                  {hidden ?
                <FaRegEyeSlash size={16} color="black" /> :
                <FaRegEye size={16} color="black" />}
                </button>
                 {password.length > 0 && password.length < 6 && (
                    <p className="text-red-500 p-2 text-sm">Password must be at least 6 characters</p>
                  )}
           </div>
          </div>
            <button 
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mt-2 shadow-md"
            >
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
