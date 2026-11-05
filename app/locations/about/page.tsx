"use client";

import Image from "next/image";
import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import SchoolHeader from "@/components/SchoolHeader";

const sifonn = localFont({
  src: "../../fonts/Sifonn.otf",
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
      style={{ fontSize: "clamp(1.9rem, 11cqw, 4.5rem)" }}
    >
      <span aria-hidden="true" className={layer} style={{ color: "#2f58a0", textShadow: `${extrusion}, ${soft}` }}>
        About Me
      </span>
      <span className={layer} style={{ color: "#000" }}>
        About Me
      </span>
    </h2>
  );
}

function ShapeCluster({ className, layout }: { className: string; layout: "a" | "b" }) {
  const spots: Record<"dorito" | "noodle" | "fita", { left: string; top: string; width: string; ratio: string }> =
    layout === "a"
      ? {
        dorito: { left: "34%", top: "8%", width: "22%", ratio: "25 / 35" },
        noodle: { left: "52%", top: "40%", width: "48%", ratio: "63 / 25" },
        fita: { left: "0%", top: "50%", width: "42%", ratio: "1 / 1" },
      }
      : {
        dorito: { left: "0%", top: "0%", width: "24%", ratio: "25 / 35" },
        noodle: { left: "43%", top: "8%", width: "58%", ratio: "63 / 25" },
        fita: { left: "15%", top: "47%", width: "55%", ratio: "1 / 1" },
      };

  const place = (p: any) => ({ left: p.left, top: p.top, width: p.width, aspectRatio: p.ratio });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 ${className}`}
      style={{ width: "clamp(64px, 9vw, 130px)", aspectRatio: "1 / 1" }}
    >
      <div className="absolute anim-path-2" style={place(spots.dorito)}>
        <div className="relative h-full w-full anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
          <Image src="/images/shapes/dorito.png" alt="" fill sizes="40px" className="object-contain" />
        </div>
      </div>
      <div className="absolute anim-path-3" style={place(spots.noodle)}>
        <div className="relative h-full w-full anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
          <Image src="/images/shapes/noodle2.png" alt="" fill sizes="80px" className="object-contain" />
        </div>
      </div>
      <div className="absolute anim-path-1" style={place(spots.fita)}>
        <div className="relative h-full w-full anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]">
          <Image src="/images/shapes/fita1.png" alt="" fill sizes="80px" className="object-contain" />
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="no-scrollbar h-[100svh] w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-[#fafaf8]">
      <style>{`
        @keyframes wiggle1 { 0%, 100% { transform: rotate(-12deg); } 50% { transform: rotate(12deg); } }
        @keyframes wiggle2 { 0%, 100% { transform: rotate(10deg); } 50% { transform: rotate(-15deg); } }
        @keyframes wiggle3 { 0%, 100% { transform: rotate(-15deg); } 50% { transform: rotate(15deg); } }
        @keyframes path-square { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(10px, -10px); } 50% { transform: translate(20px, 0); } 75% { transform: translate(10px, 10px); } }
        @keyframes path-triangle { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(-15px, -15px); } 66% { transform: translate(15px, -15px); } }
        @keyframes path-diamond { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(10px, -12px); } 50% { transform: translate(20px, 0); } 75% { transform: translate(10px, 12px); } }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .anim-wiggle-1 { animation: wiggle1 2s ease-in-out infinite; }
        .anim-wiggle-2 { animation: wiggle2 2.3s ease-in-out infinite; }
        .anim-wiggle-3 { animation: wiggle3 2.6s ease-in-out infinite; }
        .anim-path-1 { animation: path-square 4s linear infinite; }
        .anim-path-2 { animation: path-triangle 5s linear infinite; }
        .anim-path-3 { animation: path-diamond 4.5s linear infinite; }
      `}</style>

      <div className="fixed top-0 left-0 z-50 w-full">
        <SchoolHeader />
      </div>

      {/* ============ ABOUT SECTION ============ */}
      <section
        id="about"
        className="relative flex min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden bg-gradient-to-b from-[#7ab478] to-[#d4eab3]"
      >
        <BottomLines />

        {/* Floating Shape Clusters */}
        <ShapeCluster layout="a" className="right-[6%] top-[11%] md:right-auto md:left-[5%] md:top-[18%]" />
        <ShapeCluster layout="b" className="right-[6%] bottom-[7%] md:right-auto md:left-[42%] md:bottom-[14%]" />

        <div className="relative z-10 flex flex-1 items-center px-4 pb-12 pt-24 sm:px-8 md:px-10">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-[1fr_1.2fr] md:gap-12 lg:gap-20">
            
            {/* Left Column: Image */}
            <div className="relative flex w-full items-center justify-center md:justify-start">
              <div className="relative w-full max-w-[280px] sm:max-w-[380px] md:max-w-full aspect-square drop-shadow-2xl">
                <Image
                  src="/images/map/aaliyah1.png"
                  alt="Aaliyah"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain md:scale-110 lg:scale-125"
                />
              </div>
            </div>

            {/* Right Column: Text (Removed slide-up-anim so it is visible) */}
            <div className="min-w-0 w-full mt-4 md:mt-0 flex flex-col items-center md:items-start text-center md:text-left" style={{ containerType: "inline-size" }}>
              <div className="mb-4 md:mb-8 w-full">
                <AdventureHeading fontClass={sifonn.className} />
              </div>
              
              <div className={`${plexMonoRegular.className} w-full space-y-4 md:space-y-6 text-[clamp(0.95rem,2vw,1.35rem)] leading-relaxed text-[#111]`}>
                <p>6</p>
                <p>seven</p>
              </div>
              
              <div className="mt-8 flex w-full justify-center md:justify-start">
                <button
                  type="button"
                  onClick={() => { /* TODO */ }}
                  className={`${plexMonoRegular.className} border-2 border-black bg-[#c9c9c9] px-6 py-2 text-[clamp(0.875rem,1.5vw,1rem)] font-normal text-black shadow-[inset_-2px_-2px_0_#6b6b6b,inset_2px_2px_0_#fff] transition-colors hover:bg-[#d6d6d6] active:shadow-[inset_2px_2px_0_#6b6b6b,inset_-2px_-2px_0_#fff] sm:px-8`}
                >
                  instagram?
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}