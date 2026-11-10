"use client";

import Link from "next/link";

// Using the Cloudflare Stream iframe embed for the new video,
// hiding Settings, Quality, and PiP (Window) buttons — same pattern as RedEndingPage.
const DANAAN_VIDEO_EMBED =
  "https://customer-eie2vf4vq58r59xg.cloudflarestream.com/b395117a073f24cc41c1479d8048c823/iframe?controls=true&settings=false&quality=false&pip=false&poster=https%3A%2F%2Fcustomer-eie2vf4vq58r59xg.cloudflarestream.com%2Fb395117a073f24cc41c1479d8048c823%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600";

export default function DanaanEndingPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black px-6 py-16">
      <div className="w-full max-w-5xl">
        <div className="group relative aspect-video w-full overflow-hidden bg-black">
          <iframe
            src={DANAAN_VIDEO_EMBED}
            title="Ending Video"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>

      <Link
        href="/maze"
        className="mt-10 inline-block border-2 border-[#8cc152] bg-[#8cc152] px-8 py-2 font-mono text-sm font-bold tracking-wide text-black transition-colors hover:bg-[#a6cf6e] hover:border-[#a6cf6e] active:translate-y-[1px]"
      >
        Back to Home
      </Link>
    </main>
  );
}