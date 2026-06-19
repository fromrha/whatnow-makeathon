import type { AnalysisResult } from "../types";
import { SAMPLE_DOCUMENT } from "./sampleDocument";

// Static, hand-authored "analysis" for the sample notice.
// This is what a real parsing/AI backend would eventually produce.
// All three explanation modes share the same facts but speak differently.

const DISCLAIMER =
  "WhatNow explains paperwork in plain language. It does not provide legal, medical, or financial advice.";

export const SAMPLE_ANALYSIS: AnalysisResult = {
  documentId: SAMPLE_DOCUMENT.id,
  plainSummary:
    "Your insurance needs one document — proof of your current address — before they can finish your claim. You don't owe money. You just need to send it before June 30.",
  urgency: "medium",
  deadline: "June 30, 2026",
  missingItems: ["Proof of current address, dated within the last 90 days"],
  riskIfIgnored:
    "If you miss the deadline, they may close your claim. You'd have to start over, and the new review could take up to 45 business days.",
  recommendedNextAction:
    "Find a recent utility bill, lease, or official letter with your name and address, then send it to Meridian before June 30.",
  disclaimer: DISCLAIMER,

  cards: [
    {
      id: "card-deadline",
      type: "deadline",
      title: "Your deadline",
      content:
        "June 30, 2026 — they need your document by this date. That's about 3 weeks away.",
      priority: 1,
    },
    {
      id: "card-missing",
      type: "missing-document",
      title: "What they need",
      content:
        "One proof of your current address, dated within the last 90 days. A utility bill, lease, or government letter all work.",
      priority: 2,
    },
    {
      id: "card-risk",
      type: "risk",
      title: "What happens if you ignore it",
      content:
        "They may close your claim. You'd need to resubmit and wait up to 45 business days for a new review. No money is owed right now.",
      priority: 3,
    },
    {
      id: "card-checklist",
      type: "checklist",
      title: "Your next steps",
      items: [
        {
          id: "step-1",
          label: "Find a utility bill, lease, or official letter with your address",
          completed: false,
        },
        {
          id: "step-2",
          label: "Check that it's dated within the last 90 days",
          completed: false,
        },
        {
          id: "step-3",
          label: "Note your claim number: MHA-2026-77410-C",
          completed: false,
        },
        {
          id: "step-4",
          label: "Send it to Meridian before June 30, 2026",
          completed: false,
        },
      ],
      priority: 4,
    },
    {
      id: "card-call-script",
      type: "call-script",
      title: "If you'd rather call",
      content:
        '"Hi, I got a notice about claim MHA-2026-77410-C. It says you need proof of my address. Can you confirm what counts and how I should send it?"\n\nClaims Support: 1-800-555-0182 (Mon–Fri, 8 AM – 6 PM ET)',
      priority: 5,
    },
  ],

  variants: {
    quick: {
      mode: "quick",
      label: "Quick",
      description: "Short and direct",
      messages: [
        {
          id: "q-1",
          text: "Don't panic — you don't owe money.",
        },
        {
          id: "q-2",
          text: "They need one thing: proof of your address from the last 90 days.",
        },
        {
          id: "q-3",
          text: "Send it before June 30, or the claim may close. That's it.",
        },
      ],
    },
    "first-time": {
      mode: "first-time",
      label: "First-time",
      description: "Explains the confusing parts",
      messages: [
        {
          id: "f-1",
          text: "I read it. Take a breath — this isn't a bill, and you don't owe anything yet.",
        },
        {
          id: "f-2",
          text: 'A "claim" is the request your insurance reviews to pay for care. Right now it\'s paused because one document is missing.',
        },
        {
          id: "f-3",
          text: 'They want "proof of address" — basically something official with your name and home address on it, like a utility bill or lease, from the last 3 months.',
        },
        {
          id: "f-4",
          text: "Once you send that before June 30, they'll continue reviewing your claim. If you miss it, they might close it and you'd have to start over.",
        },
      ],
    },
    "large-text": {
      mode: "large-text",
      label: "Large Text",
      description: "Bigger text, one step at a time",
      messages: [
        {
          id: "l-1",
          text: "You do not owe any money.",
        },
        {
          id: "l-2",
          text: "They need proof of your address.",
        },
        {
          id: "l-3",
          text: "A recent bill or letter with your address works.",
        },
        {
          id: "l-4",
          text: "Send it before June 30, 2026.",
        },
      ],
    },
  },
};
