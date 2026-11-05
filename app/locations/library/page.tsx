"use client";

import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";
import SchoolHeader from "@/components/SchoolHeader";

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

    .anim-wiggle-1 { animation: wiggle1 2s ease-in-out infinite; }
    .anim-wiggle-2 { animation: wiggle2 2.3s ease-in-out infinite; }
    .anim-wiggle-3 { animation: wiggle3 2.6s ease-in-out infinite; }
    .anim-path-1 { animation: path-square 4s linear infinite; }
    .anim-path-2 { animation: path-triangle 5s linear infinite; }
    .anim-path-3 { animation: path-diamond 4.5s linear infinite; }
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

              <p className={`${plexMono.className} mt-5 w-0 min-w-full text-sm leading-snug text-black sm:text-[15px]`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod et neque a interdum.
              </p>
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

      {/* ============ SECTION 3 — BORROWING, BOOKING, TOUR WITH ALI ============ */}
      <section
        className="relative w-full py-24"
        style={{ background: "linear-gradient(to bottom, #ffffff 0%, #f1f7e4 40%, #c3de92 78%, #8cc152 100%)" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-12">
          <div className="grid w-full items-start gap-12 md:grid-cols-[1.15fr_1fr] md:gap-16">
            
            <div className="space-y-8">
              
              {/* Borrowing Card - Title, then Row (Image Left, Text Right) */}
              <div className="rounded-3xl px-8 py-10 shadow-[6px_8px_14px_rgba(0,0,0,0.3)] md:px-12 md:py-12" style={{ background: YELLOW }}>
                <h3 className={`${plexMono.className} mb-6 text-center text-3xl font-bold text-black md:text-4xl`}>Borrowing</h3>
                <div className="flex flex-row items-center justify-center gap-6 md:gap-8">
                  <div className="relative w-24 h-24 md:w-36 md:h-36 shrink-0 drop-shadow-md">
                    <Image src="/images/library/book.png" alt="Book" fill sizes="(max-width: 768px) 96px, 144px" className="object-contain" />
                  </div>
                  <p className={`${plexMono.className} text-sm leading-relaxed text-black md:text-lg`}>
                    Fusce euismod et neque a interdum. Aliquam et feugiat nunc. Vestibulum eu turpis felis.
                  </p>
                </div>
              </div>

              {/* Booking Card - Title, then Row (Text Left, Image Right) */}
              <div className="rounded-3xl px-8 py-10 shadow-[6px_8px_14px_rgba(0,0,0,0.3)] md:px-12 md:py-12" style={{ background: YELLOW }}>
                <h3 className={`${plexMono.className} mb-6 text-center text-3xl font-bold text-black md:text-4xl`}>Booking</h3>
                <div className="flex flex-row items-center justify-center gap-6 md:gap-8">
                  <p className={`${plexMono.className} text-sm leading-relaxed text-black md:text-lg`}>
                    Sed aliquet porta rutrum. Nunc pretium, enim quis sodales lacinia, nisi quam placerat ligula.
                  </p>
                  <div className="relative w-24 h-24 md:w-36 md:h-36 shrink-0 drop-shadow-md">
                    <Image src="/images/library/qr.png" alt="QR Code" fill sizes="(max-width: 768px) 96px, 144px" className="object-contain" />
                  </div>
                </div>
              </div>

            </div>

            <div>
              <div className="flex items-center gap-4 mb-5">
                <BlueHeading fontClass={sifonn.className} className="text-[clamp(2rem,4.5vw,3.25rem)]">
                  Tour with Ali
                </BlueHeading>
                <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0">
                  <Image
                    src="/images/library/libraryArrow.png"
                    alt="Arrow"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="rounded-2xl border-[6px] border-[#1f2329] bg-[#34414d] p-4 shadow-[0_8px_12px_rgba(0,0,0,0.25)]">
                <div className="aspect-video border-[5px] border-[#1f2329] bg-white" />
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}