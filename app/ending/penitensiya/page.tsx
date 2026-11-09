"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ENDING_VIDEO_EMBED =
  "https://customer-eie2vf4vq58r59xg.cloudflarestream.com/05861231ae04a0208123193f5cdbeed2/iframe?controls=true&settings=false&quality=false&pip=false&poster=https%3A%2F%2Fcustomer-eie2vf4vq58r59xg.cloudflarestream.com%2F05861231ae04a0208123193f5cdbeed2%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600";

export default function GreenEndingPage() {
  const [showCert, setShowCert] = useState(true);

  // Auto-hide the certificate after 5 seconds
  useEffect(() => {
    if (!showCert) return;
    const t = setTimeout(() => setShowCert(false), 5000);
    return () => clearTimeout(t);
  }, [showCert]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black px-6 py-16">
      <div className="w-full max-w-5xl">
        <div className="group relative aspect-video w-full overflow-hidden bg-black">
          <iframe
            src={ENDING_VIDEO_EMBED}
            title="Ending Video"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>

      <Link
        href="/"
        className="mt-10 inline-block border-2 border-[#8cc152] bg-[#8cc152] px-8 py-2 font-mono text-sm font-bold tracking-wide text-black transition-colors hover:bg-[#a6cf6e] hover:border-[#a6cf6e] active:translate-y-[1px]"
      >
        Back to Home
      </Link>

      {/* Certificate popup — matches the video frame width, auto-hides after 5s */}
      {showCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6"
          onClick={() => setShowCert(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* X button */}
            <button
              type="button"
              onClick={() => setShowCert(false)}
              aria-label="Close certificate"
              className="absolute -top-3 -right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-black bg-[#ffe793] text-black shadow-[3px_4px_0_rgba(0,0,0,0.4)] transition-transform hover:scale-110"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {/* Certificate image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-[6px] border-[#1f2329] bg-black shadow-[0_8px_12px_rgba(0,0,0,0.25)]">
              <Image
                src="/images/cert.png"
                alt="Certificate"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}