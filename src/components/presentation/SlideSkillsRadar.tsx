import React, { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../../data";

export function SlideSkillsRadar() {
  const categories = Object.keys(skills) as (keyof typeof skills)[];
  const [activeCategory, setActiveCategory] = useState<keyof typeof skills>(
    "Realtime & media",
  );

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
            <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_8px_var(--signal)]" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-signal">
              SYS.CAPABILITIES // MATRIX
            </span>
          </div>
          <h2 className="mt-1 font-display text-2xl sm:text-4xl lg:text-5xl text-ink">
            Engineering Arsenal
          </h2>
        </div>

        {/* Category Selector Tabs - Clean wrap on mobile, no ugly scrollbar */}
        <div
          className="no-scrollbar flex flex-wrap items-center gap-1.5 rounded-2xl border border-line bg-panel/75 p-1.5 backdrop-blur-md"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 rounded-xl px-3 py-1.5 font-mono text-[11px] sm:text-xs transition-all ${
                activeCategory === cat
                  ? "bg-signal text-on-signal font-semibold shadow-[0_0_12px_rgba(74,212,194,0.3)]"
                  : "text-mute hover:text-ink hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Center Radar Matrix */}
      <div className="my-auto grid items-center gap-5 sm:gap-8 md:grid-cols-2 py-4">
        {/* Left: Active Module Breakdown */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-line/80 bg-panel/80 p-5 sm:p-8 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-line pb-3 sm:pb-4">
            <h3 className="font-display text-xl sm:text-2xl text-ink">{activeCategory}</h3>
            <span className="font-mono text-[11px] sm:text-xs text-signal">
              {skills[activeCategory].length} MODULES
            </span>
          </div>

          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
            {skills[activeCategory].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="group flex items-center gap-2 rounded-xl border border-signal/25 bg-signal/10 px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-[11px] sm:text-xs text-ink transition-all hover:border-signal hover:bg-signal/20 hover:scale-105"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-signal group-hover:shadow-[0_0_8px_var(--signal)]" />
                <span>{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Technical Highlights Card */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          <div className="rounded-2xl border border-line bg-panel/75 p-4 sm:p-5 backdrop-blur-md">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-signal">
              SPECIALIZATION
            </span>
            <h4 className="mt-1 font-display text-base sm:text-lg text-ink">
              Realtime Streaming &amp; Low Latency
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-mute">
              Production integrations with Agora RTC, WebRTC pipelines, RTMP broadcast feeds, and local NDI output into OBS and vMix studio workflows.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-panel/75 p-4 sm:p-5 backdrop-blur-md">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-signal">
              SYSTEM ARCHITECTURE
            </span>
            <h4 className="mt-1 font-display text-base sm:text-lg text-ink">
              Clean Architecture &amp; State Engines
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-mute">
              BLoC, Cubit, Riverpod, and Repository patterns designed for scalable multi-platform codebases with zero memory leaks.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="hidden sm:flex items-center justify-between border-t border-line/60 pt-3 font-mono text-xs text-mute/80">
        <span>[ SCENE 03 // CORE ARSENAL ]</span>
        <span className="text-signal">CONTINUOUS DEPLOYMENT READY</span>
      </div>
    </div>
  );
}
