import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../data";

function SkillBar({ name, delay }: { name: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="group relative">
      <motion.span
        initial={{ opacity: 0, x: -20, scale: 0.9 }}
        animate={visible ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex items-center gap-2 rounded-full border border-signal/15 bg-signal/5 px-3.5 py-2 text-sm text-ink transition-all duration-300 hover:border-signal/50 hover:bg-signal/10 hover:shadow-[0_0_15px_rgba(74,212,194,0.1)] hover:scale-105"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-signal/50 transition-all group-hover:bg-signal group-hover:shadow-[0_0_6px_var(--signal)]" />
        {name}
      </motion.span>
    </div>
  );
}

export function Skills() {
  const groups = Object.entries(skills);

  return (
    <section id="skills" className="gsap-section relative border-y border-line bg-well/40 py-24 overflow-hidden">
      {/* Background HUD lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="absolute left-1/4 top-0 h-full w-px bg-signal" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-signal" />
        <div className="absolute left-3/4 top-0 h-full w-px bg-signal" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-signal" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-signal" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="section-label font-mono text-[10px] uppercase tracking-[0.3em] text-signal">
              ▸ TECH STACK
            </p>
            <h2 className="mt-4 font-display text-4xl text-ink sm:text-6xl">
              Production stack.
            </h2>
            <p className="mt-4 max-w-2xl text-mute">
              Mid-level range: Flutter at store scale, plus Agora, WebRTC, NDI, FFmpeg, payments, and
              Windows — not a beginner toolkit.
            </p>
          </div>
          {/* HUD decoration */}
          <div className="hidden md:flex flex-col items-end gap-1">
            <span className="font-mono text-[10px] text-signal/40 tracking-widest">SYS.CAPABILITIES</span>
            <span className="font-mono text-[10px] text-mute">{Object.values(skills).flat().length} MODULES</span>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {groups.map(([title, items], gi) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1, duration: 0.6 }}
              className="group/card rounded-3xl border border-line bg-panel p-7 shadow-[var(--shadow-card)] transition-all duration-500 hover:border-signal/20 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal/10 text-signal">
                  <span className="font-mono text-xs font-bold">{String(gi + 1).padStart(2, "0")}</span>
                </span>
                <h3 className="font-display text-xl text-ink">{title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((item, ii) => (
                  <SkillBar key={item} name={item} delay={gi * 0.05 + ii * 0.03} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
