import type { AnalysisResult, ExplanationModeName } from "../../types";

interface ModeToggleProps {
  variants: AnalysisResult["variants"];
  active: ExplanationModeName;
  onChange: (mode: ExplanationModeName) => void;
}

const ORDER: ExplanationModeName[] = ["quick", "first-time", "large-text"];

/** Switches the explanation style. Each mode has its own message content. */
export function ModeToggle({ variants, active, onChange }: ModeToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Explanation mode"
      className="flex flex-wrap gap-1.5 rounded-2xl border border-border bg-card p-1.5 shadow-sm"
    >
      {ORDER.map((mode) => {
        const variant = variants[mode];
        const isActive = mode === active;
        return (
          <button
            key={mode}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(mode)}
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
