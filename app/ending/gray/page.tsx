"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const YELLOW = "#ffe793";

const ENDING_VIDEO_SRC =
  "https://customer-eie2vf4vq58r59xg.cloudflarestream.com/eb444872a079308b56ed9c1a50b22fde/manifest/video.m3u8";

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function GrayEndingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [buffering, setBuffering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: Hls | null = null;
    const isHls = ENDING_VIDEO_SRC.endsWith(".m3u8");
    if (!isHls) {
      video.src = ENDING_VIDEO_SRC;
      return;
    }
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = ENDING_VIDEO_SRC;
    } else if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(ENDING_VIDEO_SRC);
      hls.attachMedia(video);
    }
    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onWaiting = () => setBuffering(true);
    const onPlaying = () => setBuffering(false);
    const onCanPlay = () => setBuffering(false);
    const onSeeking = () => setBuffering(true);
    const onSeeked = () => {
      if (v.readyState >= 3) setBuffering(false);
    };
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("seeking", onSeeking);
    v.addEventListener("seeked", onSeeked);
    return () => {
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("seeking", onSeeking);
      v.removeEventListener("seeked", onSeeked);
    };
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === videoFrameRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = 1;
    setVolume(1);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) await videoFrameRef.current?.requestFullscreen();
      else await document.exitFullscreen();
    } catch {}
  };

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setCurrentTime(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const newTime = (Number(e.target.value) / 100) * v.duration;
    v.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const newVol = Number(e.target.value) / 100;
    const boosted = Math.min(1, newVol * 1.5);
    v.volume = boosted;
    v.muted = newVol === 0;
    setVolume(newVol);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setVolume(v.muted ? 0 : v.volume);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black px-6 py-16">
      <style>{`
        input[type="range"].video-range {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
          --fill: 0%;
        }
        input[type="range"].video-range::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(
            to right,
            ${YELLOW} 0%,
            ${YELLOW} var(--fill),
            rgba(255, 255, 255, 0.25) var(--fill),
            rgba(255, 255, 255, 0.25) 100%
          );
        }
        input[type="range"].video-range::-moz-range-track {
          height: 6px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.25);
        }
        input[type="range"].video-range::-moz-range-progress {
          height: 6px;
          border-radius: 3px;
          background: ${YELLOW};
        }
        input[type="range"].video-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 14px;
          width: 14px;
          margin-top: -4px;
          border-radius: 50%;
          background: ${YELLOW};
          border: 2px solid #1f2329;
          box-shadow: 0 1px 2px rgba(0,0,0,0.4);
        }
        input[type="range"].video-range::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: ${YELLOW};
          border: 2px solid #1f2329;
          box-shadow: 0 1px 2px rgba(0,0,0,0.4);
        }
        input[type="range"].video-range:focus {
          outline: none;
        }

        [data-video-frame]:fullscreen {
          aspect-ratio: auto !important;
          width: 100vw !important;
          height: 100vh !important;
          border: none !important;
          display: flex;
          align-items: center;
          justify-content: center;
          background: black;
        }
        [data-video-frame]:fullscreen video {
          position: static !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        .buffer-spinner { animation: spin 0.8s linear infinite; }
      `}</style>

      <div className="mx-auto w-full max-w-5xl">
        <div
          ref={videoFrameRef}
          data-video-frame
          className="group relative aspect-video bg-black overflow-hidden"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            playsInline
            preload="metadata"
            onClick={togglePlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => {
              setPlaying(false);
              setProgress(0);
              setCurrentTime(0);
              if (document.fullscreenElement) void document.exitFullscreen();
            }}
            onTimeUpdate={handleTimeUpdate}
          />

          {buffering && (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/30">
              <div
                className="buffer-spinner h-12 w-12 rounded-full border-4 border-white/20"
                style={{ borderTopColor: YELLOW }}
              />
            </div>
          )}

          {!playing && !buffering && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Play video"
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-opacity duration-200 hover:bg-black/30"
            >
              <span
                className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border-[4px] border-[#1f2329] shadow-[4px_5px_0_rgba(0,0,0,0.45)] transition-transform duration-200 group-hover:scale-105"
                style={{ background: YELLOW }}
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-9 md:w-9 translate-x-[2px]" fill="#1f2329" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}

          {playing && (
            <div className="absolute top-3 right-14 z-20">
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Pause video"
                className="flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-[#1f2329] opacity-80 shadow-[3px_4px_0_rgba(0,0,0,0.4)] transition-opacity hover:opacity-100"
                style={{ background: YELLOW }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#1f2329" aria-hidden="true">
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              void toggleFullscreen();
            }}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-[#1f2329] opacity-80 shadow-[3px_4px_0_rgba(0,0,0,0.4)] transition-opacity hover:opacity-100"
            style={{ background: YELLOW }}
          >
            {isFullscreen ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#1f2329" aria-hidden="true">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#1f2329" aria-hidden="true">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            )}
          </button>

          <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-6">
            <input
              type="range"
              className="video-range w-full"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={handleSeek}
              aria-label="Seek video"
              style={{ ["--fill" as string]: `${progress}%` }}
            />
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-[11px] text-white tabular-nums md:text-xs">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={volume === 0 ? "Unmute" : "Mute"}
                  className="flex h-7 w-7 items-center justify-center text-white opacity-90 transition-opacity hover:opacity-100"
                >
                  {volume === 0 ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.59 3l2.7 2.7-1.41 1.41-2.7-2.7-2.7 2.7-1.41-1.41 2.7-2.7-2.7-2.7 1.41-1.41 2.7 2.7 2.7-2.7 1.41 1.41-2.7 2.7z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  className="video-range w-20 md:w-24"
                  min={0}
                  max={100}
                  step={1}
                  value={Math.round(volume * 100)}
                  onChange={handleVolumeChange}
                  aria-label="Volume"
                  style={{ ["--fill" as string]: `${Math.round(volume * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

     <Link
  href="/map"
  className="mt-10 inline-block border-2 border-[#8cc152] bg-[#8cc152] px-8 py-2 font-mono text-sm font-bold tracking-wide text-black transition-colors hover:bg-[#a6cf6e] hover:border-[#a6cf6e] active:translate-y-[1px]"
>
  Back to Campus Map
</Link>
    </main>
  );
}