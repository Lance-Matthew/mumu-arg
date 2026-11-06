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

function GridFloor() {
  const W = 1210;
  const H = 238;
  const cols = Array.from({ length: 11 }, (_, i) => i - 5);
  const rows = [0, 23, 48, 76, 106, 138, 173, 211, 252];
  const xl = (y: number) => 178 - 183 * (y / H);
  const xr = (y: number) => 1033 + 182 * (y / H);

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[35%] w-full"
    >
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
        return (
          <polygon
            key={i}
            points={`${tx - 2.5},0 ${tx + 2.5},0 ${bx + 6},${H} ${bx - 6},${H}`}
            fill="url(#gridV)"
          />
        );
      })}
    </svg>
  );
}

function RetroSubtitle({ fontClass }: { fontClass: string }) {
  const layer = "col-start-1 row-start-1";
  const stroke = { paintOrder: "stroke fill" } as const;

  return (
    <h2 className={`${fontClass} grid w-full grid-cols-1 text-center text-[clamp(1.5rem,5.2vw,4.75rem)] leading-[1.1]`}>
      <span
        aria-hidden="true"
        className={layer}
        style={{ ...stroke, color: "#000", WebkitTextStroke: "0.2em #000", textShadow: extrude }}
      >
        ‘26-’27 Retro Takeover
      </span>
      <span
        className={layer}
        style={{ ...stroke, color: "#ffeb99", WebkitTextStroke: "0.08em #000" }}
      >
        ‘26-’27 Retro Takeover
      </span>
    </h2>
  );
}

function FreshieTerm({ fontClass }: { fontClass: string }) {
  const layer = "col-start-1 row-start-1 whitespace-nowrap";
  const o = "0.035em";
  const shift = { transform: `translate(${o}, ${o})` };
  const behind = { paintOrder: "stroke fill" } as const;

  return (
    <h1 className={`${fontClass} grid text-[clamp(2.75rem,15vw,14rem)] leading-[0.9]`}>
      <span aria-hidden="true" className={layer} style={{ ...behind, ...shift, color: "#ffeab0", WebkitTextStroke: "0.045em #ffeab0" }}>
        Freshie Term
      </span>
      <span aria-hidden="true" className={layer} style={{ ...behind, ...shift, color: "#000", WebkitTextStroke: "0.02em #f7b6a0" }}>
        Freshie Term
      </span>
      <span aria-hidden="true" className={layer} style={{ color: "transparent", WebkitTextStroke: "0.04em #ffeab0" }}>
        Freshie Term
      </span>
      <span className={layer} style={{ color: "transparent", WebkitTextStroke: "0.016em #f7b6a0" }}>
        Freshie Term
      </span>
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
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute bottom-0 left-0 z-0 h-[34%] w-[92%] md:h-[38%] md:w-[66%]"
    >
      <defs>
        <linearGradient id="bottomLines" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
          <stop offset="0" stopColor="#f6f6fb" />
          <stop offset="0.5" stopColor="#c9c8d3" />
          <stop offset="1" stopColor="#9d9ca5" />
        </linearGradient>
      </defs>
      {lines.map(([x1, y1, x2, y2], i) => {
        const w = 3 + (i / (lines.length - 1)) * 5;
        return (
          <polygon
            key={i}
            points={`${x1},${y1 - w / 2} ${x2},${y2} ${x1},${y1 + w / 2}`}
            fill="url(#bottomLines)"
            opacity={0.75 + (i / (lines.length - 1)) * 0.25}
          />
        );
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
    <h2
      className={`${fontClass} grid grid-cols-1 leading-[1.05]`}
      style={{ fontSize: "clamp(1.9rem, 9.5cqw, 4.5rem)" }}
    >
      <span aria-hidden="true" className={layer} style={{ color: "#2f58a0", textShadow: `${extrusion}, ${soft}` }}>
        Adventure Awaits
      </span>
      <span className={layer} style={{ color: "#000" }}>
        Adventure Awaits
      </span>
    </h2>
  );
}

function InlineHamburger() {
  return (
    <span
      aria-hidden="true"
      className="inline-hamburger mx-1.5 inline-flex h-[1.15em] w-[1.15em] flex-col items-center justify-center gap-[0.16em] align-middle"
    >
      <span className="h-[0.12em] w-[0.72em] rounded-full bg-[#211f17]" />
      <span className="h-[0.12em] w-[0.72em] rounded-full bg-[#211f17]" />
      <span className="h-[0.12em] w-[0.72em] rounded-full bg-[#211f17]" />
    </span>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tvVideoRef = useRef<HTMLVideoElement>(null);
  const [tvPlaying, setTvPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, root: containerRef.current }
    );

    const elements = document.querySelectorAll(".slide-up-anim");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleTvPlay = () => {
    const v = tvVideoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
    } else {
      v.pause();
    }
  };

  return (
    <main ref={containerRef} className="no-scrollbar h-[100svh] w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-[#fafaf8]">

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
        .inline-hamburger {
          transform-origin: center;
          animation: inline-hamburger-heartbeat 3.2s ease-in-out infinite;
        }

        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        .anim-wiggle-1 { animation: wiggle1 2s ease-in-out infinite; }
        .anim-wiggle-2 { animation: wiggle2 2.3s ease-in-out infinite; }
        .anim-wiggle-3 { animation: wiggle3 2.6s ease-in-out infinite; }

        .anim-path-1 { animation: path-square 4s linear infinite; }
        .anim-path-2 { animation: path-triangle 5s linear infinite; }
        .anim-path-3 { animation: path-diamond 4.5s linear infinite; }

        .slide-up-anim {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .slide-up-anim.active {
          opacity: 1;
          transform: translateY(0);
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
          <Image
            src="/images/main/campus.JPG"
            alt="University of Santo Fiarce campus"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#7ca6de]/95" />

        <div className="relative z-10 flex flex-1 items-center justify-center px-4 pb-24 pt-24 sm:px-8 sm:pb-28">
          <div className="mx-auto grid w-full max-w-3xl grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-[280px_minmax(0,1fr)] md:gap-12 lg:max-w-5xl lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">

            <div className="mx-auto flex w-full max-w-[180px] items-center justify-center md:max-w-none slide-up-anim sm:max-w-[260px]">
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
          className="group absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 border-0 bg-transparent text-[#466c64] transition-colors hover:text-[#203e35] sm:bottom-6"
        >
          <span className="font-mono text-base font-bold tracking-widest sm:text-lg">continue</span>
          <div className="relative h-[40px] w-[48px] sm:h-[60px] sm:w-[68px] animate-bounce transition-transform duration-200 group-hover:scale-110">
            <Image src="/images/main/downArrow.png" alt="" fill sizes="68px" className="object-contain" />
          </div>
        </button>
      </section>

      {/* ============ SECTION 2 — GRADIENT & TAKEOVER TEXT ============ */}
      <section
        id="about"
        className="relative flex min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden bg-gradient-to-b from-[#7ca6de] to-[#7ab478]"
      >
        <GridFloor />

        {/* Shapes - Scaled and positioned for mobile/desktop */}
        <div className="absolute top-24 right-4 z-20 h-[100px] w-[100px] origin-top-right scale-[0.6] sm:top-32 sm:right-12 sm:h-[140px] sm:w-[140px] sm:scale-[0.8] md:top-40 md:h-[180px] md:w-[180px] md:scale-100">
          <div className="absolute top-20 right-60 anim-path-2 sm:right-70">
            <div className="relative h-8 w-8 anim-wiggle-1 sm:h-10 sm:w-10 md:h-[48px] md:w-[48px] [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
              <Image src="/images/shapes/dorito.png" alt="Dorito shape" fill sizes="(max-width: 768px) 32px, 48px" className="object-contain" />
            </div>
          </div>
          <div className="absolute top-20 right-32 anim-path-3 rotate-[210deg] sm:right-40">
            <div className="relative h-12 w-12 anim-wiggle-2 sm:h-14 sm:w-14 md:h-[70px] md:w-[70px] [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
              <Image src="/images/shapes/noodle1.png" alt="Noodle shape" fill sizes="(max-width: 768px) 48px, 70px" className="object-contain" />
            </div>
          </div>
          <div className="absolute top-38 right-50 anim-path-1 sm:right-60">
            <div className="relative h-12 w-12 anim-wiggle-3 sm:h-14 sm:w-14 md:h-[70px] md:w-[70px] [filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]">
              <Image src="/images/shapes/fita2.png" alt="Fita shape" fill sizes="(max-width: 768px) 48px, 70px" className="object-contain" />
            </div>
          </div>
        </div>

        <div className="absolute top-24 left-4 z-20 h-[100px] w-[100px] origin-top-left scale-[0.6] sm:top-32 sm:left-12 sm:h-[140px] sm:w-[140px] sm:scale-[0.8] md:top-40 md:h-[180px] md:w-[180px] md:scale-100">
          <div className="absolute top-40 left-60 anim-path-2 rotate-[140deg] sm:left-80">
            <div className="relative h-8 w-8 anim-wiggle-1 sm:h-10 sm:w-10 md:h-[48px] md:w-[48px] [filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]">
              <Image src="/images/shapes/dorito.png" alt="Dorito shape" fill sizes="(max-width: 768px) 32px, 48px" className="object-contain" />
            </div>
          </div>
          <div className="absolute top-32 left-45 anim-path-3 rotate-[10deg] sm:left-55">
            <div className="relative h-12 w-12 anim-wiggle-2 sm:h-14 sm:w-14 md:h-[70px] md:w-[70px] [filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]">
              <Image src="/images/shapes/noodle2.png" alt="Noodle shape" fill sizes="(max-width: 768px) 48px, 70px" className="object-contain" />
            </div>
          </div>
          <div className="absolute top-15 left-55 anim-path-1 sm:left-70">
            <div className="relative h-12 w-12 anim-wiggle-3 sm:h-14 sm:w-14 md:h-[70px] md:w-[70px] [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
              <Image src="/images/shapes/fita1.png" alt="Fita shape" fill sizes="(max-width: 768px) 48px, 70px" className="object-contain" />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-end gap-6 px-6 pt-24 pb-[33svh] text-center md:gap-10 slide-up-anim">
          <RetroSubtitle fontClass={plexMono.className} />
          <FreshieTerm fontClass={sifonn.className} />
        </div>

        <button
          type="button"
          onClick={() => document.getElementById("section-3")?.scrollIntoView({ behavior: "smooth" })}
          className="group absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 border-0 bg-transparent text-[#466c64] transition-colors hover:text-[#203e35] sm:bottom-6"
        >
          <span className="font-mono text-base font-bold tracking-widest sm:text-lg">continue</span>
          <div className="relative h-[40px] w-[48px] sm:h-[60px] sm:w-[68px] animate-bounce transition-transform duration-200 group-hover:scale-110">
            <Image src="/images/downArrow.png" alt="" fill sizes="68px" className="object-contain" />
          </div>
        </button>
      </section>

      {/* ============ SECTION 3 — ADVENTURE AWAITS ============ */}
      <section
        id="section-3"
        className="relative flex min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden bg-gradient-to-b from-[#7ab478] to-[#d4eab3]"
      >
        <BottomLines />

        {/* Wrapper shifted right on desktop, centered on mobile */}
        <div className="relative flex flex-1 flex-col md:left-[5%] md:w-[95%]">

          {/* CLUSTER A (Top Left) - Hidden on mobile to avoid text overlap */}
          <div className="hidden sm:block absolute top-[17%] left-[6%] z-20 pointer-events-none anim-path-2 rotate-[10deg]">
            <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
              <Image src="/images/shapes/dorito.png" alt="" fill sizes="56px" className="object-contain" />
            </div>
          </div>
          <div className="hidden sm:block absolute top-[22%] left-[10%] z-20 pointer-events-none anim-path-3 rotate-[-140deg]">
            <div className="relative h-12 w-12 md:h-16 md:w-16 anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]">
              <Image src="/images/shapes/noodle2.png" alt="" fill sizes="64px" className="object-contain" />
            </div>
          </div>
          <div className="hidden sm:block absolute top-[25%] left-[6%] z-20 pointer-events-none anim-path-1 rotate-[180deg]">
            <div className="relative h-10 w-10 md:h-16 md:w-16 anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
              <Image src="/images/shapes/fita1.png" alt="" fill sizes="64px" className="object-contain" />
            </div>
          </div>

          {/* CLUSTER B (Bottom Middle) - Hidden on mobile */}
          <div className="hidden sm:block absolute bottom-[19%] left-[38%] z-20 pointer-events-none anim-path-2 rotate-[-30deg]">
            <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
              <Image src="/images/shapes/dorito.png" alt="" fill sizes="56px" className="object-contain" />
            </div>
          </div>
          <div className="hidden sm:block absolute bottom-[18%] left-[42%] z-20 pointer-events-none anim-path-3 rotate-[-170deg]">
            <div className="relative h-12 w-12 md:h-16 md:w-16 anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
              <Image src="/images/shapes/noodle1.png" alt="" fill sizes="64px" className="object-contain" />
            </div>
          </div>
          <div className="hidden sm:block absolute bottom-[11%] left-[39%] z-20 pointer-events-none anim-path-1 rotate-[15deg]">
            <div className="relative h-10 w-10 md:h-16 md:w-16 anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]">
              <Image src="/images/shapes/fita2.png" alt="" fill sizes="64px" className="object-contain" />
            </div>
          </div>

          <div className="relative z-10 flex flex-1 items-center px-6 pb-10 pt-24 sm:px-10">
            <div className="mx-auto grid w-full max-w-7xl items-center gap-8 md:grid-cols-[1fr_1.5fr] md:gap-12">

              {/* Left Column: TV-style video frame */}
              <div className="relative flex w-full items-center justify-center md:justify-start">
                <div className="w-full max-w-md md:max-w-lg">
                  {/* Outer TV frame */}
                  <div className="rounded-2xl border-[6px] border-[#1f2329] bg-[#34414d] p-4 shadow-[0_8px_12px_rgba(0,0,0,0.25)]">
                    {/* Inner screen */}
                    <div className="group relative aspect-video border-[5px] border-[#1f2329] bg-black overflow-hidden">
                      <video
                        ref={tvVideoRef}
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/videos/A.mp4"
                        playsInline
                        preload="metadata"
                        onClick={toggleTvPlay}
                        onPlay={() => setTvPlaying(true)}
                        onPause={() => setTvPlaying(false)}
                        onEnded={() => setTvPlaying(false)}
                      />

                      {/* Play overlay (hidden while playing) */}
                      {!tvPlaying && (
                        <button
                          type="button"
                          onClick={toggleTvPlay}
                          aria-label="Play video"
                          className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-opacity duration-200 hover:bg-black/30"
                        >
                          <span className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border-[4px] border-[#1f2329] shadow-[4px_5px_0_rgba(0,0,0,0.45)] transition-transform duration-200 group-hover:scale-105 bg-[#ffe793]">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-7 w-7 md:h-9 md:w-9 translate-x-[2px]"
                              fill="#1f2329"
                              aria-hidden="true"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </button>
                      )}

                      {/* Pause button while playing */}
                      {tvPlaying && (
                        <button
                          type="button"
                          onClick={toggleTvPlay}
                          aria-label="Pause video"
                          className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#1f2329] opacity-80 shadow-[3px_4px_0_rgba(0,0,0,0.4)] transition-opacity hover:opacity-100 bg-[#ffe793]"
                        >
                          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#1f2329" aria-hidden="true">
                            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Text */}
              <div className="min-w-0 slide-up-anim w-full mt-16 md:mt-0" style={{ containerType: "inline-size" }}>
                <div className="origin-center md:origin-left scale-[1.2] mb-6 md:mb-10 text-center md:text-left flex justify-center md:justify-start">
                  <AdventureHeading fontClass={sifonn.className} />
                </div>

                <div className={`${plexMonoRegular.className} mt-5 w-full space-y-5 text-[clamp(1rem,2.6vw,1.62rem)] font-normal leading-relaxed text-[#111] md:mt-7 md:space-y-6 text-center md:text-left`}>
                  <p>
                    Explore the website in full and answer the form found at the navigation tab (
                    <InlineHamburger />
                    ) to earn your incentive.
                  </p>
                  <p>Screenshot your certificate and upload it in the assignments tab under your HMRM1 course.</p>
                </div>

                <div className="mt-8 flex justify-center md:mt-10">
                  <Link
                    href="/map"
                    className={`${plexMonoRegular.className} inline-block border-[3px] border-black bg-[#c9c9c9] px-8 py-1.5 text-[clamp(0.875rem,1.5vw,1rem)] font-normal text-black shadow-[inset_-2px_-2px_0_#6b6b6b,inset_2px_2px_0_#fff] transition-colors hover:bg-[#d6d6d6] active:shadow-[inset_2px_2px_0_#6b6b6b,inset_-2px_-2px_0_#fff]`}
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