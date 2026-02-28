import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { scrollToSection } from "./utils/scroll";
import { ease } from "./utils/constants";

const sections = [
  { id: "home", label: "Title", num: "I" },
  { id: "about", label: "Author Note", num: "II" },
  { id: "projects", label: "Works", num: "III" },
  { id: "social", label: "Correspondence", num: "IV" },
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
          className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3"
          aria-label="Section navigation"
        >
          {sections.map(({ id, label, num }) => {
            const isActive = active === id;
            const isHovered = hovered === id;

            return (
              <button
                key={id}
                onClick={() => handleClick(id)}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                className="group flex items-center gap-2"
                aria-label={`Scroll to ${label}`}
                aria-current={isActive ? "true" : undefined}
              >
                {/* Label — shown on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.15 }}
                      className="text-[10px] font-mono tracking-wider text-[var(--footnote)] whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Roman numeral marker */}
                <span
                  className={`text-[10px] font-mono transition-colors duration-300 ${
                    isActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-9)] group-hover:text-[var(--text-5)]"
                  }`}
                >
                  {num}
                </span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
