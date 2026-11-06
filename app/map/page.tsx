"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import SchoolHeader from "@/components/SchoolHeader";

// ── progress ────────────────────────────────────────────────────
import { useProgress } from "@/lib/useProgress";
import { writeProgress } from "@/lib/progress";
import DebugResetButton from "@/components/DebugResetButton";
// ────────────────────────────────────────────────────────────────

const sifonn = localFont({
  src: "../fonts/Sifonn.otf",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const extrude = Array.from({ length: 18 }, (_, i) => `${((i + 1) * 0.0161).toFixed(4)}em ${((i + 1) * 0.0161).toFixed(4)}em 0 #000`).join(", ");

/* ==========================================
   ASSET PATHS
   ========================================== */
const IMG = "/images/map";
const ASSETS = {
  aaliyah1: `${IMG}/aaliyah1.png`,
  aaliyah2: `${IMG}/aaliyah2.png`,
  aaliyah3: `${IMG}/aaliyah3.png`,
  aaliyah4: `${IMG}/aaliyah4.png`,
  sad1: `${IMG}/aaliyahSad1.png`,
  sad2: `${IMG}/aaliyahSad2.png`,
  sad3: `${IMG}/aaliyahSad3.png`,
  scary1: `${IMG}/aaliyahScary1.png`,
  hand: `${IMG}/hand.png`,
  fiarce: `${IMG}/fiarce.png`,
  tutorialAudio: "/audio/tutorialMode.mp3",
  scaryAudio: "/audio/aaliyahScarySounds.mp3",
  jumpscare: "/videos/aaliyahJumpscare.mp4",
};

/* ==========================================
   ROUTES — adjust to your real folders
   ========================================== */
const ROUTES: Record<string, string> = {
  Library: "/locations/library",
  Gym: "/locations/gym",
  Theater: "/locations/theater",
  STEM: "/locations/stem",
  Classrooms: "/locations/classrooms",
};

const LOCK_BUTTONS_DURING_TUTORIAL = true;

/* ==========================================
   SEQUENCES
   ========================================== */
type Step = { img: string; ms: number | null; hand?: boolean; fiarce?: boolean; glitch?: boolean };

const INTRO: Step[] = [
  { img: ASSETS.aaliyah1, ms: 1000 },
  { img: ASSETS.aaliyah2, ms: 2300 },
  { img: ASSETS.aaliyah3, ms: 3000 },
  { img: ASSETS.aaliyah4, ms: 2000 },
  { img: ASSETS.aaliyah2, ms: 2500, hand: true },
  { img: ASSETS.aaliyah1, ms: 3000, fiarce: true },
  { img: ASSETS.aaliyah2, ms: 2500 },
  { img: ASSETS.aaliyah3, ms: 3000 },
  { img: ASSETS.aaliyah1, ms: null, hand: true },
];

const GLITCH_MS = 150;
const SCARY_HOLD_MS = 650;
const SCARY: Step[] = [
  { img: ASSETS.sad1, ms: 2000 },
  { img: ASSETS.scary1, ms: SCARY_HOLD_MS, glitch: true },
  { img: ASSETS.sad2, ms: 2000 },
  { img: ASSETS.scary1, ms: SCARY_HOLD_MS, glitch: true },
  { img: ASSETS.sad3, ms: 3000 },
  { img: ASSETS.scary1, ms: SCARY_HOLD_MS, glitch: true },
];

const FRAMES = [
  ASSETS.aaliyah1, ASSETS.aaliyah2, ASSETS.aaliyah3, ASSETS.aaliyah4,
  ASSETS.sad1, ASSETS.sad2, ASSETS.sad3, ASSETS.scary1,
];

/* ==========================================
   HANDHELD BUTTONS
   ========================================== */
const BTN_W = 19;
const BTN_H = 6.5;
const LOCATIONS = [
  { name: "Library", left: 19, top: 17 },
  { name: "Gym", left: 40.5, top: 17 },
  { name: "Theater", left: 62, top: 17 },
  { name: "STEM", left: 29.5, top: 29 },
  { name: "Classrooms", left: 51, top: 29 },
];
const LIBRARY = LOCATIONS[0];

const HAND_W = 12;
const HAND_LEFT = LIBRARY.left + 8;
const HAND_TOP = LIBRARY.top + 2;

type Phase = "intro" | "scary" | "empty" | "video";

/* ==========================================
   COMPONENT
   ========================================== */
export default function MapPage() {
  const router = useRouter();

  // ── progress ────────────────────────────────────────────────
  const progress = useProgress();
  const visited = progress.libraryVisited;   // true = already done the tutorial via Library
  // ────────────────────────────────────────────────────────────

  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [runId, setRunId] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const tutorialRef = useRef<HTMLAudioElement | null>(null);
  const scaryRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // ── mount ──────────────────────────────────────────────────
  useEffect(() => {
    if (!hydrated) return;

    // Already clicked Library before → land on last intro frame, no intro, no scary
    if (visited) {
      setPhase("intro");
      setStep(INTRO.length - 1);
      setStarted(true);
      return;
    }

    // First visit → play the intro normally
    let cancelled = false;
    const tutorial = new Audio(ASSETS.tutorialAudio);
    const scary = new Audio(ASSETS.scaryAudio);
    scary.preload = "auto";
    tutorialRef.current = tutorial;
    scaryRef.current = scary;

    tutorial
      .play()
      .then(() => { if (!cancelled) setStarted(true); })
      .catch(() => { if (!cancelled) setNeedsTap(true); });

    return () => {
      cancelled = true;
      tutorial.pause();
      scary.pause();
    };
  }, [hydrated, runId, visited]);
  // ────────────────────────────────────────────────────────────

  // step timer
  useEffect(() => {
    if (!started) return;
    const list = phase === "intro" ? INTRO : phase === "scary" ? SCARY : null;
    if (!list) return;
    const ms = list[step]?.ms;
    if (ms == null) return;

    const t = setTimeout(() => {
      if (step < list.length - 1) setStep(step + 1);
      else if (phase === "scary") setPhase("empty");
    }, ms);
    return () => clearTimeout(t);
  }, [phase, step, started, runId]);

  // empty → jumpscare trigger state (only reachable if they clicked a non-Library button on first visit)
  useEffect(() => {
    if (phase !== "empty") return;
    const go = () => setPhase("video");
    window.addEventListener("keydown", go);
    return () => window.removeEventListener("keydown", go);
  }, [phase]);

  useEffect(() => {
    if (phase === "video") {
      tutorialRef.current?.pause();
      scaryRef.current?.pause();
    }
  }, [phase]);

  const handleTapToStart = () => {
    tutorialRef.current?.play().catch(() => {});
    setNeedsTap(false);
    setStarted(true);
  };

  // ── click handler ───────────────────────────────────────────
  const handleLocation = (name: string) => {
    if (phase !== "intro") return;

    const route = ROUTES[name];
    if (!route) return;

    // Library → always navigate, and remember it so scary never plays again
    if (name === "Library") {
      writeProgress({ libraryVisited: true });
      router.push(route);
      return;
    }

    // Already visited Library → any other button just navigates, no scary
    if (visited) {
      router.push(route);
      return;
    }

    // First visit + non-Library → scary sequence
    tutorialRef.current?.pause();
    const scary = scaryRef.current;
    if (scary) {
      scary.currentTime = 0;
      scary.play().catch(() => {});
    }
    setPhase("scary");
    setStep(0);
  };
  // ────────────────────────────────────────────────────────────

  const restart = () => {
    setPhase("intro");
    setStep(0);
    setStarted(false);
    setNeedsTap(false);
    setRunId((r) => r + 1);
  };

  const current: Step | null = phase === "intro" ? INTRO[step] : phase === "scary" ? SCARY[step] : null;

  const canClick =
    phase === "intro" &&
    started &&
    (visited || !LOCK_BUTTONS_DURING_TUTORIAL || step === INTRO.length - 1);

  // once Library is visited, hide the hand / fiarce prompts (they only matter on the tutorial)
  const showHand = !!current?.hand && !visited;
  const showFiarce = !!current?.fiarce && !visited;

  return (
    <main
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #eaf5b5 0%, #c7f0a2 50%, #8cc152 100%)" }}
    >
      <DebugResetButton />

      <style>{`
        @keyframes bubble-float-a {
          0%, 100% { transform: translateY(0) rotate(-1.5deg); }
          50%      { transform: translateY(-0.6vw) rotate(1.5deg); }
        }
        @keyframes bubble-float-b {
          0%, 100% { transform: translate(0, 0) rotate(1deg); }
          50%      { transform: translate(0.3vw, -0.8vw) rotate(-1.5deg); }
        }
        .bubble-float-a { animation: bubble-float-a 3.6s ease-in-out infinite; }
        .bubble-float-b { animation: bubble-float-b 4.4s ease-in-out infinite 0.8s; }

        @keyframes hand-tap {
          0%   { transform: translate(60%, 60%) scale(1); opacity: 0; }
          25%  { transform: translate(0, 0) scale(1); opacity: 1; }
          40%  { transform: translate(0, 0) scale(0.85); }
          55%  { transform: translate(0, 0) scale(1); }
          70%  { transform: translate(0, 0) scale(0.85); }
          85%  { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(60%, 60%) scale(1); opacity: 0; }
        }
        .hand-tap { animation: hand-tap 1.6s ease-in-out infinite; }

        @keyframes btn-press {
          0%, 30%, 55%, 85%, 100% { transform: scale(1); }
          40%, 70% { transform: scale(0.92); }
        }
        .btn-press { animation: btn-press 1.6s ease-in-out infinite; }

        @keyframes fiarce-pop {
          0%   { transform: scale(0.2); opacity: 0; }
          15%  { transform: scale(1.1); opacity: 1; }
          25%  { transform: scale(1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fiarce-wobble {
          0%, 100% { transform: rotate(-6deg); }
          50%      { transform: rotate(6deg); }
        }
        .fiarce-pop { animation: fiarce-pop 0.5s ease-out both; }
        .fiarce-wobble { animation: fiarce-wobble 0.6s ease-in-out infinite; }

        @keyframes scary-flicker {
          0%   { opacity: 1; }
          15%  { opacity: 0.05; }
          30%  { opacity: 1; }
          45%  { opacity: 0; }
          60%  { opacity: 1; }
          75%  { opacity: 0.1; }
          100% { opacity: 1; }
        }
        .glitch { animation: scary-flicker ${GLITCH_MS}ms steps(1, end) both; }

        @media (prefers-reduced-motion: reduce) {
          .bubble-float-a, .bubble-float-b { animation: none; }
        }
      `}</style>

      <div className="fixed top-0 left-0 z-50 w-full">
        <SchoolHeader />
      </div>

      {/* ============ TITLE ============ */}
      <h1
        className={`${sifonn.className} pointer-events-none absolute z-30 grid grid-cols-1 leading-[0.9]`}
        style={{ left: "5.4vw", top: "6.2vw", fontSize: "4.4vw" }}
      >
        <span
          aria-hidden="true"
          style={{
            paintOrder: "stroke fill",
            color: "#000",
            WebkitTextStroke: "0.2em #000",
            textShadow: extrude,
            gridColumn: 1,
            gridRow: 1,
          }}
        >
          Tutorial<br />Mode
        </span>
        <span
          style={{
            paintOrder: "stroke fill",
            color: "#ffeb99",
            WebkitTextStroke: "0.08em #000",
            gridColumn: 1,
            gridRow: 1,
          }}
        >
          Tutorial<br />Mode
        </span>
      </h1>

      {/* ============ HANDHELD ============ */}
      <div
        className="absolute z-20"
        style={{ left: "25.13vw", top: "6.9vw", width: "85.34vw", containerType: "inline-size" }}
      >
        <Image
          src="/images/map/handheld.png"
          alt="Handheld console"
          width={0}
          height={0}
          sizes="85vw"
          priority
          className="block h-auto w-full drop-shadow-2xl"
        />

        {LOCATIONS.map((loc) => (
          <button
            key={loc.name}
            type="button"
            disabled={!canClick}
            onClick={() => handleLocation(loc.name)}
            aria-label={`Open ${loc.name}`}
            className={`${plexMono.className} absolute z-30 flex items-center justify-center border-2 border-black bg-[#c9c9c9] font-bold text-black shadow-[inset_-2px_-2px_0_#6b6b6b,inset_2px_2px_0_#fff] enabled:cursor-pointer enabled:hover:bg-[#d6d6d6] enabled:active:shadow-[inset_2px_2px_0_#6b6b6b,inset_-2px_-2px_0_#fff] ${
              loc.name === "Library" && showHand ? "btn-press" : ""
            }`}
            style={{
              left: `${loc.left}cqw`,
              top: `${loc.top}cqw`,
              width: `${BTN_W}cqw`,
              height: `${BTN_H}cqw`,
              fontSize: "2.1cqw",
            }}
          >
            {loc.name}
          </button>
        ))}

        {showHand && (
          <div
            key={`hand-${phase}-${step}`}
            className="pointer-events-none absolute z-50"
            style={{ left: `${HAND_LEFT}cqw`, top: `${HAND_TOP}cqw`, width: `${HAND_W}cqw` }}
          >
            <div className="hand-tap">
              <Image src={ASSETS.hand} alt="" width={0} height={0} sizes="12vw" className="block h-auto w-full" />
            </div>
          </div>
        )}

        {showFiarce && (
          <div
            key={`fiarce-${phase}-${step}`}
            className="pointer-events-none absolute z-40"
            style={{ left: "49.15cqw", top: "31.6cqw", width: "40cqw", translate: "-50% -50%" }}
          >
            <div className="fiarce-pop">
              <div className="fiarce-wobble">
                <Image src={ASSETS.fiarce} alt="" width={0} height={0} sizes="35vw" className="block h-auto w-full" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============ AALIYAH ============ */}
      <div
        className={`pointer-events-none absolute z-30 ${current?.glitch ? "glitch" : ""}`}
        style={{ left: "-17.5vw", top: "9.7vw", width: "88.2vw" }}
      >
        {FRAMES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? "Aaliyah" : ""}
            width={0}
            height={0}
            sizes="90vw"
            priority
            className={`h-auto w-full ${i === 0 ? "relative block" : "absolute left-0 top-0"}`}
            style={{ opacity: current?.img === src ? 1 : 0 }}
          />
        ))}
      </div>

      {/* ============ SPEECH BUBBLES ============ */}
      <div className="bubble-float-a pointer-events-none absolute z-30" style={{ left: "33.6vw", top: "9.9vw", width: "6.5vw" }}>
        <Image src="/images/map/message.png" alt="Speech bubble" width={0} height={0} sizes="7vw" className="block h-auto w-full" />
      </div>
      <div className="bubble-float-b pointer-events-none absolute z-30" style={{ left: "5.8vw", top: "25.7vw", width: "6.7vw" }}>
        <Image src="/images/map/message.png" alt="Speech bubble" width={0} height={0} sizes="7vw" className="block h-auto w-full scale-x-[-1]" />
      </div>

      {/* ============ TAP TO START ============ */}
      {needsTap && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <button
            onClick={handleTapToStart}
            className={`${plexMono.className} border-[3px] border-black bg-[#c9c9c9] px-8 py-3 text-xl font-bold text-black shadow-[inset_-3px_-3px_0_#6b6b6b,inset_3px_3px_0_#fff] hover:bg-[#d6d6d6] active:shadow-[inset_3px_3px_0_#6b6b6b,inset_-3px_-3px_0_#fff]`}
          >
            Click to Start
          </button>
        </div>
      )}

      {/* ============ JUMPSCARE TRIGGER ============ */}
      {/* Only reachable if they clicked a non-Library button on first visit */}
      {phase === "empty" && (
        <div
          className="fixed inset-0 z-[100]"
          onClick={() => setPhase("video")}
          aria-hidden="true"
        />
      )}

      {phase === "video" && (
        <video
          src={ASSETS.jumpscare}
          autoPlay
          playsInline
          onEnded={restart}
          onError={restart}
          className="fixed inset-0 z-[200] h-full w-full bg-black object-cover"
        />
      )}
    </main>
  );
}