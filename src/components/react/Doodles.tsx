import { motion } from "motion/react";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring" as const, duration: 1.8, bounce: 0 },
      opacity: { duration: 0.01 },
    },
  },
};

// For doodles in the hero that animate on mount (not scroll)
const drawOnMount = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring" as const, duration: 2, bounce: 0, delay: 1.2 },
      opacity: { duration: 0.01, delay: 1.2 },
    },
  },
};

type DoodleProps = { className?: string; onMount?: boolean };

export const StarDoodle = ({ className, onMount }: DoodleProps) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <motion.path
      d="M50 5L61 35H95L67 55L78 85L50 65L22 85L33 55L5 35H39L50 5Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      variants={onMount ? drawOnMount : draw}
      initial="hidden"
      {...(onMount ? { animate: "visible" } : { whileInView: "visible", viewport: { once: true } })}
    />
  </svg>
);

export const SpiralDoodle = ({ className, onMount }: DoodleProps) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <motion.path
      d="M50 50C50 50 55 45 55 50C55 55 45 60 40 50C35 40 60 30 70 50C80 70 30 80 20 50C10 20 90 10 90 50"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      variants={onMount ? drawOnMount : draw}
      initial="hidden"
      {...(onMount ? { animate: "visible" } : { whileInView: "visible", viewport: { once: true } })}
    />
  </svg>
);

export const ArrowDoodle = ({ className }: DoodleProps) => (
  <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <motion.path
      d="M10 25C30 20 60 30 90 25M90 25L75 15M90 25L78 35"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true }}
    />
  </svg>
);

export const CircleDoodle = ({ className }: DoodleProps) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <motion.path
      d="M50 10C30 10 10 30 10 50C10 70 30 90 50 90C70 90 90 70 90 50C90 35 80 20 70 15"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true }}
    />
  </svg>
);

export const ZigzagDoodle = ({ className }: DoodleProps) => (
  <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <motion.path
      d="M0 10L10 2L20 18L30 2L40 18L50 2L60 18L70 2L80 18L90 2L100 10"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true }}
    />
  </svg>
);

export const ScribbleDoodle = ({ className }: DoodleProps) => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <motion.path
      d="M10 50C30 40 40 60 60 50C80 40 90 60 110 50C130 40 140 60 160 50C180 40 190 60 195 50"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true }}
    />
  </svg>
);

export const UnderlineDoodle = ({ className }: DoodleProps) => (
  <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <motion.path
      d="M5 10Q50 15 100 5Q150 -5 195 10"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      variants={drawOnMount} initial="hidden" animate="visible"
    />
  </svg>
);

export const CrownDoodle = ({ className, onMount }: DoodleProps) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <motion.path
      d="M10 50L10 20L30 40L50 10L70 40L90 20L90 50H10Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      variants={onMount ? drawOnMount : draw}
      initial="hidden"
      {...(onMount ? { animate: "visible" } : { whileInView: "visible", viewport: { once: true } })}
    />
  </svg>
);
