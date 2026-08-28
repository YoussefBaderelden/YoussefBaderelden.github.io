import { motion } from "framer-motion";
import { experience, profile } from "../data";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <p className="text-xs uppercase tracking-[0.28em] text-[#2ee6c5]">Path</p>
      <h2 className="mt-3 font-display text-4xl sm:text-5xl">Work & study.</h2>
      <div className="mt-12 space-y-0">
        {experience.map((job, i) => (
          <motion.article
            key={job.org + job.role}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="grid gap-4 border-t border-white/8 py-8 md:grid-cols-[200px_1fr]"
          >
            <p className="text-sm text-[#8b93a7]">{job.period}</p>
            <div>
              <h3 className="font-display text-2xl">{job.role}</h3>
              <p className="mt-1 text-[#2ee6c5]">
                {job.org} · {job.place}
              </p>
              <ul className="mt-4 space-y-2 text-[#8b93a7]">
                {job.points.map((p) => (
                  <li key={p} className="leading-relaxed">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
        <article className="grid gap-4 border-t border-white/8 py-8 md:grid-cols-[200px_1fr]">
          <p className="text-sm text-[#8b93a7]">{profile.year}</p>
          <div>
            <h3 className="font-display text-2xl">B.Sc. Electronics & Communication</h3>
            <p className="mt-1 text-[#2ee6c5]">{profile.university}</p>
            <p className="mt-4 text-[#8b93a7]">
              Final-year engineering student. The ECE background is why realtime media — codecs,
              networks, latency — feels like home, not a black box.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
