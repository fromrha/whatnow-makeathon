import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProgressDots } from "../components/ui/ProgressDots";

interface ProcessingScreenProps {
  /** True once analyzeDocument() has resolved successfully. */
  isReady: boolean;
  /** True once analyzeDocument() has rejected. */
  hasError: boolean;
  /** Minimum time the animation runs before advancing, even if analysis is instant. */
  minDurationMs?: number;
  /** Called once analysis is ready AND the minimum animation floor has elapsed. */
  onComplete: () => void;
  /** Called once analysis has errored AND the minimum animation floor has elapsed. */
  onError: () => void;
}

const STEPS = [
  "Reading the important parts…",
  "Finding deadlines…",
  "Checking what needs action…",
  "Turning this into plain steps…",
];

// Shown if the (future) backend is slower than the animation floor.
const STILL_WORKING = "Almost there…";

export function ProcessingScreen({
  isReady,
  hasError,
  minDurationMs = 3200,
  onComplete,
  onError,
}: ProcessingScreenProps) {
  const [step, setStep] = useState(0);
  const [floorElapsed, setFloorElapsed] = useState(false);

  // Advance the step copy and mark when the minimum floor has elapsed.
  useEffect(() => {
    const interval = minDurationMs / STEPS.length;
    const stepTimer = setInterval(() => {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, interval);
    const floorTimer = setTimeout(() => setFloorElapsed(true), minDurationMs);

    return () => {
      clearInterval(stepTimer);
      clearTimeout(floorTimer);
    };
  }, [minDurationMs]);

  // Resolve once both the floor has elapsed and analysis has settled.
  useEffect(() => {
    if (!floorElapsed) return;
    if (hasError) {
      onError();
    } else if (isReady) {
      onComplete();
    }
  }, [floorElapsed, isReady, hasError, onComplete, onError]);

  // While the floor is running, show the scripted steps. If analysis is still
  // pending after the floor, hold on a gentle "almost there" message.
  const message = !floorElapsed || isReady || hasError ? STEPS[step] : STILL_WORKING;

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 text-center">
      <ProgressDots />
      <div className="mt-8 h-8" aria-live="polite" role="status">
        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-xl text-muted-foreground"
          >
            {message}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
