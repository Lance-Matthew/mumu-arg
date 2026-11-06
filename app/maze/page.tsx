"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CANVAS_W = 1200;
const CANVAS_H = 675;

const COLORS = {
  bg: "#000000",
  yellow: "#c1ff72",
  red: "#ff3131",
  white: "#ffffff",
  green: "#86a758", // wall green
  label: "#e3efcf", // room label text
  placeholder: "#c8c8c8",
  placeholderBorder: "#8c8c8c",
};

type Ending = "Ending 1" | "Ending 2" | null;

type Point = {
  x: number;
  y: number;
};

const YELLOW_POLYGON: Point[] = [
  { x: 826, y: 84 },   // 1
  { x: 744, y: 84 },   // 2
  { x: 744, y: 109 },  // 3
  { x: 621, y: 109 },  // 4
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
  { x: 634, y: 123 },  // 25
  { x: 758, y: 123 },  // 26
  { x: 758, y: 98 },   // 27
  { x: 826, y: 98 },   // 28
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

// Maze images (public/images/maze)
const IMG_DIR = "/images/maze";
const CURSOR_SRC = `${IMG_DIR}/mazeCursor.png`;
const GATE_SRC = `${IMG_DIR}/mazeGate.png`;
const CURSOR_HEIGHT = 38; // canvas units; width follows the image's aspect ratio
const GATE_HEIGHT = 70; // canvas units (height of the image before rotating)
const GATE_ROTATION = Math.PI / 2; // 90 degrees: gates stand vertically
// Which point of the cursor image is the "real" pointer position
// (0-1 across, 0-1 down). 0.5 / 1 = bottom-center, i.e. the tip.
const CURSOR_TIP = { x: 0.5, y: 1 };

// Text above/below the maze
const TOP_TEXT_START = "Click this icon to start";
const TOP_TEXT_RETRY = "Click this icon to try again";
const TOP_TEXT_PLAYING = "You are here. Leave.";
const BOTTOM_LINE_1 = "Move your cursor along the yellow line.";
const BOTTOM_LINE_2 = "DO NOT MOVE OFF THE PATH.";
const TOP_BAR_HEIGHT = "clamp(2rem, 7dvh, 4rem)";
const BOTTOM_BAR_HEIGHT = "clamp(3rem, 10dvh, 5.5rem)";

/* ------------------------------------------------------------------ */
/*  VISUAL-ONLY LAYER (green walls + room image placeholders)          */
/*  None of this affects collision — the yellow polygon still decides  */
/*  where the player can go.                                           */
/* ------------------------------------------------------------------ */

// The reference map image is 568x528. These numbers convert reference
// coordinates into canvas coordinates so they line up with your yellow path.
// Tweak them if everything needs to shift/scale together.
const REF = { sx: 1.194, sy: 1.27, ox: 241, oy: -8 };

const refToCanvas = (x: number, y: number): Point => ({
  x: x * REF.sx + REF.ox,
  y: y * REF.sy + REF.oy,
});

type Segment = [x1: number, y1: number, x2: number, y2: number];

// Uniform wall thickness in canvas units (same for horizontal + vertical)
const WALL_THICKNESS = 14;

// Green walls as CENTERLINES, in reference-image coordinates.
// They're stroked with square caps in a single path, so corners and
// T-junctions merge cleanly: no overlap seams, no stray extrusions.
const WALLS: Segment[] = [
  // Left outer wall + top wall (gap for the top gate)
  [74, 34, 74, 414],
  [74, 34, 244, 34],
  [321, 34, 484, 34],

  // 2. Sports Center room
  [74, 142, 229, 142], // bottom
  [229, 34, 229, 142], // right

  // 3. Theater room
  [74, 246, 207, 246], // bottom
  [207, 142, 207, 246], // right

  // 4. Labs room
  [74, 366, 170, 366], // bottom
  [170, 246, 170, 366], // right

  // 5. Classrooms room
  [376, 154, 489, 154], // top
  [376, 154, 376, 306], // left
  [349, 306, 489, 306], // bottom / library top
  [489, 136, 489, 509], // right wall (runs down past the library)

  // 1. Library room
  [349, 306, 349, 509], // left

  // Bottom wall (gap for the bottom gate)
  [74, 509, 244, 509],
  [321, 509, 489, 509],
];

// Dashed "door" lines in CANVAS coordinates [x1, y1, x2, y2].
// Wall-side ends start under a wall and path-side ends tuck under the yellow
// path (both are drawn on top), so the dashes always meet them cleanly.
const DOOR_DASHES: Segment[] = [
  [579, 40, 579, 250], // top gate -> yellow path
  [514, 104, 579, 104], // 2. Sports Center door
  [488, 252, 540, 252], // 3. Theater door
  [690, 252, 625, 252], // 5. Classrooms door
  [444, 379, 582, 379], // 4. Labs door
  [579, 509, 579, 630], // bottom gate -> library door line
  [658, 509, 505, 509], // 1. Library door
];

const DASH_THICKNESS = 7;
const DASH_PATTERN: [number, number] = [18, 12]; // dash, gap

type Room = {
  id: number;
  label: string;
  labelAt: Point; // reference coords (center of label text)
  boxAt: Point; // reference coords (center of image placeholder)
  src?: string; // set this to swap the placeholder for a real image
};

const ROOMS: Room[] = [
  { id: 1, src: `${IMG_DIR}/1.png`, label: "1.Library", labelAt: { x: 415, y: 379 }, boxAt: { x: 417, y: 413 } },
  { id: 2, src: `${IMG_DIR}/2.png`, label: "2.Sports Center", labelAt: { x: 148, y: 58 }, boxAt: { x: 148, y: 98 } },
  { id: 3, src: `${IMG_DIR}/3.png`, label: "3.Theater", labelAt: { x: 138, y: 166 }, boxAt: { x: 138, y: 205 } },
  { id: 4, src: `${IMG_DIR}/4.png`, label: "4.Labs", labelAt: { x: 117, y: 275 }, boxAt: { x: 118, y: 310 } },
  { id: 5, src: `${IMG_DIR}/5.png`, label: "5.Classrooms", labelAt: { x: 430, y: 194 }, boxAt: { x: 432, y: 230 } },
  // Example once you have art:  src: "/images/maze/library.png"
];

const PLACEHOLDER_SIZE = 50;

function drawDoorDashes(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.strokeStyle = COLORS.yellow;
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

  // One path, one stroke -> overlaps are merged, not layered
  ctx.beginPath();
  WALLS.forEach(([x1, y1, x2, y2]) => {
    const a = refToCanvas(x1, y1);
    const b = refToCanvas(x2, y2);
    // Snap to whole canvas units so edges land on clean pixel boundaries
    ctx.moveTo(Math.round(a.x), Math.round(a.y));
    ctx.lineTo(Math.round(b.x), Math.round(b.y));
  });
  ctx.stroke();
  ctx.restore();
}

// Small decorative icons (visual only), in canvas coordinates.
// Each path is SVG path data, drawn around its anchor point.
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

// Grass tuft: anchored at its base
const GRASS_PATHS = [
  "M0 0 C-2 -8 -6 -12 -9 -17",
  "M0 0 C0 -9 -1 -15 -2 -22",
  "M0 0 C2 -8 5 -14 9 -18",
  "M0 0 C4 -6 9 -9 14 -10",
  "M0 0 C-4 -6 -9 -8 -14 -9",
];

// Plate + fork + knife: anchored near the plate's center
const DINING_PATHS = [
  "M6 -1 A9.2 9.2 0 1 0 6 13", // plate (open "C" shape)
  "M12 -1 V5 M14.5 -1 V5 M17 -1 V5 M12 5 Q14.5 8 17 5 M14.5 8 V14", // fork
  "M21 14 V-1 Q24 2 21 7", // knife
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
    // Real image: cover-fit inside the square
    ctx.beginPath();
    ctx.rect(x, y, s, s);
    ctx.clip();
    const scale = Math.max(s / img.width, s / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.drawImage(img, c.x - dw / 2, c.y - dh / 2, dw, dh);
  } else {
    // Gray placeholder tile
    ctx.fillStyle = COLORS.placeholder;
    ctx.fillRect(x, y, s, s);

    // Simple "image" icon: sun + mountains
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

  // Border (placeholder tile only)
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
    ctx.font = "bold 15px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(room.label, l.x, l.y);
    ctx.restore();
  });
}

/* ------------------------------------------------------------------ */
/*  ORIGINAL LOGIC (unchanged)                                         */
/* ------------------------------------------------------------------ */

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

// Draws `img` at `height` (width follows the aspect ratio) so that the point
// (ax, ay) of the image lands on (x, y). 0.5 / 0.5 is the center, 0.5 / 1 the
// bottom-center. Optional rotation (radians) is applied around (x, y).
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

export default function MazePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const collisionLockRef = useRef(false);
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});

  const [started, setStarted] = useState(false);
  const [cursor, setCursor] = useState<Point>(START);
  const [ending, setEnding] = useState<Ending>(null);
  const [aaliyahFlash, setAaliyahFlash] = useState(false);
  const [hasRetried, setHasRetried] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [imagesTick, setImagesTick] = useState(0);
  // Backing-store multiplier so the canvas stays sharp (HD) at any size.
  const [scale, setScale] = useState(2);

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

  // Keep the canvas resolution matched to its on-screen size x pixel ratio.
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

  // Load room images, cursor and gate; redraw as each one arrives.
  useEffect(() => {
    const sources: Record<string, string> = {
      cursor: CURSOR_SRC,
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

    // Draw in 1200x675 units, rendered at `scale`x resolution
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Grass + plate/utensil icons (visual only) — under everything else
    drawDecorations(ctx);

    // Dashed door lines (visual only) — under walls and the yellow path
    drawDoorDashes(ctx);

    // Green walls (visual only) — drawn under the yellow path
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

    // Room labels + image placeholders (visual only)
    drawRooms(ctx, imagesRef.current);

    // Exit gates
    const gate = imagesRef.current.gate;
    if (gate) {
      drawImageAnchored(ctx, gate, EXIT_1.x, EXIT_1.y, GATE_HEIGHT, 0.5, 0.5, GATE_ROTATION);
      drawImageAnchored(ctx, gate, EXIT_2.x, EXIT_2.y, GATE_HEIGHT, 0.5, 0.5, GATE_ROTATION);
    }

    // Player cursor. Before the game starts, the pulsing overlay button
    // shows the cursor instead, so it isn't drawn here.
    if (started) {
      const cursorImg = imagesRef.current.cursor;
      if (cursorImg) {
        drawImageAnchored(
          ctx,
          cursorImg,
          cursor.x,
          cursor.y,
          CURSOR_HEIGHT,
          CURSOR_TIP.x,
          CURSOR_TIP.y
        );
      } else {
        // Fallback dot while the image loads
        ctx.save();
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, PLAYER_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.bg;
        ctx.fill();
        ctx.strokeStyle = COLORS.white;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }
    }

    // Debug labels overlay
    if (showLabels) {
      drawDebugLabels(ctx);
    }
  }, [cursor, ending, aaliyahFlash, showLabels, imagesTick, scale, started]);

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
    if (ending || aaliyahFlash) return;

    const p = getCanvasPoint(e);

    if (!started && Math.hypot(p.x - START.x, p.y - START.y) < 45) {
      setStarted(true);
    }
  };

  const onCanvasPointerMove = (
    e: React.PointerEvent<HTMLCanvasElement>
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
    <main className="flex h-dvh w-screen flex-col items-center justify-center overflow-hidden bg-black">
      <style>{`
        @keyframes mazeCursorPulse {
          0%, 100% {
            transform: translate(var(--tip-x), var(--tip-y)) scale(1);
            filter: drop-shadow(0 0 0 rgba(255, 120, 150, 0));
          }
          50% {
            transform: translate(var(--tip-x), var(--tip-y)) scale(1.3);
            filter: drop-shadow(0 0 8px rgba(255, 120, 150, 0.9));
          }
        }
      `}</style>

      <div
        className="flex shrink-0 items-center justify-center gap-2 px-4 text-center font-mono text-xs tracking-[0.1em] text-[#c1ff72] sm:gap-3 sm:text-sm sm:tracking-[0.15em] lg:text-lg"
        style={{ height: TOP_BAR_HEIGHT }}
      >
        {started ? (
          <span>{TOP_TEXT_PLAYING}</span>
        ) : (
          <>
            <img
              src={CURSOR_SRC}
              alt=""
              draggable={false}
              className="block h-[2em] w-auto select-none"
            />
            <span>{hasRetried ? TOP_TEXT_RETRY : TOP_TEXT_START}</span>
          </>
        )}
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
            aria-label="Click the cursor to start"
            onClick={() => setStarted(true)}
            style={{
              left: `${(START.x / CANVAS_W) * 100}%`,
              top: `${(START.y / CANVAS_H) * 100}%`,
              height: `${(CURSOR_HEIGHT / CANVAS_H) * 100}%`,
              animation: "mazeCursorPulse 1.2s ease-in-out infinite",
              transformOrigin: `${CURSOR_TIP.x * 100}% ${CURSOR_TIP.y * 100}%`,
              "--tip-x": `-${CURSOR_TIP.x * 100}%`,
              "--tip-y": `-${CURSOR_TIP.y * 100}%`,
            } as React.CSSProperties}
            className="absolute z-10 cursor-pointer border-0 bg-transparent p-0"
          >
            <img
              src={CURSOR_SRC}
              alt=""
              draggable={false}
              className="block h-full w-auto select-none"
            />
          </button>
        )}

        {ending && !aaliyahFlash && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center font-mono">
              <div className="mb-2 text-[10px] uppercase tracking-[0.3em] sm:text-xs text-[#c1ff72]">
                You made it home
              </div>

              <div className="mb-4 text-2xl font-bold text-white sm:mb-6 sm:text-4xl">
                {ending}
              </div>

              <button
                type="button"
                onClick={reset}
                className="border border-[#c1ff72] px-4 py-1.5 text-xs text-[#c1ff72] sm:px-5 sm:py-2 sm:text-sm transition hover:bg-[#c1ff72] hover:text-black"
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

      <div
        className="flex shrink-0 flex-col items-center justify-center px-4 text-center font-mono text-xs tracking-[0.1em] text-[#c1ff72] sm:text-sm sm:tracking-[0.15em] lg:text-lg"
        style={{ height: BOTTOM_BAR_HEIGHT }}
      >
        <p>{BOTTOM_LINE_1}</p>
        <p className="font-bold text-[#ff3131]">{BOTTOM_LINE_2}</p>
      </div>
    </main>
  );
}
