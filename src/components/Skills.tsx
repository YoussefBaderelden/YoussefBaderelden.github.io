import { motion } from "framer-motion";
import { skills } from "../data";

export function Skills() {
  const groups = Object.entries(skills);
  return (
    <section id="skills" className="border-y border-line bg-well/60 py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-signal">Stack</p>
        <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Production stack.</h2>
        <p className="mt-4 max-w-2xl text-mute">
          Mid-level range: Flutter at store scale, plus Agora, WebRTC, NDI, FFmpeg, payments, and
          Windows — not a beginner toolkit.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {groups.map(([title, items], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-3xl border border-line bg-panel p-7 shadow-[var(--shadow-card)]"
            >
              <h3 className="font-display text-xl text-ink">{title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-signal/20 bg-signal/10 px-3 py-1.5 text-sm text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
