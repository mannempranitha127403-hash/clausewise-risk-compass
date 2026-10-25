import { useEffect } from "react";
import { cn } from "@/lib/utils";
import type { Finding, Severity } from "./demo-data";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-charcoal">
        <div className="h-3 w-3 rounded-sm bg-lime" />
      </div>
      <span className="text-[15px] font-semibold tracking-tight">ClauseWise</span>
    </div>
  );
}

const sevDot: Record<Severity, string> = {
  High: "bg-severity-high",
  Medium: "bg-severity-medium",
  Low: "bg-severity-low",
};

export function SeverityTag({ severity, dark }: { severity: Severity; dark?: boolean | undefined }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider",
        dark ? "bg-charcoal-foreground/10 text-charcoal-foreground" : "bg-muted text-foreground",
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", sevDot[severity])} />
      {severity}
    </span>
  );
}

export function DemoBadge() {
  return (
    <span className="rounded-full border border-foreground/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
      Demo data
    </span>
  );
}

export function RiskScore({ score }: { score: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="float-card rounded-3xl bg-paper p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Potential risk</span>
        <DemoBadge />
      </div>
      <div className="mt-4 flex items-end gap-6">
        <div className="relative h-32 w-32 shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r={r} className="fill-none stroke-muted" strokeWidth="10" />
            <circle
              cx="60" cy="60" r={r}
              className="fill-none stroke-charcoal"
              strokeWidth="10" strokeLinecap="round"
              strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-3 w-3 rounded-full bg-lime ring-4 ring-charcoal" />
          </div>
        </div>
        <div>
          <div className="font-serif text-7xl leading-none sm:text-8xl">{score}</div>
          <div className="mt-1 text-sm text-muted-foreground">out of 100 · Elevated</div>
        </div>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        A higher score means more clauses that may limit your rights or share your data.
      </p>
    </div>
  );
}

export function FindingCard({
  finding, index, dark, onOpen, className,
}: { finding: Finding; index: number; dark?: boolean | undefined; onOpen: () => void; className?: string | undefined }) {
  return (
    <button
      onClick={onOpen}
      className={cn(
        "float-card group flex w-full flex-col rounded-3xl p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal",
        dark ? "bg-charcoal text-charcoal-foreground" : "bg-paper",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn("font-mono text-[11px]", dark ? "text-charcoal-foreground/60" : "text-muted-foreground")}>
          {String(index + 1).padStart(2, "0")} · {finding.category}
        </span>
        <SeverityTag severity={finding.severity} dark={dark} />
      </div>
      <h3 className="mt-6 font-serif text-[28px] leading-[1.05]">{finding.title}</h3>
      <p className={cn("mt-3 text-sm leading-relaxed", dark ? "text-charcoal-foreground/70" : "text-muted-foreground")}>
        {finding.summary}
      </p>
      <div className={cn("mt-6 flex items-center justify-between border-t pt-4 text-xs", dark ? "border-charcoal-foreground/10" : "")}>
        <span className="font-mono">{finding.clauseRef}</span>
        <span className="font-medium underline-offset-4 group-hover:underline">Inspect clause →</span>
      </div>
    </button>
  );
}

export function StickyNote({ kind, text, rotate = 0 }: { kind: string; text: string; rotate?: number }) {
  return (
    <div
      className="float-card rounded-md bg-lime p-5 text-lime-foreground"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="font-mono text-[10px] uppercase tracking-wider opacity-70">{kind}</div>
      <p className="mt-2 text-[15px] font-medium leading-snug">{text}</p>
    </div>
  );
}

export function FindingDetail({ finding, onClose }: { finding: Finding | null; onClose: () => void }) {
  useEffect(() => {
    if (!finding) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [finding, onClose]);

  if (!finding) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={finding.title}>
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-paper p-6 shadow-lift animate-in slide-in-from-bottom-8 sm:rounded-3xl sm:p-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SeverityTag severity={finding.severity} />
            <DemoBadge />
          </div>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-muted text-lg hover:bg-canvas">×</button>
        </div>
        <span className="mt-6 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{finding.category}</span>
        <h2 className="mt-2 font-serif text-4xl leading-[1.05] sm:text-5xl">{finding.title}</h2>
        <p className="mt-4 text-base leading-relaxed">{finding.summary}</p>

        <div className="mt-8 rounded-2xl bg-charcoal p-6 text-charcoal-foreground">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-charcoal-foreground/60">
            <span>Original clause</span><span>{finding.clauseRef}</span>
          </div>
          <blockquote className="mt-4 border-l-2 border-lime pl-4 font-serif text-xl leading-snug">
            “{finding.clause}”
          </blockquote>
        </div>

        <div className="mt-4 rounded-md bg-lime p-5 text-lime-foreground">
          <div className="font-mono text-[10px] uppercase tracking-wider opacity-70">Why it matters</div>
          <p className="mt-2 text-[15px] font-medium leading-snug">{finding.why}</p>
        </div>
      </div>
    </div>
  );
}
