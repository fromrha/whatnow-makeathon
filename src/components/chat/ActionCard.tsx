import { motion } from "motion/react";
import {
  CalendarClock,
  FileText,
  AlertTriangle,
  ListChecks,
  Phone,
  Check,
} from "lucide-react";
import { useState } from "react";
import type { ActionCard as ActionCardData, ActionCardType } from "../../types";

interface ActionCardProps {
  card: ActionCardData;
  delay?: number;
  large?: boolean;
}

const ICONS: Record<ActionCardType, typeof CalendarClock> = {
  deadline: CalendarClock,
  "missing-document": FileText,
  risk: AlertTriangle,
  checklist: ListChecks,
  "call-script": Phone,
};

// Accent color per card type — amber for time/risk, teal for the rest.
const ACCENTS: Record<ActionCardType, string> = {
  deadline: "text-warning bg-warning-surface",
  "missing-document": "text-primary bg-secondary",
  risk: "text-warning bg-warning-surface",
  checklist: "text-primary bg-secondary",
  "call-script": "text-primary bg-secondary",
};

export function ActionCard({ card, delay = 0, large = false }: ActionCardProps) {
  const Icon = ICONS[card.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className={`grid size-9 place-items-center rounded-xl ${ACCENTS[card.type]}`}>
          <Icon className="size-5" strokeWidth={2} />
        </span>
        <h3 className={large ? "text-xl" : ""}>{card.title}</h3>
      </div>

      {card.content && (
        <p
          className={`mt-3 whitespace-pre-line text-muted-foreground ${
            large ? "text-lg leading-relaxed" : ""
          }`}
        >
          {card.content}
        </p>
      )}

      {card.items && <Checklist items={card.items} large={large} />}
    </motion.div>
  );
}

function Checklist({
  items,
  large,
}: {
  items: NonNullable<ActionCardData["items"]>;
  large: boolean;
}) {
  // Local interactive state — checking off steps is the only "live" bit.
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(items.map((i) => [i.id, i.completed])),
  );

  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => {
        const isChecked = checked[item.id];
        return (
          <li key={item.id}>
            <button
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              onClick={() =>
                setChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
              }
              className="group flex w-full items-start gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              <span
                className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors ${
                  isChecked
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background group-hover:border-primary"
                }`}
              >
                {isChecked && <Check className="size-3.5" strokeWidth={3} />}
              </span>
              <span
                className={`${large ? "text-lg" : ""} ${
                  isChecked ? "text-muted-foreground line-through" : ""
                }`}
              >
                {item.label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
