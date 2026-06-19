import { motion } from "motion/react";
import { RotateCcw, Home } from "lucide-react";
import { Button } from "../components/ui/Button";

interface ErrorScreenProps {
  onRetry: () => void;
  onHome: () => void;
}

/**
 * Calm fallback shown if analyzeDocument() fails. Keeps the reassuring,
 * non-alarming tone of the rest of the app — no stack traces, no red banners.
 */
export function ErrorScreen({ onRetry, onHome }: ErrorScreenProps) {
  return (
    <div
      className="flex min-h-full items-center justify-center px-6 py-16"
      role="alert"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <h1 className="text-3xl">That didn&rsquo;t go through.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Something got in the way while reading your document. Nothing was lost
          &mdash; let&rsquo;s try again.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Button onClick={onRetry} className="w-full sm:w-auto">
            <RotateCcw className="size-5" />
            Try again
          </Button>
          <Button variant="ghost" onClick={onHome}>
            <Home className="size-4" />
            Back to start
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
