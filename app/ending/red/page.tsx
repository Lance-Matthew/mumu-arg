"use client";

import Link from "next/link";
import VideoFrame from "@/components/VideoFrame";

const ENDING_VIDEO_SRC =
  "https://customer-eie2vf4vq58r59xg.cloudflarestream.com/67f1e45341af107b470cb83436bd1d9d/manifest/video.m3u8";

export default function RedEndingPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black px-6 py-16">
      <VideoFrame src={ENDING_VIDEO_SRC} />

      <Link
        href="/"
        className="mt-10 inline-block border-[3px] border-black bg-[#c9c9c9] px-8 py-1.5 font-mono text-sm font-normal text-black shadow-[inset_-2px_-2px_0_#6b6b6b,inset_2px_2px_0_#fff] transition-colors hover:bg-[#d6d6d6] active:shadow-[inset_2px_2px_0_#6b6b6b,inset_-2px_-2px_0_#fff]"
      >
        Back to Home
      </Link>
    </main>
  );
}