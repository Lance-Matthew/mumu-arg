"use client";

import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
    (_, i) => `${((i + 1) * 0.012).toFixed(3)}em ${((i + 1) * 0.012).toFixed(3)}em 0 #ffeaa6`
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

    .anim-wiggle-1 { animation: wiggle1 2s ease-in-out infinite; }
    .anim-wiggle-2 { animation: wiggle2 2.3s ease-in-out infinite; }
    .anim-wiggle-3 { animation: wiggle3 2.6s ease-in-out infinite; }
    .anim-path-1 { animation: path-square 4s linear infinite; }
    .anim-path-2 { animation: path-triangle 5s linear infinite; }
    .anim-path-3 { animation: path-diamond 4.5s linear infinite; }
  `}</style>
);

export default function TheaterPage() {
  const [currentProduction, setCurrentProduction] = useState(0);

  const productions = [
    {
      src: "/images/theater/production1.png",
      title: "Production 1",
      description: "Placeholder 1 text goes here. Fusce euismod et neque a interdum. Aliquam et feugiat nunc."
    },
    {
      src: "/images/theater/production2.png",
      title: "Production 2",
      description: "Placeholder 2 text goes here. Vestibulum eu turpis felis. In hac habitasse platea dictumst."
    },
    {
      src: "/images/theater/production3.png",
      title: "Production 3",
      description: "Placeholder 3 text goes here. Cras ac massa vulputate, pellentesque erat id."
    },
    {
      src: "/images/theater/whitelady.jpg",
      title: "White Lady",
      description: "Placeholder 4 text goes here. Sed aliquet porta rutrum. Nunc pretium, enim quis sodales."
    },
  ];

  const handleNext = () => {
    if (currentProduction < productions.length - 1) {
      setCurrentProduction((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentProduction > 0) {
      setCurrentProduction((prev) => prev - 1);
    }
  };

  return (
    <main className="min-h-screen w-full bg-white overflow-x-hidden">
      <ShapeAnimations />

      <div className="fixed top-0 left-0 z-50 w-full">
        <SchoolHeader />
      </div>

      {/* ============ SECTION 1 — ABOUT THE MARIE THEATER HALL (HERO) ============ */}
      <section className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pt-16">

        <div className="absolute inset-0 z-0">
          <Image
            src="/images/theater/theater1.png"
            alt="Theater background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(244,239,238,0.9) 0%, rgba(253,246,245,0.6) 35%, rgba(255,201,198,0.8) 68%, rgba(255,127,127,0.95) 95%, #ff7f7f 100%)"
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
                Marie Theater Hall
              </CreamHeading>

              <p className={`${plexMono.className} mt-5 w-0 min-w-full text-[15px] leading-relaxed text-black sm:text-[1.05rem]`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod et neque a interdum.
              </p>
            </div>

            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg drop-shadow-2xl md:translate-x-[25%]">
              <Image
                src="/images/theater/popcorn.png"
                alt="Popcorn"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />

              {/* CLUSTER A - Moved down 5% and left 5% */}
              <div className="absolute top-[5%] right-[5%] w-32 h-32 pointer-events-none z-20">
                <div className="absolute top-0 left-0 anim-path-2">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#ff7f7f)_drop-shadow(-1.5px_0_0_#ff7f7f)_drop-shadow(0_1.5px_0_#ff7f7f)_drop-shadow(0_-1.5px_0_#ff7f7f)]">
                    <Image src="/images/shapes/noodle2.png" alt="Noodle shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 anim-path-3">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#ffeaa6)_drop-shadow(-1.5px_0_0_#ffeaa6)_drop-shadow(0_1.5px_0_#ffeaa6)_drop-shadow(0_-1.5px_0_#ffeaa6)]">
                    <Image src="/images/shapes/fita1.png" alt="Fita shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 anim-path-1">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#ff7f7f)_drop-shadow(-1.5px_0_0_#ff7f7f)_drop-shadow(0_1.5px_0_#ff7f7f)_drop-shadow(0_-1.5px_0_#ff7f7f)]">
                    <Image src="/images/shapes/dorito.png" alt="Dorito shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
              </div>

              {/* CLUSTER B - Moved up 3% and right 3% */}
              <div className="absolute bottom-[3%] left-[3%] w-32 h-32 pointer-events-none z-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 anim-path-3">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#ff7f7f)_drop-shadow(-1.5px_0_0_#ff7f7f)_drop-shadow(0_1.5px_0_#ff7f7f)_drop-shadow(0_-1.5px_0_#ff7f7f)]">
                    <Image src="/images/shapes/noodle1.png" alt="Noodle shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 anim-path-1">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#ffeaa6)_drop-shadow(-1.5px_0_0_#ffeaa6)_drop-shadow(0_1.5px_0_#ffeaa6)_drop-shadow(0_-1.5px_0_#ffeaa6)]">
                    <Image src="/images/shapes/fita2.png" alt="Fita shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 anim-path-2">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#ff7f7f)_drop-shadow(-1.5px_0_0_#ff7f7f)_drop-shadow(0_1.5px_0_#ff7f7f)_drop-shadow(0_-1.5px_0_#ff7f7f)]">
                    <Image src="/images/shapes/dorito.png" alt="Dorito shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ SECTION 2 — A FIARCEAN HISTORY ============ */}
      <section
        id="history"
        className="relative w-full py-24"
        style={{ background: "linear-gradient(to bottom, #ff7f7f 0%, #ffc9c6 18%, #fff3f2 45%, #ffffff 60%, #ffffff 100%)" }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col px-6 sm:px-10 md:px-16">

          <CreamHeading fontClass={sifonn.className} className="mb-12 text-[clamp(2.5rem,6vw,4.5rem)]">
            A Fiarcean History
          </CreamHeading>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 items-start">

            <div className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg border-4 border-[#fff3f2]">
                <Image
                  src="/images/theater/theater2.png"
                  alt="Theater History"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <p className={`${plexMono.className} text-sm md:text-base text-black text-center`}>
                Marie Theater Hall Renovated (2019)
              </p>
            </div>

            <div className={`${plexMono.className} space-y-5 text-[15px] leading-relaxed text-black md:text-[1.05rem]`}>
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

        </div>
      </section>

      {/* ============ SECTION 3 — PAST PRODUCTIONS ============ */}
      <section
        id="services"
        className="relative w-full py-24"
        style={{ background: "linear-gradient(to bottom, #ffffff 0%, #fff3f2 45%, #ffd0cd 78%, #ff8f8f 100%)" }}
      >
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 sm:px-10 md:px-12">

          <div
            className="relative overflow-hidden rounded-[2rem] border-[5px] border-black px-8 py-12 shadow-[10px_12px_0_rgba(0,0,0,0.25)] md:px-14 md:py-14"
            style={{ background: YELLOW }}
          >
            {/* Decorative corner dots */}
            <div className="absolute top-4 left-4 flex gap-1.5">
              <span className="block h-2.5 w-2.5 rounded-full border-2 border-black" style={{ background: "#ff7f7f" }} />
              <span className="block h-2.5 w-2.5 rounded-full border-2 border-black" style={{ background: "#ffeaa6" }} />
              <span className="block h-2.5 w-2.5 rounded-full border-2 border-black" style={{ background: "#a6c978" }} />
            </div>
            <div className="absolute top-4 right-4 flex gap-1.5">
              <span className="block h-2.5 w-2.5 rounded-full border-2 border-black" style={{ background: "#a6c978" }} />
              <span className="block h-2.5 w-2.5 rounded-full border-2 border-black" style={{ background: "#ffeaa6" }} />
              <span className="block h-2.5 w-2.5 rounded-full border-2 border-black" style={{ background: "#ff7f7f" }} />
            </div>

            <h3 className={`${plexMono.className} mb-10 text-center text-3xl font-bold text-black md:text-4xl`}>
              Past Productions
            </h3>

            <div className="relative flex items-center justify-center gap-4 max-w-lg mx-auto">

              {currentProduction > 0 && (
                <button
                  onClick={handlePrev}
                  className="absolute -left-4 md:-left-10 z-10 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-black bg-[#c9c9c9] shadow-[3px_4px_0_rgba(0,0,0,0.4)] transition-transform hover:scale-110 active:shadow-[1px_2px_0_rgba(0,0,0,0.4)] md:h-14 md:w-14"
                >
                  <div className="relative w-2/3 h-2/3 rotate-90">
                    <Image src="/images/downArrow.png" alt="Left" fill sizes="56px" className="object-contain" />
                  </div>
                </button>
              )}

              {/* Slide track — pure horizontal sliding, no fade */}
              <div className="relative w-full max-w-[360px] aspect-[2/3] rounded-xl overflow-hidden border-4 border-black bg-white shadow-[6px_8px_0_rgba(0,0,0,0.35)]">
                <div
                  className="flex h-full w-full transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentProduction * 100}%)` }}
                >
                  {productions.map((production, index) => (
                    <div key={index} className="relative h-full w-full shrink-0">
                      <Image
                        src={production.src}
                        alt={production.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover"
                        quality={100}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {currentProduction < productions.length - 1 && (
                <button
                  onClick={handleNext}
                  className="absolute -right-4 md:-right-10 z-10 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-black bg-[#c9c9c9] shadow-[3px_4px_0_rgba(0,0,0,0.4)] transition-transform hover:scale-110 active:shadow-[1px_2px_0_rgba(0,0,0,0.4)] md:h-14 md:w-14"
                >
                  <div className="relative w-2/3 h-2/3 -rotate-90">
                    <Image src="/images/downArrow.png" alt="Right" fill sizes="56px" className="object-contain" />
                  </div>
                </button>
              )}
            </div>

            {/* Dot indicators */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {productions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProduction(index)}
                  aria-label={`Go to production ${index + 1}`}
                  className={`h-3 w-3 rounded-full border-2 border-black transition-all duration-200 ${
                    index === currentProduction ? "scale-125 bg-black" : "bg-white/70 hover:bg-white"
                  }`}
                />
              ))}
            </div>

            <p className={`${plexMono.className} mt-6 text-center text-sm leading-relaxed text-black max-w-md mx-auto transition-opacity duration-300`}>
              {productions[currentProduction].description}
            </p>
          </div>

        </div>
      </section>

      {/* ============ SECTION 4 — TOUR WITH ALI (BOTTOM) ============ */}
      <section
        className="relative w-full py-24"
        style={{ background: "linear-gradient(to bottom, #ff8f8f 0%, #ff8f8f 100%)" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-12">

          {/* Heading row — aligned to frame edges, sits right above the frame */}
          <div className="mx-auto w-full max-w-5xl">
            <div className="mb-2 flex items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <CreamHeading fontClass={sifonn.className} className="text-[clamp(2rem,4.5vw,3.75rem)]">
                  Tour with Ali
                </CreamHeading>
                <div className="relative w-14 h-14 md:w-20 md:h-20 shrink-0">
                  <Image
                    src="/images/theater/theaterArrow.png"
                    alt="Arrow"
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Back to Campus Map button — top right, aligned with heading bottom edge */}
              <Link
                href="/map"
                className={`${plexMono.className} mb-2 shrink-0 border-[3px] border-black bg-[#c9c9c9] px-6 py-1.5 text-[clamp(0.875rem,1.5vw,1rem)] font-normal text-black shadow-[inset_-2px_-2px_0_#6b6b6b,inset_2px_2px_0_#fff] transition-colors hover:bg-[#d6d6d6] active:shadow-[inset_2px_2px_0_#6b6b6b,inset_-2px_-2px_0_#fff]`}
              >
                Back to Campus Map
              </Link>
            </div>
          </div>

          <VideoFrame src="/videos/D.mp4" />

        </div>
      </section>

    </main>
  );
}