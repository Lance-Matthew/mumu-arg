// components/DebugResetButton.tsx
"use client";

import { resetProgress } from "@/lib/progress";

export default function DebugResetButton() {
  return (
    <button
      type="button"
      onClick={() => {
        resetProgress();
        window.location.reload();
      }}
      aria-label="Reset progress (debug)"
      title="Reset progress (debug)"
      className="fixed left-1 top-1 z-[300] rounded border border-black/40 bg-black/70 px-1.5 py-0.5 font-mono text-[10px] leading-none text-white/80 opacity-60 hover:opacity-100"
    >
      reset
    </button>
  );
}