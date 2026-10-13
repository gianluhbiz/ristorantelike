import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_IN_OUT, EASE_OUT } from "../../config/motion";
import { EntryDelayContext } from "../../lib/entryDelay";
import { coverRadius, type Origin } from "../../lib/transitionOrigin";

type Props = { label: string; animateIn: boolean; children: ReactNode };

const EXIT = 0.6;

/**
 * Cambio pagina a timbro: in uscita un cerchio vermiglio si allarga dal punto del clic
 * e copre la pagina; in entrata mostra il nome della nuova pagina e si ritira verso l'alto.
 * Il punto di partenza arriva da AnimatePresence come `custom`.
 */
export default function PageTransition({ label, animateIn, children }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div
        initial={animateIn ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <EntryDelayContext value={0}>{children}</EntryDelayContext>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={animateIn ? { transform: "translateY(56px)" } : false}
        animate={{
          transform: "translateY(0px)",
          // "none" evita che il transform resti come containing block per sticky/fixed
          transitionEnd: { transform: "none" },
          transition: { duration: 1, delay: 0.4, ease: EASE_OUT },
        }}
        // Keyframe espliciti: partendo da "none" Motion interpolerebbe da valori nulli.
        exit={{
          transform: ["translateY(0px)", "translateY(-40px)"],
          opacity: 0.5,
          transition: { duration: EXIT, ease: EASE_IN_OUT },
        }}
      >
        <EntryDelayContext value={animateIn ? 0.7 : 0}>{children}</EntryDelayContext>
      </motion.div>

      {/* Uscita: il timbro si allarga dal punto del clic */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] bg-shu"
        style={{ clipPath: "circle(0px at 50% 50%)" }}
        variants={{
          exit: (o: Origin) => ({
            clipPath: [`circle(0px at ${o.x}px ${o.y}px)`, `circle(${coverRadius(o)}px at ${o.x}px ${o.y}px)`],
            transition: { duration: EXIT, ease: EASE_IN_OUT },
          }),
        }}
        exit="exit"
      />

      {/* Entrata: il pannello mostra il titolo, poi si ritira verso l'alto */}
      {animateIn && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-shu"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_IN_OUT }}
        >
          <motion.div
            className="flex flex-col items-center gap-5 text-white"
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <span className="grid size-16 place-items-center rounded-full border border-white/40 font-display text-3xl font-bold">
              可
            </span>
            <span className="font-display text-4xl font-semibold sm:text-6xl">{label}</span>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
