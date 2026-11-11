"use client";

type VideoFrameProps = {
  /** Full Cloudflare Stream manifest URL, e.g. .../<uid>/manifest/video.m3u8 */
  src: string;
  /** Optional caption language code to show by default, e.g. "en". */
  defaultTextTrack?: string;
};

/** Pull the video UID out of a Cloudflare Stream manifest URL. */
function extractUid(src: string): string | null {
  // Matches /<uid>/manifest/ in the URL
  const match = src.match(/cloudflarestream\.com\/([a-f0-9]+)\/manifest\//i);
  return match ? match[1] : null;
}

export default function VideoFrame({ src, defaultTextTrack }: VideoFrameProps) {
  const uid = extractUid(src);

  const base = uid
    ? `https://customer-eie2vf4vq58r59xg.cloudflarestream.com/${uid}/iframe`
    : src; // fallback: use the raw src if it doesn't match the pattern

  const iframeSrc =
    uid && defaultTextTrack ? `${base}?defaultTextTrack=${defaultTextTrack}` : base;

  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border-[6px] border-[#1f2329] bg-[#34414d] p-4 shadow-[0_8px_12px_rgba(0,0,0,0.25)]">
      <div className="relative aspect-video border-[5px] border-[#1f2329] bg-black overflow-hidden">
        <iframe
          src={iframeSrc}
          className="absolute inset-0 h-full w-full"
          style={{ border: "none" }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          title="Tour video"
        />
      </div>
    </div>
  );
}