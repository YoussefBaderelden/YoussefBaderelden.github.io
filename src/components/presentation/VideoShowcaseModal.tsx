import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_URL =
  "https://wa.me/201146066036?text=Hi%20Yousef,%20I%20watched%20your%20showcase%20video%20and%20would%20like%20to%20discuss%20a%20project!";

export function VideoShowcaseModal({ isOpen, onClose }: VideoShowcaseModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Restart video when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: if browser blocks unmuted audio, user clicks play
      });
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center max-h-[96vh] w-full max-w-md rounded-3xl border border-line/90 bg-[#070b10] p-4 sm:p-5 shadow-[0_0_60px_rgba(74,212,194,0.18)]"
          >
            {/* Top HUD Telemetry Header */}
            <div className="flex w-full items-center justify-between border-b border-line/60 pb-3 font-mono text-[11px] sm:text-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                </span>
                <span className="font-bold uppercase tracking-wider text-white">
                  LIVE BROADCAST REEL
                </span>
                <span className="text-signal">// 45s</span>
              </div>

              <button
                onClick={onClose}
                className="rounded-full border border-line bg-panel/60 px-2.5 py-1 text-mute hover:border-signal hover:text-signal transition-all"
                title="Close (ESC)"
              >
                ✕ ESC
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative mt-3 flex w-full justify-center overflow-hidden rounded-2xl border border-line/60 bg-black shadow-2xl">
              <video
                ref={videoRef}
                src="./yousef-badr-showcase.mp4"
                controls
                playsInline
                className="max-h-[64vh] sm:max-h-[68vh] w-auto rounded-2xl object-contain shadow-inner"
              />
            </div>

            {/* Video Action Bar & Quick Links */}
            <div className="mt-3.5 flex w-full items-center justify-between gap-2">
              <a
                href="./yousef-badr-showcase.mp4"
                download="Yousef-Badr-Flutter-Showcase.mp4"
                className="flex items-center gap-1.5 rounded-full border border-line bg-panel/60 px-3.5 py-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-ink hover:border-signal hover:text-signal transition-all"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                <span>Download MP4</span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/20 px-4 py-2 font-mono text-[10px] sm:text-[11px] font-semibold text-white shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:bg-[#25D366] hover:text-black transition-all"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] animate-pulse" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
