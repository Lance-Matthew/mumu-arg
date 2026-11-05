import Link from "next/link";
import SchoolHeader from "@/components/SchoolHeader";
import SchoolFooter from "@/components/SchoolFooter";
import MazeGame from "@/components/MazeGame";

export default function MazePage() {
  return (
    <>
      <SchoolHeader />

      <div>

        {/* HERO BANNER */}
        <section className="relative bg-[#1a3a2e] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]">
            <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,white,transparent_65%)]" />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="mb-8">
              <Link
                href="/map"
                className="text-xs text-white/60 hover:text-white no-underline inline-flex items-center gap-2 transition-colors"
              >
                <span aria-hidden>←</span> Back to map
              </Link>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
              Maze
            </h1>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <MazeGame />
        </div>

      </div>

      <SchoolFooter />
    </>
  );
}