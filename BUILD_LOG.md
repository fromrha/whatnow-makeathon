# Build Log — WhatNow (Makeathon)

This log documents the build workflow for the Makeathon submission. The story it
tells: **WhatNow was shaped inside the Figma ecosystem, with Figma Make as the
primary build layer and GitHub + IDE as a clean-up and structure extension.**

---

## Workflow at a glance

```
Figma Make  ──▶  GitHub repo  ──▶  IDE / coding agent  ──▶  Demo-ready MVP
(design +        (version          (cleanup, types,        (one polished
 prototype)       control)          static data, docs)      demo flow)
```

- **Figma Make = primary product/front-end layer.** Screens, chat layout, action
  cards, the calm aesthetic, and interaction states originate here.
- **GitHub + IDE = extension layer only.** Used for code cleanup, folder
  structure, TypeScript types, static demo data, the placeholder service layer,
  accessibility, and documentation — never to replace the Make prototype.

---

## Phase 0 — Planning

- Read the PRD (`src/imports/whatnow-prd.md`) and the coding-agent guide.
- Produced a project plan: stack, folder structure, build sequence, design
  tokens, and per-screen detail (`plans/`).
- Classified the MVP as **pure frontend** — no Supabase/backend for Tier 1.

## Phase 1 — Foundation (this commit)

Built the starter app shell and first working prototype:

- **Types** (`src/types/index.ts`) — Document, AnalysisResult, ActionCard,
  ExplanationVariant, etc. These are the contract a real backend must fulfill.
- **Static data** — a fake-but-realistic medical insurance missing-document
  notice (`sampleDocument.ts`) and a hand-authored analysis with all three
  explanation modes (`analysisResult.ts`).
- **Service stub** (`documentParser.ts`) — returns static data after a fake
  delay. The single seam for future OCR/PDF/AI work.
- **Design tokens** — warm off-white background, deep teal accent, amber for
  gentle urgency. Fonts: DM Sans (UI) + Fraunces (display). No blue-corporate
  tones, no SaaS-dashboard feel.
- **Screens** — Landing, Document Input, Processing, Chat (with cards, mode
  toggle, and final summary).
- **Components** — Button, ProgressDots, ChatBubble, ActionCard, ModeToggle.

### Decisions

- **No router.** A single-page screen state machine in `App.tsx` is simpler and
  enough for one linear demo flow.
- **Per-mode content, not just font size.** Quick / First-time / Large Text each
  have distinct message copy so the modes feel intentional.
- **Calm over chatbot.** Staggered card reveals and pulsing dots instead of a
  typing spinner; warm palette instead of AI-assistant blue.

---

## Out of scope (by design)

Real OCR · real PDF parsing · real AI backend · authentication · database ·
dashboard · document history · payments · admin panel. See `TODO.md` for what a
future slice would add.
