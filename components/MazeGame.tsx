"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CANVAS_W = 1200;
const CANVAS_H = 675;

const COLORS = {
  bg: "#000000",
  yellow: "#c1ff72",
  red: "#ff3131",
  white: "#ffffff",
};

type Ending = "Ending 1" | "Ending 2" | null;

type Point = {
  x: number;
  y: number;
};

const YELLOW_POLYGON: Point[] = [
  { x: 826, y: 91 },   // 1
  { x: 744, y: 91 },   // 2
  { x: 743, y: 114 },  // 3
  { x: 621, y: 114 },  // 4
  { x: 621, y: 244 },  // 5
  { x: 524, y: 244 },  // 6
  { x: 524, y: 341 },  // 7
  { x: 572, y: 341 },  // 8
  { x: 572, y: 415 },  // 9
  { x: 492, y: 415 },  // 10
  { x: 492, y: 491 },  // 11
  { x: 416, y: 492 },  // 12
  { x: 416, y: 565 },  // 13
  { x: 333, y: 566 },  // 14
  { x: 333, y: 603 },  // 15
  { x: 444, y: 603 },  // 16
  { x: 444, y: 528 },  // 17
  { x: 517, y: 527 },  // 18
  { x: 517, y: 431 },  // 19
  { x: 592, y: 430 },  // 20
  { x: 592, y: 326 },  // 21
  { x: 543, y: 326 },  // 22
  { x: 543, y: 259 },  // 23
  { x: 635, y: 259 },  // 24
  { x: 634, y: 118 },  // 25
  { x: 747, y: 118 },  // 26
  { x: 748, y: 93 },   // 27
];

const START: Point = { x: 582, y: 375 };
const EXIT_1 = { x: 849, y: 90 };
const EXIT_2 = { x: 297, y: 584 };

const PLAYER_RADIUS = 8;

const PATH_COLLISION_PADDING = 0;

const WALL_HIT_OUTSIDE_RATIO = 0.4;
const COLLISION_SAMPLES = 40;

const FLASH_DURATION_MS = 500;

const AALIYAH_IMAGE_SRC = "/aaliyah.png";

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
      x: x + Math.cos(angle) * PLAYER_RADIUS,
      y: y + Math.sin(angle) * PLAYER_RADIUS,
    };

    if (!isInsideExpandedPath(sample)) {
      outside++;
    }
  }

  return outside / (COLLISION_SAMPLES + 1);
}

function isWallCollision(x: number, y: number) {
  return getWallOutsideRatio(x, y) >= WALL_HIT_OUTSIDE_RATIO;
}

function drawEndIndicator(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
) {
  const grad = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.2);
  grad.addColorStop(0, "rgba(255, 49, 49, 0.55)");
  grad.addColorStop(0.5, "rgba(255, 49, 49, 0.18)");
  grad.addColorStop(1, "rgba(255, 49, 49, 0)");

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = COLORS.red;
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.5, 0, Math.PI * 2);
  ctx.fill();
}

// Draw big numbered labels at each polygon point — debug mode only.
function drawDebugLabels(ctx: CanvasRenderingContext2D) {
  YELLOW_POLYGON.forEach((p, i) => {
    const label = String(i + 1);

    // Big filled circle
    ctx.fillStyle = "rgba(255, 0, 255, 0.9)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
    ctx.fill();

    // White border ring
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // The number — centered inside the circle
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, p.x, p.y + 1);
  });
}

export default function MazeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const collisionLockRef = useRef(false);

  const [started, setStarted] = useState(false);
  const [cursor, setCursor] = useState<Point>(START);
  const [ending, setEnding] = useState<Ending>(null);
  const [aaliyahFlash, setAaliyahFlash] = useState(false);
  const [hasRetried, setHasRetried] = useState(false);
  const [showLabels, setShowLabels] = useState(false);

  const reset = useCallback(() => {
    setStarted(false);
    setEnding(null);
    setAaliyahFlash(false);
    setCursor(START);
    setHasRetried(false);
    collisionLockRef.current = false;
  }, []);

  const triggerWallHit = useCallback(() => {
    if (collisionLockRef.current) return;
    collisionLockRef.current = true;
    setAaliyahFlash(true);
  }, []);

  // When the flash becomes visible, wait FLASH_DURATION_MS then reset.
  useEffect(() => {
    if (!aaliyahFlash) return;

    const id = window.setTimeout(() => {
      setCursor(START);
      setAaliyahFlash(false);
      setStarted(false);
      setHasRetried(true);
      collisionLockRef.current = false;
    }, FLASH_DURATION_MS);

    return () => window.clearTimeout(id);
  }, [aaliyahFlash]);

  const checkEnding = useCallback((p: Point): Ending => {
    const nearExit1 = Math.hypot(p.x - EXIT_1.x, p.y - EXIT_1.y) < 38;
    const nearExit2 = Math.hypot(p.x - EXIT_2.x, p.y - EXIT_2.y) < 38;

    if (nearExit1) return "Ending 1";
    if (nearExit2) return "Ending 2";

    return null;
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = AALIYAH_IMAGE_SRC;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

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

    drawEndIndicator(ctx, EXIT_1.x, EXIT_1.y, 22);
    drawEndIndicator(ctx, EXIT_2.x, EXIT_2.y, 22);

    // Player dot — black fill, white outline
    ctx.save();
    ctx.beginPath();
    ctx.arc(cursor.x, cursor.y, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.bg;
    ctx.fill();
    ctx.strokeStyle = COLORS.white;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Debug labels overlay
    if (showLabels) {
      drawDebugLabels(ctx);
    }
  }, [cursor, ending, aaliyahFlash, showLabels]);

  const getCanvasPoint = (
    e: React.MouseEvent<HTMLCanvasElement>
  ): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();

    return {
      x: ((e.clientX - rect.left) / rect.width) * CANVAS_W,
      y: ((e.clientY - rect.top) / rect.height) * CANVAS_H,
    };
  };

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (ending || aaliyahFlash) return;

    const p = getCanvasPoint(e);

    if (!started && Math.hypot(p.x - START.x, p.y - START.y) < 45) {
      setStarted(true);
    }
  };

  const onCanvasMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement>
  ) => {
    if (!started || ending || aaliyahFlash) return;

    const p = getCanvasPoint(e);

    if (isWallCollision(p.x, p.y)) {
      triggerWallHit();
      return;
    }

    setCursor(p);

    const hit = checkEnding(p);
    if (hit) setEnding(hit);
  };

  return (
    <div className="flex w-full flex-col items-center gap-5 bg-black p-4 sm:p-6">
      <div className="relative w-full max-w-[1200px]">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          onClick={onCanvasClick}
          onMouseMove={onCanvasMouseMove}
          className="block w-full select-none border-0 bg-black cursor-crosshair"
          style={{ aspectRatio: "16 / 9" }}
        />

        {/* Debug toggle — top right of the canvas */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowLabels((s) => !s);
          }}
          className="absolute top-3 right-3 z-20 rounded-md border border-[#c1ff72] bg-black/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#c1ff72] hover:bg-[#00703c] cursor-pointer"
        >
          {showLabels ? "Hide points" : "Show points"}
        </button>

        {!started && !ending && !aaliyahFlash && (
          <button
            type="button"
            onClick={() => setStarted(true)}
            style={{
              left: `${(START.x / CANVAS_W) * 100}%`,
              top: `${(START.y / CANVAS_H) * 100}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 rounded-md border border-[#c1ff72] bg-black/85 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#c1ff72] transition hover:bg-[#00703c] cursor-pointer shadow-lg"
          >
            {hasRetried ? "Retry" : "Click to Begin"}
          </button>
        )}

        {ending && !aaliyahFlash && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center font-mono">
              <div className="mb-2 text-xs uppercase tracking-[0.3em] text-[#c1ff72]">
                You made it home
              </div>

              <div className="mb-6 text-4xl font-bold text-white">
                {ending}
              </div>

              <button
                type="button"
                onClick={reset}
                className="border border-[#c1ff72] px-5 py-2 text-sm text-[#c1ff72] transition hover:bg-[#c1ff72] hover:text-black"
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}

        {aaliyahFlash && (
          <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden bg-black">
            <img
              src={AALIYAH_IMAGE_SRC}
              alt="Aaliyah"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-red-500/10" />
          </div>
        )}
      </div>
    </div>
  );
}