import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { demoSite, findings, stickyNotes, type Finding } from "@/components/clausewise/demo-data";
import { DemoBadge, FindingCard, FindingDetail, Logo, RiskScore, StickyNote } from "@/components/clausewise/parts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClauseWise — Terms & Privacy, in plain English" },
      { name: "description", content: "ClauseWise prototype: a calm canvas that surfaces risky clauses in Terms & Privacy Policies." },
      { property: "og:title", content: "ClauseWise — Terms & Privacy, in plain English" },
      { property: "og:description", content: "Design prototype of an AI browser extension for reading the fine print." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState<Finding | null>(null);
  const [f1, f2, f3, f4, f5] = findings;
  const card = (f: Finding, i: number, dark = false, cls = "") => (
    <FindingCard finding={f} index={i} dark={dark} onOpen={() => setOpen(f)} className={cls} />
  );

  return (
    <div className="canvas-dots min-h-screen bg-canvas">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-5 sm:px-8 sm:pt-8">
        <header className="flex items-center justify-between rounded-full bg-paper/70 py-2 pl-4 pr-2 shadow-float backdrop-blur">
          <Logo />
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm sm:flex">
              <span className="h-2 w-2 rounded-full bg-severity-medium" />
              <span className="font-mono text-xs">{demoSite.domain}</span>
            </div>
            <DemoBadge />
          </div>
        </header>

        <section className="mt-10 sm:mt-16">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {demoSite.documents.join(" + ")} · {demoSite.updated}
          </span>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.95] sm:text-7xl">
            {demoSite.name}'s fine print, <em className="text-muted-foreground">read for you.</em>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            Fictional sample for design review. ClauseWise hasn't analyzed any real website here.
          </p>
        </section>

        <main className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5"><RiskScore score={demoSite.riskScore} /></div>
          <div className="lg:col-span-4">{card(f1, 0, true, "h-full")}</div>
          <div className="flex flex-col gap-5 md:col-span-2 md:flex-row lg:col-span-3 lg:flex-col lg:pt-8">
            <div className="md:flex-1"><StickyNote {...stickyNotes[0]} rotate={-2} /></div>
            <div className="md:flex-1"><StickyNote {...stickyNotes[1]} rotate={1.5} /></div>
          </div>

          <div className="lg:col-span-4 lg:-mt-2">{card(f2, 1, false, "h-full")}</div>
          <div className="lg:col-span-4 lg:mt-10">{card(f3, 2, false, "h-full")}</div>
          <div className="lg:col-span-4">{card(f4, 3, false, "h-full")}</div>

          <div className="lg:col-span-3 lg:col-start-2 lg:mt-4"><StickyNote {...stickyNotes[2]} rotate={-1} /></div>
          <div className="md:col-span-2 lg:col-span-6">{card(f5, 4)}</div>
        </main>

        <footer className="mt-16 flex flex-col items-start justify-between gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>ClauseWise · design prototype</span>
          <span>Not legal advice. All findings are demo data.</span>
        </footer>
      </div>
      <FindingDetail finding={open} onClose={() => setOpen(null)} />
    </div>
  );
}
