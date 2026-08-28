import { motion } from "framer-motion";
import { skills } from "../data";

export function Skills() {
  const groups = Object.entries(skills);
  return (
    <section id="skills" className="border-y border-white/8 bg-[#08090d] py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#2ee6c5]">Stack</p>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl">Skills — CV plus the rest.</h2>
        <p className="mt-4 max-w-2xl text-[#8b93a7]">
          The résumé listed Flutter, Firebase, and BLoC. The work also includes Agora, WebRTC, NDI,
          FFmpeg, payments, Windows, and store releases.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {groups.map(([title, items], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-3xl border border-white/8 bg-[#0c0e14] p-7"
            >
              <h3 className="font-display text-xl">{title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#2ee6c5]/20 bg-[#2ee6c5]/5 px-3 py-1.5 text-sm text-[#d7fff6]"
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
