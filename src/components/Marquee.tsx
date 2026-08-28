import { ticker } from "../data";

export function Marquee() {
  const row = [...ticker, ...ticker];
  return (
    <div className="overflow-hidden border-y border-line py-4">
      <div className="marquee gap-10 pr-10 text-sm uppercase tracking-[0.22em] text-mute">
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-10">
            {t}
            <span className="text-signal">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
