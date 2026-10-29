import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./theme";
import { ParticleCanvas } from "./components/ParticleCanvas";
import { CustomCursor } from "./components/CustomCursor";
import { LoadingScreen } from "./components/LoadingScreen";

// Presentation Components
import { CentralStageBackground } from "./components/presentation/CentralStageBackground";
import { PresentationDock } from "./components/presentation/PresentationDock";
import { SlideIntro } from "./components/presentation/SlideIntro";
import { SlideProjectsDeck } from "./components/presentation/SlideProjectsDeck";
import { SlideSkillsRadar } from "./components/presentation/SlideSkillsRadar";
import { SlideExperience } from "./components/presentation/SlideExperience";
import { SlideContact } from "./components/presentation/SlideContact";
import { ProjectDossierModal } from "./components/presentation/ProjectDossierModal";
import { VideoShowcaseModal } from "./components/presentation/VideoShowcaseModal";
import { type Project } from "./data";

const TOTAL_SLIDES = 5;

function PresentationStage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeAccent, setActiveAccent] = useState("#4ad4c2");
  const [inspectProject, setInspectProject] = useState<Project | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const isTransitioning = useRef(false);

  const goToNext = () => {
    if (inspectProject || isVideoModalOpen) return;
    setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES);
  };

  const goToPrev = () => {
    if (inspectProject || isVideoModalOpen) return;
    setCurrentSlide((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (inspectProject || isVideoModalOpen) return;
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key >= "1" && e.key <= "5") {
        setCurrentSlide(parseInt(e.key) - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inspectProject]);

  // Smart Boundary-Aware Wheel Engine: scrolls section content first, then glides to next/prev slide at edges
  useEffect(() => {
    let lastTransition = 0;
    let accumulatedDelta = 0;

    const handleWheel = (e: WheelEvent) => {
      if (inspectProject || isVideoModalOpen) return;
      const now = Date.now();
      if (now - lastTransition < 700) return;

      const el = document.getElementById("active-slide-scroll");
      if (!el) {
        if (e.deltaY > 35) {
          lastTransition = now;
          goToNext();
        } else if (e.deltaY < -35) {
          lastTransition = now;
          goToPrev();
        }
        return;
      }

      const isScrollable = el.scrollHeight > el.clientHeight + 15;
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
      const isAtTop = el.scrollTop <= 20;

      if (e.deltaY > 0) {
        // Scrolling DOWN
        if (!isScrollable || isAtBottom) {
          accumulatedDelta += e.deltaY;
          if (accumulatedDelta > 45) {
            accumulatedDelta = 0;
            lastTransition = now;
            goToNext();
          }
        } else {
          accumulatedDelta = 0;
        }
      } else if (e.deltaY < 0) {
        // Scrolling UP
        if (!isScrollable || isAtTop) {
          accumulatedDelta += e.deltaY;
          if (accumulatedDelta < -45) {
            accumulatedDelta = 0;
            lastTransition = now;
            goToPrev();
          }
        } else {
          accumulatedDelta = 0;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [inspectProject, currentSlide]);

  // Touch Swipe Boundary Support
  useEffect(() => {
    let touchStartY = 0;
    let lastTouchTransition = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (inspectProject) return;
      const now = Date.now();
      if (now - lastTouchTransition < 700) return;

      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 50) return;

      const el = document.getElementById("active-slide-scroll");
      if (!el) return;

      const isScrollable = el.scrollHeight > el.clientHeight + 15;
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 25;
      const isAtTop = el.scrollTop <= 25;

      if (deltaY > 0 && (!isScrollable || isAtBottom)) {
        lastTouchTransition = now;
        goToNext();
      } else if (deltaY < 0 && (!isScrollable || isAtTop)) {
        lastTouchTransition = now;
        goToPrev();
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [inspectProject, currentSlide]);

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden bg-[#070a0f] text-ink select-none font-body overscroll-none">
      {/* 1. Living Canvas Constellation */}
      <ParticleCanvas />

      {/* 2. Central Anchored Portrait & HUD Lights */}
      <CentralStageBackground
        currentSlide={currentSlide}
        activeAccent={activeAccent}
      />

      {/* 3. Screen overlays (subtle grain & scanlines) */}
      <div className="grain" />
      <div className="scanlines" />

      {/* 4. Custom Cursor */}
      <CustomCursor />

      {/* 5. Navigation HUD & Presentation Scrubber */}
      <PresentationDock
        currentSlide={currentSlide}
        totalSlides={TOTAL_SLIDES}
        onSetSlide={setCurrentSlide}
        onPrev={goToPrev}
        onNext={goToNext}
        onOpenVideo={() => setIsVideoModalOpen(true)}
      />

      {/* 6. Active Presentation Slide Scene */}
      <main className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {currentSlide === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <SlideIntro
                onExploreArchive={() => setCurrentSlide(1)}
                onContact={() => setCurrentSlide(4)}
                onOpenVideo={() => setIsVideoModalOpen(true)}
              />
            </motion.div>
          )}

          {currentSlide === 1 && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <SlideProjectsDeck
                onSelectProject={(p) => setInspectProject(p)}
                onAccentChange={(accent) => setActiveAccent(accent)}
              />
            </motion.div>
          )}

          {currentSlide === 2 && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <SlideSkillsRadar />
            </motion.div>
          )}

          {currentSlide === 3 && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <SlideExperience />
            </motion.div>
          )}

          {currentSlide === 4 && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <SlideContact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 7. Full Project Dossier Modal Overlay */}
      <ProjectDossierModal
        project={inspectProject}
        onClose={() => setInspectProject(null)}
      />

      {/* 8. AI Marketing Showcase Video Modal */}
      <VideoShowcaseModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <PresentationStage />
    </ThemeProvider>
  );
}
