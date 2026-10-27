import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("INITIALIZING");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stages = [
      { text: "INITIALIZING", at: 0 },
      { text: "LOADING MODULES", at: 20 },
      { text: "BUILDING INTERFACE", at: 50 },
      { text: "ESTABLISHING CONNECTION", at: 75 },
      { text: "READY", at: 95 },
    ];

    let frame = 0;
    const totalFrames = 60; // ~1 second at 60fps
    let animId: number;

    function animate() {
      frame++;
      const p = Math.min(100, (frame / totalFrames) * 100);
      setProgress(p);

      for (let i = stages.length - 1; i >= 0; i--) {
        if (p >= stages[i].at) {
          setText(stages[i].text);
          break;
        }
      }

      if (frame < totalFrames) {
        animId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setLoading(false), 300);
      }
    }
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-page"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="font-mono text-xs tracking-[0.3em] text-signal">{text}</p>
            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-signal transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-display text-2xl tracking-tight text-ink">
              YB<span className="text-signal">.</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
