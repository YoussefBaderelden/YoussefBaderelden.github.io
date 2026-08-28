import { motion } from "framer-motion";
import { experience, profile } from "../data";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <p className="text-xs uppercase tracking-[0.28em] text-signal">Path</p>
      <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Work & study.</h2>
      <div className="mt-12 space-y-0">
        {experience.map((job, i) => (
          <motion.article
            key={job.org + job.role + job.period}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="grid gap-4 border-t border-line py-8 md:grid-cols-[220px_1fr]"
          >
            <p className="text-sm text-mute">{job.period}</p>
            <div>
              <h3 className="font-display text-2xl text-ink">{job.role}</h3>
              <p className="mt-1 text-signal">
                {job.org} · {job.place}
              </p>
              <ul className="mt-4 space-y-2 text-mute">
                {job.points.map((p) => (
                  <li key={p} className="leading-relaxed">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
        <article className="grid gap-4 border-t border-line py-8 md:grid-cols-[220px_1fr]">
          <p className="text-sm text-mute">{profile.educationPeriod}</p>
          <div>
            <h3 className="font-display text-2xl text-ink">B.Sc. Computer Engineering</h3>
            <p className="mt-1 text-signal">{profile.university}</p>
            <p className="mt-4 text-mute">
              {profile.year}. The engineering course load — networks, signals, systems — is why live
              video, codecs, and latency feel like the job, not a mystery.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
