"use client";

import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
  "https://customer-eie2vf4vq58r59xg.cloudflarestream.com/6dbcd3fd0ce7739dc3ad6ffb7033b728/manifest/video.m3u8";

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

    @keyframes toast-in {
      0%   { transform: translateX(120%); opacity: 0; }
      12%  { transform: translateX(0);    opacity: 1; }
      88%  { transform: translateX(0);    opacity: 1; }
      100% { transform: translateX(120%); opacity: 0; }
    }

    .anim-wiggle-1 { animation: wiggle1 2s ease-in-out infinite; }
    .anim-wiggle-2 { animation: wiggle2 2.3s ease-in-out infinite; }
    .anim-wiggle-3 { animation: wiggle3 2.6s ease-in-out infinite; }
    .anim-path-1 { animation: path-square 4s linear infinite; }
    .anim-path-2 { animation: path-triangle 5s linear infinite; }
    .anim-path-3 { animation: path-diamond 4.5s linear infinite; }
    .anim-pulse-5 { animation: bounce2beat 5s ease-in-out infinite; will-change: transform; }
    .anim-toast   { animation: toast-in 2.8s ease-in-out forwards; }

    /* First letter of each specialization — normal size, black, thick black outline */
    .spec-first {
      color: #000;
      -webkit-text-stroke: 2px #000;
      paint-order: stroke fill;
      font-weight: 700;
      text-shadow: 1px 1px 0 rgba(0,0,0,0.15);
    }
  `}</style>
);

// Order: top row is M / L / O, bottom row is U / T
const SPECIALIZATIONS = [
  {
    label: "Marine Biology",
    text: "The Marine Biology lab provides students with advanced aquatic testing instruments, specimen preservation facilities, and bio-monitoring tools.",
    tilt: "-1.2deg",
    pin: "from-[#c46a1e] to-[#8a4510]",
  },
  {
    label: "Laser and Optical Tech",
    text: "The Laser and Optical Tech lab provides students with machines capable of practical, hands-on experience for students to learn in a controlled environment.",
    tilt: "1.2deg",
    pin: "from-[#7bde7b] to-[#2f8f2f]",
  },
  {
    label: "Oceanography",
    text: "The Oceanography lab provides students with testing kits, probes, and sediment analysis tools.",
    tilt: "-1.2deg",
    pin: "from-[#ffd75b] to-[#b28a22]",
  },
  {
    label: "Urban Statistician",
    text: "The Urban Statistician lab provides students with high-performance spatial analysis machines that can serve students with fast and accurate models, with capabilities to solve real-world problems.",
    tilt: "1.2deg",
    pin: "from-[#5b8cff] to-[#2233b2]",
  },
  {
    label: "Telecommunications",
    text: "The Telecommunications lab provides students with modern machines for high-speed communication to practice and explore next-generation network infrastructures.",
    tilt: "-1.2deg",
    pin: "from-[#c77bff] to-[#6a2fb2]",
  },
];

function SplitTitle({ label }: { label: string }) {
  const first = label.charAt(0);
  const rest = label.slice(1);
  return (
    <>
      <span className="spec-first">{first}</span>
      {rest}
    </>
  );
}

function SpecCard({
  spec,
}: {
  spec: { label: string; text: string; tilt: string; pin: string };
}) {
  return (
    <div
      className="relative flex h-full flex-col rounded-[4px] px-5 pb-5 pt-8 shadow-[6px_8px_14px_rgba(0,0,0,0.3),inset_0_2px_0_rgba(255,255,255,0.6)] md:px-6 md:pb-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 18%), " + YELLOW,
        transform: `rotate(${spec.tilt})`,
      }}
    >
      <div className="absolute -top-3 left-5 z-10">
        <div
          className={`relative h-6 w-6 rounded-full bg-gradient-to-br shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${spec.pin}`}
        >
          <div className="absolute left-1 top-1 h-2 w-2 rounded-full bg-white/70" />
        </div>
      </div>

      <h3 className={`${plexMono.className} mb-2 text-center text-xl font-bold tracking-tight text-black md:text-2xl`}>
        <SplitTitle label={spec.label} />
      </h3>

      <p className={`${plexMono.className} flex-1 text-sm leading-relaxed text-black md:text-base`}>
        {spec.text}
      </p>
    </div>
  );
}

export default function StemPage() {
  const router = useRouter();
  const [currentLab, setCurrentLab] = useState(0);
  const [answer, setAnswer] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [error, setError] = useState("");

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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = answer.trim().toLowerCase();
    
    // Only "multo" is accepted
    if (normalized !== "multo") {
      setError("Invalid input. Try again.");
      return;
    }
    
    setError("");
    setToastVisible(true);
    setTimeout(() => {
      router.push("/stemAccount");
    }, 3000);
  };

  return (
    <main className="min-h-screen w-full bg-white overflow-x-hidden">
      <ShapeAnimations />

      {toastVisible && (
        <div className="fixed top-20 right-4 z-[200] anim-toast">
          <div
            className={`${plexMono.className} flex items-center gap-2 rounded-lg border-[3px] border-black bg-white px-5 py-3 text-sm font-bold text-black shadow-[4px_6px_0_rgba(0,0,0,0.35)]`}
          >
            <span className="inline-block h-3 w-3 rounded-full bg-[#a6c978]" />
            Account Successfully Created
          </div>
        </div>
      )}

      <div className="fixed top-0 left-0 z-50 w-full">
        <SchoolHeader />
      </div>

      {/* ============ SECTION 1 — HERO ============ */}
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
              background:
                "linear-gradient(to bottom, rgba(255,248,240,0.92) 0%, rgba(247,226,204,0.6) 35%, rgba(234,196,154,0.8) 68%, rgba(217,138,61,0.92) 95%, #c47a35 100%)",
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

              <div className={`${plexMono.className} mt-5 w-0 min-w-full text-sm leading-relaxed text-black md:text-base`}>
                <p>
                  Welcome to the USF's S.T.E.M. laboratory, one of the country's most advanced and prestigious
                  facilities. Equipped with state-of-the-art scientific instruments, students and teachers can
                  tackle real-world challenges in a safe and controlled environment.
                </p>
              </div>
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

              <div className="absolute -top-8 -left-8 w-32 h-32 pointer-events-none z-20">
                <div className="absolute top-0 left-0 anim-path-2">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#c46a1e)_drop-shadow(-1.5px_0_0_#c46a1e)_drop-shadow(0_1.5px_0_#c46a1e)_drop-shadow(0_-1.5px_0_#c46a1e)]">
                    <Image src="/images/shapes/noodle2.png" alt="Noodle shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 anim-path-3">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#c46a1e)_drop-shadow(-1.5px_0_0_#c46a1e)_drop-shadow(0_1.5px_0_#c46a1e)_drop-shadow(0_-1.5px_0_#c46a1e)]">
                    <Image src="/images/shapes/fita1.png" alt="Fita shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 anim-path-1">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#c46a1e)_drop-shadow(-1.5px_0_0_#c46a1e)_drop-shadow(0_1.5px_0_#c46a1e)_drop-shadow(0_-1.5px_0_#c46a1e)]">
                    <Image src="/images/shapes/dorito.png" alt="Dorito shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 w-32 h-32 pointer-events-none z-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 anim-path-3">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-1 [filter:drop-shadow(1.5px_0_0_#ffeaa6)_drop-shadow(-1.5px_0_0_#ffeaa6)_drop-shadow(0_1.5px_0_#ffeaa6)_drop-shadow(0_-1.5px_0_#ffeaa6)]">
                    <Image src="/images/shapes/noodle1.png" alt="Noodle shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 anim-path-1">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-2 [filter:drop-shadow(1.5px_0_0_#ffeaa6)_drop-shadow(-1.5px_0_0_#ffeaa6)_drop-shadow(0_1.5px_0_#ffeaa6)_drop-shadow(0_-1.5px_0_#ffeaa6)]">
                    <Image src="/images/shapes/fita2.png" alt="Fita shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 anim-path-2">
                  <div className="relative h-10 w-10 md:h-14 md:w-14 anim-wiggle-3 [filter:drop-shadow(1.5px_0_0_#ffeaa6)_drop-shadow(-1.5px_0_0_#ffeaa6)_drop-shadow(0_1.5px_0_#ffeaa6)_drop-shadow(0_-1.5px_0_#ffeaa6)]">
                    <Image src="/images/shapes/dorito.png" alt="Dorito shape" fill sizes="56px" className="object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2 — HISTORY ============ */}
      <section
        id="history"
        className="relative w-full py-24"
        style={{ background: "linear-gradient(to bottom, #c47a35 0%, #e8b07a 18%, #fff5ec 45%, #ffffff 60%, #ffffff 100%)" }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col px-6 sm:px-10 md:px-16">
          <CreamHeading fontClass={sifonn.className} className="mb-12 text-[clamp(2.5rem,6vw,4.5rem)]">
            A Fiarcean History
          </CreamHeading>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 items-start">
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg border-4 border-[#fff5ec]">
                <Image
                  src="/images/stem/stem2.png"
                  alt="STEM History"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <p className={`${plexMono.className} text-sm md:text-base text-black text-center`}>
                S.T.E.M. Labs Renovated (1989)
              </p>
            </div>

            <div className={`${plexMono.className} space-y-5 text-sm leading-relaxed text-black md:text-base`}>
              <p>
                Established to support the USF's growing commitment to the scientific research framework.
                S.T.E.M labs began as a cluster of modest testing facilities dedicated to basic chemical and
                physical sciences. Over the decades, through smart and strategic money-saving tactics, the
                university managed to invest in better and more modern equipment for the future generation of
                miraculous achievers.
              </p>
              <p>
                Today, the laboratories stand as a beacon for research and development in fostering new talents
                across environmental, social, and economic domains. From marine biology to advanced laser
                optical engineering, USF's laboratories continue to evolve, bringing foundational academic
                theories to newer Fiarcian generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3 — SPECIALIZATIONS ============ */}
      <section
        id="specializations"
        className="relative w-full pt-20 pb-12"
        style={{ background: "linear-gradient(to bottom, #ffffff 0%, #ffffff 100%)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 md:px-12">
          <CreamHeading fontClass={sifonn.className} className="mb-8 text-[clamp(2.5rem,6vw,4rem)]">
            Specializations
          </CreamHeading>

          {/* Top row: M / L / O — Bottom row: U / T (centered under the gaps) */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-6 md:gap-6">
            <div className="md:col-span-2">
              <SpecCard spec={SPECIALIZATIONS[0]} />
            </div>
            <div className="md:col-span-2">
              <SpecCard spec={SPECIALIZATIONS[1]} />
            </div>
            <div className="md:col-span-2">
              <SpecCard spec={SPECIALIZATIONS[2]} />
            </div>
            <div className="md:col-span-2 md:col-start-2">
              <SpecCard spec={SPECIALIZATIONS[3]} />
            </div>
            <div className="md:col-span-2 md:col-start-4">
              <SpecCard spec={SPECIALIZATIONS[4]} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 4 — TOUR WITH ALI ============ */}
      <section
        className="relative w-full pt-24 pb-12"
        style={{ background: "linear-gradient(to bottom, #ffffff 0%, #fff5ec 100%)" }}
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
        </div>
      </section>

      {/* ============ SECTION 5 — SIGN UP + LABORATORIES ============ */}
      <section
        className="relative w-full pt-12 pb-12"
        style={{ background: "linear-gradient(to bottom, #fff5ec 0%, #f0c99a 40%, #d98a3d 100%)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 md:px-12">
          <div
            className="relative overflow-hidden rounded-[2rem] border-[5px] border-black shadow-[10px_12px_0_rgba(0,0,0,0.25)]"
            style={{ background: YELLOW }}
          >
            <div className="absolute top-4 left-4 z-10 flex gap-1.5">
              <span className="block h-2.5 w-2.5 rounded-full border-2 border-black" style={{ background: "#c46a1e" }} />
              <span className="block h-2.5 w-2.5 rounded-full border-2 border-black" style={{ background: "#ffeaa6" }} />
              <span className="block h-2.5 w-2.5 rounded-full border-2 border-black" style={{ background: "#a6c978" }} />
            </div>
            <div className="absolute top-4 right-4 z-10 flex gap-1.5">
              <span className="block h-2.5 w-2.5 rounded-full border-2 border-black" style={{ background: "#a6c978" }} />
              <span className="block h-2.5 w-2.5 rounded-full border-2 border-black" style={{ background: "#ffeaa6" }} />
              <span className="block h-2.5 w-2.5 rounded-full border-2 border-black" style={{ background: "#c46a1e" }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <form
                onSubmit={handleRegister}
                className={`${plexMono.className} px-7 py-10 md:px-10 md:py-12`}
              >
                <h3 className="mb-4 text-center text-3xl font-bold text-black md:text-4xl">
                  Sign Up
                </h3>
                <p className="mb-5 text-center text-sm leading-relaxed text-black md:text-base">
                  Enter the password to get a tour of our laboratories.
                </p>

                <label htmlFor="stem-email" className="block text-sm font-bold text-black md:text-base">
                  Password
                </label>
                <input
                  id="stem-email"
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="m****"
                  className="mt-2 w-full rounded-md border-[3px] border-black bg-white px-3 py-2 text-sm text-black outline-none placeholder:text-black/40 md:text-base"
                />
                {error && (
                  <p className="mt-2 text-sm font-bold text-red-700 md:text-base">{error}</p>
                )}
                <button
                  type="submit"
                  className="mt-5 w-full border-[3px] border-black bg-[#c9c9c9] px-4 py-1.5 text-[clamp(0.875rem,1.5vw,1rem)] font-normal text-black shadow-[inset_-2px_-2px_0_#6b6b6b,inset_2px_2px_0_#fff] hover:bg-[#d6d6d6] active:shadow-[inset_2px_2px_0_#6b6b6b,inset_-2px_-2px_0_#fff]"
                >
                  Create Account
                </button>
              </form>

              <div className="hidden md:block absolute top-8 bottom-8 left-1/2 w-[3px] -translate-x-1/2 bg-black/20" />

              <div className={`${plexMono.className} flex flex-col items-center px-7 py-10 md:px-10 md:py-12`}>
                <h3 className="mb-6 text-center text-3xl font-bold text-black md:text-4xl">
                  Laboratories
                </h3>

                <div className="relative flex w-full items-center justify-center max-w-[260px] mx-auto">
                  {currentLab > 0 && (
                    <button
                      onClick={handlePrevLab}
                      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-black bg-[#c9c9c9] shadow-[2px_3px_0_rgba(0,0,0,0.4)] transition-transform hover:scale-110 active:shadow-[1px_1px_0_rgba(0,0,0,0.4)] md:-left-5 md:h-10 md:w-10"
                    >
                      <div className="relative w-2/3 h-2/3 rotate-90">
                        <Image src="/images/main/downArrow.png" alt="Left" fill sizes="40px" className="object-contain" />
                      </div>
                    </button>
                  )}

                  <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden border-4 border-black bg-white shadow-[5px_6px_0_rgba(0,0,0,0.35)]">
                    <div
                      className="flex h-full w-full transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentLab * 100}%)` }}
                    >
                      {labs.map((lab, index) => (
                        <div key={index} className="relative h-full w-full shrink-0">
                          <Image
                            src={lab.src}
                            alt={lab.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 260px"
                            className="object-cover"
                            quality={100}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {currentLab < labs.length - 1 && (
                    <button
                      onClick={handleNextLab}
                      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-black bg-[#c9c9c9] shadow-[2px_3px_0_rgba(0,0,0,0.4)] transition-transform hover:scale-110 active:shadow-[1px_1px_0_rgba(0,0,0,0.4)] md:-right-5 md:h-10 md:w-10"
                    >
                      <div className="relative w-2/3 h-2/3 -rotate-90">
                        <Image src="/images/main/downArrow.png" alt="Right" fill sizes="40px" className="object-contain" />
                      </div>
                    </button>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-center gap-2">
                  {labs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentLab(index)}
                      aria-label={`Go to lab ${index + 1}`}
                      className={`h-3 w-3 rounded-full border-2 border-black transition-all duration-200 ${
                        index === currentLab ? "scale-125 bg-black" : "bg-white/70 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>

                <p className="mt-4 text-center text-lg font-bold text-black md:text-xl">
                  {labs[currentLab].title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 6 — BACK TO CAMPUS MAP ============ */}
      <section
        className="relative w-full pb-16 pt-4"
        style={{ background: "linear-gradient(to bottom, #d98a3d 0%, #c46a1e 100%)" }}
      >
        <div className="flex w-full justify-center">
          <Link
            href="/map"
            className={`${plexMono.className} anim-pulse-5 inline-flex items-center justify-center border-[3px] border-black bg-[#c9c9c9] px-6 py-1.5 text-[clamp(0.875rem,1.5vw,1rem)] font-normal text-black shadow-[inset_-2px_-2px_0_#6b6b6b,inset_2px_2px_0_#fff] hover:bg-[#d6d6d6] active:shadow-[inset_2px_2px_0_#6b6b6b,inset_-2px_-2px_0_#fff]`}
          >
            Back to Campus Map
          </Link>
        </div>
      </section>
    </main>
  );
}