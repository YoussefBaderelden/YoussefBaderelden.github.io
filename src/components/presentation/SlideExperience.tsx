import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience, profile } from "../../data";

export function SlideExperience() {
  const [activeIdx, setActiveIdx] = useState(0);

  const currentRole = experience[activeIdx];

  return (
    <div
      id="active-slide-scroll"
      className="no-scrollbar relative flex h-full w-full flex-col justify-between overflow-y-auto px-4 pb-36 pt-16 sm:px-8 sm:pt-20 sm:pb-28 lg:px-14"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-signal" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-signal">
              MISSION LOG // TRAJECTORY
            </span>
          </div>
          <h2 className="mt-1 font-display text-2xl sm:text-4xl lg:text-5xl text-ink">
            Production Path
          </h2>
        </div>

        {/* Station Selectors - Clean wrap without ugly scrollbars */}
        <div
          className="no-scrollbar flex flex-wrap items-center gap-1.5 rounded-2xl border border-line bg-panel/75 p-1.5 backdrop-blur-md"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {experience.map((exp, idx) => (
            <button
              key={exp.org}
              onClick={() => setActiveIdx(idx)}
              className={`flex-shrink-0 rounded-xl px-3 py-1.5 font-mono text-[11px] sm:text-xs transition-all ${
                activeIdx === idx
                  ? "bg-signal text-on-signal font-semibold shadow-[0_0_12px_rgba(74,212,194,0.3)]"
                  : "text-mute hover:text-ink hover:bg-white/5"
              }`}
            >
              {exp.org}
            </button>
          ))}
        </div>
      </div>

      {/* Main Experience Visual Display */}
      <div className="my-auto grid items-center gap-5 sm:gap-8 md:grid-cols-[1.2fr_0.8fr] py-4">
        {/* Left: Role Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRole.org}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-line/80 bg-panel/85 p-5 sm:p-8 backdrop-blur-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 sm:pb-4">
              <div>
                <span className="font-mono text-[11px] sm:text-xs text-signal font-bold uppercase tracking-wider">
                  {currentRole.period}
                </span>
                <h3 className="mt-1 font-display text-xl sm:text-2xl lg:text-3xl text-ink">
                  {currentRole.role}
                </h3>
              </div>
              <span className="rounded-full border border-line bg-well/70 px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[10px] sm:text-xs text-mute">
                {currentRole.place}
              </span>
            </div>

            <ul className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3">
              {currentRole.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm leading-relaxed text-mute">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-signal" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        {/* Right: Academic Anchor (Zagazig University) */}
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-line/80 bg-panel/75 p-5 sm:p-6 backdrop-blur-md">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-signal">
              ACADEMIC FOUNDATION
            </span>
            <h4 className="mt-1 font-display text-lg sm:text-xl text-ink">
              B.Sc. Computer Engineering
            </h4>
            <p className="mt-1 font-mono text-xs text-signal/80">
              {profile.university}
            </p>
            <p className="mt-1.5 text-xs text-mute">
              {profile.year} · {profile.educationPeriod}
            </p>
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-mute">
              Deep curriculum in systems architecture, networking protocols, signal processing, and low-level data structures.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="hidden sm:flex items-center justify-between border-t border-line/60 pt-3 font-mono text-xs text-mute/80">
        <span>[ SCENE 04 // LOGS ]</span>
        <span className="text-signal">VERIFIED CAREER RECORD</span>
      </div>
    </div>
  );
}
