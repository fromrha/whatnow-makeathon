# TODO — Next Vertical Slices

The MVP is one polished demo flow with static data. Each item below is a
self-contained vertical slice that builds on the existing structure. Build them
one at a time; do **not** start a slice until the prototype is stable.

## Near-term polish (still pure frontend)

- [ ] Mobile pass: verify every screen at 375px, fix any overflow.
- [x] Keyboard + screen-reader pass: focus order, `aria-live` for processing copy,
      labelled controls. *(IDE cleanup pass: aria-live processing status, ARIA
      tab semantics + arrow-key nav on the mode toggle, `aria-checked` checklist
      items. A full mobile/SR audit on real devices is still open.)*
- [ ] Add a second sample document (e.g. a utility bill) to prove the flow
      generalizes — extend `src/data/` and let the input screen pick one.
- [ ] Persist checklist state per session (in-memory only; no storage).

## Reliability (done in the IDE cleanup pass)

- [x] Processing waits for the real `analyzeDocument()` promise with a minimum
      animation floor; calm `ErrorScreen` fallback if analysis fails.
- [x] TypeScript tooling (`tsconfig`, `pnpm typecheck`) + a standalone local run
      path (`pnpm dev`/`build`/`preview`) without breaking the Figma Make entry.

## Real parsing (the `documentParser.ts` seam)

- [ ] **PDF text extraction** — wire up `pdf.js` for digital PDFs.
- [ ] **OCR** — add OCR for scanned/photographed documents.
- [ ] **AI summarization** — call a model to produce the `AnalysisResult` shape
      (plain summary, deadline, missing items, risk, next action, cards).
- [ ] Keep `analyzeDocument()`'s signature stable so the UI is untouched.

## Backend (only if the demo is stable first)

- [ ] File upload handling (type + size validation).
- [ ] Document Q&A / follow-up questions in the chat.
- [ ] Optional accounts + saved history (explicitly out of MVP scope).

## Explicitly NOT doing for the Makeathon MVP

Authentication · database · dashboard · document history · payments ·
admin panel · legal/medical/financial advice.
