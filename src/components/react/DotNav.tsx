import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { scrollToSection } from "./utils/scroll";
import { ease } from "./utils/constants";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "social", label: "Contact" },
] as const;

export default function DotNav() {
  const [active, setActive] = useState("home");
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Show only after scrolling past the hero fold
  useEffect(() => {
    const handleScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.3);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = useCallback((id: string) => {
    scrollToSection(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4, ease }}
          className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4"
          aria-label="Section navigation"
        >
          {sections.map(({ id, label }) => {
            const isActive = active === id;
            const isHovered = hovered === id;

            return (
              <div key={id} className="relative flex items-center">
                {/* Label tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-8 text-[11px] font-mono tracking-wider text-[var(--text-6)] whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <button
                  onClick={() => handleClick(id)}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative w-5 h-5 flex items-center justify-center group"
                  aria-label={`Scroll to ${label}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {/* Outer ring on active */}
                  {isActive && (
                    <motion.span
                      layoutId="dot-ring"
                      className="absolute inset-0 rounded-full border border-[var(--accent)]/30"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  {/* Inner dot */}
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-2 h-2 bg-[var(--accent)]"
                        : "w-1.5 h-1.5 bg-[var(--text-10)] group-hover:bg-[var(--text-6)]"
                    }`}
                  />
                </button>
              </div>
            );
          })}

          {/* Vertical connecting line */}
          <div className="absolute top-2.5 bottom-2.5 left-1/2 -translate-x-px w-px bg-[var(--border)] -z-10" />
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
