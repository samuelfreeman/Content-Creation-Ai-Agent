import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto">
      <div className="flex justify-start p-3 px-8 bg-white">
        <Link 
          href="/feedback" 
          className="text-xs uppercase tracking-widest hover:text-gray-400 text-gray-900 transition-colors font-bold"
        >
          Feedback?
        </Link>
      </div>

      {/* Bottom Section: Copyright Bar */}
      <div className="w-full py-3 bg-gray-900 border-t border-gray-800 text-center">
        <p className="text-sm text-gray-400">
          © {currentYear} <span className="text-white font-semibold">Promptly</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}