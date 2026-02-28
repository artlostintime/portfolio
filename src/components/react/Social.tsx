import type { ElementType } from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { ease, viewportNear, viewport } from "./utils/constants";

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
    className="group flex items-center justify-between py-6 border-t border-[var(--border)] transition-colors duration-300 hover:bg-[var(--bg-hover)] -mx-6 px-6 md:mx-0 md:px-0"
  >
    <div className="flex items-center gap-4">
      <Icon className="w-4 h-4 text-[var(--text-6)] group-hover:text-[var(--accent)] transition-colors duration-300" />
      <div>
        <p className="text-[var(--text-6)] text-[10px] font-mono uppercase tracking-[0.2em] mb-0.5">
          {label}
        </p>
        <p className="text-[var(--text-2)] text-sm group-hover:text-[var(--text-1)] transition-colors">
          {value}
        </p>
      </div>
    </div>
    <ArrowUpRight className="w-4 h-4 text-[var(--text-8)] group-hover:text-[var(--accent)] transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
        <motion.div variants={itemReveal} className="mb-20">
          <span className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase font-mono block mb-5">
            Contact
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--text-1)] tracking-tight mb-4">
            Let&apos;s connect
          </h2>
          <p className="text-[var(--text-4)] text-base font-light max-w-lg leading-[1.85]">
            Open for research collaborations, dev projects, and conversations
            about cognitive science.
          </p>
        </motion.div>

        {/* Two columns: links + location */}
        <motion.div
          variants={itemReveal}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1px_340px] gap-12 lg:gap-16"
        >
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
              className="group flex items-center justify-between py-6 border-t border-[var(--border)]"
            >
              <div className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-[var(--text-6)]" />
                <div>
                  <p className="text-[var(--text-6)] text-[10px] font-mono uppercase tracking-[0.2em] mb-0.5">
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
                className="p-2 text-[var(--text-9)] hover:text-[var(--accent)] transition-colors duration-200"
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
                      <Check className="w-4 h-4 text-[var(--accent)]" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Copy className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
            <div className="border-t border-[var(--border)]" />
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block bg-[var(--border)]" />

          {/* Location sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportNear}
            transition={{ delay: 0.2, duration: 0.6, ease }}
          >
            <MapPin className="w-4 h-4 text-[var(--text-6)] mb-6" />

            <p className="text-[var(--text-6)] text-[11px] font-mono uppercase tracking-[0.2em] mb-2">
              Based in
            </p>
            <p className="font-display text-[var(--text-1)] font-bold text-3xl md:text-4xl tracking-tight leading-tight mb-6">
              Delhi,
              <br />
              India
            </p>

            <div className="flex items-center gap-2 text-[var(--text-3)] text-sm mb-8">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
              </span>
              Available for remote
            </div>

            <div className="pt-6 border-t border-[var(--border)]">
              <span className="text-[var(--text-6)] text-[11px] font-mono tracking-wider">
                IST · {clock || "—"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
