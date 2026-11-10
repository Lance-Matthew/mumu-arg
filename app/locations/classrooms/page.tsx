"use client";

import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import SchoolHeader from "@/components/SchoolHeader";
import VideoFrame from "@/components/VideoFrame";

const sifonn = localFont({
  src: "../../fonts/Sifonn.otf",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const YELLOW = "#ffe793";

const TOUR_VIDEO_SRC =
  "https://customer-eie2vf4vq58r59xg.cloudflarestream.com/ea8b51812b1af47eedf1db3a6aab0a8e/manifest/video.m3u8";

function CreamHeading({
  children,
  fontClass,
  as: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  fontClass: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  const STEPS = 6;
  const shadow = Array.from(
    { length: STEPS },
    (_, i) => `${((i + 1) * 0.012).toFixed(3)}em ${((i + 1) * 0.012).toFixed(3)}em 0 #dceaba`
  ).join(", ");

  return (
    <Tag className={`${fontClass} ${className} leading-[1.05] text-black`} style={{ textShadow: shadow }}>
      {children}
    </Tag>
  );
}

const ShapeAnimations = () => (
  <style>{`
    @keyframes wiggle1 { 0%, 100% { transform: rotate(-12deg); } 50% { transform: rotate(12deg); } }
    @keyframes wiggle2 { 0%, 100% { transform: rotate(10deg); } 50% { transform: rotate(-15deg); } }
    @keyframes wiggle3 { 0%, 100% { transform: rotate(-15deg); } 50% { transform: rotate(15deg); } }
    @keyframes path-square { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(10px, -10px); } 50% { transform: translate(20px, 0); } 75% { transform: translate(10px, 10px); } }
    @keyframes path-triangle { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(-15px, -15px); } 66% { transform: translate(15px, -15px); } }
    @keyframes path-diamond { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(10px, -12px); } 50% { transform: translate(20px, 0); } 75% { transform: translate(10px, 12px); } }

    @keyframes bounce2beat {
      0%   { transform: translateY(0); }
      3%   { transform: translateY(-8px); }
      6%   { transform: translateY(0); }
      11%  { transform: translateY(-8px); }
      14%  { transform: translateY(0); }
      100% { transform: translateY(0); }
    }

    .anim-wiggle-1 { animation: wiggle1 2s ease-in-out infinite; }
    .anim-wiggle-2 { animation: wiggle2 2.3s ease-in-out infinite; }
    .anim-wiggle-3 { animation: wiggle3 2.6s ease-in-out infinite; }
    .anim-path-1 { animation: path-square 4s linear infinite; }
    .anim-path-2 { animation: path-triangle 5s linear infinite; }
    .anim-path-3 { animation: path-diamond 4.5s linear infinite; }
    .anim-pulse-5 { animation: bounce2beat 5s ease-in-out infinite; will-change: transform; }

    /* Clue letters — white text, cream underline (chalk color) */
    .clue {
      color: inherit;
      font-weight: inherit;
      text-decoration: underline;
      text-decoration-color: #ffeaa6;
      text-decoration-thickness: 2px;
      text-underline-offset: 3px;
    }

    .board-lines {
      background-image: repeating-linear-gradient(
        to bottom,
        transparent 0,
        transparent 31px,
        rgba(255,255,255,0.14) 31px,
        rgba(255,255,255,0.14) 32px
      );
    }
  `}</style>
);

// Clues distributed across titles + bodies. Letters (top→bottom): A, I, T, A, N, K, Y = the 7 of TIYANAK.
const GUIDELINES: {
  label: string;
  labelParts?: (string | { clue: string; tail: string })[];
  parts: (string | { clue: string; tail: string })[];
}[] = [
  {
    label: "CLAY-GO",
    labelParts: ["CL", { clue: "A", tail: "Y-GO" }],
    parts: [
      "Always pack up your trash, wipe down your desk if you made a mess, and return items to their proper places before leaving the classroom.",
    ],
  },
  {
    label: "Sit-in Policies",
    parts: [
      "Students should ensure that the professor of the class you are sitting in is ",
      { clue: "I", tail: "nformed" },
      " and approves, and that there are more than enough seats to seat late students (just in-case).",
    ],
  },
  {
    label: "Energy conservation",
    parts: [
      "Turn off ",
      { clue: "T", tail: "he" },
      " lights, fans, and air conditioners when vacating ",
      { clue: "A", tail: "n" },
      " empty room.",
    ],
  },
  {
    label: "Waste sorting",
    labelParts: ["Waste sorti", { clue: "N", tail: "g" }],
    parts: [
      "Trash has to be sorted into different categories for easier disposal.",
    ],
  },
  {
    label: "Classroom courtesY",
    labelParts: ["Classroom courtes", { clue: "Y", tail: "" }],
    parts: [
      "Keep food and beverages away from the equipment, keep noise levels low in the corridors along the lecture halls, and ",
      { clue: "K", tail: "eep" },
      " all spaces ready for the next class.",
    ],
  },
];

function renderParts(parts: (string | { clue: string; tail: string })[]) {
  return parts.map((p, i) =>
    typeof p === "string" ? (
      <span key={i}>{p}</span>
    ) : (
      <span key={i}>
        <span className="clue">{p.clue}</span>
        {p.tail}
      </span>
    )
  );
}

export default function ClassroomsPage() {
  return (
    <main className="min-h-screen w-full bg-white overflow-x-hidden">
      <ShapeAnimations />

      <div className="fixed top-0 left-0 z-50 w-full">
        <SchoolHeader />
      </div>

      {/* ============ SECTION 1 — HERO ============ */}
      <section className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/classrooms/classrooms1.JPG"
            alt="Classrooms background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(238,242,214,0.9) 0%, rgba(211,227,166,0.6) 35%, rgba(190,216,145,0.8) 68%, rgba(140,193,82,0.95) 95%, #8cc152 100%)",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-1 items-center px-6 sm:px-10 md:px-20">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div className="w-fit max-w-full">
              <p className={`${sifonn.className} text-[clamp(1.25rem,2.1vw,1.6rem)] text-black`}>About the</p>

              <CreamHeading
                as="h1"
                fontClass={sifonn.className}
                className="whitespace-nowrap text-[clamp(2.275rem,6.3vw,5.6rem)] leading-[0.95]"
              >
                Classrooms
              </CreamHeading>

              <div className={`${plexMono.className} mt-5 w-0 min-w-full text-sm leading-relaxed text-black md:text-base`}>
                <p>
                  In each classroom, there is a chalkboard and enough seats to house at least 30 students. Each
                  classroom includes a Smart TV or projector with easy computer linking and access.
                </p>
              </div>
            </div>

            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg drop-shadow-2xl md:-translate-x-[10%]">
              <Image
                src="/images/classrooms/seat.png"
                alt="Seat"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />

              <div className="absolute -top-8 -right-8 w-32 h-32 pointer-events-none z-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 anim-path-3">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#8cc152)_drop-shadow(-1.5px_0_0_#8cc152)_drop-shadow(0_1.5px_0_#8cc152)_drop-shadow(0_-1.5px_0_#8cc152)]">
                    <Image src="/images/shapes/noodle1.png" alt="Noodle shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 anim-path-1">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#ffeaa6)_drop-shadow(-1.5px_0_0_#ffeaa6)_drop-shadow(0_1.5px_0_#ffeaa6)_drop-shadow(0_-1.5px_0_#ffeaa6)]">
                    <Image src="/images/shapes/fita2.png" alt="Fita shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 anim-path-2">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#8cc152)_drop-shadow(-1.5px_0_0_#8cc152)_drop-shadow(0_1.5px_0_#8cc152)_drop-shadow(0_-1.5px_0_#8cc152)]">
                    <Image src="/images/shapes/dorito.png" alt="Dorito shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 w-32 h-32 pointer-events-none z-20">
                <div className="absolute top-0 left-0 anim-path-2">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#ffeaa6)_drop-shadow(-1.5px_0_0_#ffeaa6)_drop-shadow(0_1.5px_0_#ffeaa6)_drop-shadow(0_-1.5px_0_#ffeaa6)]">
                    <Image src="/images/shapes/noodle2.png" alt="Noodle shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 anim-path-3">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#8cc152)_drop-shadow(-1.5px_0_0_#8cc152)_drop-shadow(0_1.5px_0_#8cc152)_drop-shadow(0_-1.5px_0_#8cc152)]">
                    <Image src="/images/shapes/fita1.png" alt="Fita shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 anim-path-1">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#8cc152)_drop-shadow(-1.5px_0_0_#8cc152)_drop-shadow(0_1.5px_0_#8cc152)_drop-shadow(0_-1.5px_0_#8cc152)]">
                    <Image src="/images/shapes/dorito.png" alt="Dorito shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2 — GREEN INITIATIVE ============ */}
      <section
        className="relative w-full py-24"
        style={{ background: "linear-gradient(to bottom, #8cc152 0%, #cfe3a8 18%, #f1f7e4 45%, #ffffff 60%, #ffffff 100%)" }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col px-6 sm:px-10 md:px-16">
          <CreamHeading fontClass={sifonn.className} className="mb-12 text-[clamp(2.5rem,6vw,4.5rem)]">
            Green Initiative
          </CreamHeading>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 items-start">
            <div className="flex flex-col gap-4">
              <div className="relative w-full drop-shadow-lg">
                <Image
                  src="/images/classrooms/bonsai.png"
                  alt="Bonsai"
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>

            <div className={`${plexMono.className} space-y-5 text-sm leading-relaxed text-black md:text-base`}>
              <p>
                The University of Santo Fiarce is dedicated to building a sustainable campus community by
                actively involving students, teachers, and staff alike to make the university grounds a greener
                campus. As part of the university's environmental push, the administration has been pushing
                different go-green methods like CLAY-GO (Clean as you go), PET bottle collection, and campus
                composting.
              </p>
              <p>
                To take our sustainability even further, USF encourages the creation of eco-bricks by filling
                plastic bottles with clean, non-biodegradable waste to construct eco-friendly building
                materials. Combined with our campus-wide composting program, these green initiatives allow
                students to actively participate in keeping our university clean and sustainable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3 — BASIC GUIDELINES (BLACKBOARD) ============ */}
      <section
        id="services"
        className="relative w-full pt-16 pb-14"
        style={{ background: "linear-gradient(to bottom, #ffffff 0%, #f1f7e4 45%, #cfe3a8 78%, #a6cf6e 100%)" }}
      >
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-12">
          <div
            className="relative rounded-[1.25rem] p-2.5 pb-6 shadow-[10px_12px_0_rgba(0,0,0,0.25)] md:p-3.5 md:pb-8"
            style={{
              background: "linear-gradient(180deg, #7a4a21 0%, #4a2b12 100%)",
              border: "6px solid #2b1608",
            }}
          >
            <div
              className="board-lines relative overflow-hidden rounded-[0.5rem] px-6 py-8 md:px-10 md:py-10"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, #2f4d3a 0%, #263f2f 100%)",
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.55)",
              }}
            >
              <h3 className={`${plexMono.className} mb-3 text-center text-2xl font-bold text-white md:text-3xl`}>
                Basic Guidelines
              </h3>

              <div className="mx-auto mb-5 h-[2px] w-24 bg-white/40" />

              <ul className="space-y-3 md:space-y-4">
                {GUIDELINES.map((g) => (
                  <li key={g.label} className="text-white/95">
                    <p className={`${plexMono.className} text-sm font-bold md:text-base`}>
                      {g.labelParts ? renderParts(g.labelParts) : g.label}
                    </p>
                    <p className={`${plexMono.className} mt-0.5 text-sm leading-relaxed md:text-base`}>
                      {renderParts(g.parts)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chalk + eraser on the ledge */}
            <div className="absolute bottom-[-14px] left-8 flex items-end gap-3 md:bottom-[-16px] md:left-12">
              <div
                className="h-2.5 w-16 rounded-[3px] md:h-3 md:w-20"
                style={{
                  background: "linear-gradient(90deg, #f4f4f4 0%, #d9d9d9 60%, #bdbdbd 100%)",
                  boxShadow:
                    "0 1px 2px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.2)",
                  transform: "rotate(-3deg)",
                }}
              />
              <div
                className="h-2 w-6 rounded-[2px]"
                style={{
                  background: "linear-gradient(90deg, #ffeaa6 0%, #e8cf7f 100%)",
                  boxShadow:
                    "0 1px 2px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.2)",
                  transform: "rotate(2deg)",
                }}
              />
            </div>

            <div className="absolute bottom-[-10px] right-8 md:bottom-[-12px] md:right-12">
              <div className="relative" style={{ transform: "rotate(2deg)" }}>
                <div
                  className="h-4 w-16 rounded-[3px] md:h-5 md:w-20"
                  style={{
                    background: "linear-gradient(180deg, #c89463 0%, #8a5a34 100%)",
                    boxShadow:
                      "0 2px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.3)",
                  }}
                />
                <div
                  className="h-1.5 w-16 rounded-b-[3px] md:h-2 md:w-20"
                  style={{
                    background: "linear-gradient(180deg, #4a4a4a 0%, #1f1f1f 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 4 — TOUR WITH ALI ============ */}
      <section
        className="relative w-full pt-24 pb-12"
        style={{ background: "linear-gradient(to bottom, #a6cf6e 0%, #8cc152 100%)" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-12">
          <div className="mx-auto w-full max-w-5xl">
            <div className="mb-2 flex items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <CreamHeading fontClass={sifonn.className} className="text-[clamp(2rem,4.5vw,3.75rem)]">
                  Tour with Ali
                </CreamHeading>
                <div className="relative w-14 h-14 md:w-20 md:h-20 shrink-0">
                  <Image
                    src="/images/library/libraryArrow.png"
                    alt="Arrow"
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <VideoFrame src={TOUR_VIDEO_SRC} />

          <div className="mt-8 flex w-full justify-center">
            <Link
              href="/map"
              className={`${plexMono.className} anim-pulse-5 inline-flex items-center justify-center border-[3px] border-black bg-[#c9c9c9] px-6 py-1.5 text-[clamp(0.875rem,1.5vw,1rem)] font-normal text-black shadow-[inset_-2px_-2px_0_#6b6b6b,inset_2px_2px_0_#fff] hover:bg-[#d6d6d6] active:shadow-[inset_2px_2px_0_#6b6b6b,inset_-2px_-2px_0_#fff]`}
            >
              Back to Campus Map
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}