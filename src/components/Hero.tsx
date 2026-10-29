import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { profile, stats } from "../data";

function useCounter(end: string, duration = 1800) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const num = parseInt(end);
          if (isNaN(num)) {
            // Non-numeric value like "Nov '25"
            let i = 0;
            const interval = setInterval(() => {
              i++;
              if (i >= end.length) {
                setDisplay(end);
                clearInterval(interval);
              } else {
                setDisplay(end.slice(0, i) + "█");
              }
            }, 60);
            return;
          }
          const start = performance.now();
          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * num);
            setDisplay(String(current));
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplay(end);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { display, ref };
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i > text.length) {
          setDone(true);
          clearInterval(interval);
        } else {
          setDisplayed(text.slice(0, i));
        }
      }, 45);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayed}
      {!done && <span className="text-signal animate-pulse">▌</span>}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-24">
      {/* Parallax orbs */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-signal/10 orb" />
      <div
        className="pointer-events-none absolute right-[-5%] top-32 h-[500px] w-[500px] rounded-full bg-live/8 orb"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 bottom-20 h-72 w-72 rounded-full bg-glow/5 orb"
        style={{ animationDelay: "-12s" }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:pb-24">
        <div>
          {/* HUD Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="live-dot inline-block h-2.5 w-2.5 rounded-full bg-live" />
            <span className="hud-bracket text-[11px] uppercase tracking-[0.2em] text-signal">
              ONLINE · CAIRO, EGYPT
            </span>
          </motion.div>

          {/* Giant name with typewriter */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-display text-6xl leading-[0.92] tracking-tight text-ink sm:text-8xl lg:text-9xl"
          >
            <span className="glitch-text" data-text={profile.first}>
              <TypewriterText text={profile.first} delay={400} />
            </span>
            <br />
            <span className="glitch-text text-signal" data-text={profile.last}>
              <TypewriterText text={profile.last} delay={800} />
            </span>
          </motion.h1>

          {/* Role with HUD bracket */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-6 hud-bracket text-sm uppercase tracking-[0.15em] text-mute"
          >
            {profile.role}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-mute"
          >
            Production apps on iOS, Android, Windows & Web — <span className="text-ink">13 live products</span>.
            Agora, WebRTC, NDI, payments. Not a junior profile.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#work"
              className="magnetic btn-signal rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,212,194,0.3)]"
            >
              See the work
            </a>
            <a
              href="#contact"
              className="magnetic group rounded-full border border-line px-7 py-3.5 text-sm text-ink transition-all duration-300 hover:border-signal hover:shadow-[0_0_20px_rgba(74,212,194,0.1)]"
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-signal transition-all group-hover:shadow-[0_0_8px_var(--signal)]" />
              Let's talk
            </a>
          </motion.div>
        </div>

        {/* Photo with rotating ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          {/* Rotating gradient ring */}
          <div className="absolute -inset-3 rounded-[2rem]">
            <div
              className="rotate-ring h-full w-full rounded-[2rem]"
              style={{
                background: "conic-gradient(from 0deg, #4ad4c2, #00ffcc, transparent, #e30613, #4ad4c2)",
                opacity: 0.4,
                filter: "blur(8px)",
              }}
            />
          </div>
          {/* Outer glow */}
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-signal/20 via-transparent to-live/15 blur-3xl" />
          {/* Photo container */}
          <div className="relative overflow-hidden rounded-[2rem] border border-line/50 bg-panel shadow-[var(--shadow-card)]">
            <img
              src={profile.photo}
              alt={profile.name}
              className="aspect-[3/4] w-full object-cover object-[center_12%]"
            />
            {/* Scan line overlay */}
            <div className="scan-line" />
            {/* Bottom gradient info */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <div className="flex items-center gap-2">
                <span className="live-dot inline-block h-2 w-2 rounded-full bg-live" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                  BROADCAST ACTIVE
                </span>
              </div>
              <p className="mt-2 font-display text-lg text-white">{profile.role}</p>
              <p className="text-sm text-white/60">TKDS MENA · Cairo, Egypt</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats counters */}
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-2 gap-[1px] overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {stats.map((s, i) => {
            const counter = useCounter(s.value, 1600);
            return (
              <motion.div
                key={s.label}
                ref={counter.ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-panel px-6 py-7"
              >
                <p className="font-display text-4xl text-signal text-glow-signal">
                  {counter.display}
                  {s.value.includes("+") && <span className="text-signal/50">+</span>}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                  {s.label}
                </p>
                {"detail" in s && s.detail && (
                  <p className="mt-2 text-[11px] leading-relaxed text-ink/60">{s.detail}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
