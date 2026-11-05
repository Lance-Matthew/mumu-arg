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

function CourseCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl px-6 py-6 shadow-[6px_8px_12px_rgba(0,0,0,0.25)] flex flex-col justify-center ${className}`}
      style={{ background: YELLOW }}
    >
      <h3 className={`${plexMono.className} mb-3 text-2xl font-bold text-black`}>PECRD</h3>
      <p className={`${plexMono.className} pl-3 text-sm leading-snug text-black`}>
        Fusce euismod et neque a interdum. Aliquam et feugiat nunc.
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

    .anim-wiggle-1 { animation: wiggle1 2s ease-in-out infinite; }
    .anim-wiggle-2 { animation: wiggle2 2.3s ease-in-out infinite; }
    .anim-wiggle-3 { animation: wiggle3 2.6s ease-in-out infinite; }
    .anim-path-1 { animation: path-square 4s linear infinite; }
    .anim-path-2 { animation: path-triangle 5s linear infinite; }
    .anim-path-3 { animation: path-diamond 4.5s linear infinite; }
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
            src="/images/gym/gym1.jpg"
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

              <p className={`${plexMono.className} mt-5 w-0 min-w-full text-sm leading-snug text-black sm:text-[15px]`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod et neque a interdum.
              </p>
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
                  <div className="relative h-8 w-8 md:h-10 md:w-10 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
                    <Image src="/images/shapes/dorito.png" alt="Dorito shape" fill sizes="40px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute top-[30%] left-[30%] anim-path-3">
                  <div className="relative h-10 w-10 md:h-[3.25rem] md:w-[3.25rem] anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]">
                    <Image src="/images/shapes/fita1.png" alt="Fita shape" fill sizes="52px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 anim-path-1">
                  <div className="relative h-8 w-8 md:h-10 md:w-10 anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
                    <Image src="/images/shapes/noodle2.png" alt="Noodle shape" fill sizes="40px" className="object-contain" />
                  </div>
                </div>
              </div>

              {/* CLUSTER B - Bottom */}
              <div className="absolute bottom-[3%] left-[3%] w-24 h-24 md:w-32 md:h-32 pointer-events-none z-20">
                <div className="absolute top-0 left-0 anim-path-3">
                  <div className="relative h-8 w-8 md:h-10 md:w-10 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
                    <Image src="/images/shapes/noodle1.png" alt="Noodle shape" fill sizes="40px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute top-[30%] left-[30%] anim-path-1">
                  <div className="relative h-10 w-10 md:h-[3.25rem] md:w-[3.25rem] anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#fff0a3)_drop-shadow(-1.5px_0_0_#fff0a3)_drop-shadow(0_1.5px_0_#fff0a3)_drop-shadow(0_-1.5px_0_#fff0a3)]">
                    <Image src="/images/shapes/fita2.png" alt="Fita shape" fill sizes="52px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 anim-path-2">
                  <div className="relative h-8 w-8 md:h-10 md:w-10 anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#7ab478)_drop-shadow(-1.5px_0_0_#7ab478)_drop-shadow(0_1.5px_0_#7ab478)_drop-shadow(0_-1.5px_0_#7ab478)]">
                    <Image src="/images/shapes/dorito.png" alt="Dorito shape" fill sizes="40px" className="object-contain" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ SECTION 2 — COURSE OFFERINGS + TOUR WITH ALI ============ */}
      <section
        id="courses"
        className="relative w-full py-24"
        style={{ 
          background: "linear-gradient(to bottom, #69a6ff 0%, #69a6ff 10%, #b9d4fa 25%, #eef4fd 45%, #ffffff 65%, #ffffff 100%)" 
        }}
      >
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10 md:px-12">
          
          <GreenHeading fontClass={sifonn.className} className="mb-8 text-[clamp(2.5rem,6vw,4rem)] md:mb-6">
            Course Offerings
          </GreenHeading>

          <div className="grid gap-x-10 gap-y-6 md:grid-cols-3 md:px-8">
            <CourseCard />
            <CourseCard />
            <CourseCard />

            <CourseCard className="md:col-start-1 md:row-start-2" />

            <div className="md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-2 flex flex-col mt-4 md:mt-0">
              
              <div className="flex items-center gap-4 mb-4">
                <GreenHeading fontClass={sifonn.className} className="text-[clamp(2rem,4.5vw,3rem)]">
                  Tour with Ali
                </GreenHeading>
                <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0">
                  <Image
                    src="/images/gym/gymArrow.png"
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

            <CourseCard className="md:col-start-1 md:row-start-3" />
          </div>
        </div>
      </section>

    </main>
  );
}