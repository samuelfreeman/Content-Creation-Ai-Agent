"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Copy, 
  Check, 
  Video, 
  FileText, 
  ChevronDown, 
  Upload, 
  X,
} from "lucide-react";

const tasks = [
  "Generate Caption",
  "Generate Hashtags",
  "Generate Description",
  "Generate Thumbnail Text/Idea",
  "Generate Video Hook/Script",
];

export default function ContentGenerator() {
  const [content, setContent] = useState("");
  const [input, setInput] = useState("");
  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Video Upload States
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  async function runTask() {
    if (!input.trim() || isRunning) return;

    try {
      setIsRunning(true);
      setContent(""); 
      
      // Note: Backend integration goes here. 
      // For now, simulating the response structure.
      const response = await fetch(
        "https://promptly-backend-b8yu.onrender.com/server",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            task: selectedTask, 
            content: input,
            hasVideo: !!videoFile 
          }),
        }
      );

      const data = await response.json();
      setContent(data.result ?? "Your generated content will appear here.");
    } catch (err) {
      console.error(err);
      setContent("An error occurred. Please try again.");
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

  const headingText = "What are we creating today?".split("");

  return (
    <section className="flex flex-col items-center justify-start min-h-screen bg-[#0a0a0c] text-slate-200 p-4 md:p-8 font-sans">

      <AnimatePresence>
        {!content && !isRunning && (
          <motion.h1 
            exit={{ opacity: 0, y: -20 }}
            className="text-3xl md:text-4xl font-bold text-slate-200 my-10 text-center tracking-tight"
          >
            {headingText.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Output Card */}
      <AnimatePresence>
        {content && !isRunning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl mb-8 p-6 bg-white/3 border border-white/10 rounded-3xl backdrop-blur-xl relative group shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-4 text-indigo-400 font-semibold text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              AI Generated {selectedTask.split(' ')[1]}
            </div>
            <div
              className="prose prose-invert max-w-none text-slate-900"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-white/5 hover:bg-indigo-600 border border-white/10 rounded-xl transition-all"
            >
              {isCopied ? (
                <> <Check className="w-3.5 h-3.5" /> Copied! </>
              ) : (
                <> <Copy className="w-3.5 h-3.5" /> Copy </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Input Card */}
      <div className="w-full max-w-2xl p-6 bg-white/2 border border-white/5 rounded-[2.5rem] shadow-2xl backdrop-blur-sm">
        
        {/* Textarea Section */}
        <div className="relative mb-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your video topic or paste a script snippet..."
            className="w-full p-6 bg-black/20 border border-white/10 rounded-3xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all min-h-[140px] resize-none"
          />
        </div>

        {/* Video Upload Preview */}
        {videoPreview && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4 relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 p-2 flex items-center gap-4"
          >
            <video src={videoPreview} className="w-20 h-20 object-cover rounded-xl" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-slate-200 truncate">{videoFile?.name}</p>
              <p className="text-xs text-slate-500">{(videoFile!.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
            <button 
              onClick={removeVideo}
              className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Action Buttons Row */}
          <div className="flex gap-2">
            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all text-sm font-medium"
            >
              <Upload className="w-4 h-4" />
              {videoFile ? "Change" : "Upload Video"}
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="video/*" 
              className="hidden" 
            />

            {/* Task Select */}
            <div className="relative flex-1">
              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="w-full appearance-none cursor-pointer rounded-2xl bg-white/5 border border-white/10 py-3 pl-4 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              >
                {tasks.map((task) => (
                  <option key={task} value={task} className="bg-[#1a1a1c]">
                    {task}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute inset-y-0 right-3 flex items-center w-4 h-4 my-auto text-slate-500" />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={runTask}
            disabled={isRunning || !input.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/20"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Run AI Task
              </>
            )}
          </button>
        </div>
      </div>

      <footer className="mt-8 text-slate-600 text-xs flex items-center gap-4">
        <span className="flex items-center gap-1"><Video className="w-3 h-3" /> MP4/MOV Supported</span>
        <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> Smart Analysis</span>
      </footer>
    </section>
  );
}