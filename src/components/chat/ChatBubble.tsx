import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ChatBubbleProps {
  children: ReactNode;
  /** Stagger delay so messages arrive one after another. */
  delay?: number;
  /** Large Text mode bumps the type size up. */
  large?: boolean;
}

/** A single message from the calm assistant. Always left-aligned. */
export function ChatBubble({ children, delay = 0, large = false }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className="flex w-full justify-start"
    >
      <div
        className={`max-w-[85%] rounded-3xl rounded-tl-lg bg-card border border-border px-5 py-3.5 shadow-sm ${
          large ? "text-xl leading-relaxed" : "leading-relaxed"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}
