import type { ElementType } from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { ease, viewportNear } from "./utils/constants";

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

const OrcidIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 8.446a.709.709 0 1 1 0-1.418.709.709 0 0 1 0 1.418zm-.266 1.295h1.417v6.262H7.103V9.741zm3.488 0h1.146v.856h.033c.32-.728 1.034-1.24 2.098-1.24 1.406 0 2.427.913 2.427 2.673v4.072h-1.417v-3.797c0-.94-.497-1.48-1.266-1.48-.835 0-1.604.64-1.604 1.959v3.318H10.59V9.741z" />
  </svg>
);

type LinkItemProps = {
  icon: ElementType;
  label: string;
  value: string;
  href: string;
  index: number;
};

const LinkItem = ({ icon: Icon, label, value, href, index }: LinkItemProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.45, ease }}
    viewport={viewportNear}
    className="group flex items-center justify-between py-4 border-t border-[var(--rule)] transition-colors duration-300 hover:bg-[var(--bg-hover)] -mx-4 px-4"
  >
    <div className="flex items-center gap-3">
      <Icon className="w-3.5 h-3.5 text-[var(--footnote)] group-hover:text-[var(--accent)] transition-colors duration-300" />
      <div>
        <p className="text-[var(--footnote)] text-[10px] font-mono uppercase tracking-[0.2em] mb-0.5">
          {label}
        </p>
        <p className="text-[var(--text-2)] text-sm group-hover:text-[var(--text-1)] transition-colors">
          {value}
        </p>
      </div>
    </div>
    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-8)] group-hover:text-[var(--accent)] transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </motion.a>
);

export default function Social() {
  const [copied, setCopied] = useState(false);
  const [clock, setClock] = useState("");
  const email = "vsingh6.23@stu.aud.ac.in";

  useEffect(() => {
    const update = () => {
      setClock(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silent */
    }
  };

  return (
    <section
      id="social"
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
            Correspondence
          </h2>
          <div className="w-16 h-px bg-[var(--accent)] mx-auto mt-4" />
        </motion.div>

        {/* Introductory note */}
        <motion.p
          variants={itemReveal}
          className="text-[var(--text-3)] text-[15px] leading-[2] text-justify mb-10 indent-8"
        >
          Correspondence concerning this portfolio, research collaborations, and
          development inquiries should be addressed to Vishu Singh, Department
          of Psychology, Ambedkar University Delhi, New Delhi, India.
        </motion.p>

        {/* Contact details */}
        <motion.div variants={itemReveal}>
          <h3 className="font-display text-lg font-semibold text-[var(--text-1)] mb-6 tracking-wide">
            Contact Information
          </h3>

          {/* Links list */}
          <div>
            <LinkItem
              icon={Github}
              label="GitHub"
              value="@artlostintime"
              href="https://github.com/artlostintime"
              index={0}
            />
            <LinkItem
              icon={Linkedin}
              label="LinkedIn"
              value="Connect with me"
              href="https://www.linkedin.com/in/artlostintime"
              index={1}
            />
            <LinkItem
              icon={OrcidIcon}
              label="ORCID"
              value="0000-0002-0628-4361"
              href="https://orcid.org/0000-0002-0628-4361"
              index={2}
            />

            {/* Email row with copy */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.45, ease }}
              viewport={viewportNear}
              className="group flex items-center justify-between py-4 border-t border-[var(--rule)]"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-[var(--footnote)]" />
                <div>
                  <p className="text-[var(--footnote)] text-[10px] font-mono uppercase tracking-[0.2em] mb-0.5">
                    Email
                  </p>
                  <p className="text-[var(--text-2)] text-sm break-all">
                    {email}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={copyEmail}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-[var(--text-8)] hover:text-[var(--accent)] transition-colors duration-200"
                aria-label="Copy email"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
            <div className="border-t border-[var(--rule)]" />
          </div>
        </motion.div>

        {/* Location & time — footnote style */}
        <motion.div
          variants={itemReveal}
          className="mt-10 pt-6 border-t border-[var(--rule)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-40" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
              </span>
              <span className="text-[var(--footnote)] text-xs italic">
                Available for remote collaboration · Delhi, India
              </span>
            </div>
            <span className="text-[var(--footnote)] text-[10px] font-mono tracking-wider">
              IST {clock || "—"}
            </span>
          </div>
        </motion.div>

        {/* Page number */}
        <div className="mt-12 text-center">
          <span className="text-[var(--text-9)] text-xs font-mono">4</span>
        </div>
      </motion.div>
    </section>
  );
}
