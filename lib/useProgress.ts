// lib/useProgress.ts
"use client";

import { useSyncExternalStore } from "react";
import {
  getServerSnapshot,
  getSnapshot,
  subscribe,
  type Progress,
} from "./progress";

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}