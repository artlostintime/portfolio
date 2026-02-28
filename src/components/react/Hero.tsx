import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { scrollToSection } from "./utils/scroll";
import { ease } from "./utils/constants";

const keywords = [
  "cognitive psychology",
  "human-computer interaction",
  "burnout research",
  "data pipelines",
  "psychometric analysis",
];

export default function Hero() {
  const [currentKeyword, setCurrentKeyword] = useState(0);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 40]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((i) => (i + 1) % keywords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center bg-[var(--bg)] overflow-hidden px-6"
    >
      {/* Main content with parallax */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="z-10 relative max-w-3xl mx-auto w-full text-center"
      >
        {/* Running head */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease }}
          className="text-[var(--text-8)] text-[10px] font-mono uppercase tracking-[0.35em] mb-16"
        >
          Running head: PORTFOLIO OF VISHU
        </motion.p>

        {/* Title — academic paper style */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease }}
          className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.2] font-medium text-[var(--text-1)] mb-8 italic"
        >
          At the Intersection of
          <br />
          Psychology &amp; Technology
        </motion.h1>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease }}
          className="mb-4"
        >
          <p className="text-[var(--text-2)] text-lg font-display tracking-wide">
            Vishu Singh
          </p>
        </motion.div>

        {/* Affiliation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6, ease }}
          className="mb-12"
        >
          <p className="text-[var(--text-5)] text-sm italic">
            Department of Psychology, Ambedkar University Delhi
          </p>
        </motion.div>

        {/* Horizontal rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease }}
          className="w-24 h-px bg-[var(--accent)] mx-auto mb-12 origin-center"
        />

        {/* Abstract */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease }}
          className="text-left max-w-2xl mx-auto pencil-cursor"
        >
          <h2 className="font-display text-center text-base font-semibold text-[var(--text-1)] mb-4 tracking-wide">
            Abstract
          </h2>
          <p className="text-[var(--text-3)] text-[15px] leading-[2] indent-8">
            This portfolio documents the work of an undergraduate psychology
            researcher and developer based in Delhi, India. The author explores
            cognitive science, builds digital tools for research workflows, and
            investigates human behavior at the intersection of technology and
            mind. Areas of focus include burnout research, psychometric data
            pipelines, and human-computer interaction.
          </p>

          {/* Keywords */}
          <div className="mt-6 flex flex-wrap items-baseline gap-x-1">
            <span className="text-[var(--text-3)] text-[15px] italic mr-1">
              Keywords:
            </span>
            {keywords.map((kw, i) => (
              <motion.span
                key={kw}
                animate={{
                  color:
                    i === currentKeyword ? "var(--accent)" : "var(--text-5)",
                }}
                transition={{ duration: 0.5 }}
                className="text-[15px]"
              >
                {kw}
                {i < keywords.length - 1 ? "," : ""}&nbsp;
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Navigation hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-20 flex justify-center gap-8"
        >
          <button
            onClick={() => scrollToSection("about")}
            className="text-[var(--text-8)] hover:text-[var(--accent)] text-xs font-mono tracking-widest uppercase transition-colors duration-300"
          >
            Continue reading →
          </button>
        </motion.div>
      </motion.div>

      {/* Page number — bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <span className="text-[var(--text-9)] text-xs font-mono">1</span>
      </div>
    </section>
  );
}
