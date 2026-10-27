import React, { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../../data";

const WHATSAPP_URL =
  "https://wa.me/201146066036?text=Hi%20Yousef,%20I%20saw%20your%20Flutter%20portfolio%20and%20would%20like%20to%20connect!";

export function SlideContact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-live" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-signal">
              DIRECT UPLINK // COMMS
            </span>
          </div>
          <h2 className="mt-1 font-display text-2xl sm:text-4xl lg:text-5xl text-ink">
            Initiate Contact
          </h2>
        </div>

        <span className="font-mono text-[11px] sm:text-xs text-mute hidden sm:inline-block">
          STATUS: READY FOR TRANSMISSION
        </span>
      </div>

      {/* Main Terminal & Contact Cards */}
      <div className="my-auto grid items-center gap-5 sm:gap-8 md:grid-cols-[1.2fr_0.8fr] py-4">
        {/* Left: Terminal Dialog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-line/80 bg-panel/90 p-5 sm:p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 border-b border-line pb-3 sm:pb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-live/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
            <span className="ml-2 font-mono text-[10px] sm:text-xs text-mute">
              terminal://transmission
            </span>
          </div>

          <div className="mt-4 sm:mt-6 font-mono text-xs sm:text-sm leading-relaxed text-mute space-y-1.5 sm:space-y-2">
            <p className="text-signal">&gt; HANDSHAKE INITIALIZED...</p>
            <p>&gt; TARGET: {profile.name} [MID-LEVEL FLUTTER ENGINEER]</p>
            <p>&gt; WHATSAPP DIRECT: +201146066036</p>
            <p>&gt; LOCATION: {profile.city}</p>
            <p>&gt; AVAILABILITY: OPEN TO FULL-TIME &amp; IMPACTFUL CONTRACTS</p>
            <p className="text-ink font-semibold mt-3 sm:mt-4">
              "Let's architect your next generation streaming or mobile platform."
            </p>
          </div>

          {/* Action Buttons Row */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Direct WhatsApp Action Button */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full px-5 py-3 sm:px-6 sm:py-3.5 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#25D366] text-[#051a0d] shadow-[0_0_25px_rgba(37,211,102,0.45)] hover:scale-105 active:scale-95 transition-all"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.436 5.179L2 22l4.981-1.396A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.637 0-3.15-.467-4.442-1.274l-.318-.198-2.965.83.844-2.887-.217-.336C3.997 15.034 3.5 13.567 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
              </svg>
              <span>CHAT ON WHATSAPP</span>
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="btn-signal flex items-center gap-2 rounded-full px-5 py-3 sm:px-6 sm:py-3.5 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95"
            >
              <span>SEND EMAIL</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <button
              onClick={copyEmail}
              className="rounded-full border border-line bg-well px-4 py-3 sm:px-5 sm:py-3.5 font-mono text-[11px] sm:text-xs text-ink transition-all hover:border-signal"
            >
              {copied ? "COPIED ✓" : "COPY EMAIL"}
            </button>
          </div>
        </motion.div>

        {/* Right: Quick Action Links */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {/* Top WhatsApp Highlight Card */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 p-3.5 sm:p-4 backdrop-blur-md transition-all hover:border-[#25D366] hover:bg-[#25D366]/20 shadow-[0_0_20px_rgba(37,211,102,0.15)] hover:scale-[1.02]"
          >
            <div className="flex items-center gap-2">
              <span className="live-dot inline-block h-2 w-2 rounded-full bg-[#25D366]" />
              <span className="font-mono text-xs font-semibold text-white">
                WHATSAPP // DIRECT
              </span>
            </div>
            <span className="font-mono text-xs font-bold text-[#25D366]">
              SEND MSG ↗
            </span>
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-line bg-panel/75 p-3.5 sm:p-4 backdrop-blur-md transition-all hover:border-signal hover:bg-signal/5"
          >
            <span className="font-mono text-xs text-mute group-hover:text-ink">
              GITHUB // REPOSITORIES
            </span>
            <span className="font-mono text-xs text-signal">OPEN ↗</span>
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-line bg-panel/75 p-3.5 sm:p-4 backdrop-blur-md transition-all hover:border-signal hover:bg-signal/5"
          >
            <span className="font-mono text-xs text-mute group-hover:text-ink">
              LINKEDIN // PROFILE
            </span>
            <span className="font-mono text-xs text-signal">OPEN ↗</span>
          </a>

          <a
            href={profile.phoneHref}
            className="group flex items-center justify-between rounded-2xl border border-line bg-panel/75 p-3.5 sm:p-4 backdrop-blur-md transition-all hover:border-signal hover:bg-signal/5"
          >
            <span className="font-mono text-xs text-mute group-hover:text-ink truncate max-w-[200px]">
              TEL // {profile.phone}
            </span>
            <span className="font-mono text-xs text-signal">CALL ↗</span>
          </a>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="hidden sm:flex items-center justify-between border-t border-line/60 pt-3 font-mono text-xs text-mute/80">
        <span>[ SCENE 05 // COMMS COMPLETE ]</span>
        <span className="text-signal">© {new Date().getFullYear()} YOUSEF BADR</span>
      </div>
    </div>
  );
}
