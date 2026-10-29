import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, publishedBadge, type Project } from "../../data";

interface SlideProjectsDeckProps {
  onSelectProject: (p: Project) => void;
  onAccentChange: (accent: string) => void;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function SlideProjectsDeck({
  onSelectProject,
  onAccentChange,
}: SlideProjectsDeckProps) {
  const deckApps = projects;
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = deckApps[activeIndex];
  const activeBadge = publishedBadge(activeProject);

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % deckApps.length;
    setActiveIndex(nextIdx);
    onAccentChange(deckApps[nextIdx].accent);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + deckApps.length) % deckApps.length;
    setActiveIndex(prevIdx);
    onAccentChange(deckApps[prevIdx].accent);
  };

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
    onAccentChange(deckApps[idx].accent);
  };

  return (
    <div
      id="active-slide-scroll"
      className="no-scrollbar relative flex h-full w-full flex-col justify-between overflow-y-auto px-3 pb-36 pt-16 sm:px-8 sm:pt-20 sm:pb-28 lg:px-12"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* Top Deck Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-live" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-signal">
              ARCHIVE // 3D FOLDERS DECK
            </span>
          </div>
          <h2 className="mt-1 font-display text-2xl sm:text-4xl lg:text-5xl text-ink">
            {deckApps.length} Production Releases
          </h2>
        </div>

        {/* Quick Folder Index Pill Selector - Hidden scrollbar */}
        <div
          className="no-scrollbar flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-line/60 bg-panel/70 p-1 sm:p-1.5 backdrop-blur-md"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {deckApps.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => handleSelect(idx)}
              className={`relative flex h-7 sm:h-8 flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 sm:px-3 font-mono text-[11px] sm:text-xs transition-all ${
                activeIndex === idx
                  ? "bg-signal text-on-signal font-semibold shadow-[0_0_12px_rgba(74,212,194,0.4)]"
                  : "text-mute hover:text-ink hover:bg-white/5"
              }`}
            >
              <span>{pad(idx + 1)}</span>
              {activeIndex === idx && (
                <span className="hidden md:inline-block max-w-[80px] truncate">
                  {p.name}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Stage: The Interactive Folder & Disc Object */}
      <div className="relative my-auto flex w-full flex-col items-center justify-center py-2 sm:py-6">
        {/* Desktop Side Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous Folder"
          className="hidden sm:flex absolute left-0 z-30 h-11 w-11 items-center justify-center rounded-full border border-line bg-panel/80 text-ink shadow-lg backdrop-blur-md transition-all hover:border-signal hover:bg-signal hover:text-on-signal hover:scale-110 active:scale-95 md:left-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Folder"
          className="hidden sm:flex absolute right-0 z-30 h-11 w-11 items-center justify-center rounded-full border border-line bg-panel/80 text-ink shadow-lg backdrop-blur-md transition-all hover:border-signal hover:bg-signal hover:text-on-signal hover:scale-110 active:scale-95 md:right-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* 3D Folder Container */}
        <div className="relative w-full max-w-3xl" style={{ perspective: "1200px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, rotateY: 20, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -20, x: -40, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto rounded-3xl border border-line/80 bg-gradient-to-br from-panel/95 via-panel/85 to-[#0b0f16]/95 p-4 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              style={{
                borderColor: `${activeProject.accent}55`,
                boxShadow: `0 25px 60px -15px ${activeProject.accent}25, 0 0 35px ${activeProject.accent}15`,
              }}
            >
              {/* Physical Folder Tab at the Top */}
              <div
                className="absolute -top-4 sm:-top-5 left-4 sm:left-8 flex items-center gap-1.5 sm:gap-2 rounded-t-xl px-3.5 sm:px-5 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md"
                style={{
                  backgroundColor: activeProject.accent,
                  color: "#0a1118",
                }}
              >
                <span>📁 // {pad(activeIndex + 1)}</span>
                <span className="opacity-75">[{activeProject.category}]</span>
              </div>

              {/* Folder Interior Grid */}
              <div className="grid items-center gap-5 sm:gap-8 md:grid-cols-[1.1fr_0.9fr] pt-2">
                {/* Left: Project Specs and Story */}
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {activeProject.liveNo && (
                      <span className="flex items-center gap-1.5 rounded-full bg-live/90 px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white">
                        <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-white" />
                        LIVE PRODUCTION
                      </span>
                    )}
                    {activeProject.appStore && (
                      <span className="rounded-full border border-signal/40 bg-signal/10 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] text-signal">
                        App Store
                      </span>
                    )}
                    {activeProject.playStore && (
                      <span className="rounded-full border border-signal/40 bg-signal/10 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] text-signal">
                        Google Play
                      </span>
                    )}
                    {activeProject.microsoftStore && (
                      <span className="rounded-full border border-signal/40 bg-signal/10 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] text-signal">
                        MS Store
                      </span>
                    )}
                    {activeBadge && (
                      <span className="rounded-full border border-line bg-panel/60 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] text-mute">
                        {activeBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl text-ink">
                    {activeProject.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-mute line-clamp-3">
                    {activeProject.story || activeProject.blurb}
                  </p>

                  {/* Architecture & Stack Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {activeProject.tags.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-line bg-well/70 px-2 py-0.5 font-mono text-[10px] text-mute"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => onSelectProject(activeProject)}
                      className="btn-signal flex items-center gap-2 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: activeProject.accent,
                        color: "#080c12",
                      }}
                    >
                      <span>INSPECT DOSSIER</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>

                    {activeProject.appStore && (
                      <a
                        href={activeProject.appStore}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-line bg-panel/60 px-3.5 py-2 font-mono text-[11px] sm:text-xs text-ink transition-all hover:border-signal hover:text-signal"
                      >
                        iOS
                      </a>
                    )}
                    {activeProject.playStore && (
                      <a
                        href={activeProject.playStore}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-line bg-panel/60 px-3.5 py-2 font-mono text-[11px] sm:text-xs text-ink transition-all hover:border-signal hover:text-signal"
                      >
                        Android
                      </a>
                    )}
                    {activeProject.microsoftStore && (
                      <a
                        href={activeProject.microsoftStore}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-line bg-panel/60 px-3.5 py-2 font-mono text-[11px] sm:text-xs text-ink transition-all hover:border-signal hover:text-signal"
                      >
                        Windows
                      </a>
                    )}
                    {activeProject.website && (
                      <a
                        href={activeProject.website}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-line bg-panel/60 px-3.5 py-2 font-mono text-[11px] sm:text-xs text-ink transition-all hover:border-signal hover:text-signal"
                      >
                        Web
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: The Sliding Disc / Media Insert */}
                <div className="relative flex items-center justify-center order-first md:order-last">
                  <motion.div
                    initial={{ rotate: -8, scale: 0.95 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex h-32 w-32 sm:h-52 sm:w-52 md:h-60 md:w-60 items-center justify-center rounded-3xl border border-line bg-well p-4 sm:p-6 shadow-2xl"
                    style={{
                      background: `radial-gradient(circle at 40% 30%, ${activeProject.accent}33, #0f141d 85%)`,
                    }}
                  >
                    <div className="absolute inset-2 sm:inset-4 rounded-2xl border border-white/5 opacity-50 pointer-events-none" />
                    <div className="absolute inset-6 sm:inset-10 rounded-2xl border border-white/5 opacity-40 pointer-events-none" />

                    {activeProject.logo ? (
                      <motion.img
                        key={activeProject.logo}
                        src={activeProject.logo}
                        alt={activeProject.name}
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="max-h-24 sm:max-h-36 max-w-[80%] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                      />
                    ) : (
                      <span
                        className="font-display text-5xl sm:text-7xl font-bold"
                        style={{ color: activeProject.accent }}
                      >
                        {activeProject.name[0]}
                      </span>
                    )}
                    <div className="scan-line" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Navigation Bar right beneath the card */}
        <div className="flex sm:hidden items-center justify-center gap-4 mt-4">
          <button
            onClick={handlePrev}
            aria-label="Previous Folder"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel/90 text-ink shadow-md active:scale-90"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="font-mono text-xs text-mute">
            {pad(activeIndex + 1)} / {pad(deckApps.length)}
          </span>
          <button
            onClick={handleNext}
            aria-label="Next Folder"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel/90 text-ink shadow-md active:scale-90"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Deck Progress Indicator */}
      <div className="hidden sm:flex items-center justify-between font-mono text-xs text-mute">
        <span className="tracking-widest">
          FOLDER {pad(activeIndex + 1)} OF {pad(deckApps.length)}
        </span>
        <div className="flex items-center gap-2">
          <span>USE KEYBOARD ARROWS</span>
          <span className="rounded border border-line px-1.5 py-0.5">◀</span>
          <span className="rounded border border-line px-1.5 py-0.5">▶</span>
          <span>OR BUTTONS TO FLIP</span>
        </div>
      </div>
    </div>
  );
}
