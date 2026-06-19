import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProgressDots } from "../components/ui/ProgressDots";

interface ProcessingScreenProps {
  /** Called once the fake processing finishes. */
  onDone: () => void;
  /** Total processing time. Should match the service delay. */
  durationMs?: number;
}

const STEPS = [
  "Reading the important parts…",
  "Finding deadlines…",
  "Checking what needs action…",
  "Turning this into plain steps…",
];

export function ProcessingScreen({
  onDone,
  durationMs = 3200,
}: ProcessingScreenProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = durationMs / STEPS.length;
    const stepTimer = setInterval(() => {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, interval);
    const doneTimer = setTimeout(onDone, durationMs);

    return () => {
      clearInterval(stepTimer);
      clearTimeout(doneTimer);
    };
  }, [durationMs, onDone]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 text-center">
      <ProgressDots />
      <div className="mt-8 h-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-xl text-muted-foreground"
          >
            {STEPS[step]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
