"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VideoFrame from "@/components/VideoFrame";

const ENDING_VIDEO_SRC =
  "https://customer-eie2vf4vq58r59xg.cloudflarestream.com/05861231ae04a0208123193f5cdbeed2/manifest/video.m3u8";

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
      <VideoFrame src={ENDING_VIDEO_SRC} />

      <Link
        href="/"
        className="mt-10 inline-block border-[3px] border-black bg-[#c9c9c9] px-8 py-1.5 font-mono text-sm font-normal text-black shadow-[inset_-2px_-2px_0_#6b6b6b,inset_2px_2px_0_#fff] transition-colors hover:bg-[#d6d6d6] active:shadow-[inset_2px_2px_0_#6b6b6b,inset_-2px_-2px_0_#fff]"
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