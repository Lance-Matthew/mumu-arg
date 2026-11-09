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

function BottomLines({
  id = "bottomLines",
  stops = ["#f6f6fb", "#c9c8d3", "#9d9ca5"],
  className = "h-[34%] w-[92%] md:h-[38%] md:w-[66%]",
}: {
  id?: string;
  stops?: [string, string, string] | string[];
  className?: string;
}) {
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
      className={`pointer-events-none absolute bottom-0 left-0 z-0 ${className}`}
    >
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2={W}
          y2="0"
        >
          <stop offset="0" stopColor={stops[0]} />
          <stop offset="0.5" stopColor={stops[1]} />
          <stop offset="1" stopColor={stops[2]} />
        </linearGradient>
      </defs>

      {lines.map(([x1, y1, x2, y2], i) => {
        const w = 3 + (i / (lines.length - 1)) * 5;

        return (
          <polygon
            key={i}
            points={`${x1},${y1 - w / 2} ${x2},${y2} ${x1},${y1 + w / 2}`}
            fill={`url(#${id})`}
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
  className = "",
  center = false,
}: {
  fontClass: string;
  text?: string;
  size?: "default" | "compact";
  className?: string;
  center?: boolean;
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
      className={`${fontClass} grid grid-cols-1 leading-[1.05] ${
        center ? "justify-items-center text-center" : ""
      } ${className}`}
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

const outlineFilter = (c: string) =>
  `drop-shadow(1.5px 0 0 ${c}) drop-shadow(-1.5px 0 0 ${c}) drop-shadow(0 1.5px 0 ${c}) drop-shadow(0 -1.5px 0 ${c})`;

function ShapeCluster({
  className,
  layout,
  noodleSrc = "/images/shapes/noodle1.png",
  fitaSrc = "/images/shapes/fita1.png",
  outlines,
}: {
  className: string;
  layout: "a" | "b";
  noodleSrc?: string;
  fitaSrc?: string;
  outlines?: { dorito?: string; noodle?: string; fita?: string };
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
        <div
          className="relative h-full w-full anim-wiggle-1"
          style={{ filter: outlineFilter(outlines?.dorito ?? "#7ab478") }}
        >
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
        <div
          className="relative h-full w-full anim-wiggle-2"
          style={{ filter: outlineFilter(outlines?.noodle ?? "#7ab478") }}
        >
          <Image
            src={noodleSrc}
            alt=""
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
      </div>

      <div className="absolute anim-path-1" style={place(spots.fita)}>
        <div
          className="relative h-full w-full anim-wiggle-3"
          style={{ filter: outlineFilter(outlines?.fita ?? "#fff0a3") }}
        >
          <Image
            src={fitaSrc}
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

// ---------- Credits data ----------
const CREDITS_PRODUCTION = [
  { role: "Produced by", names: ["Team MUMU"] },
  { role: "Writer / Director", names: ['Anna Denise "Andie" Abad Santos'] },
  { role: "Assistant Director", names: ["John Clarence Abcede"] },
  { role: "Production Coordinator", names: ["John Clarence Abcede"] },
  {
    role: "Camera Operator",
    names: [
      "Seth Deandre Oranga",
      'Anna Denise "Andie" Abad Santos',
      "Samantha Maurice Sanz",
      "John Clarence Abcede",
    ],
  },
  {
    role: "Audio Technician",
    names: ["John Clarence Abcede", "Seth Deandre Oranga"],
  },
  {
    role: "Gaffer",
    names: ["John Clarence Abcede", "Seth Deandre Oranga"],
  },
  { role: "Props Design", names: ['Anna Denise "Andie" Abad Santos'] },
  {
    role: "Prop Artist",
    names: [
      'Anna Denise "Andie" Abad Santos',
      "John Clarence Abcede",
      "Seth Deandre Oranga",
      "Samantha Maurice Sanz",
    ],
  },
  {
    role: "Make-up",
    names: ['Anna Denise "Andie" Abad Santos', "Samantha Maurice Sanz"],
  },
  {
    role: "Best Boy",
    names: ["Harvey Lanzo Chua", "Jericho Vince Dela Guerra", "Eros Arroyo"],
  },
  { role: "Elevator Operator", names: ["Rodel Prangan"] },
  { role: "Video Editor", names: ["John Clarence Abcede"] },
];

const CREDITS_CAST = [
  { role: 'Aaliyah "Ali" DeGuia', names: ["Samantha Maurice Sanz"] },
  { role: "Kuya Guard", names: ["John Clarence Abcede"] },
  { role: "Manananggal", names: ['Anna Denise "Andie" Abad Santos'] },
  { role: "White Lady", names: ['Anna Denise "Andie" Abad Santos'] },
  {
    role: "Voice of Children Singing",
    names: ['Anna Denise "Andie" Abad Santos'],
  },
  {
    role: "Voice of Aaliyah's Mother",
    names: ["Petrina Beatrice Beltran"],
  },
  { role: "Multo", names: ["Harvey Lanzo Chua"] },
  { role: "Voice of Tiyanak", names: ['Anna Denise "Andie" Abad Santos'] },
  { role: "Voice of Aswang", names: ['Anna Denise "Andie" Abad Santos'] },
];

const CREDITS_WEBSITE = [
  {
    role: "Website Developer",
    names: ['Lance Matthew "Levanic" Manaois <3'],
  },
  {
    role: "Website UI/UX Designer",
    names: ['Anna Denise "Andie" Abad Santos'],
  },
  { role: "Website Copywriter", names: ["Seth Deandre Oranga"] },
  { role: "Website Project Manager", names: ["John Clarence Abcede"] },
];

const CREDITS_MUSIC = [
  "Paru-Parong Bukid Tagalog Rendition originally composed by Felipe de León",
  "Backing Cover by Cristian Daniel Desucatan",
  "Universal Commercial Tunes_ Vol. 1 by Steven Andolf",
  "Powerup! 8-bit Music by Jeremy Blake",
];

const CREDITS_THANKS = [
  "Enrique and Lilia Abad Santos",
  "Jenny and Waldo Abad Santos",
  "Harvey Lanzo Chua",
  "Angelie San Diego",
  "Kuya Roland, Ms. Alma, and Ms. Pat of De La Salle University Security",
  "Karen Cecille Natividad of DLSU Libraries",
  "Sir Raymond of De La Salle University Strategic Communications",
  "Dr. Consuelo Angela Santos",
  "Dr. Bruno Lovric",
  "Dr. Rupert Cao",
  "Fr. Alejandro Mijangos",
  "Jessica",
];

function CreditGroup({
  title,
  items,
  fontClass,
  bodyClass,
}: {
  title: string;
  items: { role: string; names: string[] }[];
  fontClass: string;
  bodyClass: string;
}) {
  return (
    <div className="min-w-0">
      <h3
        className={`${fontClass} mb-4 flex items-center gap-2 text-[clamp(1rem,2.4cqw,1.35rem)] leading-tight text-[#2f58a0]`}
      >
        <span className="inline-block h-2 w-2 rotate-45 bg-[#7ab478]" />
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.role + item.names.join(",")}>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#4b6b3a] sm:text-[0.75rem]">
              {item.role}
            </p>
            <p
              className={`${bodyClass} mt-0.5 text-[clamp(0.82rem,1.5vw,1rem)] leading-[1.5] text-[#111]`}
            >
              {item.names.join(" · ")}
            </p>
          </li>
        ))}
      </ul>
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

        @media (prefers-reduced-motion: reduce) {
          .anim-wiggle-1, .anim-wiggle-2, .anim-wiggle-3,
          .anim-path-1, .anim-path-2, .anim-path-3,
          .anim-sparkle { animation: none; }
        }
      `}</style>

      {/* ===== FIXED BACKGROUND (gradient + gray lines only) ===== */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, #9bc86a 0%, #d7eaba 45%, #ffffff 90%)",
        }}
      >
        <BottomLines
          id="aboutLines"
          stops={["#ececf5", "#c2c2c8", "#8d8d92"]}
          className="h-[30%] w-[100%] md:h-[40%] md:w-[64%]"
        />
      </div>

      <div className="fixed top-0 left-0 z-50 w-full">
        <SchoolHeader />
      </div>

      {/* ============ SECTION 1: ABOUT ============ */}
      <section
        id="about"
        className="relative z-10 flex min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden pt-24 md:flex-row md:items-center md:pb-10"
      >
        {/* Floating decorations — scoped to Section 1 only */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5]">
          {/* Big pixel sparkle */}
          <div
            className="absolute left-[2%] top-[10%] md:top-[12%]"
            style={{ width: "clamp(120px, 24vw, 320px)", aspectRatio: "1 / 1" }}
          >
            <div className="relative h-full w-full anim-sparkle">
              <Image
                src="/images/sparkle.png"
                alt=""
                fill
                sizes="320px"
                className="object-contain [image-rendering:pixelated]"
              />
            </div>
          </div>

          {/* Bottom-left cluster */}
          <ShapeCluster
            layout="a"
            noodleSrc="/images/shapes/noodle1.png"
            outlines={{ dorito: "#ffd93b", noodle: "#7ab478", fita: "#ffd93b" }}
            className="bottom-[3%] left-[2%] md:bottom-[6%]"
          />

          {/* Second cluster (desktop only) */}
          <ShapeCluster
            layout="b"
            noodleSrc="/images/shapes/noodle1.png"
            fitaSrc="/images/shapes/fita1.png"
            outlines={{ dorito: "#7ab478", noodle: "#7ab478", fita: "#ffd93b" }}
            className="hidden md:block md:bottom-[14%] md:left-[40%]"
          />
        </div>

        {/* Aaliyah — nudged left + down, with background-matched bottom fade */}
        <div
          className="pointer-events-none absolute -bottom-[4%] left-[44%] z-10 aspect-square -translate-x-1/2 md:left-[30vw] md:-translate-x-1/2"
          style={{
            width: "min(299vw, 162.5svh)",
            maxWidth: "min(1690px, 188.5svh)",
          }}
        >
          <Image
            src="/images/about.png"
            alt="Aaliyah DeGuia"
            fill
            priority
            sizes="(max-width: 768px) 299vw, 162svh"
            className="object-contain object-bottom [filter:drop-shadow(16px_10px_16px_rgba(0,0,0,0.35))]"
          />

          {/* Bottom fade — matches page background so her feet blend in */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
            style={{
              height: "18%",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 55%, #ffffff 100%)",
            }}
          />
        </div>

        {/* Text */}
        <div
          className="relative z-20 flex w-full min-w-0 flex-col items-center px-5 pb-[56vw] pt-6 text-center sm:px-8 md:ml-[50%] md:w-[44%] md:px-6 md:pb-0 md:pt-0"
          style={{ containerType: "inline-size" }}
        >
          <div className="mb-3 w-full sm:mb-4 md:mb-5">
            <AdventureHeading fontClass={sifonn.className} />
          </div>

          <div
            className={`${plexMonoRegular.className} w-full space-y-3 text-justify text-[clamp(0.8rem,1.55vw,1.15rem)] leading-[1.55] text-[#111] sm:space-y-3.5 md:space-y-4`}
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

          <div className="mt-5 flex w-full justify-center sm:mt-6 md:mt-7">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${plexMonoRegular.className} inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#feda75] via-[#fa7e1e] via-[#d62976] to-[#962fbf] px-6 py-2.5 text-[clamp(0.75rem,1.2vw,0.95rem)] font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 sm:px-8 sm:py-3`}
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
                <circle cx="18" cy="6" r="0.5" fill="currentColor" />
              </svg>

              Follow me on Instagram
            </a>
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

            {/* Left Column: framed campus photo */}
            <div className="relative flex w-full items-center justify-center md:justify-start">
              <div className="relative aspect-square w-full max-w-[220px] sm:max-w-[300px] md:max-w-full">
                {/* Offset shadow block behind the frame */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm bg-[#2f58a0] md:translate-x-4 md:translate-y-4"
                />
                {/* Frame + image */}
                <div className="relative h-full w-full -rotate-2 overflow-hidden rounded-sm border-[6px] border-black bg-black shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:rotate-0">
                  <div className="relative aspect-square w-full">
                    <Image
                      src="/images/aboutCampus.JPG"
                      alt="University of Santo Fiarce campus"
                      fill
                      sizes="(max-width: 768px) 90vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  {/* Corner accents */}
                  <span className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-[#ffd93b]" />
                  <span className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-[#ffd93b]" />
                  <span className="pointer-events-none absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 border-[#ffd93b]" />
                  <span className="pointer-events-none absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-[#ffd93b]" />
                </div>
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

      {/* ============ SECTION 3: DAANAN CREDITS ============ */}
      <section
        id="credits"
        className="relative z-10 flex min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden"
      >
        <div className="relative z-10 flex flex-1 items-start px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 md:px-10">
          <div className="mx-auto w-full max-w-5xl">
            {/* Title card */}
            <div className="flex w-full flex-col items-center text-center">
              <p
                className={`${plexMono.className} mb-2 text-[clamp(0.62rem,1.2vw,0.8rem)] tracking-[0.35em] text-[#4b6b3a]`}
              >
                A SHORT FILM BY TEAM MUMU
              </p>
              <div className="flex w-full justify-center">
                <AdventureHeading
                  fontClass={sifonn.className}
                  text="DAANAN"
                  size="default"
                  center
                />
              </div>
              <div
                aria-hidden="true"
                className="mt-4 mb-10 h-[3px] w-20 rounded-full bg-[#7ab478] sm:mb-12 sm:w-28"
              />
            </div>

            {/* Credits grid */}
            <div className="grid w-full grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
              <CreditGroup
                title="Production"
                items={CREDITS_PRODUCTION}
                fontClass={sifonn.className}
                bodyClass={plexMonoRegular.className}
              />
              <CreditGroup
                title="Cast"
                items={CREDITS_CAST}
                fontClass={sifonn.className}
                bodyClass={plexMonoRegular.className}
              />
              <CreditGroup
                title="Website"
                items={CREDITS_WEBSITE}
                fontClass={sifonn.className}
                bodyClass={plexMonoRegular.className}
              />

              {/* Music */}
              <div className="min-w-0">
                <h3
                  className={`${sifonn.className} mb-4 flex items-center gap-2 text-[clamp(1rem,2.4cqw,1.35rem)] leading-tight text-[#2f58a0]`}
                >
                  <span className="inline-block h-2 w-2 rotate-45 bg-[#7ab478]" />
                  Music
                </h3>
                <ul
                  className={`${plexMonoRegular.className} space-y-2.5 text-[clamp(0.82rem,1.5vw,1rem)] leading-[1.5] text-[#111]`}
                >
                  {CREDITS_MUSIC.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span aria-hidden="true" className="text-[#7ab478]">
                        ♪
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Thesis Mentor */}
              <div className="min-w-0">
                <h3
                  className={`${sifonn.className} mb-4 flex items-center gap-2 text-[clamp(1rem,2.4cqw,1.35rem)] leading-tight text-[#2f58a0]`}
                >
                  <span className="inline-block h-2 w-2 rotate-45 bg-[#7ab478]" />
                  Thesis Mentor
                </h3>
                <p
                  className={`${plexMonoRegular.className} text-[clamp(0.82rem,1.5vw,1rem)] leading-[1.5] text-[#111]`}
                >
                  Edward Delos Santos Cabagnot
                </p>
              </div>

              {/* Special thanks — spans wider on lg */}
              <div className="min-w-0 sm:col-span-2 lg:col-span-1">
                <h3
                  className={`${sifonn.className} mb-4 flex items-center gap-2 text-[clamp(1rem,2.4cqw,1.35rem)] leading-tight text-[#2f58a0]`}
                >
                  <span className="inline-block h-2 w-2 rotate-45 bg-[#7ab478]" />
                  Special Thanks
                </h3>
                <ul
                  className={`${plexMonoRegular.className} columns-1 gap-x-6 space-y-2 text-[clamp(0.82rem,1.5vw,1rem)] leading-[1.5] text-[#111] sm:columns-2`}
                >
                  {CREDITS_THANKS.map((name) => (
                    <li key={name} className="break-inside-avoid">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer mark */}
            <div className="mt-16 flex flex-col items-center gap-3 sm:mt-20">
              <p
                className={`${plexMono.className} text-[clamp(0.62rem,1.1vw,0.75rem)] tracking-[0.3em] text-[#7a8a72]`}
              >
                TEAM MUMU · 2025
              </p>
              <p
                className={`${plexMonoRegular.className} text-center text-[clamp(0.62rem,1.1vw,0.75rem)] text-[#7a8a72]`}
              >
                Thank you for touring USF with Ali.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}