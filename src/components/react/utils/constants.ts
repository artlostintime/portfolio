import type { ElementType } from "react";

// ─── Animation presets ───────────────────────────────────────────
// Consistent easing across all components (expo out curve)
export const ease = [0.16, 1, 0.3, 1] as const;

// Standard viewport config for scroll-triggered animations
export const viewport = { once: true, margin: "-50px" } as const;
export const viewportNear = { once: true, margin: "-30px" } as const;

// Stagger factory — returns transition props for index-based delays
export const stagger = (index: number, base = 0.08) => ({
  delay: index * base,
  duration: 0.5,
  ease,
});

// ─── Section header pattern ──────────────────────────────────────
export type SectionHeaderProps = {
  label: string;
  number: string;
};

// ─── Project types ───────────────────────────────────────────────
export type ProjectStatus = "ACTIVE" | "COMPLETED" | "IN PROGRESS";
export type ProjectType = "TOOL" | "RESEARCH" | "STUDY";

export type Project = {
  title: string;
  year: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  link: string;
  type: ProjectType;
};

// ─── Card types ──────────────────────────────────────────────────
export type CardData = {
  title: string;
  icon: ElementType;
  description: string;
};

// ─── Link types ──────────────────────────────────────────────────
export type SocialLink = {
  icon: ElementType;
  label: string;
  value: string;
  href: string;
};
