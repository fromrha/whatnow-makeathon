// Core data objects for WhatNow.
// These mirror the PRD's data model and are the contract the future
// parsing/AI backend will need to fulfill. For the MVP they are filled
// with static demo data (see src/data).

export type SourceType = "paste" | "upload" | "sample";

export type UrgencyLevel = "low" | "medium" | "high";

export type ExplanationModeName = "quick" | "first-time" | "large-text";

/** The raw paperwork the user pasted, uploaded, or selected. */
export interface WhatNowDocument {
  id: string;
  title: string;
  documentType: string;
  rawText: string;
  sourceType: SourceType;
}

export type ActionCardType =
  | "deadline"
  | "missing-document"
  | "risk"
  | "checklist"
  | "call-script";

/** A checklist item inside a checklist action card. */
export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

/** Structured, actionable guidance rendered inside the chat. */
export interface ActionCard {
  id: string;
  type: ActionCardType;
  title: string;
  /** Plain-text body. Used by deadline / missing-document / risk / call-script. */
  content?: string;
  /** Only present on checklist cards. */
  items?: ChecklistItem[];
  priority: number;
}

/** A single chat message from the calm assistant. */
export interface ChatMessage {
  id: string;
  text: string;
}

/**
 * One explanation mode = a complete set of chat messages tuned to a
 * reading level. Keeping the content per-mode (not just font size) is
 * what makes the modes feel intentional rather than a toggle.
 */
export interface ExplanationVariant {
  mode: ExplanationModeName;
  label: string;
  description: string;
  messages: ChatMessage[];
}

/** WhatNow's interpretation of the document. */
export interface AnalysisResult {
  documentId: string;
  plainSummary: string;
  urgency: UrgencyLevel;
  deadline: string;
  missingItems: string[];
  riskIfIgnored: string;
  recommendedNextAction: string;
  disclaimer: string;
  cards: ActionCard[];
  variants: Record<ExplanationModeName, ExplanationVariant>;
}

export type ScreenName = "landing" | "input" | "processing" | "chat";
