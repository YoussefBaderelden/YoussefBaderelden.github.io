import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { publishedBadge, type Project } from "../../data";

interface ProjectDossierModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDossierModal({
  project,
  onClose,
}: ProjectDossierModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  const published = publishedBadge(project) ?? "Production Live";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#070a0f]/90 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="no-scrollbar relative max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-line bg-panel/95 p-4 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl"
          style={{
            borderColor: `${project.accent}66`,
            boxShadow: `0 20px 60px -15px ${project.accent}30, 0 0 40px ${project.accent}20`,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close Dossier"
            className="absolute right-3.5 top-3.5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel text-ink transition-all hover:border-signal hover:text-signal"
          >
            ✕
          </button>

          {/* Dossier Header */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-black"
              style={{ backgroundColor: project.accent }}
            >
              DOSSIER // {project.category.toUpperCase()}
            </span>
            <span className="rounded-full border border-line bg-well px-3 py-1 font-mono text-[10px] text-signal">
              {published}
            </span>
          </div>

          <div className="mt-6 grid items-start gap-6 md:gap-8 md:grid-cols-[1.1fr_0.9fr]">
            {/* Left Story */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink">
                {project.name}
              </h2>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg font-medium text-ink/80">{project.blurb}</p>

              <div className="mt-5 sm:mt-6">
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-signal">
                  TECHNICAL BRIEF
                </span>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-mute whitespace-pre-line">
                  {project.story}
                </p>
              </div>

              {/* Architecture Tags */}
              <div className="mt-5 sm:mt-6">
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-signal">
                  STACK & ARCHITECTURE
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-line bg-well px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[11px] sm:text-xs text-mute"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Supported Platforms */}
              <div className="mt-5 sm:mt-6">
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-signal">
                  PLATFORMS
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                  {project.platforms.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-line px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[11px] sm:text-xs text-ink"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Outbound Links */}
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3">
                {project.appStore && (
                  <a
                    href={project.appStore}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-signal rounded-full px-4 py-2 sm:px-5 sm:py-2.5 font-mono text-[11px] sm:text-xs font-semibold"
                  >
                    Apple App Store ↗
                  </a>
                )}
                {project.playStore && (
                  <a
                    href={project.playStore}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-signal rounded-full px-4 py-2 sm:px-5 sm:py-2.5 font-mono text-[11px] sm:text-xs font-semibold"
                  >
                    Google Play ↗
                  </a>
                )}
                {project.microsoftStore && (
                  <a
                    href={project.microsoftStore}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-signal rounded-full px-4 py-2 sm:px-5 sm:py-2.5 font-mono text-[11px] sm:text-xs font-semibold"
                  >
                    Microsoft Store ↗
                  </a>
                )}
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-signal rounded-full px-4 py-2 sm:px-5 sm:py-2.5 font-mono text-[11px] sm:text-xs font-semibold"
                  >
                    Launch Web ↗
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-line bg-panel px-4 py-2 sm:px-5 sm:py-2.5 font-mono text-[11px] sm:text-xs text-ink hover:border-signal"
                  >
                    GitHub Repo ↗
                  </a>
                )}
              </div>
            </div>

            {/* Right Media Frame - displayed on top on mobile */}
            <div
              className="order-first md:order-last flex min-h-[160px] sm:min-h-[240px] md:min-h-[300px] items-center justify-center rounded-3xl border border-line p-4 sm:p-8 shadow-inner"
              style={{
                background: `radial-gradient(circle at 50% 40%, ${project.accent}33, #0a0e14 80%)`,
              }}
            >
              {project.logo ? (
                <img
                  src={project.logo}
                  alt={project.name}
                  className="max-h-32 sm:max-h-52 md:max-h-60 max-w-[85%] object-contain drop-shadow-2xl"
                />
              ) : (
                <span
                  className="font-display text-6xl sm:text-8xl font-bold"
                  style={{ color: project.accent }}
                >
                  {project.name[0]}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

