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

// Cloudflare Stream HLS manifest for the "Tour with Ali" video
const TOUR_VIDEO_SRC =
  "https://customer-eie2vf4vq58r59xg.cloudflarestream.com/df6ebfe80d979f49b7a7ab2328dc5c70/manifest/video.m3u8";

function GreenHeading({
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
    (_, i) => `${((i + 1) * 0.012).toFixed(3)}em ${((i + 1) * 0.012).toFixed(3)}em 0 #a6c978`
  ).join(", ");

  return (
    <Tag className={`${fontClass} ${className} leading-[1.05] text-black`} style={{ textShadow: shadow }}>
      {children}
    </Tag>
  );
}

const PIN_COLORS = [
  "from-[#ff5b5b] to-[#b22222]", // red
  "from-[#5b8cff] to-[#2233b2]", // blue
  "from-[#ffd75b] to-[#b28a22]", // yellow/gold
  "from-[#7bde7b] to-[#2f8f2f]", // green
  "from-[#c77bff] to-[#6a2fb2]", // purple
];

function CourseCard({
  title,
  children,
  tilt = "-1.2deg",
  pinColor = PIN_COLORS[0],
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  tilt?: string;
  pinColor?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-[4px] px-6 pb-7 pt-10 shadow-[6px_8px_14px_rgba(0,0,0,0.3),inset_0_2px_0_rgba(255,255,255,0.6)] md:px-7 md:pb-8 ${className}`}
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 18%), " + YELLOW,
        transform: `rotate(${tilt})`,
      }}
    >
      {/* Push pin */}
      <div className="absolute -top-3 left-5 z-10">
        <div
          className={`relative h-6 w-6 rounded-full bg-gradient-to-br shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${pinColor}`}
        >
          <div className="absolute left-1 top-1 h-2 w-2 rounded-full bg-white/70" />
        </div>
      </div>

      <h3 className={`${plexMono.className} mb-3 text-center text-3xl font-bold tracking-tight text-black md:text-4xl`}>
        {title}
      </h3>

      <p className={`${plexMono.className} flex-1 text-sm leading-relaxed text-black md:text-base`}>
        {children}
      </p>
    </div>
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

    /* Two upward hops per 5s cycle, then a pause.
       Uses translateY only (no scale) so the button stays pixel-crisp. */
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
  `}</style>
);

export default function SportsCenterPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <ShapeAnimations />

      <div className="fixed top-0 left-0 z-50 w-full">
        <SchoolHeader />
      </div>

      {/* ============ SECTION 1 — ABOUT THE GLORIA GYM HALL (HERO) ============ */}
      <section className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pt-16">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gym/gym1.JPG"
            alt="Gym background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(233,236,234,0.9) 0%, rgba(221,232,244,0.6) 30%, rgba(185,212,250,0.8) 65%, rgba(105,166,255,0.95) 95%, #69a6ff 100%)"
            }}
          />
        </div>

        <div className="relative z-10 flex flex-1 items-center px-6 sm:px-10 md:px-20">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 items-center gap-12">

            {/* Text Content */}
            <div className="w-fit max-w-full">
              <p className={`${sifonn.className} text-[clamp(1.25rem,2.1vw,1.6rem)] text-black`}>About the</p>

              <GreenHeading
                as="h1"
                fontClass={sifonn.className}
                className="whitespace-nowrap text-[clamp(2.275rem,6.3vw,5.6rem)] leading-[0.95]"
              >
                Gloria Gym Hall
              </GreenHeading>

              <div className={`${plexMono.className} mt-5 w-0 min-w-full text-sm leading-relaxed text-black md:text-base`}>
                <p>
                  Welcome to the Gloria Gym Hall. This gymnasium has been recently renovated to suit the modern
                  Fiarcian athletes with new machines, track, and courts to efficiently train their bodies to
                  be in top form. The Gloria Gym Hall is named after Maria Gloria A. Santiago, the most
                  remarkable athlete of her generation; she has won several medals representing USF.
                </p>
              </div>
            </div>

            {/* Shoes Image with Clusters */}
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg drop-shadow-2xl md:translate-x-[15%]">
              <Image
                src="/images/gym/shoes.png"
                alt="Shoes"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />

              {/* CLUSTER A - Top */}
              <div className="absolute top-[6%] right-[6%] w-24 h-24 md:w-32 md:h-32 pointer-events-none z-20">
                <div className="absolute top-0 left-0 anim-path-2">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
                    <Image src="/images/shapes/dorito.png" alt="Dorito shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute top-[30%] left-[30%] anim-path-3">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]">
                    <Image src="/images/shapes/fita1.png" alt="Fita shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 anim-path-1">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
                    <Image src="/images/shapes/noodle2.png" alt="Noodle shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
              </div>

              {/* CLUSTER B - Bottom */}
              <div className="absolute bottom-[3%] left-[3%] w-24 h-24 md:w-32 md:h-32 pointer-events-none z-20">
                <div className="absolute top-0 left-0 anim-path-3">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
                    <Image src="/images/shapes/noodle1.png" alt="Noodle shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute top-[30%] left-[30%] anim-path-1">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]">
                    <Image src="/images/shapes/fita2.png" alt="Fita shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 anim-path-2">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
                    <Image src="/images/shapes/dorito.png" alt="Dorito shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ SECTION 2 — COURSE OFFERINGS ============ */}
      <section
        id="courses"
        className="relative w-full pt-20 pb-16"
        style={{
          background: "linear-gradient(to bottom, #69a6ff 0%, #69a6ff 10%, #b9d4fa 25%, #eef4fd 45%, #ffffff 65%, #ffffff 100%)"
        }}
      >
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10 md:px-12">

          <GreenHeading fontClass={sifonn.className} className="mb-8 text-[clamp(2.5rem,6vw,4rem)]">
            Course Offerings
          </GreenHeading>

          {/* Course sticky notes — 3 on top, 2 centered beneath (md+).
              Using a 6-col grid so the bottom pair sits in the gaps of the top row. */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-6 md:gap-6">
            <CourseCard title="PEDNC" tilt="-1.2deg" pinColor={PIN_COLORS[0]} className="md:col-span-2">
              <b>D</b>ance - Students will learn the basics of dance to improve their coordination and master
              the foundational rhythm, choreography, and movement.
            </CourseCard>
            <CourseCard title="PEMMA" tilt="1.2deg" pinColor={PIN_COLORS[1]} className="md:col-span-2">
              Mixed Martial Arts - Students will lear<b>N</b> mixed martial arts for practical defense techniques,
              striking the fundament<b>A</b>ls, and t<b>A</b>ctical discipline in a safe setting.
            </CourseCard>
            <CourseCard title="PEPKL" tilt="-1.2deg" pinColor={PIN_COLORS[2]} className="md:col-span-2">
              Pickleball - Students wil<b>L</b> be training in a low-impact racket sport, designed to improve
              reflexes, ha<b>N</b>d-eye coordination, and strategy.
            </CourseCard>
            <CourseCard
              title="PETRK"
              tilt="1.2deg"
              pinColor={PIN_COLORS[3]}
              className="md:col-span-2 md:col-start-2"
            >
              Tr<b>A</b>ck and field - Students will train their explosive power, endurance, and sta<b>M</b>ina
              with track and field.
            </CourseCard>
            <CourseCard
              title="PEWTL"
              tilt="-1.2deg"
              pinColor={PIN_COLORS[4]}
              className="md:col-span-2 md:col-start-4"
            >
              Wei<b>G</b>htlifting - Students will focus on proper lifting mechanics, progressive overload, and
              foundation<b>A</b>l strength conditioning.
            </CourseCard>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3 — TOUR WITH ALI (BOTTOM) ============ */}
      <section
        className="relative w-full pt-24 pb-12"
        style={{ background: "linear-gradient(to bottom, #ffffff 0%, #ffffff 100%)" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-12">

          {/* Heading row — aligned to frame edges, sits right above the frame */}
          <div className="mx-auto w-full max-w-5xl">
            <div className="mb-2 flex items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <GreenHeading fontClass={sifonn.className} className="text-[clamp(2rem,4.5vw,3.75rem)]">
                  Tour with Ali
                </GreenHeading>
                <div className="relative w-14 h-14 md:w-20 md:h-20 shrink-0">
                  <Image
                    src="/images/gym/gymArrow.png"
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

          {/* Back to Campus Map button — centered below the video frame, 2-beat bounce every 5s */}
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