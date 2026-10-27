import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../data";

interface SlideIntroProps {
  onExploreArchive: () => void;
  onContact: () => void;
}

const WHATSAPP_URL =
  "https://wa.me/201146066036?text=Hi%20Yousef,%20I%20saw%20your%20Flutter%20portfolio%20and%20would%20like%20to%20connect!";

export function SlideIntro({ onExploreArchive, onContact }: SlideIntroProps) {
  return (
    <div
      id="active-slide-scroll"
      className="no-scrollbar relative flex h-full w-full flex-col justify-between overflow-y-auto px-4 pb-36 pt-16 sm:px-8 sm:pt-20 sm:pb-28 lg:px-14"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* Top Telemetry Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-between gap-3 text-xs"
      >
        <div className="flex items-center gap-2.5">
          <span className="live-dot inline-block h-2 w-2 rounded-full bg-live" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-signal">
            ACTIVE BROADCAST // CAIRO, EGYPT
          </span>
        </div>

        <div className="hidden font-mono text-xs tracking-widest text-mute md:flex items-center gap-4">
          <span>LAT: 30.0444° N</span>
          <span>LNG: 31.2357° E</span>
          <span className="text-signal">[ MID-LEVEL FLUTTER ]</span>
        </div>
      </motion.div>

      {/* Main Responsive Grid: Left (Typography) — Center (3D Avatar) — Right (Metrics) */}
      <div className="my-auto grid items-center gap-6 lg:grid-cols-[1.1fr_1fr_0.9fr] py-4">
        {/* Left Column: Identity & Mission */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-lg z-10"
        >
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] text-signal/80">
            ENGINEERING DOSSIER
          </p>

          <h1 className="mt-2 font-display text-4xl leading-[0.94] tracking-tight text-ink sm:text-6xl lg:text-8xl">
            {profile.first}
            <br />
            <span className="text-signal text-glow-signal">{profile.last}</span>
          </h1>

          <div className="mt-3 inline-block rounded-full border border-signal/30 bg-signal/10 px-3.5 py-1 font-mono text-[11px] sm:text-xs text-signal">
            {profile.role}
          </div>

          <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-mute">
            I architect and ship high-concurrency production Flutter systems:
            live streaming, Agora RTC, WebRTC, local NDI into OBS, and payment
            gateways across 11 store-published applications.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <button
              onClick={onExploreArchive}
              className="btn-signal group flex items-center gap-2 rounded-full px-5 py-3 sm:px-6 sm:py-3.5 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(74,212,194,0.35)]"
            >
              <span>EXPLORE 3D ARCHIVE</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={onContact}
              className="rounded-full border border-line bg-panel/60 px-5 py-3 sm:px-6 sm:py-3.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-ink backdrop-blur-md transition-all hover:border-signal hover:text-signal"
            >
              UPLINK // CONTACT
            </button>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/15 px-4 py-3 sm:px-5 sm:py-3.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white shadow-[0_0_15px_rgba(37,211,102,0.25)] backdrop-blur-md transition-all hover:bg-[#25D366] hover:text-[#051a0d] hover:scale-105 active:scale-95"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>WHATSAPP</span>
            </a>
          </div>
        </motion.div>

        {/* Center Column: 3D Animated Character Avatar with floating physics - Mobile optimized size */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.7, delay: 0.2 },
            scale: { duration: 0.7, delay: 0.2 },
            y: {
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            },
          }}
          className="relative mx-auto flex h-[240px] sm:h-[320px] lg:h-[580px] w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[420px] items-end justify-center select-none my-2 lg:my-0"
        >
          {/* Subtle rim depth glow */}
          <div className="pointer-events-none absolute left-1/2 bottom-1/4 h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-signal/15 blur-[75px]" />

          {/* 3D Avatar Image */}
          <img
            src="./me/youssef-avatar-3d.png"
            alt={`${profile.name} - 3D Avatar`}
            className="relative z-10 max-h-full max-w-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        {/* Right Column: Key Production Stats - Compact 3-card grid on mobile */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 sm:gap-4 max-w-sm ml-auto z-10 w-full"
        >
          <div className="rounded-2xl border border-line/80 bg-panel/75 p-3.5 sm:p-5 backdrop-blur-md">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-2xl sm:text-4xl text-signal">11</span>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-mute">
                LIVE
              </span>
            </div>
            <p className="mt-1 text-[11px] sm:text-xs text-mute line-clamp-2">
              App Store, Google Play &amp; Microsoft.
            </p>
          </div>

          <div className="rounded-2xl border border-line/80 bg-panel/75 p-3.5 sm:p-5 backdrop-blur-md">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-2xl sm:text-4xl text-signal">4</span>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-mute">
                TARGETS
              </span>
            </div>
            <p className="mt-1 text-[11px] sm:text-xs text-mute line-clamp-2">
              iOS · Android · Windows · Web
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-line/80 bg-panel/75 p-3.5 sm:p-5 backdrop-blur-md">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-2xl sm:text-4xl text-signal">TKDS</span>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-live">
                FLEET
              </span>
            </div>
            <p className="mt-1 text-[11px] sm:text-xs text-mute line-clamp-2">
              Production mobile stack owner.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Telemetry Ticker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="hidden sm:flex items-center justify-between font-mono text-xs text-mute/80 border-t border-line/60 pt-3"
      >
        <span>[ SCENE 01 // OVERVIEW ]</span>
        <span className="hidden md:inline-block">PRESS SPACE OR USE SCRUBBER TO ADVANCE</span>
        <span className="text-signal">YOUSEF BADR · CAIRO, EGYPT</span>
      </motion.div>
    </div>
  );
}
