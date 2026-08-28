import { motion } from "framer-motion";
import { profile } from "../data";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-signal/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 text-center md:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-signal">Contact</p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 font-display text-4xl text-ink sm:text-6xl"
        >
          Let’s build the next live thing.
        </motion.h2>
        <p className="mx-auto mt-5 max-w-xl text-mute">
          Cairo, Egypt — mid-level Flutter engineer at TKDS MENA. Open to mid-level / product mobile
          roles in streaming, sports, and consumer apps. Arabic native, English intermediate.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="btn-signal rounded-full px-6 py-3 text-sm font-semibold"
          >
            {profile.email}
          </a>
          <a
            href={profile.phoneHref}
            className="rounded-full border border-line px-6 py-3 text-sm text-ink"
          >
            {profile.phone}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-6 py-3 text-sm text-ink"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-6 py-3 text-sm text-ink"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
