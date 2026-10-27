import { motion } from "framer-motion";
import { experience, profile } from "../data";

export function Experience() {
  return (
    <section id="experience" className="gsap-section mx-auto max-w-6xl px-5 py-24 md:px-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="section-label font-mono text-[10px] uppercase tracking-[0.3em] text-signal">
            ▸ SIGNAL PATH
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-6xl">Work & study.</h2>
        </div>
        <span className="hidden font-mono text-[10px] text-mute md:block">
          {experience.length + 1} NODES
        </span>
      </div>

      <div className="relative mt-14">
        {/* Vertical signal line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-signal/40 via-signal/20 to-transparent md:left-[109px]" />

        {experience.map((job, i) => (
          <motion.article
            key={job.org + job.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid gap-4 pb-10 pl-14 md:grid-cols-[220px_1fr] md:pl-0"
          >
            {/* Signal node */}
            <div className="absolute left-[18px] top-2 md:left-[103px]">
              <div className={`h-4 w-4 rounded-full border-2 ${
                i === 0
                  ? "border-signal bg-signal/30 signal-dot"
                  : "border-signal/40 bg-panel"
              }`} />
            </div>

            {/* Period */}
            <div className="md:text-right md:pr-12">
              <span className="font-mono text-xs text-signal/70 tracking-wide">{job.period}</span>
              {i === 0 && (
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-signal/10 px-2 py-0.5 text-[9px] uppercase tracking-widest text-signal md:ml-0 md:mt-2 md:flex md:w-fit md:justify-end">
                  <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                  ACTIVE
                </span>
              )}
            </div>

            {/* Content */}
            <div className={`rounded-2xl border p-6 transition-all duration-500 ${
              i === 0
                ? "border-signal/30 bg-panel shadow-[0_0_30px_rgba(74,212,194,0.06)]"
                : "border-line bg-panel/60 hover:border-signal/20"
            }`}>
              <h3 className="font-display text-2xl text-ink">{job.role}</h3>
              <p className="mt-1.5 flex items-center gap-2 text-signal">
                <span className="font-medium">{job.org}</span>
                <span className="text-mute">·</span>
                <span className="text-sm text-mute">{job.place}</span>
              </p>
              <ul className="mt-4 space-y-2.5">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-mute">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-signal/40" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}

        {/* Education node */}
        <motion.article
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative grid gap-4 pl-14 md:grid-cols-[220px_1fr] md:pl-0"
        >
          <div className="absolute left-[18px] top-2 md:left-[103px]">
            <div className="h-4 w-4 rounded-full border-2 border-line bg-panel" />
          </div>
          <div className="md:text-right md:pr-12">
            <span className="font-mono text-xs text-signal/70 tracking-wide">{profile.educationPeriod}</span>
          </div>
          <div className="rounded-2xl border border-line bg-panel/60 p-6">
            <h3 className="font-display text-2xl text-ink">B.Sc. Computer Engineering</h3>
            <p className="mt-1.5 text-signal">{profile.university}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-mute">
              {profile.year}. The engineering course load — networks, signals, systems — is why live
              video, codecs, and latency feel like the job, not a mystery.
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
