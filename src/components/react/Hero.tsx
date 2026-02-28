import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { scrollToSection } from "./utils/scroll";
import { ease } from "./utils/constants";

const roles = ["Psychology Researcher", "Developer", "Creative Technologist"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 60]);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        60,
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center bg-[var(--bg)] overflow-hidden px-8 md:px-20 lg:px-36"
    >
      {/* Subtle warm gradient — centered above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-[var(--accent)]/3 rounded-full blur-[200px] pointer-events-none" />

      {/* Main content with parallax */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="z-10 relative max-w-7xl mx-auto w-full text-left"
      >
        {/* Pre-heading tag */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="text-[var(--text-5)] text-xs tracking-[0.3em] uppercase mb-10 font-mono"
        >
          Portfolio — 2026
        </motion.p>

        {/* Name — massive display */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease }}
          className="font-display text-[clamp(4rem,15vw,11rem)] leading-[0.9] font-extrabold tracking-[-0.04em] text-[var(--text-1)] mb-8"
        >
          Vishu
          <span className="text-[var(--accent)]">.</span>
        </motion.h1>

        {/* Role typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-8 h-8 flex items-center"
        >
          <span className="text-[var(--accent)] text-lg md:text-xl font-light tracking-wide">
            {displayed}
            <span className="inline-block w-0.5 h-5 bg-[var(--accent)] ml-1 animate-pulse align-middle" />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease }}
          className="max-w-lg text-[var(--text-4)] text-base md:text-lg leading-[1.8] font-light mb-14"
        >
          Building digital tools at the intersection of cognitive science and
          technology. Based in Delhi, India.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease }}
          className="flex items-center gap-6"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="group flex items-center gap-3 text-[var(--text-1)] text-sm tracking-wide hover:text-[var(--accent)] transition-colors duration-300"
          >
            <span className="w-12 h-px bg-[var(--accent)] group-hover:w-16 transition-[width] duration-300" />
            View Work
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="text-[var(--text-6)] text-sm tracking-wide hover:text-[var(--text-3)] transition-colors duration-300"
          >
            About Me
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — bottom left */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-8 left-8 md:left-20 lg:left-36 text-[var(--text-10)] hover:text-[var(--text-7)] transition-colors flex items-center gap-3"
        onClick={() => scrollToSection("about")}
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
        <span className="text-[10px] tracking-[0.3em] uppercase font-mono">
          Scroll
        </span>
      </motion.button>

      {/* Section counter — bottom right */}
      <div className="absolute bottom-8 right-8 md:right-20 lg:right-36 hidden md:block">
        <span className="text-[var(--text-11)] text-xs font-mono">01 / 04</span>
      </div>
    </section>
  );
}
