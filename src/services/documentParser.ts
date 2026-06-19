import type { AnalysisResult, WhatNowDocument } from "../types";
import { SAMPLE_ANALYSIS } from "../data/analysisResult";

/**
 * Placeholder service layer for document analysis.
 *
 * For the Makeathon MVP this returns static, hand-authored data after a
 * short fake delay — there is NO real OCR, PDF parsing, or AI here.
 *
 * This is intentionally the single seam where a real backend would plug in
 * later (PDF extraction -> OCR -> AI summarization). Keep the signature
 * stable so the UI never has to change when the implementation becomes real.
 */
export async function analyzeDocument(
  _document: WhatNowDocument,
  { delayMs = 3000 }: { delayMs?: number } = {},
): Promise<AnalysisResult> {
  // TODO(post-mvp): replace with real parsing pipeline.
  // 1. Extract text (pdf.js / OCR for scans)
  // 2. Summarize + extract structured fields (AI)
  // 3. Map into AnalysisResult shape
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return SAMPLE_ANALYSIS;
}
