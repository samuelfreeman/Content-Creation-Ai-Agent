"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, Check, Lock, ArrowRight,  } from "lucide-react";
import Link from "next/link";


export default function IdeaGenerator() {
  const [content, setContent] = useState("");
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  async function runTask() {
    if (!input.trim() || isRunning) return;

    try {
      setIsRunning(true);
      setContent("");
      const response = await fetch(
        "https://promptly-backend-b8yu.onrender.com/server",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task: "Generate Idea", content: input }),
        }
      );

      const data = await response.json();
      setContent(data.result ?? JSON.stringify(data, null, 2));
    } catch (err) {
      setContent("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  }

  const handleCopy = () => {
    if (content) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;
      const textToCopy = tempDiv.textContent || tempDiv.innerText || "";
      navigator.clipboard.writeText(textToCopy).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      });
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-[#030712] text-slate-200 p-6 overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-2xl z-10">
        {/* Login Hint Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <div className="flex items-center gap-2 px-2">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-medium text-slate-400">
              Free version: 3 ideas per day.
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-indigo-400">
            <Link
              href="/auth/signup" 
              className="hover:underline transition-all"
             >
              SignUp 
            </Link>
            /
            <Link 
              href="auth/login" 
              className="hover:underline transition-all"
            >
              Login for full experience
            </Link>
             <ArrowRight className="w-3 h-3" />
          </div>
        </motion.div>

        {/* Main Header */}
        {!content && !isRunning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-white to-slate-500 mb-4">
              What&apos;s your Idea?
            </h1>
            <p className="text-slate-400 text-lg">
              Describe your vision and let AI craft it.
            </p>
          </motion.div>
        )}

        {/* Output Area */}
        <AnimatePresence mode="wait">
          {content && !isRunning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative group mb-8 p-8 bg-white/3 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl"
            >
              <div
                className="prose prose-invert max-w-none text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 rounded-xl bg-indigo-600 hover:bg-white/5 transition-all duration-300 border border-white/10"
              >
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="A sustainable coffee brand for Gen Z..."
            className="w-full p-6 bg-white/3 border border-white/10 rounded-3xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-500 min-h-40 resize-none text-lg shadow-inner"
          />

          <div className="absolute bottom-4 right-4">
            <button
              onClick={runTask}
              disabled={isRunning || !input.trim()}
              className="group relative flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 font-bold text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 active:scale-95 overflow-hidden"
            >
              {isRunning ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Running...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Generate Idea</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}