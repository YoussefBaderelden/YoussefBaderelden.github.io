import { motion } from "framer-motion";
import { profile, stats } from "../data";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-24">
      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#2ee6c5]/15 orb" />
      <div
        className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-[#e30613]/12 orb"
        style={{ animationDelay: "-6s" }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:pb-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#2ee6c5]"
          >
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-[#e30613]" />
            Mid-level · Flutter · TKDS MENA · Cairo
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
          >
            Youssef
            <br />
            Bader El Den
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-[#8b93a7] sm:text-xl"
          >
            {profile.role} at TKDS MENA. I own production apps on iOS and Android — ten live in
            stores — plus Agora, WebRTC, NDI, and payments. Not a junior profile.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#work"
              className="rounded-full bg-[#2ee6c5] px-6 py-3 text-sm font-semibold text-[#04110e] transition hover:bg-[#7ff5df]"
            >
              See the work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3 text-sm text-[#f3eee6] transition hover:border-[#2ee6c5]/40"
            >
              Let’s talk
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#2ee6c5]/30 via-transparent to-[#e30613]/30 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0e14]">
            <img
              src={profile.photo}
              alt="Youssef Bader El Den"
              className="aspect-[3/4] w-full object-cover object-[center_18%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
              <p className="font-display text-lg">{profile.role}</p>
              <p className="text-sm text-[#8b93a7]">TKDS MENA · Cairo</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px border border-white/8 bg-white/8 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-[#050608] px-5 py-6"
          >
            <p className="font-display text-3xl text-[#2ee6c5]">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-[#8b93a7]">{s.label}</p>
            {"detail" in s && s.detail && (
              <p className="mt-2 text-[11px] leading-relaxed tracking-wide text-[#f3eee6]">
                {s.detail}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
