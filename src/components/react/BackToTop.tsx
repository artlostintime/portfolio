import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { scrollToSection } from "./utils/scroll";
import { ease } from "./utils/constants";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ duration: 0.35, ease }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.88 }}
          onClick={() => scrollToSection("home")}
          className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full border border-[var(--rule)] bg-[var(--bg)]/80 backdrop-blur-md flex items-center justify-center text-[var(--footnote)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-colors duration-300 shadow-sm"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
