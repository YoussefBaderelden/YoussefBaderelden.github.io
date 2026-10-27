import { ticker } from "../data";

export function Marquee() {
  const row = [...ticker, ...ticker];
  return (
    <div className="relative overflow-hidden border-y border-line bg-panel/30 py-4 backdrop-blur-sm">
      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-page to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-page to-transparent" />
      <div className="marquee gap-10 pr-10 text-sm uppercase tracking-[0.22em] text-mute/60">
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
            {t}
            <span className="text-signal/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
