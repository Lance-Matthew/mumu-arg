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

const INSTAGRAM_URL =
  "https://www.instagram.com/4li.ahhh?utm_source=ig_web_button_share_sheet&obrf=ZDNlZDc0MzIxNw==";

function BottomLines() {
  const W = 1082;
  const H = 425;

  const lines: [number, number, number, number][] = [
    [508, 76, 618, 67],
    [443, 101, 647, 84],
    [378, 126, 678, 100],
    [310, 153, 710, 119],
    [240, 181, 745, 138],
    [168, 210, 780, 158],
    [92, 239, 818, 180],
    [12, 270, 858, 203],
    [-10, 299, 900, 227],
    [-10, 325, 945, 250],
    [-10, 354, 990, 276],
    [-10, 383, 1040, 305],
    [15, 411, 1082, 340],
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute bottom-0 left-0 z-0 h-[34%] w-[92%] md:h-[38%] md:w-[66%]"
    >
      <defs>
        <linearGradient
          id="bottomLines"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2={W}
          y2="0"
        >
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

function AdventureHeading({
  fontClass,
  text = "About Me",
  size = "default",
}: {
  fontClass: string;
  text?: string;
  size?: "default" | "compact";
}) {
  const layer = "col-start-1 row-start-1";
  const STEPS = 10;

  const dark = [47, 88, 160];
  const light = [134, 184, 245];

  const extrusion = Array.from({ length: STEPS }, (_, i) => {
    const t = i / (STEPS - 1);

    const [r, g, b] = dark.map((d, k) =>
      Math.round(d + (light[k] - d) * t)
    );

    return `${((i + 1) * 0.012).toFixed(3)}em ${(
      (i + 1) *
      0.016
    ).toFixed(3)}em 0 rgb(${r}, ${g}, ${b})`;
  }).join(", ");

  const soft = "0.16em 0.26em 0.22em rgba(0, 0, 0, 0.3)";

  return (
    <h2
      className={`${fontClass} grid grid-cols-1 leading-[1.05]`}
      style={{
        fontSize:
          size === "compact"
            ? "clamp(1.6rem, 8cqw, 3.25rem)"
            : "clamp(1.75rem, 9.5cqw, 3.75rem)",
      }}
    >
      <span
        aria-hidden="true"
        className={layer}
        style={{
          color: "#2f58a0",
          textShadow: `${extrusion}, ${soft}`,
        }}
      >
        {text}
      </span>

      <span className={layer} style={{ color: "#000" }}>
        {text}
      </span>
    </h2>
  );
}

function ShapeCluster({
  className,
  layout,
}: {
  className: string;
  layout: "a" | "b";
}) {
  const spots: Record<
    "dorito" | "noodle" | "fita",
    { left: string; top: string; width: string; ratio: string }
  > =
    layout === "a"
      ? {
          dorito: {
            left: "34%",
            top: "8%",
            width: "22%",
            ratio: "25 / 35",
          },
          noodle: {
            left: "52%",
            top: "40%",
            width: "48%",
            ratio: "63 / 25",
          },
          fita: {
            left: "0%",
            top: "50%",
            width: "42%",
            ratio: "1 / 1",
          },
        }
      : {
          dorito: {
            left: "0%",
            top: "0%",
            width: "24%",
            ratio: "25 / 35",
          },
          noodle: {
            left: "43%",
            top: "8%",
            width: "58%",
            ratio: "63 / 25",
          },
          fita: {
            left: "15%",
            top: "47%",
            width: "55%",
            ratio: "1 / 1",
          },
        };

  const place = (p: any) => ({
    left: p.left,
    top: p.top,
    width: p.width,
    aspectRatio: p.ratio,
  });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 ${className}`}
      style={{
        width: "clamp(64px, 9vw, 130px)",
        aspectRatio: "1 / 1",
      }}
    >
      <div className="absolute anim-path-2" style={place(spots.dorito)}>
        <div className="relative h-full w-full anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
          <Image
            src="/images/shapes/dorito.png"
            alt=""
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
      </div>

      <div className="absolute anim-path-3" style={place(spots.noodle)}>
        <div className="relative h-full w-full anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
          <Image
            src="/images/shapes/noodle2.png"
            alt=""
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
      </div>

      <div className="absolute anim-path-1" style={place(spots.fita)}>
        <div className="relative h-full w-full anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]">
          <Image
            src="/images/shapes/fita1.png"
            alt=""
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="no-scrollbar relative h-[100svh] w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-[#fafaf8]">
      <style>{`
        @keyframes wiggle1 {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(12deg); }
        }

        @keyframes wiggle2 {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(-15deg); }
        }

        @keyframes wiggle3 {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }

        @keyframes path-square {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(20px, 0); }
          75% { transform: translate(10px, 10px); }
        }

        @keyframes path-triangle {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-15px, -15px); }
          66% { transform: translate(15px, -15px); }
        }

        @keyframes path-diamond {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -12px); }
          50% { transform: translate(20px, 0); }
          75% { transform: translate(10px, 12px); }
        }

        @keyframes sparkle-pulse {
          0%, 100% { opacity: 0.7; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .anim-wiggle-1 { animation: wiggle1 2s ease-in-out infinite; }
        .anim-wiggle-2 { animation: wiggle2 2.3s ease-in-out infinite; }
        .anim-wiggle-3 { animation: wiggle3 2.6s ease-in-out infinite; }
        .anim-path-1 { animation: path-square 4s linear infinite; }
        .anim-path-2 { animation: path-triangle 5s linear infinite; }
        .anim-path-3 { animation: path-diamond 4.5s linear infinite; }
        
        .anim-sparkle { animation: sparkle-pulse 2s ease-in-out infinite; }
      `}</style>

      {/* ===== FIXED BACKGROUND (does not move on scroll) ===== */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#7ab478] to-[#d4eab3]"
      >
        <BottomLines />

        {/* Top left shape cluster */}
        <ShapeCluster
          layout="a"
          className="left-[2%] top-[10%] sm:left-[4%] md:left-[5%] md:top-[18%]"
        />

        {/* Bottom right shape cluster */}
        <ShapeCluster
          layout="b"
          className="right-[2%] bottom-[10%] sm:right-[4%] md:right-[10%] md:bottom-[14%]"
        />

        {/* Sparkle element - top right */}
        <div
          className="pointer-events-none absolute z-20 right-[5%] top-[12%] md:right-[12%] md:top-[15%]"
          style={{ width: "clamp(48px, 8vw, 100px)", aspectRatio: "1/1" }}
        >
          <div className="absolute anim-path-1 w-full h-full">
            <div className="relative w-full h-full anim-wiggle-2 anim-sparkle [filter:drop-shadow(1.5px_0_0_#fff)_drop-shadow(-1.5px_0_0_#fff)_drop-shadow(0_1.5px_0_#fff)_drop-shadow(0_-1.5px_0_#fff)]">
              <Image
                src="/images/sparkle.png"
                alt=""
                fill
                sizes="100px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed top-0 left-0 z-50 w-full">
        <SchoolHeader />
      </div>

      {/* ============ SECTION 1: ABOUT ============ */}
      <section
        id="about"
        className="relative z-10 flex min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden"
      >
        <div className="relative z-10 flex flex-1 items-center px-5 pb-10 pt-24 sm:px-8 sm:pb-12 md:px-10">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-6 sm:gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-10 lg:gap-16">

            {/* Left Column: Image */}
            <div className="relative flex w-full items-center justify-center md:justify-start">
              {/* Increased max size again to 250% on desktop */}
              <div className="relative aspect-square w-full max-w-[300px] drop-shadow-2xl sm:max-w-[400px] md:max-w-none md:w-[250%] md:-ml-[60%] lg:-ml-[70%]">
                <Image
                  src="/images/about.png"
                  alt="Aaliyah DeGuia"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-contain md:scale-100 lg:scale-105"
                />
              </div>
            </div>

            {/* Right Column: Text */}
            <div
              className="flex w-full min-w-0 flex-col items-center text-center md:items-start md:text-left"
              style={{ containerType: "inline-size" }}
            >
              <div className="mb-3 w-full sm:mb-4 md:mb-5">
                <AdventureHeading fontClass={sifonn.className} />
              </div>

              <div
                className={`${plexMonoRegular.className} w-full space-y-3 text-[clamp(0.8rem,1.55vw,1.05rem)] leading-[1.55] text-[#111] sm:space-y-3.5 md:space-y-4`}
              >
                <p>
                  Hi everyone! I&apos;m Aaliyah DeGuia, but you guys can just call me Ali. I&apos;m 19
                  years old, a student Fiarcian Ambassador or FAM in short. I am your official virtual
                  tour guide for the University of Santo Fiarce - Manila Campus.
                </p>

                <p>
                  My goal is simple: I want to make sure you fall in love with this campus just like I
                  did, all the while giving you an inside scoop on what you actually need during your
                  stay here at USF.
                </p>

                <p>
                  If you want me to personally tour you or if you have any specific questions regarding
                  USF&apos;s systems, you can connect with me on Instagram!
                </p>
              </div>

              {/* Instagram Button */}
              <div className="mt-5 flex w-full justify-center sm:mt-6 md:mt-7 md:justify-start">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${plexMonoRegular.className} inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#d62976] bg-gradient-to-r from-[#feda75] via-[#fa7e1e] via-[#d62976] to-[#962fbf] px-6 py-2.5 text-[clamp(0.75rem,1.2vw,0.95rem)] font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 sm:px-8 sm:py-3`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="18"
                      cy="6"
                      r="0.5"
                      fill="currentColor"
                    />
                  </svg>

                  Follow me on Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2: USF HISTORY ============ */}
      <section
        id="usf"
        className="relative z-10 flex min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden"
      >
        <div className="relative z-10 flex flex-1 items-center px-5 pb-10 pt-24 sm:px-8 sm:pb-12 md:px-10">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-6 sm:gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-10 lg:gap-16">

            {/* Left Column: Seal */}
            <div className="relative flex w-full items-center justify-center md:justify-start">
              <div className="relative aspect-square w-full max-w-[200px] drop-shadow-2xl sm:max-w-[280px] md:max-w-full">
                <Image
                  src="/images/main/seal.png"
                  alt="University of Santo Fiarce seal"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain md:scale-105 lg:scale-110"
                />
              </div>
            </div>

            {/* Right Column: Text */}
            <div
              className="flex w-full min-w-0 flex-col items-center text-center md:items-start md:text-left"
              style={{ containerType: "inline-size" }}
            >
              <div className="mb-3 w-full sm:mb-4 md:mb-5">
                <AdventureHeading
                  fontClass={sifonn.className}
                  text="Our History"
                  size="compact"
                />
              </div>

              <div
                className={`${plexMonoRegular.className} w-full space-y-3 text-[clamp(0.78rem,1.45vw,1rem)] leading-[1.55] text-[#111] sm:space-y-3.5 md:space-y-4`}
              >
                <p>
                  The University of Santo Fiarce (USF) was founded with St. Fiarce in mind. St. Fiarce
                  is the patron saint of nature and community, dedicating his life to caring for the
                  natural world and building connections between people and nature at the core of their
                  everyday life. Inspired by his teachings, the university follows the motto &ldquo;Ad
                  Terram Revertum,&rdquo; which means &ldquo;I shall return to the earth.&rdquo; Which
                  is why we instill oneness with nature and environmental consciousness within its
                  students.
                </p>

                <p>
                  Over the years, USF has grown into a vibrant and bustling institution with students
                  across the Philippines applying to get into the college. The institution reflects the
                  values of St. Fiarce through its green initiatives, sustainable campus design, and a
                  strong sense of fellowship among its staff, students, and teachers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}