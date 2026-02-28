import { motion } from "motion/react";
import {
  ArrowUpRight,
  Github,
  Terminal,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { ease, viewport, stagger } from "./utils/constants";
import type { Project } from "./utils/constants";

const typeLabel: Record<Project["type"], string> = {
  TOOL: "Engineering",
  RESEARCH: "Research",
  STUDY: "Academic",
};

// Gradient + icon per project type
const typeVisual: Record<
  Project["type"],
  { gradient: string; icon: typeof Terminal }
> = {
  TOOL: {
    gradient: "from-[var(--accent)]/20 via-[var(--accent)]/5 to-transparent",
    icon: Terminal,
  },
  RESEARCH: {
    gradient:
      "from-[var(--accent-blue)]/20 via-[var(--accent-blue)]/5 to-transparent",
    icon: BookOpen,
  },
  STUDY: {
    gradient:
      "from-[var(--accent-purple)]/20 via-[var(--accent-purple)]/5 to-transparent",
    icon: GraduationCap,
  },
};

const sectionReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 30 },
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
      title: "STRESS & GENDER",
      year: "2023",
      description:
        "Collaborative study on stress coping strategies and cultural pressures. Significant differences found (p < .05, d = 0.62).",
      status: "COMPLETED",
      tags: ["SPSS", "STATISTICS"],
      link: "#",
      type: "RESEARCH",
    },
    {
      title: "COGNITIVE LOAD",
      year: "2023",
      description:
        "Systematic review of 22 peer-reviewed articles on divided attention, notifications, and working memory in digital environments.",
      status: "COMPLETED",
      tags: ["LITERATURE REVIEW", "COGNITION"],
      link: "#",
      type: "STUDY",
    },
    {
      title: "BURNOUT STUDY",
      year: "2024",
      description:
        "Mixed-methods proposal examining burnout predictors in clinical psychology practicum students. In development.",
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
      className="py-36 px-8 md:px-20 lg:px-36 bg-[var(--bg)] relative"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Header */}
        <motion.div
          variants={itemReveal}
          className="flex flex-col items-start md:flex-row md:items-end md:justify-between mb-20"
        >
          <div>
            <span className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase font-mono block mb-5">
              Work
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--text-1)] tracking-tight">
              Selected Projects
            </h2>
          </div>

          <motion.a
            href="https://github.com/artlostintime"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-[var(--text-9)] text-sm hover:text-[var(--accent)] transition-colors duration-300"
          >
            <Github className="w-4 h-4" />
            GitHub
          </motion.a>
        </motion.div>

        {/* Project rows */}
        <motion.div variants={itemReveal}>
          {projects.map((project, i) => {
            const external = isExternal(project.link);

            const innerContent = (
              <>
                <div className="flex gap-6 md:gap-8">
                  {/* Visual preview — gradient card with icon */}
                  <div
                    className={`hidden sm:flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gradient-to-br ${typeVisual[project.type].gradient} border border-[var(--border)] shrink-0 transition-all duration-300 group-hover:border-[var(--border-hover)] group-hover:scale-[1.02]`}
                  >
                    {(() => {
                      const Icon = typeVisual[project.type].icon;
                      return (
                        <Icon
                          className={`w-7 h-7 md:w-8 md:h-8 transition-colors duration-300 ${
                            project.type === "TOOL"
                              ? "text-[var(--accent)]/60 group-hover:text-[var(--accent)]"
                              : project.type === "RESEARCH"
                                ? "text-[var(--accent-blue)]/60 group-hover:text-[var(--accent-blue)]"
                                : "text-[var(--accent-purple)]/60 group-hover:text-[var(--accent-purple)]"
                          }`}
                        />
                      );
                    })()}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Meta row */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[var(--text-6)] text-[11px] font-mono tracking-[0.15em] uppercase">
                        {typeLabel[project.type]}
                      </span>
                      <span className="text-[var(--text-9)]">·</span>
                      <span className="text-[var(--text-6)] text-[11px] font-mono">
                        {project.year}
                      </span>
                      <span className="text-[var(--text-9)]">·</span>
                      <span
                        className={`text-[11px] font-mono tracking-wide uppercase ${
                          project.status === "ACTIVE"
                            ? "text-[var(--accent)]"
                            : project.status === "IN PROGRESS"
                              ? "text-[var(--text-6)]"
                              : "text-[var(--text-9)]"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* Title + description row */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-display text-xl md:text-2xl font-bold tracking-tight mb-3 transition-colors duration-300 ${
                            external
                              ? "text-[var(--text-1)] group-hover:text-[var(--accent)]"
                              : "text-[var(--text-5)]"
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p className="text-[var(--text-5)] text-sm leading-[1.85] max-w-2xl">
                          {project.description}
                        </p>
                      </div>
                      {external && (
                        <ArrowUpRight className="w-5 h-5 text-[var(--text-11)] group-hover:text-[var(--accent)] shrink-0 mt-1 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-4 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono tracking-wider text-[var(--text-7)] uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={stagger(i, 0.08)}
                viewport={viewport}
              >
                {external ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block py-9 border-t border-[var(--border)] transition-colors duration-300 hover:bg-[var(--bg-hover)] -mx-6 px-6 md:-mx-8 md:px-8"
                  >
                    {innerContent}
                  </a>
                ) : (
                  <div className="group block py-9 border-t border-[var(--border)]">
                    {innerContent}
                  </div>
                )}
              </motion.div>
            );
          })}
          <div className="border-t border-[var(--border)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
