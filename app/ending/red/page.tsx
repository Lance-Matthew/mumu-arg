"use client";

import Link from "next/link";
import VideoFrame from "@/components/VideoFrame";

export default function RedEndingPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#ef4444] px-6 py-16">
      <h1 className="mb-8 text-center font-mono text-3xl font-black text-white drop-shadow-[3px_3px_0_rgba(0,0,0,0.5)] md:text-5xl">
        Red Ending
      </h1>

      <VideoFrame src="/videos/redEnding.mp4" />

      <Link
        href="/"
        className="mt-10 inline-block border-[3px] border-black bg-[#c9c9c9] px-8 py-1.5 font-mono text-sm font-normal text-black shadow-[inset_-2px_-2px_0_#6b6b6b,inset_2px_2px_0_#fff] transition-colors hover:bg-[#d6d6d6] active:shadow-[inset_2px_2px_0_#6b6b6b,inset_-2px_-2px_0_#fff]"
      >
        Back to Home
      </Link>
    </main>
  );
}