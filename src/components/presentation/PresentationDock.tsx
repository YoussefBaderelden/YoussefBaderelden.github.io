import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../data";

interface PresentationDockProps {
  currentSlide: number;
  totalSlides: number;
  onSetSlide: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

const slideLabels = [
  { id: 0, label: "INTRO", code: "01" },
  { id: 1, label: "3D ARCHIVE", code: "02" },
  { id: 2, label: "ARSENAL", code: "03" },
  { id: 3, label: "LOGS", code: "04" },
  { id: 4, label: "UPLINK", code: "05" },
];

const WHATSAPP_URL =
  "https://wa.me/201146066036?text=Hi%20Yousef,%20I%20saw%20your%20Flutter%20portfolio%20and%20would%20like%20to%20connect!";

export function PresentationDock({
  currentSlide,
  totalSlides,
  onSetSlide,
  onPrev,
  onNext,
}: PresentationDockProps) {
  return (
    <>
      {/* Top HUD Header - Mobile & Desktop Responsive */}
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3.5 backdrop-blur-xl border-b border-line/40 bg-[#070a0f]/70">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onSetSlide(0)}
            className="font-display text-lg sm:text-xl tracking-tight text-ink hover:text-signal transition-colors"
          >
            YB<span className="text-signal">.</span>
          </button>
          <div className="hidden lg:flex items-center gap-2 border-l border-line pl-3">
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-live" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-mute">
              LIVE ENGINE // MID-LEVEL FLUTTER
            </span>
          </div>
        </div>

        {/* Current scene readout pill */}
        <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-line bg-panel/75 px-3 py-1 font-mono text-[11px] sm:text-xs text-signal">
          <span>{String(currentSlide + 1).padStart(2, "0")}</span>
          <span className="opacity-40">/</span>
          <span className="text-ink">{slideLabels[currentSlide]?.label}</span>
        </div>

        {/* Direct Links */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/15 px-3 py-1 sm:px-3.5 sm:py-1.5 font-mono text-[11px] sm:text-xs font-semibold text-white shadow-[0_0_12px_rgba(37,211,102,0.25)] transition-all hover:bg-[#25D366] hover:text-[#051a0d]"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#25D366] animate-pulse" />
            <span>WhatsApp</span>
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex rounded-full border border-line bg-panel/70 px-3.5 py-1.5 font-mono text-xs text-ink transition-all hover:border-signal hover:text-signal"
          >
            GitHub
          </a>
        </div>
      </header>

      {/* Bottom Interactive Presentation Scrubber Dock - Mobile & Desktop Touch Optimized */}
      <div className="fixed bottom-2 sm:bottom-4 inset-x-0 z-40 flex justify-center px-2 sm:px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-line/80 bg-panel/95 p-1.5 shadow-2xl backdrop-blur-2xl max-w-full">
          {/* Previous Arrow */}
          <button
            onClick={onPrev}
            aria-label="Previous Slide"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-ink transition-all hover:bg-white/10 active:scale-90"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Slide Buttons */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            {slideLabels.map((s) => (
              <button
                key={s.id}
                onClick={() => onSetSlide(s.id)}
                className={`relative flex items-center gap-1 rounded-full px-2.5 py-1 sm:px-3.5 sm:py-1.5 font-mono text-[11px] sm:text-xs transition-all ${
                  currentSlide === s.id
                    ? "bg-signal text-on-signal font-bold shadow-[0_0_15px_rgba(74,212,194,0.4)]"
                    : "text-mute hover:text-ink hover:bg-white/5"
                }`}
              >
                <span>{s.code}</span>
                <span className="hidden md:inline-block tracking-wider">
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={onNext}
            aria-label="Next Slide"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-ink transition-all hover:bg-white/10 active:scale-90"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
