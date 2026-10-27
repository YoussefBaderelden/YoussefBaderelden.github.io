import { profile } from "../data";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between">
        <p className="font-display text-lg text-ink">
          YB<span className="text-signal">.</span>
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
          © {new Date().getFullYear()} {profile.name} · Mid-level Flutter Engineer · Cairo, Egypt
        </p>
        <div className="flex gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-mute transition hover:text-signal"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-mute transition hover:text-signal"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-xs text-mute transition hover:text-signal"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
