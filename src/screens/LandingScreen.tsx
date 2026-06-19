import { motion } from "motion/react";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "../components/ui/Button";

interface LandingScreenProps {
  onStart: () => void;
  onTrySample: () => void;
}

export function LandingScreen({ onStart, onTrySample }: LandingScreenProps) {
  return (
    <div className="flex min-h-full items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl text-center"
      >
        <div className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-primary">
          <FileText className="size-4" />
          <span className="text-sm">Paperwork, made human</span>
        </div>

        <h1 className="text-5xl leading-tight">What Now?</h1>

        <p className="mt-6 text-2xl leading-snug text-foreground">
          Confusing paperwork? Don&rsquo;t panic.
        </p>

        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
          Upload a form, letter, notice, or bill. WhatNow turns it into plain,
          calm next steps &mdash; like texting a friend who actually understands
          this stuff.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Button size="lg" onClick={onStart} className="w-full sm:w-auto">
            Tell Me What To Do
            <ArrowRight className="size-5" />
          </Button>
          <Button variant="ghost" onClick={onTrySample}>
            Or try a sample notice
          </Button>
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          No account needed. WhatNow explains paperwork &mdash; it doesn&rsquo;t
          give legal, medical, or financial advice.
        </p>
      </motion.div>
    </div>
  );
}
