import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = { to: number; decimals?: number; duration?: number; className?: string };

const format = (n: number, decimals: number) =>
  n.toLocaleString("it-IT", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Numero che sale fino al valore quando entra in vista. Il valore finale è già nel markup. */
export default function CountUp({ to, decimals = 0, duration = 1.4, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || reduce || !el) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => (el.textContent = format(v, decimals)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, decimals, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {format(to, decimals)}
    </span>
  );
}
