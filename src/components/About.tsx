import { motion } from "framer-motion";
import { profile } from "../data";

export function About() {
  return (
    <section id="about" className="gsap-section mx-auto max-w-6xl px-5 py-24 md:px-8">
      <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label font-mono text-[10px] uppercase tracking-[0.3em] text-signal">
            ▸ ABOUT
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-6xl">
            Mid-level.
            <br />
            <span className="text-signal">Shipped</span> on stores.
            <br />
            Built for live.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="space-y-6 text-lg leading-relaxed text-mute"
        >
          <p className="text-ink/80 text-xl leading-relaxed">{profile.summary}</p>
          <p>
            I'm {profile.name}, based in {profile.city}. Mid-level Flutter engineer, {profile.year}{" "}
            in {profile.major} at {profile.university}. At{" "}
            <span className="font-medium text-ink">TKDS MENA</span> I own production mobile for a
            broadcasting company — not intern tasks.
          </p>
          <p>
            Across my work, <span className="font-semibold text-signal">13 apps are live</span> across
            iOS, Android, Windows and web: Fizz Party, TKDS Streamer, NGN, TKDS Sports, BikMedia,
            Pasty, TKDS Radio, Maadi Sports, ASN TV, Sports Flix, Southwest Ohio, TKDS VAR, and
            PlayTooWin.
          </p>

          {/* Quick stats row */}
          <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-line bg-panel/60 p-5">
            <div>
              <p className="font-display text-2xl text-signal">13</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-mute">LIVE APPS</p>
            </div>
            <div>
              <p className="font-display text-2xl text-signal">4</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-mute">PLATFORMS</p>
            </div>
            <div>
              <p className="font-display text-2xl text-signal">20+</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-mute">TOTAL APPS</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
