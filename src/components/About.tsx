import { motion } from "framer-motion";
import { profile } from "../data";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.28em] text-[#2ee6c5]">About</p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            Shipped on stores. Built for live.
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-5 text-lg leading-relaxed text-[#8b93a7]"
        >
          <p>{profile.summary}</p>
          <p>
            I’m {profile.name}, based in {profile.city}. {profile.year} in {profile.major} at{" "}
            {profile.university}. At <span className="text-[#f3eee6]">TKDS MENA</span> I own the
            mobile surface for a broadcasting company — Fizz Party, TKDS Streamer, NGN, TKDS Radio —
            then the rest of the media family, VAR, and scoring tools.
          </p>
          <p>
            Outside the CV line-items: BikMedia (Agora, filters, Game Live fetcher), Pasty (design
            your cake and buy sweets — launching soon), Windows VAR, NDI into OBS. Trained at DEPI,
            Route Academy, and Digital HUB. I care about UI that feels finished and streams that
            don’t drop frames.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
