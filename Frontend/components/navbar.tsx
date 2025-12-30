"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center justify-between bg-white px-8 py-4">
      {/* Left Section: Logo + Brand Name */}
      <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
        <div className="relative w-10 h-10 border-2 border-gray-900 rounded-b-full overflow-hidden flex items-center justify-center">
           <div className="flex items-center space-x-3">
        <Image
          src="/logo.png" 
          alt="Promptly Logo"
          width={50}
          height={40}
        />
        </div>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
          Promptly
        </h1>
      </Link>

      {/* Right Section: Auth Buttons */}
      {pathname === "/" && (
        <div className="flex items-center space-x-4">
        <Link
          href="/auth/login"
          className="text-gray-900 hover:text-gray-900 font-medium transition-colors"
      >
          Log In
        </Link>
        <Link
          href="/auth/signup"
          className="bg-gray-900 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-700 transition-all shadow-sm"
        >
          Sign Up
        </Link>
      </div>
    )}
      
    </nav>
  );
}