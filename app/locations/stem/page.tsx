"use client";

import { useState } from "react";
import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import SchoolHeader from "@/components/SchoolHeader";

// app/locations/stem-labs/page.tsx -> app/fonts/Sifonn.otf
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

// ---------- Headings: black Sifonn letters + pink stepped offset ----------
function PinkHeading({
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
    (_, i) => `${((i + 1) * 0.012).toFixed(3)}em ${((i + 1) * 0.012).toFixed(3)}em 0 #f7b3b8`
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

export default function StemLabsPage() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: send `email` to your mailing list endpoint
    setEmail("");
  };

  return (
    <main className="w-full overflow-x-hidden scroll-smooth bg-white">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 z-50 w-full">
        <SchoolHeader />
      </div>

      {/* ============ SECTION 1 — ABOUT THE S.T.E.M. LABS ============ */}
      <section
        className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #e6e8e2 0%, #ece3d0 35%, #eec78f 68%, #e0a050 100%)" }}
      >
        <div className="relative z-10 flex flex-1 items-center px-6 pb-24 pt-24 sm:px-10 md:px-20">
          <div className="mx-auto w-full max-w-6xl">
            {/* w-fit: the block is exactly as wide as the title, and the paragraph follows that width */}
            <div className="w-fit max-w-full">
              <p className={`${sifonn.className} text-[clamp(1.25rem,2.1vw,1.6rem)] text-black`}>About the</p>

              <PinkHeading
                as="h1"
                fontClass={sifonn.className}
                className="whitespace-nowrap text-[clamp(2.275rem,6.3vw,5.6rem)] leading-[0.95]"
              >
                S.T.E.M. Labs
              </PinkHeading>

              <p className={`${plexMono.className} mt-5 w-0 min-w-full text-sm leading-snug text-black sm:text-[15px]`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod et neque a interdum.
              </p>
            </div>
          </div>
        </div>

        {/* Continue indicator */}
        <button
          type="button"
          aria-label="Continue to the S.T.E.M. Labs history"
          onClick={() => document.getElementById("history")?.scrollIntoView({ behavior: "smooth" })}
          className="group absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 border-0 bg-transparent text-[#6b3d0c] transition-colors hover:text-black sm:bottom-6"
        >
          <span className="font-mono text-base font-bold tracking-widest sm:text-lg">continue</span>
          <span aria-hidden className="animate-bounce text-2xl leading-none">▼</span>
        </button>
      </section>

      {/* ============ SECTION 2 — A FIARCEAN HISTORY ============ */}
      <section
        id="history"
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #e0a050 0%, #f0cfa0 18%, #fcf1e4 42%, #ffffff 60%, #ffffff 100%)" }}
      >
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-28 sm:px-10 md:px-16">
          <PinkHeading fontClass={sifonn.className} className="mb-10 text-[clamp(2.5rem,6vw,4.5rem)]">
            A Fiarcean History
          </PinkHeading>

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

      {/* ============ SECTION 3 — LABS, SPECIALIZATIONS, TOUR, NEWSLETTER ============ */}
      <section
        id="specializations"
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #ffffff 0%, #fdf5ea 40%, #f3d4a8 75%, #e0a050 100%)" }}
      >
        {/* Wide container, pushed toward the left edge */}
        <div className="relative z-10 w-full pb-32 pl-4 pr-6 pt-24 sm:pl-6 sm:pr-10 md:pl-8 md:pr-12">
          <div className="grid w-full max-w-7xl items-start gap-10 md:grid-cols-[1fr_1fr] md:gap-12">
            {/* LEFT COLUMN: Laboratories + Newsletter */}
            <div className="space-y-12">
              <div
                className="rounded-3xl px-10 py-12 shadow-[6px_8px_14px_rgba(0,0,0,0.3)] md:px-12 md:py-14"
                style={{ background: YELLOW }}
              >
                <h3
                  className={`${plexMono.className} mb-8 text-center text-3xl font-bold text-black [text-shadow:2px_2px_0_rgba(0,0,0,0.25)] md:text-4xl`}
                >
                  Laboratories
                </h3>
                <p className={`${plexMono.className} text-center text-base text-black md:text-lg`}>Engineering</p>
              </div>

              {/* Newsletter */}
              <div>
                <PinkHeading fontClass={sifonn.className} className="mb-6 text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.0]">
                  Join the Fiarcean
                  <br />
                  S.T.E.M. Newsletter!
                </PinkHeading>

                <form
                  onSubmit={handleSubscribe}
                  className="rounded-2xl px-6 py-6 shadow-[6px_8px_12px_rgba(0,0,0,0.25)]"
                  style={{ background: YELLOW }}
                >
                  <h3 className={`${plexMono.className} mb-4 text-xl font-bold text-black`}>Subscribe to our newsletter</h3>

                  <label htmlFor="newsletter-email" className={`${plexMono.className} mb-1 block text-[11px] font-bold text-black`}>
                    Enter your email
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${plexMono.className} mb-3 w-full rounded-md border border-black/60 bg-transparent px-3 py-2 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/20`}
                  />

                  <button
                    type="submit"
                    className={`${plexMono.className} w-full rounded-full bg-[#f4a65a] px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-[#f7b676]`}
                  >
                    Join mailing list
                  </button>

                  <p className={`${plexMono.className} mt-3 text-center text-[9px] text-black/70`}>
                    Your Canva profile name will be shared. Never submit passwords.
                  </p>
                </form>
              </div>
            </div>

            {/* RIGHT COLUMN: Specializations + Tour with Ali */}
            <div>
              <PinkHeading fontClass={sifonn.className} className="mb-6 text-[clamp(2.5rem,6vw,4.5rem)]">
                Specializations
              </PinkHeading>

              <div className={`${plexMono.className} space-y-5 text-[13px] leading-snug text-black md:text-sm`}>
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

              <PinkHeading fontClass={sifonn.className} className="mb-5 mt-12 text-[clamp(2rem,4.5vw,3.25rem)]">
                Tour with Ali
              </PinkHeading>
              {/* Frame only */}
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
