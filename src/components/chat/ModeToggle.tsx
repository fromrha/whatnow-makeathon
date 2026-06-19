import { useRef } from "react";
import type { AnalysisResult, ExplanationModeName } from "../../types";

interface ModeToggleProps {
  variants: AnalysisResult["variants"];
  active: ExplanationModeName;
  onChange: (mode: ExplanationModeName) => void;
  /** id of the tabpanel these tabs control, for aria wiring. */
  panelId: string;
}

const ORDER: ExplanationModeName[] = ["quick", "first-time", "large-text"];

export const tabId = (mode: ExplanationModeName) => `mode-tab-${mode}`;

/** Switches the explanation style. Each mode has its own message content. */
export function ModeToggle({ variants, active, onChange, panelId }: ModeToggleProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function focusTab(index: number) {
    const next = (index + ORDER.length) % ORDER.length;
    onChange(ORDER[next]);
    tabRefs.current[next]?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(ORDER.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <div
      role="tablist"
      aria-label="Explanation mode"
      className="flex flex-wrap gap-1.5 rounded-2xl border border-border bg-card p-1.5 shadow-sm"
    >
      {ORDER.map((mode, index) => {
        const variant = variants[mode];
        const isActive = mode === active;
        return (
          <button
            key={mode}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            id={tabId(mode)}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(mode)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`flex-1 rounded-xl px-4 py-2.5 text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <span className="block">{variant.label}</span>
            <span
              className={`block text-sm ${
                isActive ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}
            >
              {variant.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
