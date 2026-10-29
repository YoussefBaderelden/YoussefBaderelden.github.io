import { useMemo, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hasProjectLinks, liveApps, projects, publishedBadge, type Project } from "../data";

const filters = [
  { id: "all", label: "All" },
  { id: "live", label: "Live & broadcast" },
  { id: "sports", label: "Sports media" },
  { id: "product", label: "Products" },
  { id: "tools", label: "Ops tools" },
] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function openProject(id: string) {
  window.location.hash = `project/${id}`;
}

/* ── 3D Tilt Card ── */
function Card({ project, large, index }: { project: Project; large?: boolean; index?: number }) {
  const badge = publishedBadge(project);
  const cardRef = useRef<HTMLElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px) scale3d(1.01,1.01,1.01)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "perspective(800px) rotateY(0) rotateX(0) translateY(0) scale3d(1,1,1)";
    el.addEventListener("transitionend", () => { el.style.transition = ""; }, { once: true });
  }, []);

  return (
    <motion.article
      ref={cardRef as any}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index ?? 0) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      role="link"
      tabIndex={0}
      onClick={() => openProject(project.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProject(project.id); }
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`holo-shimmer group relative cursor-pointer overflow-hidden rounded-3xl border border-line bg-panel ${
        large ? "md:col-span-2 md:grid md:grid-cols-[1.05fr_1fr]" : ""
      }`}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Logo / Image area */}
      <div
        className={`relative flex items-center justify-center overflow-hidden ${
          large ? "min-h-[300px]" : "h-48"
        }`}
        style={{
          background: `radial-gradient(circle at 30% 20%, ${project.accent}33, transparent 55%), var(--well)`,
        }}
      >
        {project.logo ? (
          <img
            src={project.logo}
            alt=""
            className="max-h-36 max-w-[70%] object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(74,212,194,0.2)]"
          />
        ) : (
          <span
            className="font-display text-5xl transition-all duration-500 group-hover:scale-110"
            style={{ color: project.accent, textShadow: `0 0 30px ${project.accent}40` }}
          >
            {project.name[0]}
          </span>
        )}

        {/* Live badge */}
        {project.liveNo && (
          <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-live/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-white" />
            {pad(project.liveNo)} · Live
          </span>
        )}

        {/* Published badge */}
        {badge && (
          <span className="absolute right-4 top-4 rounded-full bg-signal/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-on-signal backdrop-blur-sm">
            {badge}
          </span>
        )}

        {/* Glow accent on hover */}
        <div
          className="absolute inset-x-0 bottom-0 h-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col p-6">
        {/* Platform pills */}
        <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-mute">
          {project.appStore && (
            <a href={project.appStore} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
              className="rounded-full border border-signal/30 bg-signal/8 px-2.5 py-1 text-signal transition-all hover:bg-signal hover:text-on-signal">
              iOS
            </a>
          )}
          {project.playStore && (
            <a href={project.playStore} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
              className="rounded-full border border-signal/30 bg-signal/8 px-2.5 py-1 text-signal transition-all hover:bg-signal hover:text-on-signal">
              Android
            </a>
          )}
          {project.microsoftStore && (
            <a href={project.microsoftStore} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
              className="rounded-full border border-signal/30 bg-signal/8 px-2.5 py-1 text-signal transition-all hover:bg-signal hover:text-on-signal">
              Windows
            </a>
          )}
          {project.website && (
            <a href={project.website} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
              className="rounded-full border border-signal/30 bg-signal/8 px-2.5 py-1 text-signal transition-all hover:bg-signal hover:text-on-signal">
              Web
            </a>
          )}
          {!hasProjectLinks(project) &&
            project.platforms.map((p) => (
              <span key={p} className="rounded-full border border-line px-2.5 py-1">{p}</span>
            ))}
        </div>

        <h3 className="mt-3 font-display text-2xl text-ink transition-colors group-hover:text-signal">
          {project.liveNo ? `${pad(project.liveNo)}. ${project.name}` : project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-mute">
          {large ? project.story : project.blurb}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, large ? 6 : 4).map((t) => (
            <span key={t} className="rounded-full bg-well px-2.5 py-1 text-[11px] text-mute transition-colors group-hover:border-signal/20">
              {t}
            </span>
          ))}
        </div>

        {/* Action row */}
        <div className="mt-5 flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-xs text-mute transition-all group-hover:text-signal group-hover:translate-x-1">
            View details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Live Apps Broadcast Strip ── */
function LiveStrip() {
  return (
    <div className="relative mb-12 overflow-hidden rounded-2xl border border-line bg-panel/80 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-line px-5 py-3">
        <span className="live-dot inline-block h-2 w-2 rounded-full bg-live" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-live">
          LIVE ON STORES
        </span>
        <span className="ml-auto font-mono text-[10px] text-mute">
          {liveApps.length} APPS
        </span>
      </div>
      {/* Scrollable strip */}
      <div className="flex gap-1 overflow-x-auto p-2 scrollbar-hide">
        {liveApps.map((p) => (
          <button
            key={p.id}
            onClick={() => openProject(p.id)}
            className="group/strip flex flex-shrink-0 items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-well"
          >
            <span className="font-display text-lg text-signal/60 group-hover/strip:text-signal">
              {pad(p.liveNo!)}
            </span>
            {p.logo && (
              <img src={p.logo} alt="" className="h-8 w-8 rounded-lg object-contain transition-transform group-hover/strip:scale-110" />
            )}
            <span className="flex flex-col items-start">
              <span className="whitespace-nowrap text-sm font-medium text-ink group-hover/strip:text-signal">
                {p.name}
              </span>
              <span className="flex gap-2 text-[10px] text-mute">
                {p.appStore && <span>iOS</span>}
                {p.playStore && <span>Android</span>}
                {p.microsoftStore && <span>Windows</span>}
                {p.website && <span>Web</span>}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main Work Section ── */
export function Work() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const featured = projects.filter((p) => p.featured);
  const list = useMemo(
    () => (filter === "all" ? projects.filter((p) => !p.featured) : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const showFeatured = filter === "all";

  return (
    <section id="work" className="gsap-section mx-auto max-w-6xl px-5 py-24 md:px-8">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-label font-mono text-[10px] uppercase tracking-[0.3em] text-signal">
            ▸ SELECTED WORK
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-6xl">
            <span className="text-signal">{liveApps.length}</span> live on stores.
          </h2>
          <p className="mt-3 max-w-md text-mute">
            Production apps on iOS, Android, Windows & Web. Not tutorial projects.
          </p>
        </div>
        {/* Filter tabs with sliding indicator */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-2 text-xs tracking-wide transition-all duration-300 ${
                filter === f.id
                  ? "btn-signal glow-signal"
                  : "border border-line text-mute hover:text-ink hover:border-signal/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live strip */}
      <LiveStrip />

      {/* Project grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {showFeatured && (
            <div className="mb-8 grid gap-6">
              {featured.map((p, i) => (
                <Card key={p.id} project={p} large index={i} />
              ))}
            </div>
          )}
          <div className="grid gap-6 sm:grid-cols-2">
            {list.map((p, i) => (
              <Card key={p.id} project={p} index={i} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
