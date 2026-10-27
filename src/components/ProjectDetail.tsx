import { useEffect } from "react";
import { motion } from "framer-motion";
import { categoryLabel, hasProjectLinks, projects, publishedBadge, type Project } from "../data";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function ProjectDetail({ project }: { project: Project }) {
  const index = projects.findIndex((p) => p.id === project.id);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  const published = publishedBadge(project) ?? "In production";

  return (
    <section className="relative min-h-screen overflow-hidden px-5 pb-24 pt-28 md:px-8">
      {/* Accent glow */}
      <div
        className="pointer-events-none absolute -left-20 top-24 h-96 w-96 rounded-full opacity-30 blur-[120px]"
        style={{ background: project.accent }}
      />
      <div
        className="pointer-events-none absolute right-[-10%] bottom-40 h-72 w-72 rounded-full opacity-15 blur-[100px]"
        style={{ background: project.accent }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Back link */}
        <motion.a
          href="#work"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-sm text-mute transition hover:text-signal"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to work
        </motion.a>

        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
        >
          {/* Logo card */}
          <div
            className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[2rem] border border-line p-12 shadow-[var(--shadow-card)]"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${project.accent}44, transparent 55%), var(--well)`,
            }}
          >
            {/* Scan line */}
            <div className="scan-line" />

            {project.logo ? (
              <img
                src={project.logo}
                alt={project.name}
                className="max-h-64 max-w-[80%] object-contain drop-shadow-2xl"
              />
            ) : (
              <span className="font-display text-8xl" style={{ color: project.accent, textShadow: `0 0 40px ${project.accent}40` }}>
                {project.name[0]}
              </span>
            )}
          </div>

          {/* Details */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {project.liveNo && (
                <span className="flex items-center gap-2 rounded-full bg-live/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-white" />
                  {pad(project.liveNo)} · Live
                </span>
              )}
              <span className="rounded-full border border-line px-3 py-1.5 text-[10px] uppercase tracking-wider text-mute">
                {categoryLabel[project.category]}
              </span>
              <span className="rounded-full bg-signal/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-signal">
                {published}
              </span>
            </div>

            <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-6xl">{project.name}</h1>
            <p className="mt-4 text-lg text-ink/70">{project.blurb}</p>

            {/* Platforms */}
            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal/60">PLATFORMS</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.platforms.map((p) => (
                  <span key={p} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Story */}
            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal/60">ABOUT THIS APP</p>
              <p className="mt-3 text-base leading-relaxed text-mute">{project.story}</p>
            </div>

            {/* Stack */}
            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal/60">STACK</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="rounded-full border border-signal/15 bg-signal/5 px-3 py-1.5 text-sm text-ink">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {hasProjectLinks(project) && (
              <div className="mt-10 flex flex-wrap gap-3">
                {project.appStore && (
                  <a href={project.appStore} target="_blank" rel="noreferrer"
                    className="inline-flex rounded-full border border-signal px-5 py-3 text-sm font-semibold text-signal transition-all hover:bg-signal hover:text-on-signal hover:shadow-[0_0_20px_rgba(74,212,194,0.2)]">
                    App Store
                  </a>
                )}
                {project.playStore && (
                  <a href={project.playStore} target="_blank" rel="noreferrer"
                    className="btn-signal inline-flex rounded-full px-5 py-3 text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(74,212,194,0.2)]">
                    Google Play
                  </a>
                )}
                {project.microsoftStore && (
                  <a href={project.microsoftStore} target="_blank" rel="noreferrer"
                    className="btn-signal inline-flex rounded-full px-5 py-3 text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(74,212,194,0.2)]">
                    Microsoft Store
                  </a>
                )}
                {project.website && (
                  <a href={project.website} target="_blank" rel="noreferrer"
                    className="btn-signal inline-flex rounded-full px-5 py-3 text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(74,212,194,0.2)]">
                    Website
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer"
                    className="inline-flex rounded-full border border-line px-5 py-3 text-sm text-ink transition-all hover:border-signal hover:text-signal">
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Prev / Next */}
        <div className="mt-16 flex items-center justify-between border-t border-line pt-8 text-sm">
          {prev ? (
            <a href={`#project/${prev.id}`} className="group flex items-center gap-2 text-mute transition hover:text-signal">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:-translate-x-1">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {prev.name}
            </a>
          ) : <span />}
          {next ? (
            <a href={`#project/${next.id}`} className="group flex items-center gap-2 text-mute transition hover:text-signal">
              {next.name}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          ) : <span />}
        </div>
      </div>
    </section>
  );
}
