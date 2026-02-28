import { motion } from "motion/react";
import { ease, viewport, stagger } from "./utils/constants";

// Section reveal container variant
const sectionReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function About() {
  const details = [
    { label: "Location", value: "Delhi, India" },
    { label: "Education", value: "B.A. Psychology '26" },
    { label: "Focus", value: "Cognitive Science + Dev Tools" },
    { label: "Languages", value: "English, Hindi, Code" },
  ];

  const expertise = [
    {
      title: "Research",
      desc: "Cognitive psychology, social behavior, and human-technology interaction. SPSS, survey design, literature review.",
    },
    {
      title: "Engineering",
      desc: "Rust for performance, Node.js for speed, Git for sanity. LaTeX when paper needs polish.",
    },
    {
      title: "Writing",
      desc: "APA 7th formatting wizard. Research reports, technical docs, blog posts. Zotero is life.",
    },
  ];

  return (
    <section
      id="about"
      className="py-36 px-8 md:px-20 lg:px-36 bg-[var(--bg)] relative"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Section label */}
        <motion.div variants={itemReveal} className="mb-20">
          <span className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase font-mono">
            About
          </span>
        </motion.div>

        {/* Two-column editorial grid */}
        <motion.div
          variants={itemReveal}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1px_340px] gap-12 lg:gap-16"
        >
          {/* Left: Bio + expertise */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease }}
              className="font-display text-3xl md:text-5xl font-bold text-[var(--text-1)] tracking-tight leading-[1.15] mb-10"
            >
              Psychology researcher
              <br />
              who codes.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: 0.1, duration: 0.6, ease }}
              className="text-[var(--text-4)] text-base md:text-lg leading-[1.85] font-light mb-14 max-w-xl"
            >
              I build tools for cognitive research while exploring why humans do
              what they do — bridging the gap between data and design. Currently
              investigating burnout in clinical training and building PRISM, a
              data processing pipeline.
            </motion.p>

            {/* Expertise rows with horizontal rules */}
            <div className="space-y-0">
              {expertise.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={stagger(i, 0.1)}
                  viewport={viewport}
                  className="py-7 border-t border-[var(--border)] group cursor-default transition-all duration-300 hover:bg-[var(--bg-hover)] -mx-4 px-4 rounded-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-10">
                    <h3 className="text-[var(--text-1)] text-sm font-medium w-28 shrink-0 transition-colors duration-300 group-hover:text-[var(--accent)]">
                      {item.title}
                    </h3>
                    <p className="text-[var(--text-5)] text-sm leading-[1.85] transition-colors duration-300 group-hover:text-[var(--text-3)]">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-[var(--border)]" />
            </div>
          </div>

          {/* Vertical divider (lg only) */}
          <div className="hidden lg:block bg-[var(--border)]" />

          {/* Right: Quick details sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: 0.2, duration: 0.6, ease }}
              className="space-y-8"
            >
              {details.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                  viewport={viewport}
                >
                  <p className="text-[var(--text-6)] text-[11px] tracking-[0.2em] uppercase font-mono mb-1.5">
                    {item.label}
                  </p>
                  <p className="text-[var(--text-2)] text-sm">{item.value}</p>
                </motion.div>
              ))}

              {/* Status indicator */}
              <div className="pt-6 border-t border-[var(--border)]">
                <p className="text-[var(--text-6)] text-[11px] tracking-[0.2em] uppercase font-mono mb-2">
                  Current Status
                </p>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-40" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                  </span>
                  <span className="text-[var(--text-3)] text-sm">
                    Available for research collaborations
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
