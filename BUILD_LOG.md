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

## Phase 2 — IDE cleanup pass (structure, types, reliability, a11y)

Extension-layer work only. No visual redesign, no concept/flow/copy/layout
changes, no new product features. Figma Make remains the design source of truth;
no UI that originated in Make was restructured (no Make file URL was provided
this pass, so design-context-dependent visual work was intentionally deferred).

**A — TypeScript tooling**
- Added `tsconfig.json` (strict, React 18, `@/` alias) and `tsconfig.node.json`.
- Added `src/vite-env.d.ts` declaring the `figma:foundry-client-api` virtual
  module so typecheck passes on the Make entrypoint.
- Added `typecheck` script (`tsc --noEmit`). Passes clean.

**B — Standalone local run path (additive)**
- Added `index.html` + `src/main.tsx` that render `App.tsx`. The Figma Make
  entrypoint (`__figma__entrypoint__.ts`) is untouched and still works.
- Promoted `react`/`react-dom` to real dependencies; added `@types/react`,
  `@types/react-dom`, `typescript` as dev deps.
- Added `dev` / `preview` scripts.
- `pnpm-workspace.yaml`: broadened `supportedArchitectures` to include
  `win32`/`darwin` (was Linux-only) so native binaries install for local dev;
  approved native build scripts (`esbuild`, `@tailwindcss/oxide`) via
  `allowBuilds`; moved the legacy `pnpm.overrides` (vite pin) here.

**C — Processing / service reliability**
- `documentParser.ts`: documented the seam, made delay opt-in, and it now
  rejects on empty input so callers must handle failure.
- `App.tsx` + `ProcessingScreen.tsx`: the processing screen now waits for the
  real `analyzeDocument()` promise AND a minimum animation floor before
  advancing, holding on an "almost there" message if a future backend is slow.
- Added `ErrorScreen.tsx` — a calm, on-brand fallback so the user is never stuck.

**D — Accessibility polish**
- `ProcessingScreen`: step copy is an `aria-live="polite"` status region.
- `ModeToggle`: full ARIA tab semantics — roving `tabindex`, arrow/Home/End
  keyboard navigation, and `aria-controls` wired to the chat `tabpanel`.
- `ChatScreen`: explanation region marked up as `role="tabpanel"`.
- `ActionCard`: checklist items are `role="checkbox"` with `aria-checked` and
  visible focus rings.

**E — Housekeeping**
- Replaced the hardcoded `#fbf3e3` in `ActionCard` with a new
  `--warning-surface` theme token (exact same color) so nothing bypasses the
  token system. `globals.css` intentionally left empty.

### Verified
`pnpm install` → `pnpm typecheck` (clean) → `pnpm build` (2012 modules, builds)
→ `pnpm dev` (serves on :5173).

---

## Out of scope (by design)

Real OCR · real PDF parsing · real AI backend · authentication · database ·
dashboard · document history · payments · admin panel. See `TODO.md` for what a
future slice would add.
