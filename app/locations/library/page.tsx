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
  "https://customer-eie2vf4vq58r59xg.cloudflarestream.com/53cbfe80acd5d3d957a11eccd00152b1/manifest/video.m3u8";

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

export default function LibraryPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <ShapeAnimations />

      <div className="fixed top-0 left-0 z-50 w-full">
        <SchoolHeader />
      </div>

      {/* ============ SECTION 1 — ABOUT THE FIARCE LIBRARY ============ */}
      <section className="relative flex min-h-[100svh] w-full flex-col justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/library/library1.JPG"
            alt="Library background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-[1.5]"
          />
        </div>

        <div
          className="absolute inset-0 z-0"
          style={{ background: "linear-gradient(to bottom, rgba(238,242,214,0.9) 0%, rgba(211,227,166,0.7) 45%, rgba(140,193,82,0.9) 90%, #8cc152 100%)" }}
        />

        <div className="relative z-10 flex flex-1 items-center px-6 sm:px-10 md:px-20">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">

            <div className="w-fit max-w-full">
              <p className={`${sifonn.className} text-[clamp(1.25rem,2.1vw,1.6rem)] text-black`}>
                About the
              </p>

              <BlueHeading
                as="h1"
                fontClass={sifonn.className}
                className="whitespace-nowrap text-[clamp(2.275rem,6.3vw,5.6rem)] leading-[0.95]"
              >
                Fiarce Library
              </BlueHeading>

              <div className={`${plexMono.className} mt-5 w-0 min-w-full text-sm leading-relaxed text-black md:text-base`}>
                <p>
                  Welcome to the Fiarce Library. This library has been operational since the 1970s, amassing a
                  variety of books, ranging from topics about thermodynamics to the human psyche. Decades of
                  literature have been poured into the library having over 2 million books available to be
                  borrowed by students at any time. The library boasts of having over 1,500 square meters, with
                  different sections containing various topics one might need.
                </p>
              </div>
            </div>

            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg drop-shadow-2xl">
              <Image
                src="/images/library/laptop.png"
                alt="Laptop"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />

              {/* CLUSTER A */}
              <div className="absolute -top-8 -left-8 w-32 h-32 pointer-events-none z-20">
                <div className="absolute top-0 left-0 anim-path-2">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]">
                    <Image src="/images/shapes/noodle2.png" alt="Noodle shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 anim-path-3">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
                    <Image src="/images/shapes/fita1.png" alt="Fita shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 anim-path-1">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
                    <Image src="/images/shapes/dorito.png" alt="Dorito shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
              </div>

              {/* CLUSTER B */}
              <div className="absolute top-1/2 -right-16 -translate-y-1/2 w-32 h-32 pointer-events-none z-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 anim-path-3">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
                    <Image src="/images/shapes/noodle1.png" alt="Noodle shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 anim-path-1">
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

      {/* ============ SECTION 2 — A FIARCEAN HISTORY ============ */}
      <section
        className="relative w-full py-24"
        style={{ background: "linear-gradient(to bottom, #8cc152 0%, #cfe3a8 22%, #ffffff 55%, #ffffff 100%)" }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col px-6 sm:px-10 md:px-16">

          <BlueHeading fontClass={sifonn.className} className="mb-12 text-[clamp(2.5rem,6vw,4.5rem)]">
            A Fiarcean History
          </BlueHeading>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 items-start">

            <div className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg border-4 border-[#f1f7e4]">
                <Image
                  src="/images/library/library2.png"
                  alt="Fiarce Library 2nd Floor"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <p className={`${plexMono.className} text-sm md:text-base text-black text-center`}>
                Fiarce Library 2nd Floor (1982)
              </p>
            </div>

            <div className={`${plexMono.className} space-y-5 text-sm leading-relaxed text-black md:text-base`}>
              <p>
                Standing tall for more than half a century, the Fiarce Library has survived numerous trials by
                fire, enduring through both natural disasters and historic man-made conflicts. Established in
                the 1970s, the library overcame catastrophic early events, including a mass burning of books
                during its founding decade.
              </p>
              <p>
                Despite numerous setbacks, the library was rebuilt and modernized with resilience, preserving
                its core mission to serve USF's future bright stars with academic knowledge. Over the succeeding
                decades, dedicated acquisitions transformed the library into a bustling space where communities
                of people can gather.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ============ SECTION 3 — BORROWING & BOOKING ============ */}
      <section
        className="relative w-full py-24"
        style={{ background: "linear-gradient(to bottom, #ffffff 0%, #f1f7e4 40%, #c3de92 78%, #8cc152 100%)" }}
      >
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-10 md:px-12">
          <div className="grid w-full items-stretch gap-8 md:grid-cols-2 md:gap-10">

            {/* Borrowing Card — sticky note */}
            <div
              className="relative flex flex-col rounded-[4px] px-8 pb-10 pt-12 shadow-[6px_8px_14px_rgba(0,0,0,0.3),inset_0_2px_0_rgba(255,255,255,0.6)] md:px-10 md:pb-12"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 18%), " + YELLOW,
                transform: "rotate(-1.2deg)",
              }}
            >
              {/* Push pin */}
              <div className="absolute -top-3 left-5 z-10">
                <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-[#ff5b5b] to-[#b22222] shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                  <div className="absolute left-1 top-1 h-2 w-2 rounded-full bg-white/70" />
                </div>
              </div>

              <div className="mb-6 flex items-center justify-center gap-4">
                <h3 className={`${plexMono.className} text-3xl font-bold tracking-tight text-black md:text-4xl`}>
                  Borrowing
                </h3>
                <div className="relative h-12 w-12 shrink-0 drop-shadow-md md:h-16 md:w-16">
                  <Image src="/images/library/book.png" alt="Book" fill sizes="(max-width: 768px) 48px, 64px" className="object-contain" />
                </div>
              </div>

              <p className={`${plexMono.className} flex-1 text-sm leading-relaxed text-black md:text-base`}>
                How to borrow books in the Fiarce Library: Borrow onsite only. Follow a simple process by first
                picking out a book, then scanning the book's barcode into our self-check-out machines to
                register it to your name or ID number.
              </p>
            </div>

            {/* Booking Card — sticky note */}
            <div
              className="relative flex flex-col rounded-[4px] px-8 pb-10 pt-12 shadow-[6px_8px_14px_rgba(0,0,0,0.3),inset_0_2px_0_rgba(255,255,255,0.6)] md:px-10 md:pb-12"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 18%), " + YELLOW,
                transform: "rotate(1.2deg)",
              }}
            >
              {/* Push pin */}
              <div className="absolute -top-3 left-5 z-10">
                <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-[#5b8cff] to-[#2233b2] shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                  <div className="absolute left-1 top-1 h-2 w-2 rounded-full bg-white/70" />
                </div>
              </div>

              <div className="mb-6 flex items-center justify-center">
                <h3 className={`${plexMono.className} text-3xl font-bold tracking-tight text-black md:text-4xl`}>
                  Booking
                </h3>
              </div>

              <div className={`${plexMono.className} flex-1 text-sm leading-relaxed text-black md:text-base`}>
                <p>
                  To book a study room in the Fiarce Library, one must log in to the library's website to see
                  all the study rooms available. Fill out all information fields and await your email
                  confirmation. Present this to the front desk on the first floor to acquire the keys to your
                  study room.
                </p>
                <p className="mt-4 font-bold">
                  For Other Inquiries: libr<span className="font-bold text-[#ffe793] selection:text-black">aswang</span>ry@usf.edu.ph
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ SECTION 4 — TOUR WITH ALI (BOTTOM, LARGE) ============ */}
      <section
        className="relative w-full pt-24 pb-12"
        style={{ background: "linear-gradient(to bottom, #8cc152 0%, #8cc152 100%)" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-12">

          {/* Heading row — aligned to frame edges, sits right above the frame */}
          <div className="mx-auto w-full max-w-5xl">
            <div className="mb-2 flex items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <BlueHeading fontClass={sifonn.className} className="text-[clamp(2rem,4.5vw,3.75rem)]">
                  Tour with Ali
                </BlueHeading>
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