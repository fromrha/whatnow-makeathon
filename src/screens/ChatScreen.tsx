import { useState } from "react";
import { motion } from "motion/react";
import { RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";
import { ChatBubble } from "../components/chat/ChatBubble";
import { ActionCard } from "../components/chat/ActionCard";
import { ModeToggle } from "../components/chat/ModeToggle";
import { Button } from "../components/ui/Button";
import type { AnalysisResult, ExplanationModeName } from "../types";

interface ChatScreenProps {
  analysis: AnalysisResult;
  onRestart: () => void;
}

export function ChatScreen({ analysis, onRestart }: ChatScreenProps) {
  const [mode, setMode] = useState<ExplanationModeName>("first-time");
  const variant = analysis.variants[mode];
  const large = mode === "large-text";

  const sortedCards = [...analysis.cards].sort((a, b) => a.priority - b.priority);
  // Cards animate in after the chat messages have appeared.
  const cardsBaseDelay = variant.messages.length * 0.35 + 0.2;

  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-6 py-8">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-primary">
          <ShieldCheck className="size-5" />
          <span>WhatNow</span>
        </div>
        <Button variant="ghost" onClick={onRestart}>
          <RotateCcw className="size-4" />
          Start over
        </Button>
      </header>

      <div className="mb-6">
        <ModeToggle variants={analysis.variants} active={mode} onChange={setMode} />
      </div>

      {/* Re-key on mode so messages re-animate when the mode changes. */}
      <div key={mode} className="flex flex-col gap-3">
        {variant.messages.map((message, i) => (
          <ChatBubble key={message.id} delay={i * 0.35} large={large}>
            {message.text}
          </ChatBubble>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {sortedCards.map((card, i) => (
          <ActionCard
            key={card.id}
            card={card}
            large={large}
            delay={cardsBaseDelay + i * 0.12}
          />
        ))}
      </div>

      <FinalSummary
        deadline={analysis.deadline}
        nextAction={analysis.recommendedNextAction}
        delay={cardsBaseDelay + sortedCards.length * 0.12 + 0.2}
        large={large}
      />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {analysis.disclaimer}
      </p>
    </div>
  );
}

function FinalSummary({
  deadline,
  nextAction,
  delay,
  large,
}: {
  deadline: string;
  nextAction: string;
  delay: number;
  large: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mt-6 rounded-3xl bg-primary p-7 text-primary-foreground shadow-sm"
    >
      <div className="flex items-center gap-2">
        <CheckCircle2 className="size-6" />
        <h2 className="text-primary-foreground">You know what to do now.</h2>
      </div>
      <p className={`mt-3 text-primary-foreground/90 ${large ? "text-lg" : ""}`}>
        {nextAction}
      </p>
      <p className="mt-4 text-primary-foreground/80">
        Deadline to remember: <span className="text-primary-foreground">{deadline}</span>
      </p>
    </motion.div>
  );
}
