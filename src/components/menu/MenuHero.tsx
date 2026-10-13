import { motion } from "framer-motion";
import { EASE_OUT } from "../../config/motion";
import { site } from "../../config/site";
import { tagLabels } from "../../data/menu";
import { useEntryDelay } from "../../lib/entryDelay";
import { Eyebrow, LineReveal } from "../ui/Reveal";
import Seigaiha from "../ui/Seigaiha";

const euro = (n: number) => n.toLocaleString("it-IT", { style: "currency", currency: "EUR" });

export default function MenuHero() {
  const entry = useEntryDelay();
  const fade = (delay: number) => ({
    initial: { opacity: 0, transform: "translateY(16px)" },
    animate: { opacity: 1, transform: "translateY(0px)" },
    transition: { duration: 0.9, delay: entry + delay, ease: EASE_OUT },
  });

  return (
    <section className="relative isolate overflow-hidden pb-14 pt-32 sm:pt-40">
      <Seigaiha className="-z-10 text-rice/[0.06] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="flex flex-col gap-6">
          <motion.div {...fade(0)}>
            <Eyebrow>Sushi e cucina cinese</Eyebrow>
          </motion.div>
          <LineReveal
            as="h1"
            trigger="mount"
            delay={0.05}
            className="font-display text-6xl font-bold leading-[1] tracking-[-0.02em] sm:text-8xl"
            lines={["Il menu"]}
          />
          <motion.p {...fade(0.3)} className="max-w-lg text-lg leading-relaxed text-rice/70">
            Ogni piatto ha il suo numero. Al tavolo lo scrivi sul foglio della comanda e la cucina lo prepara al
            momento.
          </motion.p>
          <motion.ul {...fade(0.4)} className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-mist">
            {Object.values(tagLabels).map((t) => (
              <li key={t.label} className="flex items-center gap-1.5">
                <i className={`${t.icon} text-shu-bright`} aria-hidden /> {t.label}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div {...fade(0.35)} className="grid grid-cols-2 overflow-hidden rounded-[1.75rem] border border-rice/10">
          {[site.formula.lunch, site.formula.dinner].map((f, i) => (
            <div key={f.label} className={`flex flex-col gap-3 p-6 sm:p-8 ${i ? "bg-shu text-white" : "bg-coal"}`}>
              <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${i ? "text-white/80" : "text-mist"}`}>
                {f.label}
              </span>
              <span className="font-display text-4xl font-bold sm:text-5xl">{euro(f.price)}</span>
              <span className={`text-sm leading-snug ${i ? "text-white/85" : "text-rice/65"}`}>
                All you can eat
                <br />
                {f.when}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
