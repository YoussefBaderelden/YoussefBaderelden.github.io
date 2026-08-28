import { ticker } from "../data";

export function Marquee() {
  const row = [...ticker, ...ticker];
  return (
    <div className="overflow-hidden border-y border-white/8 py-4">
      <div className="marquee gap-10 pr-10 text-sm uppercase tracking-[0.22em] text-[#8b93a7]">
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-10">
            {t}
            <span className="text-[#2ee6c5]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
