"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const CANVAS_W = 1200;
const CANVAS_H = 675;

const COLORS = {
  bg: "#000000",
  yellow: "#c1ff72",
  red: "#ff3131",
  white: "#ffffff",
  green: "#86a758",
  label: "#e3efcf",
  placeholder: "#c8c8c8",
  placeholderBorder: "#8c8c8c",
  hotRed: "#ff0033",
};

type Ending = "Ending 1" | "Ending 2" | null;

type Point = {
  x: number;
  y: number;
};

const YELLOW_POLYGON: Point[] = [
  { x: 826, y: 84 },
  { x: 744, y: 84 },
  { x: 744, y: 109 },
  { x: 621, y: 109 },
  { x: 621, y: 244 },
  { x: 524, y: 244 },
  { x: 524, y: 341 },
  { x: 572, y: 341 },
  { x: 572, y: 415 },
  { x: 492, y: 415 },
  { x: 492, y: 491 },
  { x: 416, y: 492 },
  { x: 416, y: 565 },
  { x: 333, y: 566 },
  { x: 333, y: 603 },
  { x: 444, y: 603 },
  { x: 444, y: 528 },
  { x: 517, y: 527 },
  { x: 517, y: 431 },
  { x: 592, y: 430 },
  { x: 592, y: 326 },
  { x: 543, y: 326 },
  { x: 543, y: 259 },
  { x: 635, y: 259 },
  { x: 634, y: 123 },
  { x: 758, y: 123 },
  { x: 758, y: 98 },
  { x: 826, y: 98 },
];

const START: Point = { x: 584, y: 375 };
const EXIT_1 = { x: 849, y: 90 };
const EXIT_2 = { x: 333, y: 603 };

const PLAYER_RADIUS = 7.2;
const PLAYING_RADIUS = 5;
const PATH_COLLISION_PADDING = 0;
const WALL_HIT_OUTSIDE_RATIO = 0.10;
const COLLISION_SAMPLES = 40;

const EXIT_RADIUS = 38;

// Jumpscare Timings
const FLASH_DURATION_MS = 4000; 
const SCARE_1_3_DURATION = 300; // 0.3 seconds

const IMG_DIR = "/images/maze";

const SCARE_IMAGES = [
  `${IMG_DIR}/scare1.png`, 
  `${IMG_DIR}/scare2.png`, 
  `${IMG_DIR}/scare3.png`, 
  `${IMG_DIR}/scare4.png`
];

const GATE_SRC = `${IMG_DIR}/mazeGate.png`;
const GATE_HEIGHT = 70;
const GATE_ROTATION = Math.PI / 2;
const GATE_GAP = 23;
const GATE_1 = { x: EXIT_1.x, y: EXIT_1.y };
const GATE_2 = { x: 333 - GATE_GAP, y: 585 };

const TOP_TEXT_START = "Click this icon to start";
const TOP_TEXT_RETRY = "Click this icon to try again";
const TOP_TEXT_PLAYING = "You are here. Leave.";
const BOTTOM_LINE_1 = "Move your cursor along the yellow line.";
const BOTTOM_LINE_2 = "DO NOT MOVE OFF THE PATH.";
const TOP_BAR_HEIGHT = "clamp(2rem, 7dvh, 4rem)";
const BOTTOM_BAR_HEIGHT = "clamp(3rem, 10dvh, 5.5rem)";

const REF = { sx: 1.194, sy: 1.27, ox: 241, oy: -8 };

const refToCanvas = (x: number, y: number): Point => ({
  x: x * REF.sx + REF.ox,
  y: y * REF.sy + REF.oy,
});

type Segment = [x1: number, y1: number, x2: number, y2: number];

const WALL_THICKNESS = 14;

const WALLS: Segment[] = [
  [74, 34, 74, 414],
  [74, 34, 484, 34],
  [74, 142, 229, 142],
  [229, 34, 229, 142],
  [74, 246, 207, 246],
  [207, 142, 207, 246],
  [74, 366, 170, 366],
  [170, 246, 170, 366],
  [376, 154, 489, 154],
  [376, 154, 376, 306],
  [349, 306, 489, 306],
  [489, 136, 489, 509],
  [349, 306, 349, 509],
  [74, 509, 489, 509],
];

const DOOR_DASHES: Segment[] = [
  [579, 40, 579, 250],
  [514, 104, 579, 104],
  [488, 252, 540, 252],
  [690, 252, 625, 252],
  [444, 379, 582, 379],
  [579, 509, 579, 630],
  [658, 509, 505, 509],
];

const DASH_THICKNESS = 7;
const DASH_PATTERN: [number, number] = [18, 12];

type Room = {
  id: number;
  label: string;
  labelAt: Point;
  boxAt: Point;
  src?: string;
};

const ROOMS: Room[] = [
  { id: 1, src: `${IMG_DIR}/1.png`, label: "", labelAt: { x: 415, y: 379 }, boxAt: { x: 417, y: 413 } },
  { id: 2, src: `${IMG_DIR}/2.png`, label: " ", labelAt: { x: 148, y: 58 }, boxAt: { x: 148, y: 98 } },
  { id: 3, src: `${IMG_DIR}/3.png`, label: "", labelAt: { x: 138, y: 166 }, boxAt: { x: 138, y: 205 } },
  { id: 4, src: `${IMG_DIR}/4.png`, label: "", labelAt: { x: 117, y: 275 }, boxAt: { x: 118, y: 310 } },
  { id: 5, src: `${IMG_DIR}/5.png`, label: "", labelAt: { x: 430, y: 194 }, boxAt: { x: 432, y: 230 } },
];

const PLACEHOLDER_SIZE = 50;

function drawDoorDashes(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.strokeStyle = COLORS.green;
  ctx.lineWidth = DASH_THICKNESS;
  ctx.lineCap = "butt";
  ctx.setLineDash(DASH_PATTERN);

  DOOR_DASHES.forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  ctx.restore();
}

function drawWalls(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.strokeStyle = COLORS.green;
  ctx.lineWidth = WALL_THICKNESS;
  ctx.lineCap = "square";
  ctx.lineJoin = "miter";

  ctx.beginPath();
  WALLS.forEach(([x1, y1, x2, y2]) => {
    const a = refToCanvas(x1, y1);
    const b = refToCanvas(x2, y2);
    ctx.moveTo(Math.round(a.x), Math.round(a.y));
    ctx.lineTo(Math.round(b.x), Math.round(b.y));
  });
  ctx.stroke();
  ctx.restore();
}

const GRASS_POINTS: Point[] = [
  { x: 693, y: 94 },
  { x: 498, y: 346 },
  { x: 594, y: 474 },
];
const DINING_POINTS: Point[] = [
  { x: 709, y: 143 },
  { x: 781, y: 143 },
  { x: 658, y: 343 },
  { x: 367, y: 487 },
];

const GRASS_PATHS = [
  "M0 0 C-2 -8 -6 -12 -9 -17",
  "M0 0 C0 -9 -1 -15 -2 -22",
  "M0 0 C2 -8 5 -14 9 -18",
  "M0 0 C4 -6 9 -9 14 -10",
  "M0 0 C-4 -6 -9 -8 -14 -9",
];

const DINING_PATHS = [
  "M6 -1 A9.2 9.2 0 1 0 6 13",
  "M12 -1 V5 M14.5 -1 V5 M17 -1 V5 M12 5 Q14.5 8 17 5 M14.5 8 V14",
  "M21 14 V-1 Q24 2 21 7",
];

function drawDecorations(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.strokeStyle = COLORS.green;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.lineWidth = 1.5;
  GRASS_POINTS.forEach((p) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    GRASS_PATHS.forEach((d) => ctx.stroke(new Path2D(d)));
    ctx.restore();
  });

  ctx.lineWidth = 1.8;
  DINING_POINTS.forEach((p) => {
    ctx.save();
    ctx.translate(p.x - 7, p.y - 6);
    DINING_PATHS.forEach((d) => ctx.stroke(new Path2D(d)));
    ctx.restore();
  });

  ctx.restore();
}

function drawPlaceholder(
  ctx: CanvasRenderingContext2D,
  room: Room,
  img?: HTMLImageElement
) {
  const c = refToCanvas(room.boxAt.x, room.boxAt.y);
  const x = c.x - PLACEHOLDER_SIZE / 2;
  const y = c.y - PLACEHOLDER_SIZE / 2;
  const s = PLACEHOLDER_SIZE;

  ctx.save();

  if (img) {
    ctx.beginPath();
    ctx.rect(x, y, s, s);
    ctx.clip();
    const scale = Math.max(s / img.width, s / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.drawImage(img, c.x - dw / 2, c.y - dh / 2, dw, dh);
  } else {
    ctx.fillStyle = COLORS.placeholder;
    ctx.fillRect(x, y, s, s);

    ctx.fillStyle = COLORS.placeholderBorder;
    ctx.beginPath();
    ctx.arc(x + s * 0.7, y + s * 0.3, s * 0.08, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + s * 0.15, y + s * 0.8);
    ctx.lineTo(x + s * 0.42, y + s * 0.42);
    ctx.lineTo(x + s * 0.6, y + s * 0.65);
    ctx.lineTo(x + s * 0.72, y + s * 0.55);
    ctx.lineTo(x + s * 0.85, y + s * 0.8);
    ctx.closePath();
    ctx.fill();
  }

  if (!img) {
    ctx.strokeStyle = COLORS.placeholderBorder;
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 1, y + 1, s - 2, s - 2);
  }

  ctx.restore();
}

function drawRooms(
  ctx: CanvasRenderingContext2D,
  images: Record<string, HTMLImageElement>
) {
  ROOMS.forEach((room) => {
    drawPlaceholder(ctx, room, images[room.id]);

    const l = refToCanvas(room.labelAt.x, room.labelAt.y);
    ctx.save();
    ctx.fillStyle = COLORS.label;
    ctx.font = "bold 15px 'Press Start 2P', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(room.label, l.x, l.y);
    ctx.restore();
  });
}

function pointInPolygon(point: Point, polygon: Point[]) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersects =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

    if (intersects) inside = !inside;
  }

  return inside;
}

function isInsideExpandedPath(point: Point) {
  if (pointInPolygon(point, YELLOW_POLYGON)) return true;

  const p = PATH_COLLISION_PADDING;
  if (p === 0) return pointInPolygon(point, YELLOW_POLYGON);

  const checks = [
    { x: point.x + p, y: point.y },
    { x: point.x - p, y: point.y },
    { x: point.x, y: point.y + p },
    { x: point.x, y: point.y - p },
    { x: point.x + p * 0.707, y: point.y + p * 0.707 },
    { x: point.x - p * 0.707, y: point.y + p * 0.707 },
    { x: point.x + p * 0.707, y: point.y - p * 0.707 },
    { x: point.x - p * 0.707, y: point.y - p * 0.707 },
  ];

  return checks.some((p) => pointInPolygon(p, YELLOW_POLYGON));
}

function getWallOutsideRatio(x: number, y: number) {
  let outside = 0;

  if (!isInsideExpandedPath({ x, y })) outside++;

  for (let i = 0; i < COLLISION_SAMPLES; i++) {
    const angle = (i / COLLISION_SAMPLES) * Math.PI * 2;
    const sample = {
      x: x + Math.cos(angle) * PLAYING_RADIUS,
      y: y + Math.sin(angle) * PLAYING_RADIUS,
    };

    if (!isInsideExpandedPath(sample)) {
      outside++;
    }
  }

  return outside / (COLLISION_SAMPLES + 1);
}

function isWallCollision(x: number, y: number) {
  return getWallOutsideRatio(x, y) > WALL_HIT_OUTSIDE_RATIO;
}

function drawImageAnchored(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  height: number,
  ax = 0.5,
  ay = 0.5,
  rotation = 0
) {
  const width = (img.width / img.height) * height;
  ctx.save();
  ctx.translate(x, y);
  if (rotation) ctx.rotate(rotation);
  ctx.drawImage(img, -width * ax, -height * ay, width, height);
  ctx.restore();
}

export default function MazePage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const collisionLockRef = useRef(false);
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});
  const startOffsetRef = useRef<Point>({ x: 0, y: 0 });
  
  // Track jumpscares
  const jumpscareCountRef = useRef(0);

  const [started, setStarted] = useState(false);
  const [cursor, setCursor] = useState<Point>(START);
  const [ending, setEnding] = useState<Ending>(null);
  const [aaliyahFlash, setAaliyahFlash] = useState(false);
  const [scareFrame, setScareFrame] = useState(0);
  const [hasRetried, setHasRetried] = useState(false);
  const [imagesTick, setImagesTick] = useState(0);
  const [scale, setScale] = useState(2);
  
  // Black flash state for when jumpscares are disabled
  const [blackFlash, setBlackFlash] = useState(false);

  const reset = useCallback(() => {
    setStarted(false);
    setEnding(null);
    setAaliyahFlash(false);
    setScareFrame(0);
    setCursor(START);
    setHasRetried(false);
    startOffsetRef.current = { x: 0, y: 0 };
    collisionLockRef.current = false;
  }, []);

  const startGame = (
    e: React.MouseEvent<HTMLCanvasElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const toCanvas = (clientX: number, clientY: number): Point => ({
      x: ((clientX - rect.left) / rect.width) * CANVAS_W,
      y: ((clientY - rect.top) / rect.height) * CANVAS_H,
    });
    const mouse = toCanvas(e.clientX, e.clientY);

    let startPos: Point = START;
    const btn = startButtonRef.current;
    if (btn) {
      const b = btn.getBoundingClientRect();
      startPos = toCanvas(b.left + b.width / 2, b.top + b.height / 2);
    }

    startOffsetRef.current = { x: startPos.x - mouse.x, y: startPos.y - mouse.y };
    setCursor(startPos);
    setStarted(true);
  };

  const triggerWallHit = useCallback(() => {
    if (collisionLockRef.current) return;
    collisionLockRef.current = true;
    
    // Increment jumpscare count
    jumpscareCountRef.current += 1;

    if (jumpscareCountRef.current <= 3) {
      // Play Audio and visual scare
      const audio = new Audio("/audio/mazeJumpscare.mp3");
      audio.volume = 1.0;
      audio.play().catch((e) => console.error("Audio failed to play:", e));

      setScareFrame(0);
      setAaliyahFlash(true);
    } else {
      // Jumpscare disabled: Flash black with "Try again" instead
      setBlackFlash(true);
      setTimeout(() => {
        setBlackFlash(false);
        setCursor(START);
        setStarted(false);
        setHasRetried(true);
        collisionLockRef.current = false;
      }, 1500); 
    }
  }, []);

  // Jumpscare Image Sequence Timing
  useEffect(() => {
    if (!aaliyahFlash) return;

    const t1 = setTimeout(() => setScareFrame(1), SCARE_1_3_DURATION);
    const t2 = setTimeout(() => setScareFrame(2), SCARE_1_3_DURATION * 2);
    const t3 = setTimeout(() => setScareFrame(3), SCARE_1_3_DURATION * 3);

    const tEnd = setTimeout(() => {
      setCursor(START);
      setAaliyahFlash(false);
      setScareFrame(0);
      setStarted(false);
      setHasRetried(true);
      collisionLockRef.current = false;
    }, FLASH_DURATION_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tEnd);
    };
  }, [aaliyahFlash]);

  const checkEnding = useCallback((p: Point): Ending => {
    const nearExit1 = Math.hypot(p.x - EXIT_1.x, p.y - EXIT_1.y) < EXIT_RADIUS;
    const nearExit2 = Math.hypot(p.x - EXIT_2.x, p.y - EXIT_2.y) < EXIT_RADIUS;

    if (nearExit1) return "Ending 1";
    if (nearExit2) return "Ending 2";

    return null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const update = () => {
      const dpr = window.devicePixelRatio || 1;
      const cssW = canvas.getBoundingClientRect().width || CANVAS_W;
      const next = Math.min(4, Math.max(2, Math.ceil((cssW * dpr) / CANVAS_W)));
      setScale((prev) => (prev === next ? prev : next));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(canvas);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const sources: Record<string, string> = {
      gate: GATE_SRC,
    };
    ROOMS.forEach((room) => {
      if (room.src) sources[String(room.id)] = room.src;
    });

    Object.entries(sources).forEach(([key, src]) => {
      const img = new Image();
      img.onload = () => {
        imagesRef.current[key] = img;
        setImagesTick((t) => t + 1);
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    drawDecorations(ctx);
    drawDoorDashes(ctx);
    drawWalls(ctx);

    ctx.save();
    ctx.fillStyle = COLORS.yellow;
    ctx.beginPath();
    ctx.moveTo(YELLOW_POLYGON[0].x, YELLOW_POLYGON[0].y);
    for (let i = 1; i < YELLOW_POLYGON.length; i++) {
      ctx.lineTo(YELLOW_POLYGON[i].x, YELLOW_POLYGON[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    drawRooms(ctx, imagesRef.current);

    const gate = imagesRef.current.gate;
    if (gate) {
      drawImageAnchored(ctx, gate, GATE_1.x, GATE_1.y, GATE_HEIGHT, 0.5, 0.5, GATE_ROTATION);
      drawImageAnchored(ctx, gate, GATE_2.x, GATE_2.y, GATE_HEIGHT, 0.5, 0.5, GATE_ROTATION);
    }

    if (started) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, PLAYING_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.bg;
      ctx.fill();
      ctx.strokeStyle = COLORS.hotRed;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }
  }, [cursor, ending, aaliyahFlash, imagesTick, scale, started]);

  const getCanvasPoint = (
    e: React.MouseEvent<HTMLCanvasElement> | React.PointerEvent<HTMLCanvasElement>
  ): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();

    return {
      x: ((e.clientX - rect.left) / rect.width) * CANVAS_W,
      y: ((e.clientY - rect.top) / rect.height) * CANVAS_H,
    };
  };

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (ending || aaliyahFlash || blackFlash) return;

    const p = getCanvasPoint(e);

    if (!started && Math.hypot(p.x - START.x, p.y - START.y) < 45) {
      startGame(e);
    }
  };

  const onCanvasPointerMove = (
    e: React.PointerEvent<HTMLCanvasElement>
  ) => {
    if (!started || ending || aaliyahFlash || blackFlash) return;

    const raw = getCanvasPoint(e);
    const p = {
      x: raw.x + startOffsetRef.current.x,
      y: raw.y + startOffsetRef.current.y,
    };

    if (isWallCollision(p.x, p.y)) {
      triggerWallHit();
      return;
    }

    setCursor(p);

    const hit = checkEnding(p);
    if (hit) {
      setEnding(hit);
      if (hit === "Ending 1") {
        router.push("/ending/gray");
      } else {
        router.push("/ending/red");
      }
    }
  };

  return (
    <main className="flex h-dvh w-screen flex-col items-center justify-center overflow-hidden bg-black">
      <style>{`
        @keyframes mazeCursorPulse {
          0%, 100% {
            transform: translate(var(--tip-x), var(--tip-y)) scale(1);
            filter: drop-shadow(0 0 0 rgba(255, 0, 51, 0));
          }
          50% {
            transform: translate(var(--tip-x), var(--tip-y)) scale(1.3);
            filter: drop-shadow(0 0 8px rgba(255, 0, 51, 0.9));
          }
        }

        @keyframes scareFlicker {
          0% { opacity: 1; transform: scale(1); }
          20% { opacity: 0.2; transform: scale(1.05); }
          40% { opacity: 1; transform: scale(0.95); }
          60% { opacity: 0.4; transform: scale(1.02); }
          80% { opacity: 1; transform: scale(1); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div
        className={`${pressStart.className} flex shrink-0 items-center justify-center gap-2 px-4 text-center text-xs tracking-[0.1em] text-white sm:gap-3 sm:text-sm sm:tracking-[0.15em] lg:text-lg`}
        style={{ height: TOP_BAR_HEIGHT }}
      >
        <div className="block h-[2em] w-[2em] rounded-full border-[3px] border-[#ff0033] bg-black select-none" />
        <span>{started ? TOP_TEXT_PLAYING : (hasRetried ? TOP_TEXT_RETRY : TOP_TEXT_START)}</span>
      </div>

      <div
        className="relative"
        style={{
          width: `min(100vw, calc((100dvh - ${TOP_BAR_HEIGHT} - ${BOTTOM_BAR_HEIGHT}) * 16 / 9))`,
        }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_W * scale}
          height={CANVAS_H * scale}
          onClick={onCanvasClick}
          onPointerMove={onCanvasPointerMove}
          className={`block w-full touch-none select-none border-0 bg-black ${
            started ? "cursor-none" : "cursor-crosshair"
          }`}
          style={{ aspectRatio: "16 / 9" }}
        />

        {!started && !ending && !aaliyahFlash && !blackFlash && (
          <button
            ref={startButtonRef}
            type="button"
            aria-label="Click the cursor to start"
            onClick={startGame}
            style={{
              left: `${(START.x / CANVAS_W) * 100}%`,
              top: `${(START.y / CANVAS_H) * 100}%`,
              width: `${((PLAYER_RADIUS * 2) / CANVAS_H) * 100}%`,
              aspectRatio: "1 / 1",
              animation: "mazeCursorPulse 1.2s ease-in-out infinite",
              transformOrigin: "center center",
              translate: "none",
              "--tip-x": "-50%",
              "--tip-y": "-50%",
            } as React.CSSProperties}
            className="absolute z-10 cursor-pointer border-0 bg-transparent p-0"
          >
            <div className="h-full w-full rounded-full border-[3px] border-[#ff0033] bg-black" />
          </button>
        )}

        {aaliyahFlash && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none bg-black">
            {scareFrame < 3 ? (
              /* Scares 1-3: Blacked out background with flicker effect */
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={SCARE_IMAGES[scareFrame]}
                alt="Jumpscare"
                className="w-full h-full object-cover animate-[scareFlicker_0.15s_ease-in-out_infinite]"
              />
            ) : (
              /* Scare 4: Full screen solid image, zoomed in extra 20% (from 1.4 to 1.6) */
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={SCARE_IMAGES[3]}
                alt="Jumpscare"
                className="fixed inset-0 h-full w-full object-cover scale-[1.6]"
              />
            )}
          </div>
        )}

        {blackFlash && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
            <span className={`${pressStart.className} text-4xl text-white tracking-widest`}>
              Try again
            </span>
          </div>
        )}
      </div>

      <div
        className={`${pressStart.className} flex shrink-0 flex-col items-center justify-center px-4 text-center text-xs tracking-[0.1em] text-white sm:text-sm sm:tracking-[0.15em] lg:text-lg`}
        style={{ height: BOTTOM_BAR_HEIGHT }}
      >
        <p>{BOTTOM_LINE_1}</p>
        <p className="font-bold text-[#ff3131]">{BOTTOM_LINE_2}</p>
      </div>
    </main>
  );
}