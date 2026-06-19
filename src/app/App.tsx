import { useState } from "react";
import { LandingScreen } from "../screens/LandingScreen";
import { DocumentInputScreen } from "../screens/DocumentInputScreen";
import { ProcessingScreen } from "../screens/ProcessingScreen";
import { ChatScreen } from "../screens/ChatScreen";
import { analyzeDocument } from "../services/documentParser";
import type { AnalysisResult, ScreenName, WhatNowDocument } from "../types";

// Keep the fake processing screen and the service stub in sync.
const PROCESSING_MS = 3200;

export default function App() {
  const [screen, setScreen] = useState<ScreenName>("landing");
  // When jumping straight from "try a sample", pre-fill the input screen.
  const [preloadSample, setPreloadSample] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  function goToInput(sample: boolean) {
    setPreloadSample(sample);
    setScreen("input");
  }

  function handleAnalyze(document: WhatNowDocument) {
    setScreen("processing");
    // Kick off the (stubbed) analysis in parallel with the animation.
    void analyzeDocument(document, { delayMs: 0 }).then(setAnalysis);
  }

  function handleProcessingDone() {
    if (analysis) setScreen("chat");
  }

  function restart() {
    setAnalysis(null);
    setPreloadSample(false);
    setScreen("landing");
  }

  return (
    <div className="size-full min-h-screen overflow-y-auto bg-background text-foreground">
      {screen === "landing" && (
        <LandingScreen
          onStart={() => goToInput(false)}
          onTrySample={() => goToInput(true)}
        />
      )}

      {screen === "input" && (
        <DocumentInputScreen
          preloadSample={preloadSample}
          onBack={() => setScreen("landing")}
          onAnalyze={handleAnalyze}
        />
      )}

      {screen === "processing" && (
        <ProcessingScreen onDone={handleProcessingDone} durationMs={PROCESSING_MS} />
      )}

      {screen === "chat" && analysis && (
        <ChatScreen analysis={analysis} onRestart={restart} />
      )}
    </div>
  );
}
