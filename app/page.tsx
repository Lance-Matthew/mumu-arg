"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import SchoolHeader from "@/components/SchoolHeader";

const sifonn = localFont({
  src: "./fonts/Sifonn.otf",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const plexMonoRegular = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const extrude = Array.from({ length: 18 }, (_, i) => `${((i + 1) * 0.0161).toFixed(4)}em ${((i + 1) * 0.0161).toFixed(4)}em 0 #000`).join(", ");

const YELLOW = "#ffe793";

const TOUR_VIDEO_SRC =
  "https://customer-eie2vf4vq58r59xg.cloudflarestream.com/36b33cf2706c82f345d13256059dba82/manifest/video.m3u8";

/** Pull the video UID out of a Cloudflare Stream manifest URL. */
function extractUid(src: string): string | null {
  const match = src.match(/cloudflarestream\.com\/([a-f0-9]+)\/manifest\//i);
  return match ? match[1] : null;
}

function RetroTVPlayer() {
  const uid = extractUid(TOUR_VIDEO_SRC);
  const iframeSrc = uid
    ? `https://customer-eie2vf4vq58r59xg.cloudflarestream.com/${uid}/iframe`
    : TOUR_VIDEO_SRC;

  return (
    <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0">
      <div className="tv-scale-wrap">
        <div className="relative">
          <div className="tv-antenna" aria-hidden="true">
            <span className="tv-antenna__base" />
            <span className="tv-antenna__rod tv-antenna__rod--left">
              <span className="tv-antenna__tip" />
            </span>
            <span className="tv-antenna__rod tv-antenna__rod--right">
              <span className="tv-antenna__tip" />
            </span>
          </div>

          <div className="handheld-tv p-5 md:p-6">
            <div className="handheld-tv__bezel p-3 md:p-4">
              <div className="handheld-tv__screen aspect-video bg-black group relative overflow-hidden">
                <iframe
                  src={iframeSrc}
                  className="absolute inset-0 h-full w-full"
                  style={{ border: "none" }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen
                  title="Tour video"
                />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="tv-led tv-led--red" aria-hidden="true" />
                <span className="tv-led tv-led--yellow" aria-hidden="true" />
                <span className="tv-led tv-led--blue" aria-hidden="true" />
              </div>
              <span className="tv-button" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GridFloor() {
  const W = 1210;
  const H = 238;
  const cols = Array.from({ length: 11 }, (_, i) => i - 5);
  const rows = [0, 23, 48, 76, 106, 138, 173, 211, 252];
  const xl = (y: number) => 178 - 183 * (y / H);
  const xr = (y: number) => 1033 + 182 * (y / H);
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[35%] w-full">
      <defs>
        <linearGradient id="gridV" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={H}>
          <stop offset="0" stopColor="#77729c" />
          <stop offset="0.5" stopColor="#b1aab6" />
          <stop offset="1" stopColor="#8c88a3" />
        </linearGradient>
      </defs>
      {rows.map((y) => (
        <rect key={y} x={xl(y)} y={y - 1.5} width={xr(y) - xl(y)} height="3.5" fill="#9b99a9" opacity="0.9" />
      ))}
      {cols.map((i) => {
        const tx = 605 + 85.5 * i;
        const bx = 605 + 122 * i;
        return <polygon key={i} points={`${tx - 2.5},0 ${tx + 2.5},0 ${bx + 6},${H} ${bx - 6},${H}`} fill="url(#gridV)" />;
      })}
    </svg>
  );
}

function RetroSubtitle({ fontClass }: { fontClass: string }) {
  const layer = "col-start-1 row-start-1";
  const stroke = { paintOrder: "stroke fill" } as const;
  return (
    <h2 className={`${fontClass} grid w-full grid-cols-1 text-center text-[clamp(1.25rem,5.2vw,4.75rem)] leading-[1.1]`}>
      <span aria-hidden="true" className={layer} style={{ ...stroke, color: "#000", WebkitTextStroke: "0.2em #000", textShadow: extrude }}>'26-'27 Retro Takeover</span>
      <span className={layer} style={{ ...stroke, color: "#ffeb99", WebkitTextStroke: "0.08em #000" }}>'26-'27 Retro Takeover</span>
    </h2>
  );
}

function FreshieTerm({ fontClass }: { fontClass: string }) {
  const layer = "col-start-1 row-start-1 whitespace-nowrap";
  const o = "0.035em";
  const shift = { transform: `translate(${o}, ${o})` };
  const behind = { paintOrder: "stroke fill" } as const;
  return (
    <h1 className={`${fontClass} grid text-[clamp(2.25rem,min(14vw,26svh),14rem)] leading-[0.9]`}>
      <span aria-hidden="true" className={layer} style={{ ...behind, ...shift, color: "#ffeab0", WebkitTextStroke: "0.045em #ffeab0" }}>Freshie Term</span>
      <span aria-hidden="true" className={layer} style={{ ...behind, ...shift, color: "#000", WebkitTextStroke: "0.02em #f7b6a0" }}>Freshie Term</span>
      <span aria-hidden="true" className={layer} style={{ color: "transparent", WebkitTextStroke: "0.04em #ffeab0" }}>Freshie Term</span>
      <span className={layer} style={{ color: "transparent", WebkitTextStroke: "0.016em #f7b6a0" }}>Freshie Term</span>
    </h1>
  );
}

function BottomLines() {
  const W = 1082;
  const H = 425;
  const lines: [number, number, number, number][] = [
    [508, 76, 618, 67], [443, 101, 647, 84], [378, 126, 678, 100], [310, 153, 710, 119],
    [240, 181, 745, 138], [168, 210, 780, 158], [92, 239, 818, 180], [12, 270, 858, 203],
    [-10, 299, 900, 227], [-10, 325, 945, 250], [-10, 354, 990, 276], [-10, 383, 1040, 305], [15, 411, 1082, 340],
  ];
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="pointer-events-none absolute bottom-0 left-0 z-0 h-[34%] w-[92%] md:h-[38%] md:w-[66%]">
      <defs>
        <linearGradient id="bottomLines" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
          <stop offset="0" stopColor="#f6f6fb" />
          <stop offset="0.5" stopColor="#c9c8d3" />
          <stop offset="1" stopColor="#9d9ca5" />
        </linearGradient>
      </defs>
      {lines.map(([x1, y1, x2, y2], i) => {
        const w = 3 + (i / (lines.length - 1)) * 5;
        return <polygon key={i} points={`${x1},${y1 - w / 2} ${x2},${y2} ${x1},${y1 + w / 2}`} fill="url(#bottomLines)" opacity={0.75 + (i / (lines.length - 1)) * 0.25} />;
      })}
    </svg>
  );
}

function AdventureHeading({ fontClass }: { fontClass: string }) {
  const layer = "col-start-1 row-start-1";
  const STEPS = 10;
  const dark = [47, 88, 160];
  const light = [134, 184, 245];
  const extrusion = Array.from({ length: STEPS }, (_, i) => {
    const t = i / (STEPS - 1);
    const [r, g, b] = dark.map((d, k) => Math.round(d + (light[k] - d) * t));
    return `${((i + 1) * 0.012).toFixed(3)}em ${((i + 1) * 0.016).toFixed(3)}em 0 rgb(${r}, ${g}, ${b})`;
  }).join(", ");
  const soft = "0.16em 0.26em 0.22em rgba(0, 0, 0, 0.3)";
  return (
    <h2 className={`${fontClass} grid grid-cols-1 leading-[1.05]`} style={{ fontSize: "clamp(1.9rem, 9.5vw, 4.5rem)" }}>
      <span aria-hidden="true" className={layer} style={{ color: "#2f58a0", textShadow: `${extrusion}, ${soft}` }}>Adventure Awaits</span>
      <span className={layer} style={{ color: "#000" }}>Adventure Awaits</span>
    </h2>
  );
}

function InlineHamburger() {
  return (
    <span aria-hidden="true" className="inline-hamburger mx-1.5 inline-flex h-[1.15em] w-[1.15em] flex-col items-center justify-center gap-[0.16em] align-middle">
      <span className="h-[0.12em] w-[0.72em] rounded-full bg-[#211f17]" />
      <span className="h-[0.12em] w-[0.72em] rounded-full bg-[#211f17]" />
      <span className="h-[0.12em] w-[0.72em] rounded-full bg-[#211f17]" />
    </span>
  );
}

// SHAPE CLUSTERS FOR SECTION 2
type ShapeSpec = {
  src: string;
  top: string;
  left: string;
  size: string;
  anim: string;
  wiggle: string;
  drop: string;
  rotate?: string;
};

function ShapeCluster({
  shapes,
  size,
  className = "",
}: {
  shapes: ShapeSpec[];
  size: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none relative ${className}`}
      style={{ width: size, height: size }}
    >
      {shapes.map((s, i) => (
        <div
          key={i}
          className={`absolute ${s.anim}`}
          style={{ top: s.top, left: s.left, transform: s.rotate }}
        >
          <div
            className={`relative ${s.wiggle} ${s.drop}`}
            style={{
              width: `calc(${s.size} * ${size}px / 100)`,
              height: `calc(${s.size} * ${size}px / 100)`,
            }}
          >
            <Image src={s.src} alt="" fill sizes={`${size}px`} className="object-contain" />
          </div>
        </div>
      ))}
    </div>
  );
}

const S2_TOP_RIGHT: ShapeSpec[] = [
  { src: "/images/shapes/dorito.png", top: "0%", left: "0%", size: "32", anim: "anim-path-2", wiggle: "anim-wiggle-1", drop: "[filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]", rotate: "rotate(0deg)" },
  { src: "/images/shapes/noodle1.png", top: "10%", left: "55%", size: "48", anim: "anim-path-3", wiggle: "anim-wiggle-2", drop: "[filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]", rotate: "rotate(210deg)" },
  { src: "/images/shapes/fita2.png", top: "45%", left: "30%", size: "48", anim: "anim-path-1", wiggle: "anim-wiggle-3", drop: "[filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]", rotate: "rotate(0deg)" },
];

const S2_TOP_LEFT: ShapeSpec[] = [
  { src: "/images/shapes/dorito.png", top: "60%", left: "45%", size: "32", anim: "anim-path-2", wiggle: "anim-wiggle-1", drop: "[filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]", rotate: "rotate(140deg)" },
  { src: "/images/shapes/noodle2.png", top: "45%", left: "40%", size: "48", anim: "anim-path-3", wiggle: "anim-wiggle-2", drop: "[filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]", rotate: "rotate(10deg)" },
  { src: "/images/shapes/fita1.png", top: "0%", left: "55%", size: "48", anim: "anim-path-1", wiggle: "anim-wiggle-3", drop: "[filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]", rotate: "rotate(0deg)" },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1, root: containerRef.current }
    );
    document.querySelectorAll(".slide-up-anim").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={containerRef} className="no-scrollbar h-[100svh] w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory [@media(max-height:600px)]:snap-proximity scroll-smooth bg-[#fafaf8]">
      <style>{`
        @keyframes wiggle1 { 0%, 100% { transform: rotate(-12deg); } 50% { transform: rotate(12deg); } }
        @keyframes wiggle2 { 0%, 100% { transform: rotate(10deg); } 50% { transform: rotate(-15deg); } }
        @keyframes wiggle3 { 0%, 100% { transform: rotate(-15deg); } 50% { transform: rotate(15deg); } }

        @keyframes path-square { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(10px, -10px); } 50% { transform: translate(20px, 0); } 75% { transform: translate(10px, 10px); } }
        @keyframes path-triangle { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(-15px, -15px); } 66% { transform: translate(15px, -15px); } }
        @keyframes path-diamond { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(10px, -12px); } 50% { transform: translate(20px, 0); } 75% { transform: translate(10px, 12px); } }

        @keyframes inline-hamburger-heartbeat {
          0%   { transform: scale(1); }
          14%  { transform: scale(1.22); }
          28%  { transform: scale(1); }
          42%  { transform: scale(1.22); }
          70%  { transform: scale(1); }
          100% { transform: scale(1); }
        }
        .inline-hamburger { transform-origin: center; animation: inline-hamburger-heartbeat 3.2s ease-in-out infinite; }

        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        .anim-wiggle-1 { animation: wiggle1 2s ease-in-out infinite; }
        .anim-wiggle-2 { animation: wiggle2 2.3s ease-in-out infinite; }
        .anim-wiggle-3 { animation: wiggle3 2.6s ease-in-out infinite; }
        .anim-path-1 { animation: path-square 4s linear infinite; }
        .anim-path-2 { animation: path-triangle 5s linear infinite; }
        .anim-path-3 { animation: path-diamond 4.5s linear infinite; }

        .slide-up-anim { opacity: 0; transform: translateY(60px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
        .slide-up-anim.active { opacity: 1; transform: translateY(0); }

        .handheld-tv {
          background: #c9c9c9;
          border-radius: 22px;
          box-shadow: 0 0 0 3px #000, inset -4px -4px 0 #6b6b6b, inset 4px 4px 0 #fff, 0 12px 20px rgba(0,0,0,0.4);
          position: relative;
        }
        .handheld-tv__bezel { background: #1a2036; border: 3px solid #000; border-radius: 12px; box-shadow: inset 0 0 10px rgba(0,0,0,0.9); }
        .handheld-tv__screen { border-radius: 6px; overflow: hidden; position: relative; }
        .handheld-tv__screen::before {
          content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 5; border-radius: inherit;
          background:
            radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 100%),
            linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.2) 100%);
        }
        .handheld-tv__screen::after {
          content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 6; border-radius: inherit;
          background-image: repeating-linear-gradient(to bottom, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 3px);
          mix-blend-mode: multiply; opacity: 0.6;
        }

        .tv-antenna { position: absolute; left: 50%; top: -34px; transform: translateX(-50%); width: 90px; height: 44px; pointer-events: none; }
        .tv-antenna__base { position: absolute; left: 50%; bottom: 0; transform: translateX(-50%); width: 22px; height: 10px; background: #2b2b2b; border: 2px solid #000; border-radius: 4px 4px 2px 2px; }
        .tv-antenna__rod {
          position: absolute; bottom: 8px; width: 3px; height: 40px;
          background: linear-gradient(to top, #2b2b2b, #9a9a9a); border: 1px solid #000; border-radius: 2px; transform-origin: bottom center;
        }
        .tv-antenna__rod--left { left: 50%; transform: translateX(-50%) rotate(-28deg); }
        .tv-antenna__rod--right { left: 50%; transform: translateX(-50%) rotate(28deg); }
        .tv-antenna__tip { position: absolute; top: -3px; left: 50%; transform: translateX(-50%); width: 6px; height: 6px; border-radius: 9999px; background: #d9d9d9; border: 1px solid #000; }

        .tv-led { width: 10px; height: 10px; border-radius: 9999px; border: 2px solid #000; }
        .tv-led--red { background: #ff3b3b; box-shadow: 0 0 8px #ff3b3b; }
        .tv-led--yellow { background: #ffd23f; box-shadow: 0 0 8px #ffd23f; }
        .tv-led--blue { background: #4cc2ff; box-shadow: 0 0 8px #4cc2ff; }

        .tv-button {
          width: 34px; height: 34px; border-radius: 9999px; border: 3px solid #000;
          background: radial-gradient(circle at 35% 30%, #e9e9e9, #a8a8a8 70%, #6b6b6b 100%);
          box-shadow: inset -2px -2px 0 #6b6b6b, inset 2px 2px 0 #ffffff, 0 3px 0 #000;
        }

        .tv-scale-wrap { transform: scale(1); transform-origin: center center; }
        @media (min-width: 768px) { .tv-scale-wrap { transform: scale(1.05); } }
        @media (min-width: 1024px) { .tv-scale-wrap { transform: scale(1.0); } }

        @media (prefers-reduced-motion: reduce) {
          .anim-wiggle-1, .anim-wiggle-2, .anim-wiggle-3,
          .anim-path-1, .anim-path-2, .anim-path-3,
          .inline-hamburger { animation: none; }
          .slide-up-anim { transition: none; transform: none; }
        }
      `}</style>

      <div className="fixed top-0 left-0 z-50 w-full">
        <SchoolHeader />
      </div>

      {/* ============ SECTION 1 — RETRO HERO ============ */}
      <section
        className="relative flex min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #b6d9cc 40%, #7ca6de 100%)" }}
      >
        <div className="absolute inset-0">
          <Image src="/images/main/campus.JPG" alt="University of Santo Fiarce campus" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#7ca6de]/95" />

        <div className="relative z-10 flex flex-1 items-center justify-center px-4 pb-24 pt-24 sm:px-8 sm:pb-28">
          <div className="mx-auto grid w-full max-w-3xl grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-[280px_minmax(0,1fr)] md:gap-12 lg:max-w-5xl lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
            <div className="mx-auto flex w-full max-w-[min(180px,28svh)] items-center justify-center md:max-w-none slide-up-anim sm:max-w-[min(260px,34svh)]">
              <div className="relative aspect-square w-full drop-shadow-[8px_12px_4px_rgba(0,0,0,0.8)]">
                <Image src="/images/main/seal.png" alt="University of Santo Fiarce seal" fill priority sizes="(max-width: 767px) 180px, 320px" className="object-contain" />
              </div>
            </div>

            <div className="min-w-0 text-center md:text-left slide-up-anim">
              <p className="mb-3 font-mono text-base font-bold tracking-wide text-[#fff0a3] [text-shadow:2px_3px_4px_rgba(25,24,16,0.9)] sm:text-xl md:text-2xl lg:text-3xl">
                Welcome Fresh Fiarceans to the
              </p>
              <div className="pb-6">
                <h1 className="font-sans text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.91] tracking-[-0.045em] text-[#fff0a3] [text-shadow:4px_6px_3px_rgba(25,24,16,0.9),_6px_8px_10px_rgba(25,24,16,0.6)] sm:[-webkit-text-stroke:1px_#191810] sm:[text-shadow:6px_8px_4px_rgba(25,24,16,0.9),_8px_12px_15px_rgba(25,24,16,0.6)]">
                  <span className="block">University of</span>
                  <span className="mt-2 block">Santo Fiarce</span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="group absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 border-0 bg-transparent text-[#466c64] transition-colors hover:text-[#203e35] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
        >
          <span className="font-mono text-base font-bold tracking-widest sm:text-lg">continue</span>
          <div className="relative h-[40px] w-[48px] sm:h-[60px] sm:w-[68px] animate-bounce transition-transform duration-200 group-hover:scale-110">
            <Image src="/images/main/downArrow.png" alt="" fill sizes="68px" className="object-contain" unoptimized />
          </div>
        </button>
      </section>

      {/* ============ SECTION 2 — GRADIENT & TAKEOVER TEXT ============ */}
      <section id="about" className="relative flex min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden bg-gradient-to-b from-[#7ca6de] to-[#7ab478]">
        <GridFloor />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-24 pb-24 text-center slide-up-anim">
          <div className="relative inline-block">
            <div className="pointer-events-none absolute -top-14 -left-16 sm:-top-24 sm:-left-36 md:-top-28 md:-left-44 z-0 scale-[0.6] sm:scale-[0.8] md:scale-100 origin-bottom-right">
              <ShapeCluster shapes={S2_TOP_LEFT} size={130} />
            </div>

            <div className="pointer-events-none absolute -top-14 -right-16 sm:-top-24 sm:-right-36 md:-top-28 md:-right-44 z-0 scale-[0.6] sm:scale-[0.8] md:scale-100 origin-bottom-left">
              <ShapeCluster shapes={S2_TOP_RIGHT} size={130} />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 md:gap-10">
              <RetroSubtitle fontClass={plexMono.className} />
              <FreshieTerm fontClass={sifonn.className} />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => document.getElementById("section-3")?.scrollIntoView({ behavior: "smooth" })}
          className="group absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 border-0 bg-transparent text-[#466c64] transition-colors hover:text-[#203e35] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
        >
          <span className="font-mono text-base font-bold tracking-widest sm:text-lg">continue</span>
          <div className="relative h-[40px] w-[48px] sm:h-[60px] sm:w-[68px] animate-bounce transition-transform duration-200 group-hover:scale-110">
            <Image src="/images/main/downArrow.png" alt="" fill sizes="68px" className="object-contain" unoptimized />
          </div>
        </button>
      </section>

      {/* ============ SECTION 3 — ADVENTURE AWAITS ============ */}
      <section id="section-3" className="relative flex min-h-[100svh] w-full shrink-0 snap-start flex-col justify-center overflow-hidden bg-gradient-to-b from-[#7ab478] to-[#d4eab3]">
        <BottomLines />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12 py-24">
          
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-12">

            {/* Left Column: Retro TV shell */}
            <div className="relative flex w-full items-center justify-center">
              <RetroTVPlayer />
            </div>

            {/* Right Column: Text */}
            <div className="relative min-w-0 slide-up-anim w-full lg:-translate-x-[4%]">

              <div className="relative z-10">
                {/* Removed the scale-[1.2] and slightly reduced max font size to fit better */}
                <div className="origin-center lg:origin-left mb-6 md:mb-8 text-center lg:text-left flex justify-center lg:justify-start">
                  <AdventureHeading fontClass={sifonn.className} />
                </div>

                {/* Reduced text size to clamp(0.9rem, 2vw, 1.3rem) */}
                <div className={`${plexMonoRegular.className} mt-5 w-full space-y-4 text-[clamp(0.9rem,2vw,1.3rem)] font-normal leading-relaxed text-[#111] md:mt-6 md:space-y-5 text-center lg:text-left`}>
                  <p>
                    Explore the website in full and answer the form found at the navigation tab (<InlineHamburger />) to earn your incentive.
                  </p>
                  <p>Screenshot your certificate and upload it in the assignments tab under your HMRM1 course.</p>
                  <p>(Best viewed on a Laptop or Computer)</p>
                </div>

                <div className="mt-8 flex justify-center lg:justify-start md:mt-10">
                  {/* Reduced button padding and font size slightly */}
                  <Link
                    href="/map"
                    className={`${plexMonoRegular.className} inline-block border-[3px] border-black bg-[#c9c9c9] px-8 py-2 text-[clamp(0.9rem,1.5vw,1.1rem)] font-normal text-black shadow-[inset_-2px_-2px_0_#6b6b6b,inset_2px_2px_0_#fff] transition-colors hover:bg-[#d6d6d6] active:shadow-[inset_2px_2px_0_#6b6b6b,inset_-2px_-2px_0_#fff]`}
                  >
                    Begin Tour
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}