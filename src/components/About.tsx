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
            Engineer who actually ships live video.
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-5 text-lg leading-relaxed text-[#8b93a7]"
        >
          <p>
            I’m {profile.name}, a Flutter developer in {profile.city}. Final-year student in{" "}
            {profile.major} at {profile.university}. By day I work at{" "}
            <span className="text-[#f3eee6]">TKDS Media</span> on sports broadcast apps. On the
            side I build products like Pasty — design your own cake, then buy sweets — and I spent
            serious time inside BikMedia’s live stack.
          </p>
          <p>
            The work I care about sits at the edge of the camera: Agora rooms, WebRTC peer
            connections, NDI into OBS, beauty filters on the encode path, and the unglamorous
            optimizations that keep a live chat from melting a phone.
          </p>
          <p>
            Trained through Route and DEPI. Comfortable owning iOS, Android, Windows, and web
            from the same Dart codebase.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
