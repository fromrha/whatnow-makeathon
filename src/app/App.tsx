import { useState } from "react";
import { LandingScreen } from "../screens/LandingScreen";
import { DocumentInputScreen } from "../screens/DocumentInputScreen";
import { ProcessingScreen } from "../screens/ProcessingScreen";
import { ChatScreen } from "../screens/ChatScreen";
import { ErrorScreen } from "../screens/ErrorScreen";
import { analyzeDocument } from "../services/documentParser";
import type { AnalysisResult, ScreenName, WhatNowDocument } from "../types";

// Minimum time the processing animation is shown, even if analysis resolves
// instantly. Keeps the calm "reading your document" beat from feeling abrupt.
const PROCESSING_FLOOR_MS = 3200;

export default function App() {
  const [screen, setScreen] = useState<ScreenName>("landing");
  // When jumping straight from "try a sample", pre-fill the input screen.
  const [preloadSample, setPreloadSample] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState(false);

  function goToInput(sample: boolean) {
    setPreloadSample(sample);
    setScreen("input");
  }

  function handleAnalyze(document: WhatNowDocument) {
    setAnalysis(null);
    setAnalysisError(false);
    setScreen("processing");
    // Kick off the (stubbed) analysis. The processing screen waits for this
    // promise AND its own minimum animation floor before advancing, and falls
    // back to a calm error state if analysis rejects.
    void analyzeDocument(document)
      .then(setAnalysis)
      .catch(() => setAnalysisError(true));
  }

  function handleProcessingComplete() {
    if (analysis) setScreen("chat");
  }

  function restart() {
    setAnalysis(null);
    setAnalysisError(false);
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
        <ProcessingScreen
          isReady={analysis !== null}
          hasError={analysisError}
          minDurationMs={PROCESSING_FLOOR_MS}
          onComplete={handleProcessingComplete}
          onError={() => setScreen("error")}
        />
      )}

      {screen === "chat" && analysis && (
        <ChatScreen analysis={analysis} onRestart={restart} />
      )}

      {screen === "error" && (
        <ErrorScreen onRetry={() => setScreen("input")} onHome={restart} />
      )}
    </div>
  );
}
