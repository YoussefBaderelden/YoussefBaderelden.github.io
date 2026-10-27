import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:block">
      <div className="relative h-32 w-[2px] rounded-full bg-line">
        <div
          className="absolute left-0 top-0 w-full rounded-full bg-signal transition-all duration-150"
          style={{ height: `${progress * 100}%` }}
        />
        <div
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-signal shadow-[0_0_8px_var(--signal)]"
          style={{ top: `calc(${progress * 100}% - 4px)` }}
        />
      </div>
    </div>
  );
}
