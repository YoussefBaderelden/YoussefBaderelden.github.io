import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data";

function TerminalLine({ text, delay }: { text: string; delay: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i > text.length) {
          setDone(true);
          clearInterval(interval);
        } else {
          setDisplayed(text.slice(0, i));
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  if (!started) return null;
  return (
    <span className="block">
      <span className="text-signal/50">{">"}</span>{" "}
      <span>{displayed}</span>
      {!done && <span className="text-signal animate-pulse">▌</span>}
    </span>
  );
}

export function Contact() {
  return (
    <section id="contact" className="gsap-section relative overflow-hidden border-t border-line py-24">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-signal/8 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-5 text-center md:px-8">
        <p className="section-label font-mono text-[10px] uppercase tracking-[0.3em] text-signal">
          ▸ ESTABLISH CONNECTION
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <h2 className="font-display text-4xl text-ink sm:text-7xl">
            Let's build the next
            <br />
            <span className="text-signal text-glow-signal">live thing.</span>
          </h2>
        </motion.div>

        {/* Terminal box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-10 max-w-lg rounded-2xl border border-line bg-panel/80 p-6 text-left backdrop-blur-sm"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-live/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <span className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="ml-3 font-mono text-[10px] text-mute">terminal — contact</span>
          </div>
          <div className="font-mono text-sm leading-loose text-mute space-y-1">
            <TerminalLine text="ESTABLISHING CONNECTION..." delay={500} />
            <TerminalLine text="SIGNAL ACQUIRED ✓" delay={1800} />
            <TerminalLine text={`LOCATION: ${profile.city}`} delay={2800} />
            <TerminalLine text={`ROLE: ${profile.role}`} delay={3500} />
            <TerminalLine text="READY FOR CONTACT ✓" delay={4200} />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-6 max-w-xl text-mute"
        >
          Cairo, Egypt — mid-level Flutter engineer at TKDS MENA. Open to mid-level / product mobile
          roles in streaming, sports, and consumer apps.
        </motion.p>

        {/* Contact buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <a
            href={`mailto:${profile.email}`}
            className="magnetic btn-signal rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide hover:shadow-[0_0_30px_rgba(74,212,194,0.3)]"
          >
            {profile.email}
          </a>
          <a
            href={profile.phoneHref}
            className="magnetic group rounded-full border border-line px-6 py-3.5 text-sm text-ink transition-all hover:border-signal hover:shadow-[0_0_15px_rgba(74,212,194,0.1)]"
          >
            {profile.phone}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="magnetic rounded-full border border-line px-6 py-3.5 text-sm text-ink transition-all hover:border-signal hover:shadow-[0_0_15px_rgba(74,212,194,0.1)]"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="magnetic rounded-full border border-line px-6 py-3.5 text-sm text-ink transition-all hover:border-signal hover:shadow-[0_0_15px_rgba(74,212,194,0.1)]"
          >
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
