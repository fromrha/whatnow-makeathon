import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, FileText, Lock, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";
import { SAMPLE_DOCUMENT } from "../data/sampleDocument";
import type { WhatNowDocument } from "../types";

interface DocumentInputScreenProps {
  /** When true, the sample is pre-loaded into the textarea on mount. */
  preloadSample?: boolean;
  onBack: () => void;
  onAnalyze: (document: WhatNowDocument) => void;
}

export function DocumentInputScreen({
  preloadSample = false,
  onBack,
  onAnalyze,
}: DocumentInputScreenProps) {
  const [text, setText] = useState(preloadSample ? SAMPLE_DOCUMENT.rawText : "");
  const [usingSample, setUsingSample] = useState(preloadSample);

  function loadSample() {
    setText(SAMPLE_DOCUMENT.rawText);
    setUsingSample(true);
  }

  function handleAnalyze() {
    onAnalyze({
      ...(usingSample
        ? SAMPLE_DOCUMENT
        : {
            id: `pasted-${Date.now()}`,
            title: "Your document",
            documentType: "Unknown",
            sourceType: "paste" as const,
          }),
      rawText: text,
    });
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-6 py-10">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 self-start text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl">Paste your paperwork</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Drop in the confusing letter or notice. WhatNow reads it and tells you
          what actually matters.
        </p>

        <div className="mt-6">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setUsingSample(false);
            }}
            placeholder="Paste the text of your letter, bill, or notice here…"
            rows={12}
            className="w-full resize-none rounded-2xl border border-border bg-input-background p-5 leading-relaxed shadow-sm outline-none transition-colors focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <Button variant="secondary" onClick={loadSample}>
            <FileText className="size-4" />
            Load sample notice
          </Button>

          <Button onClick={handleAnalyze} disabled={text.trim().length === 0}>
            <Sparkles className="size-4" />
            Tell Me What To Do
          </Button>
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="size-4" />
          Your text stays in this demo. Nothing is saved or sent anywhere.
        </p>
      </motion.div>
    </div>
  );
}
