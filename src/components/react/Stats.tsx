import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ease } from "./utils/constants";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { value: 5, label: "Projects" },
  { value: 3, suffix: "+", label: "Research Papers" },
  { value: 2, label: "Open Source Tools" },
  { value: 1200, suffix: "+", label: "Commits" },
];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;

    const duration = 1400; // ms
    const steps = 40;
    const increment = value / steps;
    const stepTime = duration / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out: slow down as we approach the target
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * value);

      setCount(current);

      if (step >= steps) {
        setCount(value);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-16 border-t border-b border-[var(--border)]">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.6, ease }}
          viewport={{ once: true, margin: "-40px" }}
          className="text-center"
        >
          <p className="font-display text-3xl md:text-4xl font-bold text-[var(--text-1)] tracking-tight mb-2">
            <Counter value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="text-[var(--text-6)] text-[11px] font-mono tracking-[0.2em] uppercase">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
