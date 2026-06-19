import type { AnalysisResult, WhatNowDocument } from "../types";
import { SAMPLE_ANALYSIS } from "../data/analysisResult";

export interface AnalyzeOptions {
  /**
   * Artificial delay before the (stubbed) result resolves. Defaults to 0 so
   * the UI's processing animation owns the perceived timing. The processing
   * screen enforces its own minimum animation floor independently.
   */
  delayMs?: number;
}

/**
 * Placeholder service layer for document analysis.
 *
 * For the Makeathon MVP this returns static, hand-authored data after an
 * optional fake delay — there is NO real OCR, PDF parsing, or AI here.
 *
 * This is intentionally the single seam where a real backend would plug in
 * later (PDF extraction -> OCR -> AI summarization). Keep the signature
 * stable so the UI never has to change when the implementation becomes real.
 *
 * It returns a Promise and may reject. Callers MUST handle rejection (the UI
 * shows a calm error fallback) so a future real/slow/failing backend never
 * leaves the user stuck on the processing screen.
 */
export async function analyzeDocument(
  document: WhatNowDocument,
  { delayMs = 0 }: AnalyzeOptions = {},
): Promise<AnalysisResult> {
  // TODO(post-mvp): replace with real parsing pipeline.
  // 1. Extract text (pdf.js / OCR for scans)
  // 2. Summarize + extract structured fields (AI)
  // 3. Map into AnalysisResult shape
  if (delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  if (!document.rawText.trim()) {
    throw new Error("No document text was provided to analyze.");
  }

  return SAMPLE_ANALYSIS;
}
