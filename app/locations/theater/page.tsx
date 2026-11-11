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

// Updated with the new Cloudflare Stream Video URL
const TOUR_VIDEO_SRC =
  "https://customer-eie2vf4vq58r59xg.cloudflarestream.com/297cccade9c1986cef353bcd6beee3a4/manifest/video.m3u8";

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

    /* Noisy / ghosted text effect for the cursed title */
    .noisy-title {
      position: relative;
      font-weight: 700;
      z-index: 1;
    }

    .noisy-title::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: rgba(0, 0, 0, 0.25); /* Base faint color */
      transform: translate(2px, -2px);
      z-index: -1;
      pointer-events: none;
      text-shadow: 
        0px 0px 1px rgba(0, 0, 0, 0.4), /* Static noise */
        2px -2px 0 rgba(0, 0, 0, 0.2),
        5px -5px 0 rgba(0, 0, 0, 0.15),
        9px -9px 0 rgba(0, 0, 0, 0.1),
        14px -14px 0 rgba(0, 0, 0, 0.05),
        -2px -2px 0 rgba(255, 127, 127, 0.2); /* Tiny hint of red/blue glitch */
    }
  `}</style>
);

export default function TheaterPage() {
  const [currentProduction, setCurrentProduction] = useState(0);

  const productions: {
    src: string;
    title: string;
    blurb?: string;
    cursed?: boolean;
  }[] = [
    {
      src: "/images/theater/production1.png",
      title: "There's That Smile (2011)",
      blurb: "A heartwarming musical story about a teenager's self-discovery and the joy of making music.",
    },
    {
      src: "/images/theater/production2.png",
      title: "Tapatan (2016)",
      blurb:
        "A dramatic and action-packed stage play that has themes of rivalry, camaraderie, and deep-seated trust between two friends who were enemies at first.",
    },
    {
      src: "/images/theater/production3.png",
      title: "Digital Star (2020)",
      blurb:
        "A musical over Zoom examining the highs and lows of internet fame that takes place within the era of social media.",
    },
    {
      src: "/images/theater/whiteLady.png",
      title: "White Lady",
      cursed: true,
    },
  ];

  const WHITE_LADY_INDEX = productions.findIndex((p) => p.cursed);

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

  const active = productions[currentProduction];

  const skipSlideTransition =
    currentProduction === WHITE_LADY_INDEX;

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

              <div className={`${plexMono.className} mt-5 w-0 min-w-full text-sm leading-relaxed text-black md:text-base`}>
                <p>
                  Welcome to the Marie Theater Hall, named after the 1970s icon, Miss Marie, who is an alumna
                  of USF. The theater hall was named after her to pay tribute to all her success in the
                  industry. Marie Theater Hall is well equipped with multiple mini theaters and rehearsal
                  rooms.
                </p>
              </div>
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

            <div className={`${plexMono.className} space-y-5 text-sm leading-relaxed text-black md:text-base`}>
              <p>
                The Marie Theater Hall was recently renovated from only being a modest single-stage auditorium,
                built to house early campus assemblies and student productions, to become one of the best
                performing arts facilities in the country.
              </p>
              <p>
                Recognizing the expanding needs and interest of students for the arts and theater, the
                university collaborated with the Engineering Department to renovate the building's surround
                sound.
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
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 sm:px-10 md:px-12">

          <div
            className="relative overflow-hidden rounded-[2rem] border-[5px] border-black px-6 py-10 shadow-[10px_12px_0_rgba(0,0,0,0.25)] sm:px-10 sm:py-12 md:px-12 md:py-14"
            style={{ background: YELLOW }}
          >
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

            <h3 className={`${plexMono.className} mb-8 text-center text-3xl font-bold text-black md:mb-10 md:text-4xl`}>
              Past Productions
            </h3>

            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:gap-10">

              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-[320px]">
                  {currentProduction > 0 && (
                    <button
                      onClick={handlePrev}
                      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-black bg-[#c9c9c9] shadow-[3px_4px_0_rgba(0,0,0,0.4)] transition-transform hover:scale-110 active:shadow-[1px_2px_0_rgba(0,0,0,0.4)] md:-left-6 md:h-12 md:w-12"
                    >
                      <div className="relative w-2/3 h-2/3 rotate-90">
                        <Image src="/images/main/downArrow.png" alt="Left" fill sizes="48px" className="object-contain" />
                      </div>
                    </button>
                  )}

                  <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden border-4 border-black bg-white shadow-[6px_8px_0_rgba(0,0,0,0.35)]">
                    <div
                      className={`flex h-full w-full ${
                        skipSlideTransition ? "" : "transition-transform duration-500 ease-in-out"
                      }`}
                      style={{ transform: `translateX(-${currentProduction * 100}%)` }}
                    >
                      {productions.map((production, index) => (
                        <div key={index} className="relative h-full w-full shrink-0">
                          <Image
                            src={production.src}
                            alt={production.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 320px"
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
                      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-black bg-[#c9c9c9] shadow-[3px_4px_0_rgba(0,0,0,0.4)] transition-transform hover:scale-110 active:shadow-[1px_2px_0_rgba(0,0,0,0.4)] md:-right-6 md:h-12 md:w-12"
                    >
                      <div className="relative w-2/3 h-2/3 -rotate-90">
                        <Image src="/images/main/downArrow.png" alt="Right" fill sizes="48px" className="object-contain" />
                      </div>
                    </button>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-center gap-2">
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
              </div>

              <div className="flex flex-col justify-center text-center md:text-left relative">
                <div className="relative inline-block mx-auto md:mx-0">
                  <p
                    data-text={active.title}
                    className={`${plexMono.className} text-black text-xl md:text-2xl relative z-10 ${
                      active.cursed ? "noisy-title" : ""
                    }`}
                  >
                    {active.title}
                  </p>
                </div>

                {active.blurb && (
                  <p className={`${plexMono.className} mt-4 text-sm leading-relaxed text-black md:text-base`}>
                    {active.blurb}
                  </p>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============ SECTION 4 — TOUR WITH ALI ============ */}
      <section
        className="relative w-full pt-24 pb-12"
        style={{ background: "linear-gradient(to bottom, #ff8f8f 0%, #ff8f8f 100%)" }}
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
                    src="/images/theater/theaterArrow.png"
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