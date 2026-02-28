/**
 * Smooth-scroll to a section by its element ID.
 * Uses native scrollIntoView with CSS scroll-padding-top offset.
 */
export const scrollToSection = (id: string) => {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/**
 * Check if user prefers reduced motion.
 */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
