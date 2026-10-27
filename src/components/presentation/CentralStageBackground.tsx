import React from "react";
import { motion } from "framer-motion";

interface CentralStageBackgroundProps {
  currentSlide: number;
  activeAccent?: string;
}

export function CentralStageBackground({
  currentSlide,
  activeAccent = "#4ad4c2",
}: CentralStageBackgroundProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Subtle, soft ambient depth lighting across the canvas - NOT centered as a harsh circle */}
      <motion.div
        animate={{
          backgroundColor: activeAccent,
          opacity: currentSlide === 1 ? 0.12 : 0.08,
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-[10%] -left-[10%] h-[70vw] w-[70vw] rounded-full blur-[160px]"
      />

      <div
        className="absolute -bottom-[10%] -right-[10%] h-[60vw] w-[60vw] rounded-full opacity-[0.06] blur-[160px]"
        style={{ background: "#4ad4c2" }}
      />

      {/* Gentle horizontal cinematic vignette */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070a0f] to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#070a0f] to-transparent" />
    </div>
  );
}
