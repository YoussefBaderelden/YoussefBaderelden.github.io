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
      <div
        className="pointer-events-none absolute -left-20 top-24 h-80 w-80 rounded-full opacity-40 blur-3xl"
        style={{ background: project.accent }}
      />
      <div className="relative mx-auto max-w-5xl">
        <a href="#work" className="inline-flex items-center gap-2 text-sm text-mute transition hover:text-signal">
          ← Back to work
        </a>

        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
        >
          <div
            className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[2rem] border border-line p-10 shadow-[var(--shadow-card)]"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${project.accent}44, transparent 55%), var(--well)`,
            }}
          >
            {project.logo ? (
              <img
                src={project.logo}
                alt={project.name}
                className="max-h-64 max-w-[80%] object-contain drop-shadow-2xl"
              />
            ) : (
              <span className="font-display text-8xl" style={{ color: project.accent }}>
                {project.name[0]}
              </span>
            )}
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {project.liveNo && (
                <span className="rounded-full bg-live px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  {pad(project.liveNo)} · Live
                </span>
              )}
              <span className="rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-wider text-mute">
                {categoryLabel[project.category]}
              </span>
              <span className="rounded-full bg-signal/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-signal">
                {published}
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-6xl">{project.name}</h1>
            <p className="mt-4 text-lg text-ink/80">{project.blurb}</p>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.22em] text-mute">Platforms</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.platforms.map((p) => (
                  <span key={p} className="rounded-full border border-line px-3 py-1 text-sm text-ink">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.22em] text-mute">About this app</p>
              <p className="mt-3 text-base leading-relaxed text-mute">{project.story}</p>
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.22em] text-mute">Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="rounded-full bg-well px-3 py-1.5 text-sm text-ink">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {hasProjectLinks(project) && (
              <div className="mt-10 flex flex-wrap gap-3">
                {project.appStore && (
                  <a
                    href={project.appStore}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-signal px-5 py-3 text-sm font-semibold text-signal transition hover:bg-signal hover:text-on-signal"
                  >
                    Open App Store
                  </a>
                )}
                {project.playStore && (
                  <a
                    href={project.playStore}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-signal inline-flex rounded-full px-5 py-3 text-sm font-semibold transition"
                  >
                    Open Google Play
                  </a>
                )}
                {project.microsoftStore && (
                  <a
                    href={project.microsoftStore}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-signal inline-flex rounded-full px-5 py-3 text-sm font-semibold transition"
                  >
                    Open Microsoft Store
                  </a>
                )}
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-signal inline-flex rounded-full px-5 py-3 text-sm font-semibold transition"
                  >
                    Open website
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-line px-5 py-3 text-sm text-ink hover:border-signal"
                  >
                    Open GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>

        <div className="mt-16 flex items-center justify-between border-t border-line pt-8 text-sm">
          {prev ? (
            <a href={`#project/${prev.id}`} className="text-mute hover:text-signal">
              ← {prev.name}
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a href={`#project/${next.id}`} className="text-mute hover:text-signal">
              {next.name} →
            </a>
          ) : (
            <span />
          )}
        </div>
      </div>
    </section>
  );
}
