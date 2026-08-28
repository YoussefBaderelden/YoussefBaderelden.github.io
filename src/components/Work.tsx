import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "../data";

const filters = [
  { id: "all", label: "All" },
  { id: "live", label: "Live & broadcast" },
  { id: "sports", label: "Sports media" },
  { id: "product", label: "Products" },
  { id: "tools", label: "Ops tools" },
] as const;

function Card({ project, large }: { project: Project; large?: boolean }) {
  return (
    <article
      className={`card-3d group relative overflow-hidden rounded-3xl border border-white/8 bg-[#0c0e14] ${
        large ? "md:col-span-2 md:grid md:grid-cols-[1.05fr_1fr]" : ""
      }`}
    >
      <div
        className={`relative flex items-center justify-center overflow-hidden ${
          large ? "min-h-[280px]" : "h-44"
        }`}
        style={{
          background: `radial-gradient(circle at 30% 20%, ${project.accent}33, transparent 55%), #090b10`,
        }}
      >
        {project.logo ? (
          <img
            src={project.logo}
            alt=""
            className="max-h-36 max-w-[70%] object-contain drop-shadow-2xl transition duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="font-display text-4xl" style={{ color: project.accent }}>
            {project.name[0]}
          </span>
        )}
        {project.status && (
          <span className="absolute right-4 top-4 rounded-full bg-[#2ee6c5] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#04110e]">
            {project.status}
          </span>
        )}
      </div>
      <div className="flex flex-col p-6">
        <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-[#8b93a7]">
          {project.platforms.map((p) => (
            <span key={p} className="rounded-full border border-white/10 px-2 py-0.5">
              {p}
            </span>
          ))}
        </div>
        <h3 className="mt-3 font-display text-2xl">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#8b93a7]">
          {large ? project.story : project.blurb}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, large ? 6 : 4).map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-[#c5c9d6]"
            >
              {t}
            </span>
          ))}
        </div>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="mt-5 text-sm text-[#2ee6c5] hover:underline"
          >
            View on GitHub →
          </a>
        )}
      </div>
    </article>
  );
}

export function Work() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const featured = projects.filter((p) => p.featured);
  const list = useMemo(
    () =>
      filter === "all" ? projects.filter((p) => !p.featured) : projects.filter((p) => p.category === filter),
    [filter],
  );

  const showFeatured = filter === "all";

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#2ee6c5]">Selected work</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Apps I actually built.</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-2 text-xs tracking-wide transition ${
                filter === f.id
                  ? "bg-[#2ee6c5] text-[#04110e]"
                  : "border border-white/10 text-[#8b93a7] hover:text-[#f3eee6]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          {showFeatured && (
            <div className="mb-6 grid gap-6">
              {featured.map((p) => (
                <Card key={p.id} project={p} large />
              ))}
            </div>
          )}
          <div className="grid gap-6 sm:grid-cols-2">
            {list.map((p) => (
              <Card key={p.id} project={p} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
