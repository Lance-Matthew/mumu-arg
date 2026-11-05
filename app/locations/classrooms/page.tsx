"use client";

import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import SchoolHeader from "@/components/SchoolHeader";

// app/locations/classrooms/page.tsx -> app/fonts/Sifonn.otf
// (adjust the "../" count if your page lives somewhere else)
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

const GUIDELINES = [
  "Fusce euismod et neque a interdum.",
  "Aliquam et feugiat nunc.",
  "Vestibulum eu turpis felis.",
  "Fusce euismod et neque a interdum.",
  "Aliquam et feugiat nunc.",
  "Vestibulum eu turpis felis.",
];

// ---------- Headings: black Sifonn letters + light-blue stepped offset ----------
function BlueHeading({
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
    (_, i) => `${((i + 1) * 0.012).toFixed(3)}em ${((i + 1) * 0.012).toFixed(3)}em 0 #b9d8f6`
  ).join(", ");

  return (
    <Tag className={`${fontClass} ${className} leading-[1.05] text-black`} style={{ textShadow: shadow }}>
      {children}
    </Tag>
  );
}

// ---------- Retro gray bevel button (same look as "Begin Tour") ----------
function RetroButton({
  children,
  onClick,
  fontClass,
}: {
  children: React.ReactNode;
  onClick: () => void;
  fontClass: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${fontClass} border-2 border-black bg-[#c9c9c9] px-5 py-1.5 text-[clamp(0.875rem,1.5vw,1rem)] font-normal text-black shadow-[inset_-2px_-2px_0_#6b6b6b,inset_2px_2px_0_#fff] transition-colors hover:bg-[#d6d6d6] active:shadow-[inset_2px_2px_0_#6b6b6b,inset_-2px_-2px_0_#fff]`}
    >
      {children}
    </button>
  );
}

export default function ClassroomsPage() {
  return (
    <main className="no-scrollbar h-[100svh] w-full snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth bg-white">
      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Fixed header */}
      <div className="fixed top-0 left-0 z-50 w-full">
        <SchoolHeader />
      </div>

      {/* ============ SECTION 1 — ABOUT THE CLASSROOMS ============ */}
      <section
        className="relative flex min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #ecefe0 0%, #dfe6c4 35%, #b6d27c 70%, #8cc152 100%)" }}
      >
        <div className="relative z-10 flex flex-1 items-center px-6 pb-24 pt-24 sm:px-10 md:px-20">
          <div className="mx-auto w-full max-w-6xl">
            {/* w-fit: the block is exactly as wide as the title, and the paragraph follows that width */}
            <div className="w-fit max-w-full">
              <p className={`${sifonn.className} text-[clamp(1.25rem,2.1vw,1.6rem)] text-black`}>About the</p>

              <BlueHeading
                as="h1"
                fontClass={sifonn.className}
                className="whitespace-nowrap text-[clamp(2.275rem,6.3vw,5.6rem)] leading-[0.95]"
              >
                Classrooms
              </BlueHeading>

              <p className={`${plexMono.className} mt-5 w-0 min-w-full text-sm leading-snug text-black sm:text-[15px]`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod et neque a interdum.
              </p>
            </div>
          </div>
        </div>

        {/* Continue indicator */}
        <button
          type="button"
          aria-label="Continue to the green initiative"
          onClick={() => document.getElementById("green")?.scrollIntoView({ behavior: "smooth" })}
          className="group absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 border-0 bg-transparent text-[#2f4a12] transition-colors hover:text-black sm:bottom-6"
        >
          <span className="font-mono text-base font-bold tracking-widest sm:text-lg">continue</span>
          <span aria-hidden className="animate-bounce text-2xl leading-none">▼</span>
        </button>
      </section>

      {/* ============ SECTION 2 — OUR GREEN INITIATIVE ============ */}
      <section
        id="green"
        className="relative flex min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #8cc152 0%, #cfe3a8 22%, #f4f9e8 45%, #ffffff 60%, #ffffff 100%)" }}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-16 pt-28 sm:px-10 md:px-16">
          <BlueHeading fontClass={sifonn.className} className="mb-10 text-[clamp(2.5rem,6vw,4.5rem)]">
            Our Green Initiative
          </BlueHeading>

          <div className={`${plexMono.className} max-w-3xl space-y-5 text-[13px] leading-snug text-black md:text-sm`}>
            <p>
              Cras ac massa vulputate, pellentesque erat id, mollis velit. Sed aliquet porta rutrum. Nunc
              pretium, enim quis sodales lacinia, nisi quam placerat ligula, euismod egestas justo massa in
              neque.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod et neque a interdum.
              Aliquam et feugiat nunc. Vestibulum eu turpis felis. In hac habitasse platea dictumst.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3 — BASIC GUIDELINES + TOUR WITH ALI ============ */}
      <section
        id="guidelines"
        className="relative flex min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #ffffff 0%, #f4f9e8 40%, #c3de92 78%, #8cc152 100%)" }}
      >
        {/* Wide container, pushed toward the left edge */}
        <div className="relative z-10 flex w-full flex-1 items-center pb-24 pl-4 pr-6 pt-24 sm:pl-6 sm:pr-10 md:pl-8 md:pr-12">
          <div className="grid w-full max-w-7xl items-start gap-8 md:grid-cols-[1.05fr_1fr] md:gap-10">
            {/* Basic Guidelines card */}
            <div
              className="rounded-3xl px-10 py-10 shadow-[6px_8px_14px_rgba(0,0,0,0.3)] md:px-12 md:py-12"
              style={{ background: YELLOW }}
            >
              <h3
                className={`${plexMono.className} mb-8 text-center text-3xl font-bold text-black [text-shadow:2px_2px_0_rgba(0,0,0,0.25)] md:text-4xl`}
              >
                Basic Guidelines
              </h3>
              <ul className={`${plexMono.className} list-disc space-y-5 pl-6 text-sm leading-snug text-black md:text-base`}>
                {GUIDELINES.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Tour with Ali: frame only */}
            <div>
              <BlueHeading fontClass={sifonn.className} className="mb-5 text-[clamp(2rem,4.5vw,3.25rem)]">
                Tour with Ali
              </BlueHeading>
              <div className="rounded-2xl border-[6px] border-[#1f2329] bg-[#34414d] p-4 shadow-[0_8px_12px_rgba(0,0,0,0.25)]">
                <div className="aspect-video border-[5px] border-[#1f2329] bg-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Continue (retro button, bottom-right) */}
        <div className="absolute bottom-4 right-6 z-20 sm:bottom-6 sm:right-10">
          <RetroButton
            fontClass={plexMono.className}
            onClick={() => document.getElementById("next")?.scrollIntoView({ behavior: "smooth" })}
          >
            Continue
          </RetroButton>
        </div>
      </section>

      {/* Next section goes here — keep id="next" on it */}
    </main>
  );
}
