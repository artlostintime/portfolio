import { useEffect, useCallback, Component, useState } from "react";
import type { ReactNode, ErrorInfo } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Social from "./Social";
import Footer from "./Footer";
import DotNav from "./DotNav";
import { scrollToSection } from "./utils/scroll";
import { ease } from "./utils/constants";
import { useTheme } from "./utils/useTheme";

// ─── Keyboard Shortcuts ──────────────────────────────────────────
const NAV_SECTIONS = ["home", "about", "projects", "social"] as const;

function useKeyboardNav() {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    )
      return;

    const num = parseInt(e.key, 10);
    if (num >= 1 && num <= 4) {
      e.preventDefault();
      scrollToSection(NAV_SECTIONS[num - 1]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);
}

// ─── Scroll Progress ─────────────────────────────────────────────
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-[var(--accent)] z-60 origin-left"
      style={{ scaleX }}
    />
  );
};

// ─── Error Boundary ──────────────────────────────────────────────
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Portfolio error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-[var(--text-6)] font-mono text-sm mb-4">
              Something went wrong.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="text-xs font-mono text-[var(--text-8)] hover:text-[var(--accent)] underline transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── App ─────────────────────────────────────────────────────────
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease, staggerChildren: 0.15 },
  },
};

const sectionEntry = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export default function App() {
  useKeyboardNav();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay so the browser paints the initial frame first
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <ErrorBoundary>
      <div className="bg-[var(--bg)] text-[var(--text-1)] min-h-screen font-sans overflow-x-hidden">
        {/* Dot grid background overlay */}
        <div className="fixed inset-0 dot-grid pointer-events-none z-0" />
        <ScrollProgress />
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <DotNav />
        <AnimatePresence>
          {mounted && (
            <motion.main
              className="relative z-10"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={sectionEntry}>
                <Hero />
              </motion.div>
              <motion.div variants={sectionEntry}>
                <About />
              </motion.div>
              <motion.div variants={sectionEntry}>
                <Projects />
              </motion.div>
              <motion.div variants={sectionEntry}>
                <Social />
              </motion.div>
            </motion.main>
          )}
        </AnimatePresence>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
