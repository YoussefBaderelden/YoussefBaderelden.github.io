import { motion } from "framer-motion";
import { profile } from "../data";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/8 py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#2ee6c5]/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 text-center md:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#2ee6c5]">Contact</p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 font-display text-4xl sm:text-6xl"
        >
          Let’s build the next live thing.
        </motion.h2>
        <p className="mx-auto mt-5 max-w-xl text-[#8b93a7]">
          Cairo-based Flutter developer at TKDS MENA. Open to mobile roles, broadcast products,
          and consumer apps. Arabic native, English intermediate. Send the brief.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-[#2ee6c5] px-6 py-3 text-sm font-semibold text-[#04110e]"
          >
            {profile.email}
          </a>
          <a
            href={profile.phoneHref}
            className="rounded-full border border-white/15 px-6 py-3 text-sm"
          >
            {profile.phone}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-6 py-3 text-sm"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-6 py-3 text-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
