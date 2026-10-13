import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT, VIEWPORT } from "../../config/motion";
import { useEntryDelay } from "../../lib/entryDelay";

type RevealProps = { children: ReactNode; className?: string; delay?: number; distance?: number };

/** Dissolvenza dal basso quando l'elemento entra nel viewport. */
export function Reveal({ children, className, delay = 0, distance = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, transform: `translateY(${distance}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

type LinesProps = {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "p";
  delay?: number;
  /** "mount" per l'hero, "view" per le sezioni */
  trigger?: "mount" | "view";
};

/** Titolo che sale riga per riga da dietro una maschera. */
export function LineReveal({ lines, className, as = "h2", delay = 0, trigger = "view" }: LinesProps) {
  const entry = useEntryDelay();
  const Tag = motion[as];
  const start = trigger === "mount" ? delay + entry : delay;
  return (
    <Tag
      className={className}
      initial="hidden"
      {...(trigger === "mount" ? { animate: "shown" } : { whileInView: "shown", viewport: VIEWPORT })}
    >
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <motion.span
            className="block"
            variants={{ hidden: { transform: "translateY(110%)" }, shown: { transform: "translateY(0%)" } }}
            transition={{ duration: 1.05, delay: start + i * 0.09, ease: EASE_OUT }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] ${
        tone === "light" ? "text-shu-bright" : "text-shu-deep"
      }`}
    >
      <span className={`size-1.5 rounded-full ${tone === "light" ? "bg-shu-bright" : "bg-shu-deep"}`} />
      {children}
    </p>
  );
}
