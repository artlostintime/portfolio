import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { scrollToSection } from "./utils/scroll";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  const [index, setIndex] = useState(0);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (activated) return;
      if (e.key === KONAMI[index]) {
        const next = index + 1;
        if (next === KONAMI.length) {
          setActivated(true);
          setIndex(0);
        } else {
          setIndex(next);
        }
      } else {
        setIndex(0);
      }
    },
    [index, activated],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return activated;
}

export default function Footer() {
  const easterEgg = useKonamiCode();

  return (
    <footer className="bg-[var(--bg)] relative">
      <div className="h-px bg-[var(--border)]" />

      <div className="max-w-7xl mx-auto px-8 md:px-20 lg:px-36 py-10 flex items-center justify-between">
        <p className="text-[var(--text-10)] text-xs font-mono">
          © {new Date().getFullYear()} Vishu
        </p>

        <motion.button
          onClick={() => scrollToSection("home")}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.92 }}
          className="flex items-center gap-2 text-[var(--text-10)] hover:text-[var(--accent)] transition-colors duration-300 text-xs font-mono group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-200" />
          Top
        </motion.button>
      </div>

      {/* Konami code easter egg */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="text-center py-4 border-t border-[var(--border)]">
              <p className="text-[var(--text-9)] text-xs font-mono tracking-widest">
                You found the secret. Thanks for exploring.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
