import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExtensionPopup, type ExtensionMode } from "@/components/clausewise/ExtensionPopup";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClauseWise — Terms & Privacy, in plain English" },
      { name: "description", content: "ClauseWise prototype: a browser extension that surfaces risky clauses in Terms & Privacy Policies." },
      { property: "og:title", content: "ClauseWise — Terms & Privacy, in plain English" },
      { property: "og:description", content: "Design prototype of an AI browser extension for reading the fine print." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [mode, setMode] = useState<ExtensionMode>("popup");
  return (
    <div className="canvas-dots flex min-h-screen flex-col items-center bg-canvas px-3 py-6">
      <div className="mb-4 flex gap-1 rounded-full bg-paper p-1 text-xs shadow-float">
        {(["popup", "panel"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={cn("rounded-full px-4 py-1.5 font-medium", mode === m ? "bg-charcoal text-charcoal-foreground" : "text-muted-foreground")}>
            {m === "popup" ? "Popup · 400px" : "Side panel · 460px"}
          </button>
        ))}
      </div>
      <ExtensionPopup key={mode} mode={mode} />
      <p className="mt-4 text-center text-[11px] text-muted-foreground">Extension preview · demo data only</p>
    </div>
  );
}
