import { motion } from "framer-motion";
import { profile } from "../data";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Path" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#050608]/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="font-display text-lg tracking-tight">
          YB<span className="text-[#2ee6c5]">.</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-[#8b93a7] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#f3eee6]">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/10 px-4 py-1.5 text-xs tracking-wide text-[#f3eee6] transition hover:border-[#2ee6c5]/50 hover:text-[#2ee6c5]"
        >
          GitHub
        </a>
      </div>
    </motion.header>
  );
}
