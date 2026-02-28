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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function About() {
  const details = [
    { label: "Location", value: "Delhi, India" },
    { label: "Education", value: "B.A. Hons. Psychology" },
    { label: "Focus", value: "Neuro-Cognitive Science" },
    { label: "Languages", value: "English, Hindi, Code" },
  ];

  const expertise = [
    {
      title: "Research Methods",
      desc: "Cognitive psychology, social behavior, and human-technology interaction. Proficient in SPSS, survey design, literature review, and psychometric analysis (APA 7th ed.).",
    },
    {
      title: "Software Engineering",
      desc: "Rust for performance-critical systems, Node.js for rapid prototyping, Git for version control. LaTeX for academic typesetting and publication-ready manuscripts.",
    },
    {
      title: "Academic Writing",
      desc: "APA 7th formatting, research reports, systematic reviews, technical documentation. Reference management with Zotero; experienced with peer-review workflows.",
    },
  ];

  return (
    <section
      id="about"
      className="py-28 px-6 bg-[var(--bg)] relative pencil-cursor"
    >
      <motion.div
        className="max-w-3xl mx-auto"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Section heading — APA Level 1: Centered, Bold */}
        <motion.div variants={itemReveal} className="mb-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-[var(--text-1)] tracking-wide">
            Author Note
          </h2>
          <div className="w-16 h-px bg-[var(--accent)] mx-auto mt-4" />
        </motion.div>

        {/* Bio paragraph with drop cap */}
        <motion.div variants={itemReveal} className="mb-10">
          <p className="drop-cap text-[var(--text-3)] text-[15px] leading-[2] text-justify">
            I build tools for cognitive research while exploring why humans do
            what they do — bridging the gap between data and design. Currently
            investigating burnout in clinical psychology training and developing
            PRISM, an automated data processing pipeline for psychometric
            research. My work sits at the intersection of empirical behavioral
            science and modern software engineering, seeking to make research
            workflows more rigorous and reproducible.
          </p>
        </motion.div>

        {/* Author details — inline academic style */}
        <motion.div
          variants={itemReveal}
          className="mb-14 py-6 border-y border-[var(--rule)]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8">
            {details.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
                viewport={viewport}
              >
                <p className="text-[var(--footnote)] text-[10px] font-mono uppercase tracking-[0.2em] mb-1">
                  {item.label}
                </p>
                <p className="text-[var(--text-2)] text-sm">{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Status indicator */}
          <div className="mt-5 flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-40" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
            </span>
            <span className="text-[var(--footnote)] text-xs italic">
              Currently available for research collaborations
            </span>
          </div>
        </motion.div>

        {/* Expertise — APA Level 2: Left-aligned, Bold */}
        <motion.div variants={itemReveal}>
          <h3 className="font-display text-lg font-semibold text-[var(--text-1)] mb-8 tracking-wide">
            Areas of Competence
          </h3>

          <div className="space-y-0">
            {expertise.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={stagger(i, 0.1)}
                viewport={viewport}
                className="py-5 border-t border-[var(--rule)] group transition-colors duration-300 hover:bg-[var(--bg-hover)] -mx-4 px-4"
              >
                {/* APA Level 3: Left-aligned, Bold Italic, run-in */}
                <p className="text-[var(--text-3)] text-[15px] leading-[2] text-justify">
                  <span className="font-display font-semibold italic text-[var(--text-1)] group-hover:text-[var(--accent)] transition-colors duration-300">
                    {item.title}.
                  </span>{" "}
                  {item.desc}
                </p>
              </motion.div>
            ))}
            <div className="border-t border-[var(--rule)]" />
          </div>
        </motion.div>

        {/* Page number */}
        <div className="mt-12 text-center">
          <span className="text-[var(--text-9)] text-xs font-mono">2</span>
        </div>
      </motion.div>
    </section>
  );
}
