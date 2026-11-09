"use client";

import { useId, useRef, useState, useEffect, type CSSProperties, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { readProgress, writeProgress } from "@/lib/progress";

const IMG_DIR = "/images/maze";
const CURSOR_SRC = `${IMG_DIR}/mazeCursor.png`;
const GATE_SRC = `${IMG_DIR}/mazeGate.png`;
const BGM_SRC = "/audio/handheldBGM.mp3";

const COLORS = {
  screen: "#2c4e8a",
  wall: "#88a65a",
  path: "#6a8f19",
  decor: "#88a65a",
  text: "#ffffff",
  ring: "#ffeb99",
};

type Point = { x: number; y: number };
type Segment = [x1: number, y1: number, x2: number, y2: number];

const VB = { x: 245, y: -62, w: 655, h: 780 };
const REF = { sx: 1.194, sy: 1.27, ox: 241, oy: -8 };
const toMap = (x: number, y: number): Point => ({
  x: x * REF.sx + REF.ox,
  y: y * REF.sy + REF.oy,
});

const PATH_POLYGON: Point[] = [
  { x: 826, y: 84 }, { x: 744, y: 84 }, { x: 744, y: 109 }, { x: 621, y: 109 },
  { x: 621, y: 244 }, { x: 524, y: 244 }, { x: 524, y: 341 }, { x: 572, y: 341 },
  { x: 572, y: 415 }, { x: 492, y: 415 }, { x: 492, y: 491 }, { x: 416, y: 492 },
  { x: 416, y: 565 }, { x: 333, y: 566 }, { x: 333, y: 603 }, { x: 444, y: 603 },
  { x: 444, y: 528 }, { x: 517, y: 527 }, { x: 517, y: 431 }, { x: 592, y: 430 },
  { x: 592, y: 326 }, { x: 543, y: 326 }, { x: 543, y: 259 }, { x: 635, y: 259 },
  { x: 634, y: 123 }, { x: 758, y: 123 }, { x: 758, y: 98 }, { x: 826, y: 98 },
];
const PATH_POINTS = PATH_POLYGON.map((p) => `${p.x},${p.y}`).join(" ");

const WALL_THICKNESS = 14;
const WALLS: Segment[] = [
  [74, 34, 74, 414], [74, 34, 244, 34], [321, 34, 484, 34], [74, 142, 229, 142],
  [229, 34, 229, 142], [74, 246, 207, 246], [207, 142, 207, 246], [74, 366, 170, 366],
  [170, 246, 170, 366], [376, 154, 489, 154], [376, 154, 376, 306], [349, 306, 489, 306],
  [489, 136, 489, 509], [349, 306, 349, 509], [74, 509, 244, 509], [321, 509, 489, 509],
];
const WALL_PATH = WALLS.map(([x1, y1, x2, y2]) => {
  const a = toMap(x1, y1);
  const b = toMap(x2, y2);
  return `M${Math.round(a.x)} ${Math.round(a.y)}L${Math.round(b.x)} ${Math.round(b.y)}`;
}).join(" ");

const DOOR_THICKNESS = 14;
const DOOR_LINES: Segment[] = [
  [579, 40, 579, 250], [514, 104, 579, 104], [488, 252, 540, 252], [690, 252, 625, 252],
  [444, 379, 582, 379], [579, 509, 579, 630], [658, 509, 505, 509],
];

const GATE_W = 78;
const GATE_H = 40;
const GATES: { at: Point; rotate: number }[] = [
  { at: { x: 579, y: 35 }, rotate: 0 },
  { at: { x: 579, y: 638 }, rotate: 0 },
  { at: { x: 849, y: 90 }, rotate: 90 },
  { at: { x: 297, y: 584 }, rotate: 90 },
];

const PIN_TIP: Point = { x: 582, y: 375 };
const PIN_W = 48;
const PIN_H = 66;

const GRASS: Point[] = [{ x: 693, y: 94 }, { x: 498, y: 346 }, { x: 594, y: 474 }];
const DINING: Point[] = [{ x: 709, y: 143 }, { x: 781, y: 143 }, { x: 658, y: 343 }, { x: 367, y: 487 }];

const TILE = 56;

const ROOM_DEFS = [
  { id: 1, name: "Library", title: "1.Library", href: "/locations/library", labelAt: { x: 415, y: 379 }, boxAt: { x: 417, y: 413 } },
  { id: 2, name: "Gym", title: "2.Sports Center", href: "/locations/gym", labelAt: { x: 148, y: 58 }, boxAt: { x: 148, y: 98 } },
  { id: 3, name: "Theater", title: "3.Theater", href: "/locations/theater", labelAt: { x: 138, y: 166 }, boxAt: { x: 138, y: 205 } },
  { id: 4, name: "STEM", title: "4.Labs", href: "/locations/stem", labelAt: { x: 117, y: 275 }, boxAt: { x: 118, y: 310 } },
  { id: 5, name: "Classrooms", title: "5.Classrooms", href: "/locations/classrooms", labelAt: { x: 430, y: 194 }, boxAt: { x: 432, y: 230 } },
] as const;

export type LocationName = (typeof ROOM_DEFS)[number]["name"];

const ROOMS = ROOM_DEFS.map((r) => ({
  ...r,
  src: `${IMG_DIR}/${r.id}.png`,
  label: toMap(r.labelAt.x, r.labelAt.y),
  tile: toMap(r.boxAt.x, r.boxAt.y),
}));

export const MAP_LOCATIONS = ROOMS.map((r) => ({
  name: r.name as LocationName,
  title: r.title,
  href: r.href,
  xPct: ((r.tile.x - VB.x) / VB.w) * 100,
  yPct: ((r.tile.y - VB.y) / VB.h) * 100,
}));

const CONSOLE_ASPECT = 1.45;
const SHELL_H = 100 / CONSOLE_ASPECT;
const SCREEN_W = 51.4;
const SCREEN_H = (SCREEN_W * VB.h) / VB.w;
const SCREEN_L = (100 - SCREEN_W) / 2;
const SCREEN_T = (SHELL_H - SCREEN_H) / 2;
const BEZEL = 1.3;

const cq = (n: number) => `${n}cqw`;

const CROSS =
  "polygon(33.3% 0%, 66.7% 0%, 66.7% 33.3%, 100% 33.3%, 100% 66.7%, 66.7% 66.7%, 66.7% 100%, 33.3% 100%, 33.3% 66.7%, 0% 66.7%, 0% 33.3%, 33.3% 33.3%)";

type MapComponentProps = {
  onLocationClick?: (name: LocationName, href: string) => void;
  disabled?: boolean;
  pressedLocation?: LocationName;
  hoverOnly?: LocationName;
  forceHoverAll?: boolean;
  muteForced?: boolean;
  autoStartVolume?: number;
  onResetSequence?: () => void;
  overlay?: ReactNode;
  fontClassName?: string;
  className?: string;
  style?: CSSProperties;
};

type Direction = "up" | "down" | "left" | "right";
const TARGET_SEQUENCE: Direction[] = ["up", "down", "up", "down", "left", "right", "left", "right"];

export default function MapComponent({
  onLocationClick,
  disabled = false,
  pressedLocation,
  hoverOnly,
  forceHoverAll = false,
  muteForced = false,
  autoStartVolume,
  onResetSequence,
  overlay,
  fontClassName = "",
  className,
  style,
}: MapComponentProps) {
  const router = useRouter();
  const uid = useId().replace(/:/g, "");
  const grassId = `${uid}-grass`;
  const diningId = `${uid}-dining`;

  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const initial = typeof window !== "undefined" ? readProgress() : null;

  const [bgmVolume, setBgmVolume] = useState<number>(
    autoStartVolume ?? initial?.bgmVolume ?? 3
  );
  const [isMuted, setIsMuted] = useState<boolean>(
    autoStartVolume != null ? false : (initial?.bgmMuted ?? true)
  );

  const seqRef = useRef<Direction[]>([]);
  const lastPressRef = useRef<number>(0);
  const [showResetFlash, setShowResetFlash] = useState(false);

  useEffect(() => {
    if (bgmRef.current) {
      try {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
        bgmRef.current.src = "";
      } catch {}
      bgmRef.current = null;
    }

    const audio = new Audio(BGM_SRC);
    audio.loop = true;
    audio.volume = (autoStartVolume ?? initial?.bgmVolume ?? 3) / 100;
    audio.muted = autoStartVolume != null ? false : (initial?.bgmMuted ?? true);
    bgmRef.current = audio;

    const savedTime = initial?.bgmCurrentTime ?? 0;
    const onCanPlay = () => {
      if (savedTime > 0) {
        try { audio.currentTime = savedTime; } catch {}
      }
    };
    audio.addEventListener("loadedmetadata", onCanPlay, { once: true });

    audio.play().catch(() => {});

    const persistTime = () => {
      if (audio.currentTime > 0) {
        writeProgress({ bgmCurrentTime: audio.currentTime });
      }
    };

    const onBeforeUnload = () => {
      persistTime();
      audio.pause();
    };
    const onVis = () => {
      if (document.hidden) {
        persistTime();
        audio.pause();
      }
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("visibilitychange", onVis);

    const interval = window.setInterval(() => {
      if (!audio.paused && audio.currentTime > 0) {
        writeProgress({ bgmCurrentTime: audio.currentTime });
      }
    }, 3000);

    return () => {
      persistTime();
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("visibilitychange", onVis);
      window.clearInterval(interval);
      audio.pause();
      try { audio.currentTime = 0; audio.src = ""; } catch {}
      if (bgmRef.current === audio) bgmRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bgmRef.current) bgmRef.current.volume = bgmVolume / 100;
    writeProgress({ bgmVolume });
  }, [bgmVolume]);

  useEffect(() => {
    if (!bgmRef.current) return;
    if (isMuted) {
      bgmRef.current.pause();
      bgmRef.current.muted = true;
    } else {
      bgmRef.current.muted = false;
      bgmRef.current.play().catch(() => {});
    }
    writeProgress({ bgmMuted: isMuted, bgmWasPlaying: !isMuted });
  }, [isMuted]);

  useEffect(() => {
    if (!bgmRef.current) return;
    if (muteForced) bgmRef.current.pause();
  }, [muteForced]);

  const toggleMute = () => {
    if (muteForced) return;
    setIsMuted((prev) => !prev);
  };

  const handleDirection = (dir: Direction) => {
    const now = Date.now();
    const gap = now - lastPressRef.current;

    let next = gap > 2000 ? [] : seqRef.current;
    next = [...next, dir].slice(-TARGET_SEQUENCE.length);
    seqRef.current = next;
    lastPressRef.current = now;

    if (
      next.length === TARGET_SEQUENCE.length &&
      next.every((d, i) => d === TARGET_SEQUENCE[i])
    ) {
      seqRef.current = [];
      lastPressRef.current = 0;
      setShowResetFlash(true);

      if (bgmRef.current) {
        try {
          bgmRef.current.pause();
          bgmRef.current.currentTime = 0;
          bgmRef.current.src = "";
        } catch {}
        bgmRef.current = null;
      }

      onResetSequence?.();
    }
  };

  const activate = (name: LocationName, href: string) => {
    if (disabled) return;
    if (bgmRef.current && !isMuted && !muteForced) {
      bgmRef.current.play().catch(() => {});
    }
    if (onLocationClick) onLocationClick(name, href);
    else router.push(href);
  };

  const textStyle: CSSProperties = {};

  return (
    <div className={className} style={{ containerType: "inline-size", ...style }}>
      <style>{`
        .mapc-loc { cursor: pointer; outline: none; }
        .mapc-loc[aria-disabled="true"] { cursor: default; pointer-events: none; }
        .mapc-tile {
          transform-box: fill-box;
          transform-origin: center;
          transition: transform 120ms ease-out, filter 120ms ease-out;
        }
        .mapc-ring { fill: none; stroke: ${COLORS.ring}; stroke-width: 3; opacity: 0; transition: opacity 120ms; }
        
        .mapc-loc:hover .mapc-tile,
        .mapc-loc:focus-visible .mapc-tile { transform: scale(1.1); filter: brightness(1.12); }
        .mapc-loc:hover .mapc-ring,
        .mapc-loc:focus-visible .mapc-ring { opacity: 1; }

        ${hoverOnly ? `
          .mapc-loc[data-name="${hoverOnly}"]:hover .mapc-tile,
          .mapc-loc[data-name="${hoverOnly}"]:focus-visible .mapc-tile { transform: scale(1.1); filter: brightness(1.12); }
          .mapc-loc[data-name="${hoverOnly}"]:hover .mapc-ring,
          .mapc-loc[data-name="${hoverOnly}"]:focus-visible .mapc-ring { opacity: 1; }
          .mapc-loc:not([data-name="${hoverOnly}"]) .mapc-tile,
          .mapc-loc:not([data-name="${hoverOnly}"]) .mapc-ring { transform: none !important; filter: none !important; opacity: 0 !important; }
        ` : ""}

        ${forceHoverAll ? `
          .mapc-force-hover .mapc-tile { transform: scale(1.1) !important; filter: brightness(1.12) !important; }
          .mapc-force-hover .mapc-ring { opacity: 1 !important; }
        ` : ""}

        @keyframes mapc-press {
          0%, 30%, 55%, 85%, 100% { transform: scale(1); }
          40%, 70% { transform: scale(0.9); }
        }
        .mapc-pressed .mapc-tile { animation: mapc-press 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .mapc-pressed .mapc-tile { animation: none; }
          .mapc-tile { transition: none; }
        }

        .vol-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px;
          background: transparent;
          outline: none;
          cursor: pointer;
        }
        .vol-slider::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          background: #1a1a1a;
          border: 1px solid #000;
          border-radius: 4px;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.8);
        }
        .vol-slider::-moz-range-track {
          width: 100%;
          height: 8px;
          background: #1a1a1a;
          border: 1px solid #000;
          border-radius: 4px;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.8);
        }
        .vol-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          margin-top: -6px;
          border-radius: 3px;
          background: repeating-linear-gradient(
            90deg, #d9d9d9 0px, #d9d9d9 1.5px, #a0a0a0 1.5px, #a0a0a0 3px
          );
          border: 1px solid #000;
          box-shadow: inset 0 1px 0 #fff, 0 2px 3px rgba(0,0,0,0.6);
          cursor: pointer;
        }
        .vol-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 3px;
          background: repeating-linear-gradient(
            90deg, #d9d9d9 0px, #d9d9d9 1.5px, #a0a0a0 1.5px, #a0a0a0 3px
          );
          border: 1px solid #000;
          box-shadow: inset 0 1px 0 #fff, 0 2px 3px rgba(0,0,0,0.6);
          cursor: pointer;
        }

        .dp-btn {
          position: absolute;
          background: transparent;
          border: none;
          cursor: default;
          outline: none;
          z-index: 5;
        }
        .dp-btn:active { box-shadow: inset 0 0 6px rgba(0,0,0,0.7); }
        @keyframes reset-flash {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        .reset-flash { animation: reset-flash 800ms ease-out forwards; }
      `}</style>

      <div
        className="relative w-full"
        style={{
          height: cq(SHELL_H),
          background: "#c9c9c9",
          borderRadius: cq(3.2),
          boxShadow: [
            `0 0 0 ${cq(0.5)} #000`,
            `inset ${cq(-0.7)} ${cq(-0.7)} 0 #6b6b6b`,
            `inset ${cq(0.7)} ${cq(0.7)} 0 #fff`,
            `0 ${cq(1.6)} ${cq(2.6)} rgba(0,0,0,0.45)`,
          ].join(", "),
        }}
      >
        <div
          className="absolute z-50 flex flex-col items-center"
          style={{ right: cq(5), top: cq(3.5), width: cq(12) }}
        >
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute background music" : "Mute background music"}
            className="flex items-center justify-center gap-1 rounded-sm border border-black transition-colors"
            style={{
              width: cq(12),
              height: cq(3.2),
              background: isMuted ? "#5a2323" : "#2b5a2b",
              boxShadow: isMuted
                ? "inset 0 1px 0 #a04a4a, inset 0 -1px 0 #2a0f0f"
                : "inset 0 1px 0 #5ec85e, inset 0 -1px 0 #0f2a0f",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: cq(1.8), lineHeight: 1 }}>{isMuted ? "🔇" : "🔊"}</span>
            <span style={{ fontSize: cq(1.5), color: "#fff", letterSpacing: "0.05em", fontWeight: "bold" }}>
              {isMuted ? "OFF" : "ON"}
            </span>
          </button>

          <div
            className="mt-1.5 rounded-sm flex items-center"
            style={{
              width: cq(12),
              height: cq(3),
              background: "#8a8a8a",
              border: "1px solid #000",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.6), 0 1px 0 #fff",
              padding: "0 6px",
            }}
          >
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={bgmVolume}
              onChange={(e) => {
                if (muteForced) return;
                setBgmVolume(parseInt(e.target.value, 10));
                if (isMuted) setIsMuted(false);
              }}
              className="vol-slider"
              aria-label="Volume"
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute"
          style={{
            left: cq(SCREEN_L - BEZEL),
            top: cq(SCREEN_T - BEZEL),
            width: cq(SCREEN_W + BEZEL * 2),
            height: cq(SCREEN_H + BEZEL * 2),
            background: "#1a2036",
            border: `${cq(0.4)} solid #000`,
            borderRadius: cq(1.6),
            boxSizing: "border-box",
            boxShadow: `inset 0 0 ${cq(1.2)} rgba(0,0,0,0.9)`,
          }}
        />

        <div
          className="absolute overflow-hidden"
          style={{
            left: cq(SCREEN_L),
            top: cq(SCREEN_T),
            width: cq(SCREEN_W),
            height: cq(SCREEN_H),
            borderRadius: cq(0.6),
            background: COLORS.screen,
          }}
        >
          <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} className="block h-full w-full" aria-label="Campus map">
            <defs>
              <g id={grassId} fill="none" stroke={COLORS.decor} strokeWidth="1.5" strokeLinecap="round">
                <path d="M0 0 C-2 -8 -6 -12 -9 -17" />
                <path d="M0 0 C0 -9 -1 -15 -2 -22" />
                <path d="M0 0 C2 -8 5 -14 9 -18" />
                <path d="M0 0 C4 -6 9 -9 14 -10" />
                <path d="M0 0 C-4 -6 -9 -8 -14 -9" />
              </g>
              <g id={diningId} fill="none" stroke={COLORS.decor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 -1 A9.2 9.2 0 1 0 6 13" />
                <path d="M12 -1 V5 M14.5 -1 V5 M17 -1 V5 M12 5 Q14.5 8 17 5 M14.5 8 V14" />
                <path d="M21 14 V-1 Q24 2 21 7" />
              </g>
            </defs>

            <rect x={VB.x} y={VB.y} width={VB.w} height={VB.h} fill={COLORS.screen} />

            <text x={VB.x + VB.w / 2} y={-14} textAnchor="middle" fontSize="25" fill={COLORS.text} className={fontClassName} style={textStyle}>
              University of Santo Fiarce
            </text>

            {GRASS.map((p, i) => (
              <use key={`g${i}`} href={`#${grassId}`} x={p.x} y={p.y} />
            ))}
            {DINING.map((p, i) => (
              <use key={`d${i}`} href={`#${diningId}`} x={p.x - 7} y={p.y - 6} />
            ))}

            <g stroke={COLORS.path} strokeWidth={DOOR_THICKNESS} strokeLinecap="butt">
              {DOOR_LINES.map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
              ))}
            </g>

            <path d={WALL_PATH} fill="none" stroke={COLORS.wall} strokeWidth={WALL_THICKNESS} strokeLinecap="square" strokeLinejoin="miter" />
            <polygon points={PATH_POINTS} fill={COLORS.path} />

            {GATES.map((g, i) => (
              <image
                key={i}
                href={GATE_SRC}
                x={g.at.x - GATE_W / 2}
                y={g.at.y - GATE_H / 2}
                width={GATE_W}
                height={GATE_H}
                preserveAspectRatio="xMidYMid meet"
                transform={g.rotate ? `rotate(${g.rotate} ${g.at.x} ${g.at.y})` : undefined}
              />
            ))}

            <image
              href={CURSOR_SRC}
              x={PIN_TIP.x - PIN_W / 2}
              y={PIN_TIP.y - PIN_H}
              width={PIN_W}
              height={PIN_H}
              preserveAspectRatio="xMidYMax meet"
            />

            {ROOMS.map((r) => {
              const hitTop = r.label.y - 12;
              const hitBottom = r.tile.y + TILE / 2 + 4;
              return (
                <g
                  key={r.id}
                  data-name={r.name}
                  className={`mapc-loc ${pressedLocation === r.name ? "mapc-pressed" : ""} ${forceHoverAll ? "mapc-force-hover" : ""}`}
                  role="button"
                  tabIndex={disabled ? -1 : 0}
                  aria-label={`Open ${r.title}`}
                  aria-disabled={disabled}
                  onClick={() => activate(r.name, r.href)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      activate(r.name, r.href);
                    }
                  }}
                >
                  <rect x={r.tile.x - 66} y={hitTop} width={132} height={hitBottom - hitTop} fill="transparent" />
                  <text x={r.label.x} y={r.label.y} textAnchor="middle" dominantBaseline="middle" fontSize="15" fill={COLORS.text} className={fontClassName} style={textStyle}>
                    {r.title}
                  </text>
                  <g className="mapc-tile">
                    <image href={r.src} x={r.tile.x - TILE / 2} y={r.tile.y - TILE / 2} width={TILE} height={TILE} preserveAspectRatio="xMidYMid slice" />
                    <rect className="mapc-ring" x={r.tile.x - TILE / 2 - 2} y={r.tile.y - TILE / 2 - 2} width={TILE + 4} height={TILE + 4} />
                  </g>
                </g>
              );
            })}

            <text x={VB.x + VB.w / 2} y={690} textAnchor="middle" fontSize="19" fill={COLORS.text} className={fontClassName} style={textStyle}>
              Recommended Path:
            </text>
            <text x={VB.x + VB.w / 2} y={712} textAnchor="middle" fontSize="19" fill={COLORS.text} className={fontClassName} style={textStyle}>
              Follow the numbers
            </text>
          </svg>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: "repeating-linear-gradient(to bottom, rgba(0,0,0,0.09) 0px, rgba(0,0,0,0.09) 1px, transparent 1px, transparent 3px)",
            }}
          />

          <div className="pointer-events-none absolute inset-0">{overlay}</div>

          {showResetFlash && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/80 z-[70] reset-flash">
              <span className={`${fontClassName} text-white text-3xl font-bold tracking-widest`}>
                RESET
              </span>
            </div>
          )}
        </div>

        <div aria-hidden="true">
          <div className="absolute rounded-full" style={{ left: cq(4.4), top: cq(5.2), width: cq(1.5), height: cq(1.5), background: "#ff3b3b", border: `${cq(0.25)} solid #000`, boxShadow: `0 0 ${cq(1)} #ff3b3b` }} />
          <div className="absolute" style={{ left: cq(4.2), top: cq(25), width: cq(14.6), height: cq(14.6), background: "#000", clipPath: CROSS }}>
            <div className="absolute" style={{ inset: cq(0.45), background: "#2b2b2b", clipPath: CROSS }} />
          </div>
          <div className="absolute rounded-full" style={{ left: cq(89.5), top: cq(26), width: cq(6.6), height: cq(6.6), background: "#ff8fa3", border: `${cq(0.4)} solid #000`, boxSizing: "border-box", boxShadow: `inset ${cq(-0.5)} ${cq(-0.5)} 0 #c9566b, inset ${cq(0.5)} ${cq(0.5)} 0 #ffd0d9` }} />
          <div className="absolute rounded-full" style={{ left: cq(81.4), top: cq(32.5), width: cq(6.6), height: cq(6.6), background: "#ff8fa3", border: `${cq(0.4)} solid #000`, boxSizing: "border-box", boxShadow: `inset ${cq(-0.5)} ${cq(-0.5)} 0 #c9566b, inset ${cq(0.5)} ${cq(0.5)} 0 #ffd0d9` }} />
          <div className="absolute" style={{ left: cq(5), top: cq(52), width: cq(5.4), height: cq(1.5), background: "#6b6b6b", border: `${cq(0.3)} solid #000`, boxSizing: "border-box", borderRadius: cq(1), transform: "rotate(-25deg)" }} />
          <div className="absolute" style={{ left: cq(12.4), top: cq(49.4), width: cq(5.4), height: cq(1.5), background: "#6b6b6b", border: `${cq(0.3)} solid #000`, boxSizing: "border-box", borderRadius: cq(1), transform: "rotate(-25deg)" }} />
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="absolute" style={{ left: cq(82 + i * 2.3), top: cq(53), width: cq(0.8), height: cq(8), background: "#6b6b6b", borderRadius: cq(0.4), transform: "rotate(25deg)" }} />
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            left: cq(4.2),
            top: cq(25),
            width: cq(14.6),
            height: cq(14.6),
            zIndex: 10,
          }}
        >
          <button type="button" aria-label="D-pad up" className="dp-btn" style={{ left: "33.3%", top: "0%", width: "33.4%", height: "33.3%" }} onClick={() => handleDirection("up")} />
          <button type="button" aria-label="D-pad down" className="dp-btn" style={{ left: "33.3%", top: "66.7%", width: "33.4%", height: "33.3%" }} onClick={() => handleDirection("down")} />
          <button type="button" aria-label="D-pad left" className="dp-btn" style={{ left: "0%", top: "33.3%", width: "33.3%", height: "33.4%" }} onClick={() => handleDirection("left")} />
          <button type="button" aria-label="D-pad right" className="dp-btn" style={{ left: "66.7%", top: "33.3%", width: "33.3%", height: "33.4%" }} onClick={() => handleDirection("right")} />
        </div>
      </div>
    </div>
  );
}