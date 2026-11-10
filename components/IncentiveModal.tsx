"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LOCATIONS = ["Library", "Sports Center", "Theater", "Labs", "Classrooms"] as const;

const GREEN_ANSWERS: Record<string, string> = {
  Library: "Kaalaman",
  "Sports Center": "Katatagan",
  Theater: "Karunungan",
  Labs: "Malikhain",
  Classrooms: "Biyaya",
};

const RED_ANSWERS: Record<string, string> = {
  Library: "Aswang",
  "Sports Center": "Manananggal",
  Theater: "White Lady",
  Labs: "Multo",
  Classrooms: "Tiyanak",
};

type FieldState = "idle" | "correct" | "wrong";

// Normalize: lowercase, strip everything that isn't a letter.
// Case-insensitive and space/punctuation-insensitive, but letter ORDER matters.
function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

export default function IncentiveModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(LOCATIONS.map((loc) => [loc, ""]))
  );
  const [fieldStates, setFieldStates] = useState<Record<string, FieldState>>(
    Object.fromEntries(LOCATIONS.map((loc) => [loc, "idle"]))
  );

  if (!open) return null;

  const handleChange = (loc: string, value: string) => {
    setValues((prev) => ({ ...prev, [loc]: value }));
    setFieldStates((prev) => ({ ...prev, [loc]: "idle" }));
  };

  const isFieldCorrect = (loc: string) => {
    const v = normalize(values[loc]);
    return v === normalize(GREEN_ANSWERS[loc]) || v === normalize(RED_ANSWERS[loc]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allGreen = LOCATIONS.every(
      (loc) => normalize(values[loc]) === normalize(GREEN_ANSWERS[loc])
    );

    const allRed = LOCATIONS.every(
      (loc) => normalize(values[loc]) === normalize(RED_ANSWERS[loc])
    );

    if (allGreen) {
      onClose();
      router.push("/ending/penitensiya");
      return;
    }

    if (allRed) {
      onClose();
      router.push("/ending/daanan");
      return;
    }

    // No ending matched — show per-field feedback
    const newStates: Record<string, FieldState> = {};
    const cleared: Record<string, string> = { ...values };

    LOCATIONS.forEach((loc) => {
      if (isFieldCorrect(loc)) {
        newStates[loc] = "correct";
      } else {
        newStates[loc] = "wrong";
        cleared[loc] = "";
      }
    });

    setFieldStates(newStates);
    setValues(cleared);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md border-[4px] border-[#242218] bg-[#fff0a3] shadow-[8px_8px_0_rgba(36,34,24,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between border-b-[3px] border-[#242218] bg-[#ffe680] px-4 py-2">
          <h2 className="font-mono text-lg font-black text-[#211f17]">Incentive</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center border-2 border-[#242218] bg-[#c9c9c9] font-mono text-sm font-bold text-[#211f17] shadow-[inset_-2px_-2px_0_#6b6b6b,inset_2px_2px_0_#fff] transition-colors hover:bg-[#d6d6d6] active:shadow-[inset_2px_2px_0_#6b6b6b,inset_-2px_-2px_0_#fff]"
          >
            ✕
          </button>
        </div>

        {/* Instruction line */}
        <p className="border-b-[3px] border-[#242218] bg-[#fff7cc] px-5 py-3 text-center font-mono text-sm font-bold text-[#211f17]">
          Get the answers by visiting the locations!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 py-5">
          {LOCATIONS.map((loc) => {
            const state = fieldStates[loc];
            const borderClass =
              state === "correct"
                ? "border-[#22c55e]"
                : state === "wrong"
                  ? "border-[#ef4444]"
                  : "border-[#242218]";

            return (
              <label key={loc} className="flex flex-col gap-1">
                <span className="font-mono text-sm font-bold text-[#211f17]">{loc}</span>
                <input
                  type="text"
                  value={values[loc]}
                  onChange={(e) => handleChange(loc, e.target.value)}
                  className={`border-2 bg-white px-3 py-1.5 font-mono text-sm text-[#211f17] outline-none focus:bg-[#fffbe6] ${borderClass}`}
                />
              </label>
            );
          })}

          <button
            type="submit"
            className="mt-2 self-center border-[3px] border-black bg-[#c9c9c9] px-8 py-1.5 font-mono text-sm font-normal text-black shadow-[inset_-2px_-2px_0_#6b6b6b,inset_2px_2px_0_#fff] transition-colors hover:bg-[#d6d6d6] active:shadow-[inset_2px_2px_0_#6b6b6b,inset_-2px_-2px_0_#fff]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}