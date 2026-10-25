// Self-contained extension surface. Sized for a Chrome/Edge popup (400×600) or side panel.
import { useState } from "react";
import { demoSite, findings, stickyNotes, type Finding } from "./demo-data";
import { Logo, SeverityTag } from "./parts";
import { cn } from "@/lib/utils";

export type ExtensionMode = "popup" | "panel";

export function ExtensionPopup({ mode = "popup" }: { mode?: ExtensionMode }) {
  const [open, setOpen] = useState<Finding | null>(null);
  const [tab, setTab] = useState<"findings" | "notes">("findings");
  const score = demoSite.riskScore;
  const r = 30;
  const c = 2 * Math.PI * r;
  const high = findings.filter((f) => f.severity === "High").length;

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden bg-canvas text-foreground shadow-lift",
        mode === "popup" ? "h-[600px] w-full max-w-[400px] rounded-2xl" : "h-[680px] w-full max-w-[460px] rounded-xl",
      )}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-paper px-4 py-3">
        <Logo />
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-foreground/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Demo data</span>
          <button aria-label="Settings" className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-muted">⋯</button>
        </div>
      </header>

      <div className="canvas-dots flex-1 overflow-y-auto px-4 pb-4 pt-3">
        {/* Site */}
        <div className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-severity-medium" />
          <span className="font-mono">{demoSite.domain}</span>
          <span className="ml-auto text-muted-foreground">{demoSite.updated}</span>
        </div>

        {/* Score */}
        <div className="mt-3 flex items-center gap-4 rounded-2xl bg-charcoal p-4 text-charcoal-foreground">
          <div className="relative h-[72px] w-[72px] shrink-0">
            <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
              <circle cx="36" cy="36" r={r} className="fill-none stroke-charcoal-foreground/15" strokeWidth="7" />
              <circle cx="36" cy="36" r={r} className="fill-none stroke-lime" strokeWidth="7" strokeLinecap="round"
                strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
            </svg>
            <div className="absolute inset-0 grid place-items-center font-serif text-2xl">{score}</div>
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-wider text-charcoal-foreground/60">Potential risk · Elevated</div>
            <p className="mt-1 text-sm leading-snug">
              {findings.length} clauses flagged, {high} high. {demoSite.documents.join(" + ")}.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-1 rounded-full bg-paper p-1 text-xs shadow-float">
          {(["findings", "notes"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("flex-1 rounded-full py-1.5 font-medium capitalize", tab === t ? "bg-charcoal text-charcoal-foreground" : "text-muted-foreground")}>
              {t === "findings" ? `Findings (${findings.length})` : "Quick notes"}
            </button>
          ))}
        </div>

        {tab === "findings" ? (
          <ul className="mt-3 space-y-2">
            {findings.map((f) => (
              <li key={f.id}>
                <button onClick={() => setOpen(f)}
                  className="float-card w-full rounded-xl bg-paper p-3 text-left transition hover:-translate-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{f.category}</span>
                    <SeverityTag severity={f.severity} />
                  </div>
                  <div className="mt-1.5 font-serif text-lg leading-tight">{f.title}</div>
                  <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                    <span className="font-mono">{f.clauseRef}</span><span>Inspect →</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-3 space-y-3">
            {stickyNotes.map((n, i) => (
              <div key={n.id} className="float-card rounded-md bg-lime p-4 text-lime-foreground" style={{ transform: `rotate(${i % 2 ? 1 : -1}deg)` }}>
                <div className="font-mono text-[10px] uppercase tracking-wider opacity-70">{n.kind}</div>
                <p className="mt-1 text-sm font-medium leading-snug">{n.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="border-t bg-paper px-4 py-2 text-center text-[10px] text-muted-foreground">
        Not legal advice · Fictional sample, no real site analyzed
      </footer>

      {/* In-extension detail view */}
      {open && (
        <div className="absolute inset-0 z-10 flex flex-col bg-paper animate-in slide-in-from-right-8" role="dialog" aria-label={open.title}>
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <button onClick={() => setOpen(null)} aria-label="Back" className="grid h-7 w-7 place-items-center rounded-full bg-muted">←</button>
            <span className="text-xs font-medium">Back to findings</span>
            <span className="ml-auto"><SeverityTag severity={open.severity} /></span>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{open.category}</span>
            <h2 className="mt-1 font-serif text-2xl leading-tight">{open.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{open.summary}</p>
            <div className="mt-4 rounded-xl bg-charcoal p-4 text-charcoal-foreground">
              <div className="font-mono text-[10px] uppercase tracking-wider text-charcoal-foreground/60">Original clause · {open.clauseRef}</div>
              <blockquote className="mt-2 border-l-2 border-lime pl-3 font-serif text-base leading-snug">“{open.clause}”</blockquote>
            </div>
            <div className="mt-3 rounded-md bg-lime p-4 text-lime-foreground">
              <div className="font-mono text-[10px] uppercase tracking-wider opacity-70">Why it matters</div>
              <p className="mt-1 text-sm font-medium leading-snug">{open.why}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
