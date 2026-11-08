"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import { IBM_Plex_Mono, Press_Start_2P } from "next/font/google";
import SchoolHeader from "@/components/SchoolHeader";

import { useProgress } from "@/lib/useProgress";
import { readProgress, writeProgress, resetProgress } from "@/lib/progress";

import MapComponent, {
  MAP_LOCATIONS,
  type LocationName,
} from "@/components/MapComponent";

const sifonn = localFont({
  src: "../fonts/Sifonn.otf",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const extrude = Array.from({ length: 18 }, (_, i) => `${((i + 1) * 0.0161).toFixed(4)}em ${((i + 1) * 0.0161).toFixed(4)}em 0 #000`).join(", ");

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
  happy1: `${IMG}/aaliyahHappy1.png`,
  happy2: `${IMG}/aaliyahHappy2.png`,
  happy3: `${IMG}/aaliyahHappy3.png`,
  hand: `${IMG}/hand.png`,
  fiarce: `${IMG}/fiarce.png`,
  tutorialAudio: "/audio/tutorialMode.mp3",
  scaryAudio: "/audio/aaliyahScarySounds.mp3",
  happyAudio: "/audio/aaliyahCongrats.mp3",
  jumpscare: "/videos/aaliyahJumpscare.mp4",
};

const LOCK_BUTTONS_DURING_TUTORIAL = true;

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

const HAPPY: Step[] = [
  { img: ASSETS.happy1, ms: 1000 },
  { img: ASSETS.happy2, ms: 800 },
  { img: ASSETS.happy3, ms: 800 },
  { img: ASSETS.happy1, ms: 1000 },
  { img: ASSETS.happy2, ms: 1000 },
  { img: ASSETS.happy3, ms: null },
];

const FRAMES = [
  ASSETS.aaliyah1, ASSETS.aaliyah2, ASSETS.aaliyah3, ASSETS.aaliyah4,
  ASSETS.sad1, ASSETS.sad2, ASSETS.sad3, ASSETS.scary1,
  ASSETS.happy1, ASSETS.happy2, ASSETS.happy3,
];

type Phase = "intro" | "scary" | "postScary" | "happy" | "empty" | "video";

/* ── responsive hook ─────────────────────────────────────────── */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

function HandOverlay() {
  const lib = MAP_LOCATIONS.find((l) => l.name === "Library");
  if (!lib) return null;
  return (
    <div
      className="pointer-events-none absolute z-50"
      style={{
        left: `${lib.xPct}%`,
        top: `${lib.yPct}%`,
        width: "12%",
        translate: "-10% 20%",
      }}
    >
      <div className="hand-tap">
        <Image src={ASSETS.hand} alt="" width={0} height={0} sizes="12vw" className="block h-auto w-full" />
      </div>
    </div>
  );
}

function FiarceOverlay() {
  return (
    <div
      className="pointer-events-none absolute z-40"
      style={{ left: "50%", top: "50%", width: "80%", translate: "-50% -50%" }}
    >
      <div className="fiarce-pop">
        <div className="fiarce-wobble">
          <Image src={ASSETS.fiarce} alt="" width={0} height={0} sizes="80vw" className="block h-auto w-full" />
        </div>
      </div>
    </div>
  );
}

export default function MapPage() {
  const router = useRouter();
  const isDesktop = useIsDesktop();

  const progress = useProgress();
  const visited = progress.libraryVisited;
  const happyPlayed = progress.happySequencePlayed;
  const hasStartedGame = progress.hasStartedGame;
  const titleTransitioned = progress.titleTransitioned;

  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [runId, setRunId] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [showHoverPulse, setShowHoverPulse] = useState(false);

  const isHappyFinished = phase === "happy" && (step === HAPPY.length - 1 || happyPlayed);

  const tutorialRef = useRef<HTMLAudioElement | null>(null);
  const scaryRef = useRef<HTMLAudioElement | null>(null);
  const happyRef = useRef<HTMLAudioElement | null>(null);

  const happyStartedRef = useRef(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const current = readProgress();
    const hasVisited = current.libraryVisited;
    const hasPlayedHappy = current.happySequencePlayed;
    const hasStarted = current.hasStartedGame;

    if (hasVisited && hasPlayedHappy) {
      setPhase("happy");
      setStep(HAPPY.length - 1);
      setStarted(true);
      return;
    }

    if (!hasVisited) {
      let cancelled = false;
      const tutorial = new Audio(ASSETS.tutorialAudio);
      const scary = new Audio(ASSETS.scaryAudio);
      scary.preload = "auto";
      tutorial.volume = 1.0;
      scary.volume = 1.0;
      tutorialRef.current = tutorial;
      scaryRef.current = scary;

      if (hasStarted) {
        tutorial.play().then(() => {
          if (!cancelled) setStarted(true);
        }).catch(() => {
          if (!cancelled) setStarted(false);
        });
        return () => { cancelled = true; tutorial.pause(); scary.pause(); };
      }

      return () => {
        cancelled = true;
        tutorial.pause();
        scary.pause();
      };
    }

    if (hasVisited && !hasPlayedHappy) {
      setPhase("happy");
      setStep(0);
      setStarted(true);
      return;
    }
  }, [hydrated, runId]);

  useEffect(() => {
    if (phase === "happy" && !happyPlayed && started && step === 0 && !happyStartedRef.current) {
      happyStartedRef.current = true;
      writeProgress({ happySequencePlayed: true });
      const happy = new Audio(ASSETS.happyAudio);
      happy.volume = 1.0;
      happyRef.current = happy;
      happy.play().catch(() => {});
    }
  }, [phase, started, step]);

  useEffect(() => {
    if (isHappyFinished && !titleTransitioned) {
      writeProgress({ titleTransitioned: true });
    }
  }, [isHappyFinished, titleTransitioned]);

  useEffect(() => {
    if (isHappyFinished) {
      setShowHoverPulse(true);
      const t = setTimeout(() => setShowHoverPulse(false), 1000);
      return () => clearTimeout(t);
    }
  }, [isHappyFinished]);

  useEffect(() => {
    if (!started) return;
    const list = phase === "intro" ? INTRO : phase === "scary" ? SCARY : phase === "happy" ? HAPPY : null;
    if (!list) return;
    const ms = list[step]?.ms;
    if (ms == null) return;

    const t = setTimeout(() => {
      if (step < list.length - 1) {
        setStep(step + 1);
      } else if (phase === "scary") {
        setPhase("empty");
      }
    }, ms);
    return () => clearTimeout(t);
  }, [phase, step, started, runId]);

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
      happyRef.current?.pause();
    }
  }, [phase]);

  useEffect(() => {
    return () => {
      tutorialRef.current?.pause();
      scaryRef.current?.pause();
      happyRef.current?.pause();
    };
  }, []);

  const handleStartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasStartedGame) writeProgress({ hasStartedGame: true });

    if (tutorialRef.current) {
      tutorialRef.current.play()
        .then(() => setStarted(true))
        .catch((err) => console.error("Audio play failed:", err));
    } else {
      setStarted(true);
    }
  };

  const handleLocation = (name: LocationName, href: string) => {
    if (phase !== "intro" && phase !== "postScary" && !isHappyFinished) return;
    if (phase === "postScary" && name !== "Library") return;

    if (name === "Library") {
      tutorialRef.current?.pause();
      scaryRef.current?.pause();
      happyRef.current?.pause();
      writeProgress({ libraryVisited: true });
      router.push(href);
      return;
    }

    if (visited) {
      router.push(href);
      return;
    }

    tutorialRef.current?.pause();
    const scary = scaryRef.current;
    if (scary) {
      scary.currentTime = 0;
      scary.play().catch(() => {});
    }
    setPhase("scary");
    setStep(0);
  };

  const handleDebugReset = () => {
    resetProgress();
    window.location.reload();
  };

  const restart = () => {
    setPhase("postScary");
    setStep(0);
    setStarted(true);
    happyStartedRef.current = false;
  };

  const current: Step | null =
    phase === "intro" ? INTRO[step] :
    phase === "scary" ? SCARY[step] :
    phase === "happy" ? HAPPY[step] : null;

  const canClick =
    (phase === "intro" &&
      started &&
      (visited || !LOCK_BUTTONS_DURING_TUTORIAL || step === INTRO.length - 1)) ||
    (phase === "postScary") ||
    (visited && isHappyFinished);

  const showHand = (!!current?.hand && !visited) || phase === "postScary";
  const showFiarce = !!current?.fiarce && !visited;

  const bubblesFrozen =
    phase === "scary" ||
    phase === "empty" ||
    phase === "video" ||
    phase === "postScary";

  const bubbleClassA = bubblesFrozen ? "bubble-frozen-a" : "bubble-float-a";
  const bubbleClassB = bubblesFrozen ? "bubble-frozen-b" : "bubble-float-b";

  const showCampusMapText = !!titleTransitioned;
  const needsTap = !visited && !hasStartedGame;
  const hideAaliyah = needsTap || phase === "postScary";

  const muteForced =
    phase === "scary" ||
    phase === "empty" ||
    phase === "video";

  const autoStartVolume = needsTap ? 3 : undefined;

  const mapOverlay = needsTap ? (
    <button
      type="button"
      onClick={handleStartClick}
      className="pointer-events-auto absolute inset-0 z-[60] bg-black flex items-center justify-center w-full h-full cursor-pointer hover:bg-[#111] transition-colors"
    >
      <span className={`${plexMono.className} text-white text-3xl font-bold tracking-widest animate-pulse`}>
        PRESS TO START
      </span>
    </button>
  ) : (
    <>
      {showHand && <HandOverlay key={`hand-${phase}-${step}`} />}
      {showFiarce && <FiarceOverlay key={`fiarce-${phase}-${step}`} />}
    </>
  );

  return (
    <main
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #eaf5b5 0%, #c7f0a2 50%, #8cc152 100%)" }}
    >
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

        .bubble-frozen-a {
          animation: none !important;
          transform: translateY(-0.6vw) rotate(1.5deg);
        }
        .bubble-frozen-b {
          animation: none !important;
          transform: translate(0.3vw, -0.8vw) rotate(-1.5deg);
        }

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
        .fiarce-wobble { animation: fiarce-wobble 1.2s ease-in-out infinite; }

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

      {isDesktop && (
        <div className="w-full h-full">
          <div
            className={`${sifonn.className} pointer-events-none absolute z-30 grid grid-cols-1 leading-[0.9]`}
            style={{
              left: "5.4vw", top: "6.2vw", fontSize: "4.4vw",
              opacity: needsTap ? 0 : 1,
              transition: "opacity 0.5s ease-in-out"
            }}
          >
            <div
              className="grid grid-cols-1 transition-all duration-1000 ease-in-out"
              style={{
                opacity: showCampusMapText ? 0 : 1,
                transform: showCampusMapText ? "translateY(-20px)" : "translateY(0)",
                pointerEvents: showCampusMapText ? "none" : "auto",
                gridColumn: 1,
                gridRow: 1,
              }}
            >
              <span aria-hidden="true" style={{ paintOrder: "stroke fill", color: "#000", WebkitTextStroke: "0.2em #000", textShadow: extrude, gridColumn: 1, gridRow: 1 }}>
                Tutorial<br />Mode
              </span>
              <span style={{ paintOrder: "stroke fill", color: "#ffeb99", WebkitTextStroke: "0.08em #000", gridColumn: 1, gridRow: 1 }}>
                Tutorial<br />Mode
              </span>
            </div>

            <div
              className="grid grid-cols-1 transition-all duration-1000 ease-in-out"
              style={{
                opacity: showCampusMapText ? 1 : 0,
                transform: showCampusMapText ? "translateY(0)" : "translateY(20px)",
                pointerEvents: showCampusMapText ? "auto" : "none",
                gridColumn: 1,
                gridRow: 1,
              }}
            >
              <span aria-hidden="true" style={{ paintOrder: "stroke fill", color: "#000", WebkitTextStroke: "0.2em #000", textShadow: extrude, gridColumn: 1, gridRow: 1 }}>
                Campus<br />Map
              </span>
              <span style={{ paintOrder: "stroke fill", color: "#8cc152", WebkitTextStroke: "0.08em #000", gridColumn: 1, gridRow: 1 }}>
                Campus<br />Map
              </span>
            </div>
          </div>

          <div
            className="absolute z-20 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              width: "55.7vw",
              top: "55%",
              right: needsTap ? "50%" : "5vw",
              transform: needsTap ? "translate(50%, -50%) scale(1.05)" : "translate(0%, -50%) scale(1)",
            }}
          >
            <MapComponent
              onLocationClick={handleLocation}
              disabled={!canClick}
              pressedLocation={showHand ? "Library" : undefined}
              hoverOnly={phase === "postScary" ? "Library" : undefined}
              forceHoverAll={showHoverPulse}
              muteForced={muteForced}
              autoStartVolume={autoStartVolume}
              onResetSequence={handleDebugReset}
              fontClassName={pressStart.className}
              overlay={mapOverlay}
            />
          </div>

          <div
            className={`pointer-events-none absolute z-40 ${current?.glitch ? "glitch" : ""}`}
            style={{
              left: "-17.5vw", top: "9.7vw", width: "88.2vw",
              opacity: hideAaliyah ? 0 : 1,
              transition: "opacity 0.7s ease-in-out"
            }}
          >
            {FRAMES.map((src, i) => {
              const isHappy1 = src === ASSETS.happy1;
              const isHappy2Or3 = src === ASSETS.happy2 || src === ASSETS.happy3;

              let transform = "scale(1)";
              if (isHappy1) transform = "scale(0.9) translateY(-20%)";
              else if (isHappy2Or3) transform = "scale(0.9) translateY(-11%)";

              return (
                <Image
                  key={src}
                  src={src}
                  alt={i === 0 ? "Aaliyah" : ""}
                  width={0}
                  height={0}
                  sizes="90vw"
                  priority
                  className={`h-auto w-full ${i === 0 ? "relative block" : "absolute left-0 top-0"}`}
                  style={{
                    opacity: current?.img === src ? 1 : 0,
                    transform,
                    transformOrigin: "bottom center",
                  }}
                />
              );
            })}
          </div>

          <div className={`${bubbleClassA} pointer-events-none absolute z-30`} style={{ left: "1.6vw", top: "30.9vw", width: "10.9vw", opacity: needsTap ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}>
            <Image src="/images/map/message.png" alt="Speech bubble" width={0} height={0} sizes="7vw" className="block h-auto w-full" />
          </div>
          <div className={`${bubbleClassB} pointer-events-none absolute z-30`} style={{ left: "2.8vw", top: "15.7vw", width: "15.63vw", opacity: needsTap ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}>
            <Image src="/images/map/message.png" alt="Speech bubble" width={0} height={0} sizes="7vw" className="block h-auto w-full scale-x-[-1]" />
          </div>
        </div>
      )}

      {!isDesktop && (
        <div className="flex flex-col items-center justify-center w-full h-full px-4 pt-24 pb-8 gap-4">
          <div
            className={`${sifonn.className} relative z-40 grid grid-cols-1 leading-[0.9] text-center mb-2 w-full flex justify-center`}
            style={{
              fontSize: "clamp(2.5rem, 12vw, 3.5rem)",
              opacity: needsTap ? 0 : 1,
              transition: "opacity 0.5s ease-in-out"
            }}
          >
            <div
              className="grid grid-cols-1 transition-all duration-1000 ease-in-out"
              style={{
                opacity: showCampusMapText ? 0 : 1,
                transform: showCampusMapText ? "translateY(-20px)" : "translateY(0)",
                gridColumn: 1,
                gridRow: 1,
              }}
            >
              <span aria-hidden="true" style={{ paintOrder: "stroke fill", color: "#000", WebkitTextStroke: "0.2em #000", textShadow: extrude, gridColumn: 1, gridRow: 1 }}>Tutorial<br />Mode</span>
              <span style={{ paintOrder: "stroke fill", color: "#ffeb99", WebkitTextStroke: "0.08em #000", gridColumn: 1, gridRow: 1 }}>Tutorial<br />Mode</span>
            </div>
            <div
              className="grid grid-cols-1 transition-all duration-1000 ease-in-out"
              style={{
                opacity: showCampusMapText ? 1 : 0,
                transform: showCampusMapText ? "translateY(0)" : "translateY(20px)",
                gridColumn: 1,
                gridRow: 1,
              }}
            >
              <span aria-hidden="true" style={{ paintOrder: "stroke fill", color: "#000", WebkitTextStroke: "0.2em #000", textShadow: extrude, gridColumn: 1, gridRow: 1 }}>Campus<br />Map</span>
              <span style={{ paintOrder: "stroke fill", color: "#8cc152", WebkitTextStroke: "0.08em #000", gridColumn: 1, gridRow: 1 }}>Campus<br />Map</span>
            </div>
          </div>

          <div
            className={`relative w-full max-w-[18rem] pointer-events-none mt-4 z-40 ${current?.glitch ? "glitch" : ""}`}
            style={{ opacity: hideAaliyah ? 0 : 1, transition: "opacity 0.7s ease-in-out" }}
          >
            {FRAMES.map((src, i) => {
              const isHappy1 = src === ASSETS.happy1;
              const isHappy2Or3 = src === ASSETS.happy2 || src === ASSETS.happy3;

              let transform = "scale(1)";
              if (isHappy1) transform = "scale(0.9) translateY(-20%)";
              else if (isHappy2Or3) transform = "scale(0.9) translateY(-11%)";

              return (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority
                  className={`h-auto w-full ${i === 0 ? "relative block" : "absolute left-0 top-0"}`}
                  style={{
                    opacity: current?.img === src ? 1 : 0,
                    transform,
                    transformOrigin: "bottom center",
                  }}
                />
              );
            })}
          </div>

          <div
            className="relative z-20 w-full max-w-[20rem] mt-auto transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              position: needsTap ? "fixed" : "relative",
              top: needsTap ? "50%" : "auto",
              left: needsTap ? "50%" : "auto",
              transform: needsTap ? "translate(-50%, -50%) scale(1.05)" : "translate(0, 0) scale(1)",
              width: needsTap ? "85vw" : "100%"
            }}
          >
            <MapComponent
              onLocationClick={handleLocation}
              disabled={!canClick}
              pressedLocation={showHand ? "Library" : undefined}
              hoverOnly={phase === "postScary" ? "Library" : undefined}
              forceHoverAll={showHoverPulse}
              muteForced={muteForced}
              autoStartVolume={autoStartVolume}
              onResetSequence={handleDebugReset}
              fontClassName={pressStart.className}
              overlay={mapOverlay}
            />
          </div>
        </div>
      )}

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
          //volume used to be here
          className="fixed inset-0 z-[200] h-full w-full bg-black object-cover"
        />
      )}
    </main>
  );
}