"use client";

import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
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

export default function StemPage() {
  const [currentLab, setCurrentLab] = useState(0);

  const labs = [
    { src: "/images/stem/labs1.JPG", title: "Engineering" },
    { src: "/images/stem/labs2.JPG", title: "Computer Labs" },
    { src: "/images/stem/labs3.JPG", title: "3D Printing Labs" },
  ];

  const handleNextLab = () => {
    if (currentLab < labs.length - 1) setCurrentLab((prev) => prev + 1);
  };

  const handlePrevLab = () => {
    if (currentLab > 0) setCurrentLab((prev) => prev - 1);
  };

  return (
    <main className="min-h-screen w-full bg-white overflow-x-hidden">
      <ShapeAnimations />
      
      <div className="fixed top-0 left-0 z-50 w-full">
        <SchoolHeader />
      </div>

      {/* ============ SECTION 1 — ABOUT THE S.T.E.M. LABS (HERO) ============ */}
      <section className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pt-16">
        
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/stem/stem1.JPG"
            alt="STEM background"
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
                S.T.E.M. Labs
              </CreamHeading>

              <p className={`${plexMono.className} mt-5 w-0 min-w-full text-[15px] leading-relaxed text-black sm:text-[1.05rem]`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod et neque a interdum.
              </p>
            </div>

            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg drop-shadow-2xl md:translate-x-[25%]">
              <Image
                src="/images/stem/potion.png"
                alt="Potion"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />

              {/* CLUSTER A - Top Left Triangle */}
              <div className="absolute -top-8 -left-8 w-32 h-32 pointer-events-none z-20">
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

              {/* CLUSTER B - Bottom Right */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 pointer-events-none z-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 anim-path-3">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#ffeaa6)_drop-shadow(-1.5px_0_0_#ffeaa6)_drop-shadow(0_1.5px_0_#ffeaa6)_drop-shadow(0_-1.5px_0_#ffeaa6)]">
                    <Image src="/images/shapes/noodle1.png" alt="Noodle shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 anim-path-1">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#ff7f7f)_drop-shadow(-1.5px_0_0_#ff7f7f)_drop-shadow(0_1.5px_0_#ff7f7f)_drop-shadow(0_-1.5px_0_#ff7f7f)]">
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
                  src="/images/stem/stem2.png"
                  alt="STEM History"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <p className={`${plexMono.className} text-sm md:text-base text-black text-center`}>
                S.T.E.M. Labs Renovated (2023)
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

      {/* ============ SECTION 3 — LABORATORIES + TOUR WITH ALI ============ */}
      <section
        id="services"
        className="relative w-full pt-24 pb-12"
        style={{ background: "linear-gradient(to bottom, #ffffff 0%, #fff3f2 45%, #ffd0cd 78%, #ff8f8f 100%)" }}
      >
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-12">
          <div className="grid w-full items-start gap-12 md:grid-cols-[1.15fr_1fr] md:gap-16">
            
            {/* Laboratories Carousel - Matching Theater Size */}
            <div className="space-y-8">
              <div 
                className="rounded-3xl px-8 py-10 shadow-[6px_8px_14px_rgba(0,0,0,0.3)] md:px-12 md:py-12 scale-[0.9] origin-top-left -mb-[8%] md:-mb-[5%]" 
                style={{ background: YELLOW }}
              >
                <h3 className={`${plexMono.className} mb-8 text-center text-3xl font-bold text-black md:text-4xl`}>
                  Laboratories
                </h3>
                
                <div className="relative flex items-center justify-center gap-4 max-w-lg mx-auto">
                  
                  {currentLab > 0 && (
                    <button 
                      onClick={handlePrevLab}
                      className="absolute -left-4 md:-left-8 z-10 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <div className="relative w-full h-full rotate-90">
                        <Image src="/images/downArrow.png" alt="Left" fill sizes="56px" className="object-contain drop-shadow-md" />
                      </div>
                    </button>
                  )}

                  <div className="relative w-full max-w-[360px] aspect-[2/3] rounded-xl overflow-hidden border-4 border-black bg-white flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={labs[currentLab].src}
                        alt={labs[currentLab].title}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover"
                        quality={100}
                      />
                    </div>
                  </div>

                  {currentLab < labs.length - 1 && (
                    <button 
                      onClick={handleNextLab}
                      className="absolute -right-4 md:-right-8 z-10 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <div className="relative w-full h-full -rotate-90">
                        <Image src="/images/downArrow.png" alt="Right" fill sizes="56px" className="object-contain drop-shadow-md" />
                      </div>
                    </button>
                  )}
                </div>

                <p className={`${plexMono.className} mt-8 text-sm md:text-base leading-relaxed text-black text-center max-w-md mx-auto transition-opacity duration-300`}>
                  {labs[currentLab].title}
                </p>
              </div>
            </div>

            {/* Tour with Ali */}
            <div className="flex flex-col mt-4 md:mt-0">
              
              <div className="flex items-center gap-4 mb-5">
                <CreamHeading fontClass={sifonn.className} className="text-[clamp(2rem,4.5vw,3.25rem)]">
                  Tour with Ali
                </CreamHeading>
                <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0">
                  <Image
                    src="/images/stem/stemArrow.png"
                    alt="Arrow"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
              </div>
              
              <div className="aspect-video w-full rounded-2xl border-[6px] border-[#1f2329] bg-[#34414d] p-4 shadow-[0_8px_12px_rgba(0,0,0,0.25)] flex flex-col">
                <div className="flex-1 border-[5px] border-[#1f2329] bg-white" />
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}