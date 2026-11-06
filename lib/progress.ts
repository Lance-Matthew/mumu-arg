// lib/progress.ts

export type Progress = {
  libraryVisited: boolean;
  introSeen: boolean;
  happySequencePlayed: boolean;
  hasStartedGame: boolean; // ← added
};

const KEY = "app:progress:v1";

const DEFAULTS: Progress = {
  libraryVisited: false,
  introSeen: false,
  happySequencePlayed: false,
  hasStartedGame: false, // ← added
};

let cached: Progress = DEFAULTS;
let cachedJson = JSON.stringify(DEFAULTS);

function parse(): Progress {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

function refresh(): Progress {
  const next = parse();
  const json = JSON.stringify(next);
  if (json !== cachedJson) {
    cachedJson = json;
    cached = next;
  }
  return cached;
}

export function readProgress(): Progress {
  return refresh();
}

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function writeProgress(patch: Partial<Progress>): Progress {
  const next = { ...refresh(), ...patch };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  cachedJson = JSON.stringify(next);
  cached = next;
  emit();
  return cached;
}

export function resetProgress(): Progress {
  try {
    window.localStorage.removeItem(KEY);
  } catch {}
  cachedJson = JSON.stringify(DEFAULTS);
  cached = DEFAULTS;
  emit();
  return cached;
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY || e.key === null) {
      refresh();
      emit();
    }
  });
}

export function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function getSnapshot(): Progress {
  return refresh();
}

export function getServerSnapshot(): Progress {
  return DEFAULTS;
}