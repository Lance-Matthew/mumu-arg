"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function SchoolHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b-2 border-[#242218] bg-[#fff0a3] px-2 sm:px-4">
      <Link href="/" className="flex min-w-0 items-center gap-2.5 no-underline">
        {/* Seal kept at original h-10 to fit the h-16 container */}
        <div className="relative h-10 w-10 shrink-0">
          <Image
            src="/images/Seal.png"
            alt="USF Seal"
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
        {/* Main text increased 0.5x: text-base -> text-xl, sm:text-lg -> sm:text-2xl */}
        <span className="truncate font-mono text-xl font-black tracking-wide text-[#211f17] sm:text-2xl">
          USF Freshman Portal
        </span>
      </Link>

      <div className="relative flex shrink-0 items-center gap-3 sm:gap-4">
        {/* Subtext increased 0.5x: text-sm -> text-base, sm:text-base -> sm:text-lg */}
        <span className="hidden font-mono text-base font-black text-[#211f17] sm:block sm:text-lg">
          #USFRetroTakeOver
        </span>

        {/* Hamburger Button - Now Clickable */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] border-0 bg-transparent p-0 cursor-pointer hover:opacity-70 transition-opacity"
        >
          {/* The lines animate into an X when open */}
          <span className={`h-[3px] w-7 bg-[#211f17] transition-transform duration-200 ${isOpen ? 'translate-y-[9px] rotate-45' : ''}`} />
          <span className={`h-[3px] w-7 bg-[#211f17] transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`h-[3px] w-7 bg-[#211f17] transition-transform duration-200 ${isOpen ? '-translate-y-[9px] -rotate-45' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-[calc(100%+8px)] right-0 w-48 border-2 border-[#242218] bg-[#fff0a3] shadow-[4px_4px_0_rgba(36,34,24,0.2)]">
            <nav className="flex flex-col py-2">
              <Link 
                href="/map" 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 font-mono text-sm font-bold text-[#211f17] hover:bg-[#ffe680] transition-colors"
              >
                Campus Map
              </Link>
              <Link 
                href="/about" 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 font-mono text-sm font-bold text-[#211f17] hover:bg-[#ffe680] transition-colors"
              >
                About Me
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}