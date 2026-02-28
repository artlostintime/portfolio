import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { ease, viewport, stagger } from "./utils/constants";
import type { Project } from "./utils/constants";

const typeLabel: Record<Project["type"], string> = {
  TOOL: "Software",
  RESEARCH: "Empirical Study",
  STUDY: "Literature Review",
};

const statusLabel: Record<string, string> = {
  ACTIVE: "In press",
  COMPLETED: "Published",
  "IN PROGRESS": "Manuscript in preparation",
};

const sectionReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Projects() {
  const projects: Project[] = [
    {
      title: "PRISM",
      year: "2024",
      description:
        "Psychology survey data processing pipeline in Rust. Automates scoring, quality control, and psychometric analysis for research workflows.",
      status: "ACTIVE",
      tags: ["RUST", "PSYCHOLOGY", "OPEN SOURCE"],
      link: "https://github.com/artlostintime/prism",
      type: "TOOL",
    },
    {
      title: "PAPER",
      year: "2024",
      description:
        "Research portfolio & CMS with Node.js, Markdown support, secure authentication, and live deployment.",
      status: "ACTIVE",
      tags: ["NODE.JS", "JAVASCRIPT", "FULL-STACK"],
      link: "https://github.com/artlostintime/paper",
      type: "TOOL",
    },
    {
      title: "Stress & Gender",
      year: "2023",
      description:
        "Collaborative study on stress coping strategies and cultural pressures. Significant differences found (p < .05, d = 0.62).",
      status: "COMPLETED",
      tags: ["SPSS", "STATISTICS"],
      link: "#",
      type: "RESEARCH",
    },
    {
      title: "Cognitive Load in Digital Environments",
      year: "2023",
      description:
        "Systematic review of 22 peer-reviewed articles on divided attention, notifications, and working memory in digital environments.",
      status: "COMPLETED",
      tags: ["LITERATURE REVIEW", "COGNITION"],
      link: "#",
      type: "STUDY",
    },
    {
      title: "Burnout in Clinical Training",
      year: "2024",
      description:
        "Mixed-methods proposal examining burnout predictors in clinical psychology practicum students. IRB submission pending.",
      status: "IN PROGRESS",
      tags: ["MIXED-METHODS", "CLINICAL"],
      link: "#",
      type: "RESEARCH",
    },
  ];

  const isExternal = (url: string) => url.startsWith("http");

  return (
    <section
      id="projects"
      className="py-28 px-6 bg-[var(--bg)] relative pencil-cursor"
    >
      <motion.div
        className="max-w-3xl mx-auto"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Section heading — APA Level 1 */}
        <motion.div variants={itemReveal} className="mb-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-[var(--text-1)] tracking-wide">
            Selected Works
          </h2>
          <div className="w-16 h-px bg-[var(--accent)] mx-auto mt-4" />
        </motion.div>

        {/* Introductory paragraph */}
        <motion.p
          variants={itemReveal}
          className="text-[var(--text-3)] text-[15px] leading-[2] text-justify mb-10 indent-8"
        >
          The following section presents selected projects and research
          contributions, organized chronologically. Entries span software
          engineering tools, empirical investigations, and systematic reviews in
          cognitive and clinical psychology.
        </motion.p>

        {/* GitHub link */}
        <motion.div variants={itemReveal} className="mb-8 text-right">
          <a
            href="https://github.com/artlostintime"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--footnote)] text-xs font-mono hover:text-[var(--accent)] transition-colors duration-300"
          >
            <Github className="w-3.5 h-3.5" />
            View full repository →
          </a>
        </motion.div>

        {/* Project entries — citation style */}
        <motion.div variants={itemReveal}>
          {projects.map((project, i) => {
            const external = isExternal(project.link);

            const citationContent = (
              <div className="py-6 border-t border-[var(--rule)]">
                {/* Citation-style header: Author (Year). Title. */}
                <div className="citation">
                  <p className="text-[var(--text-2)] text-[15px] leading-[2]">
                    <span className="text-[var(--text-4)]">Singh, V.</span> (
                    {project.year}).{" "}
                    <span
                      className={`font-display italic ${external ? "group-hover:text-[var(--accent)] transition-colors duration-300" : ""} text-[var(--text-1)]`}
                    >
                      {project.title}
                    </span>
                    .{" "}
                    <span className="text-[var(--text-5)]">
                      [{typeLabel[project.type]}].
                    </span>
                    {external && (
                      <ArrowUpRight className="inline w-3.5 h-3.5 ml-1.5 text-[var(--text-8)] group-hover:text-[var(--accent)] transition-all duration-300 group-hover:-translate-y-0.5" />
                    )}
                  </p>
                </div>

                {/* Description as annotation */}
                <p className="text-[var(--text-4)] text-sm leading-[1.9] mt-2 ml-8">
                  {project.description}
                </p>

                {/* Meta footer */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 ml-8">
                  <span className="text-[var(--footnote)] text-[10px] font-mono italic">
                    {statusLabel[project.status] || project.status}
                  </span>
                  <span className="text-[var(--text-9)]">·</span>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[var(--text-7)] text-[10px] font-mono tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={stagger(i, 0.08)}
                viewport={viewport}
              >
                {external ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block transition-colors duration-300 hover:bg-[var(--bg-hover)] -mx-4 px-4 rounded-sm"
                  >
                    {citationContent}
                  </a>
                ) : (
                  <div className="group block">{citationContent}</div>
                )}
              </motion.div>
            );
          })}
          <div className="border-t border-[var(--rule)]" />
        </motion.div>

        {/* Page number */}
        <div className="mt-12 text-center">
          <span className="text-[var(--text-9)] text-xs font-mono">3</span>
        </div>
      </motion.div>
    </section>
  );
}
