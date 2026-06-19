# What Now?

**Chat-style paperwork translator** — turns confusing forms, letters, notices, and
bills into calm, clear next steps. Built for the moment you open intimidating
paperwork and think: *what now?*

This repository is the **Makeathon MVP**: one polished demo flow using a sample
medical-insurance "missing document" notice. It proves a single emotional
transformation:

> scary document → calm conversation → deadline → checklist → next action

There is **no real OCR, PDF parsing, AI backend, login, database, or dashboard**.
All analysis is static demo data.

---

## Build workflow (Figma Make first)

This project is built **Figma Make first**. Figma Make is the primary
product/front-end build layer; GitHub + IDE are an **extension layer** used only
for cleanup, structure, and backend-ready architecture.

| Layer | Role |
|---|---|
| **Figma Make** | Generates and iterates the UI, screens, chat layout, action cards, and the overall calm aesthetic |
| **GitHub + IDE** | Code cleanup, folder structure, TypeScript types, static data, the placeholder service layer, accessibility, and docs |

See [`BUILD_LOG.md`](./BUILD_LOG.md) for the Makeathon workflow story and
[`TODO.md`](./TODO.md) for the next vertical slices.

---

## The demo flow

1. **Landing** — brand, promise, and the main CTA: *Tell Me What To Do*
2. **Document input** — paste text or load the sample notice
3. **Processing** — a short, reassuring fake processing state
4. **Chat explanation** — the assistant explains the document like a calm friend
5. **Action cards** — Deadline · What they need · Risk · Checklist · Call script
6. **Explanation modes** — Quick · First-time · Large Text (each with its own copy)
7. **Final summary** — *"You know what to do now."*

---

## Tech stack

- **React 18 + TypeScript**
- **Tailwind CSS v4** with custom WhatNow design tokens (`src/styles/theme.css`)
- **motion/react** for animation
- **lucide-react** for icons
- Static data + a placeholder service layer — no backend

No additional packages are required beyond what ships in `package.json`.

---

## Project structure

```
src/
├── app/App.tsx                 # Root screen orchestrator (state machine)
├── screens/                    # One file per screen in the flow
│   ├── LandingScreen.tsx
│   ├── DocumentInputScreen.tsx
│   ├── ProcessingScreen.tsx
│   └── ChatScreen.tsx          # Chat + cards + mode toggle + final summary
├── components/
│   ├── chat/                   # ChatBubble, ActionCard, ModeToggle
│   └── ui/                     # Button, ProgressDots
├── data/                       # Static sample document + analysis result
│   ├── sampleDocument.ts
│   └── analysisResult.ts
├── services/documentParser.ts  # Placeholder — the seam for real parsing/AI later
├── types/index.ts              # Core data objects (Document, AnalysisResult, …)
└── styles/                     # fonts.css, theme.css, etc.
```

---

## Running locally

This is a Figma Make project. The Vite dev server runs inside the Figma Make
environment — use the preview surface there. After cloning from GitHub into a
standard Vite + React setup, install dependencies with `pnpm install` and wire up
a Vite entrypoint to render `src/app/App.tsx`.

---

## Extending it (from the IDE)

The single place a real backend plugs in is
[`src/services/documentParser.ts`](./src/services/documentParser.ts). Keep its
signature stable and the UI never needs to change:

```ts
analyzeDocument(document): Promise<AnalysisResult>
```

Replace the static return with: text extraction → OCR (for scans) →
AI summarization → mapping into the `AnalysisResult` shape.

---

## Disclaimer

WhatNow explains paperwork in plain language. It does **not** provide legal,
medical, or financial advice.
