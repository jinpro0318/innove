"use client";

import { motion } from "framer-motion";

interface ChatBubbleProps {
  role: "ai" | "user";
  children: React.ReactNode;
}

export default function ChatBubble({ role, children }: ChatBubbleProps) {
  const isAI = role === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-2.5 ${isAI ? "justify-start" : "justify-end"}`}
    >
      {isAI && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm">
          🚀
        </div>
      )}

      <div
        className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed sm:max-w-[70%] ${
          isAI
            ? "rounded-2xl rounded-bl-sm bg-white/5 text-gray-200"
            : "rounded-2xl rounded-br-sm bg-gradient-to-r from-purple-600 to-purple-500 text-white"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="flex gap-2.5 justify-start"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm">
        🚀
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white/5 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-gray-400"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
