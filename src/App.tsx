import { useEffect, useState } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Nav } from "./components/Nav";
import { ProjectDetail } from "./components/ProjectDetail";
import { Skills } from "./components/Skills";
import { Work } from "./components/Work";
import { ThemeProvider } from "./theme";
import { getProject } from "./data";

function readProjectId() {
  const match = window.location.hash.match(/^#project\/([^/?]+)/);
  return match?.[1] ?? null;
}

export default function App() {
  const [projectId, setProjectId] = useState(readProjectId);

  useEffect(() => {
    const onHash = () => setProjectId(readProjectId());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const project = projectId ? getProject(projectId) : undefined;

  return (
    <ThemeProvider>
    <div className="relative grid-bg min-h-screen">
      <div className="grain" />
      <div className="scanlines" />
      <Nav />
      {project ? (
        <main>
          <ProjectDetail project={project} />
        </main>
      ) : (
        <main>
          <Hero />
          <Marquee />
          <About />
          <Work />
          <Skills />
          <Experience />
          <Contact />
        </main>
      )}
      <Footer />
    </div>
    </ThemeProvider>
  );
}
