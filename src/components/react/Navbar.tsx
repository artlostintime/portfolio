import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, BookOpen } from "lucide-react";
import { scrollToSection } from "./utils/scroll";
import { ease } from "./utils/constants";

type NavbarProps = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const sections = ["home", "about", "projects", "social"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const links = [
    { name: "Title", id: "home" },
    { name: "Author Note", id: "about" },
    { name: "Works", id: "projects" },
    { name: "Correspondence", id: "social" },
  ];

  const handleNav = (id: string) => {
    setIsOpen(false);
    setTimeout(() => scrollToSection(id), 50);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter] duration-500 ${
          scrolled ? "bg-[var(--nav-bg)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Journal-style running header */}
          <button
            onClick={() => handleNav("home")}
            className="group relative z-50"
            aria-label="Scroll to top"
          >
            <span className="font-display text-sm italic text-[var(--text-4)] tracking-wide hover:text-[var(--text-1)] transition-colors duration-300">
              V. Singh — Portfolio
            </span>
          </button>

          {/* Desktop links — understated academic nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                aria-current={active === link.id ? "true" : undefined}
                className="relative text-[12px] font-mono tracking-wider py-2 group uppercase"
              >
                <span
                  className={`transition-colors duration-300 ${
                    active === link.id
                      ? "text-[var(--text-1)]"
                      : "text-[var(--text-8)] hover:text-[var(--text-5)]"
                  }`}
                >
                  {link.name}
                </span>
                {active === link.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--accent)]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            ))}
            {/* External link to papers archive */}
            <a
              href="https://shuvi.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-[12px] font-mono tracking-wider py-2 group uppercase flex items-center gap-1.5"
            >
              <span className="text-[var(--text-8)] group-hover:text-[var(--text-5)] transition-colors duration-300">
                Papers
              </span>
              <BookOpen className="w-3 h-3 text-[var(--text-9)] group-hover:text-[var(--text-5)] transition-colors duration-300" />
            </a>
          </div>

          {/* Theme toggle + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-[var(--text-8)] hover:text-[var(--accent)] transition-colors duration-300"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              className="md:hidden text-[var(--text-1)] z-50 relative p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Thin rule under header when scrolled */}
        {scrolled && (
          <div className="h-px bg-[var(--rule)] max-w-3xl mx-auto" />
        )}
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--bg)]/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {links.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease }}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`font-display text-2xl italic tracking-wide transition-colors duration-300 ${
                    active === link.id
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-5)] hover:text-[var(--text-2)]"
                  }`}
                  onClick={() => handleNav(link.id)}
                >
                  {link.name}
                </motion.button>
              ))}

              {/* Papers archive link in mobile menu */}
              <motion.a
                href="https://shuvi.tech"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.06 * links.length, duration: 0.4, ease }}
                className="font-display text-2xl italic tracking-wide text-[var(--text-5)] hover:text-[var(--text-2)] transition-colors duration-300 flex items-center gap-2"
              >
                Papers
                <BookOpen className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
