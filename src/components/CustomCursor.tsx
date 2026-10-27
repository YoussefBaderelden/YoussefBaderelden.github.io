import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };

    const onEnterInteractive = () => {
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "var(--signal)";
      ring.style.opacity = "0.6";
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px) scale(1.5)`;
    };

    const onLeaveInteractive = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "var(--signal)";
      ring.style.opacity = "0.3";
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px) scale(1)`;
    };

    // Ring follows with delay
    function raf() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(raf);
    }
    const animId = requestAnimationFrame(raf);

    window.addEventListener("mousemove", onMove);

    // Watch for interactive elements
    const observer = new MutationObserver(() => bindInteractives());
    observer.observe(document.body, { childList: true, subtree: true });

    function bindInteractives() {
      const els = document.querySelectorAll("a, button, [role='link'], [role='button'], .magnetic");
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    }
    bindInteractives();

    // Hide default cursor globally
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = "a,button,[role='link'],[role='button'],.magnetic{cursor:none!important;}";
    document.head.appendChild(style);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      document.body.style.cursor = "";
      style.remove();
    };
  }, []);

  // Don't render on touch
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-signal"
        style={{ transition: "transform 0.05s linear, background 0.2s" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-signal"
        style={{
          width: 36,
          height: 36,
          opacity: 0.3,
          transition: "width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, opacity 0.3s",
        }}
      />
    </>
  );
}
