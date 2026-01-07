'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer className="w-full mt-auto">
      {pathname === "/" && (
        <div className="flex justify-start p-4 bg-white">
          <Link
          href="/feedback" 
          className="text-xs uppercase tracking-widest hover:text-gray-400 text-gray-900 transition-colors font-bold"
        >
          Feedback?
        </Link>
      </div>
      )}

      <div className="w-full py-3 bg-gray-900 border-t border-gray-800 text-center">
        <p className="text-sm text-gray-400">
          © 2025-{currentYear} <span className="text-white font-semibold">Promptly</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}