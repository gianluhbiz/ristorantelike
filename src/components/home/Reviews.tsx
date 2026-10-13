import { motion } from "framer-motion";
import { EASE_OUT, VIEWPORT } from "../../config/motion";
import { site } from "../../config/site";
import { reviews } from "../../data/home";
import CountUp from "../ui/CountUp";
import { Eyebrow, LineReveal, Reveal } from "../ui/Reveal";
import Stars from "../ui/Stars";

export default function Reviews() {
  const max = Math.max(...site.rating.distribution.map((d) => d.count));

  return (
    <section id="recensioni" className="relative bg-coal py-24 sm:py-32">
      <div className="mx-auto grid grid-cols-1 max-w-7xl gap-16 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow>Recensioni</Eyebrow>
          </Reveal>
          <LineReveal
            className="font-display text-5xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-6xl"
            lines={["Lo dicono", "i clienti."]}
          />

          <Reveal delay={0.1} className="flex flex-col gap-6 rounded-3xl border border-rice/10 bg-ink p-7">
            <div className="flex items-end gap-4">
              <CountUp to={site.rating.score} decimals={1} className="font-display text-7xl font-bold leading-none" />
              <div className="flex flex-col gap-1 pb-1.5">
                <Stars value={site.rating.score} />
                <span className="text-sm text-mist">{site.rating.count} recensioni su Google</span>
              </div>
            </div>
            <ul className="flex flex-col gap-2">
              {site.rating.distribution.map((d, i) => (
                <li key={d.stars} className="flex items-center gap-3 text-xs text-mist">
                  <span className="w-3 tabular-nums">{d.stars}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-rice/10">
                    <motion.span
                      className="block h-full origin-left rounded-full bg-shu-bright"
                      style={{ width: `${(d.count / max) * 100}%` }}
                      initial={{ transform: "scaleX(0)" }}
                      whileInView={{ transform: "scaleX(1)" }}
                      viewport={VIEWPORT}
                      transition={{ duration: 1, delay: 0.2 + i * 0.06, ease: EASE_OUT }}
                    />
                  </span>
                  <span className="w-8 text-right tabular-nums">{d.count}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="columns-1 gap-5 sm:columns-2">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.author}
              initial={{ opacity: 0, transform: "translateY(28px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: EASE_OUT }}
              className="mb-5 flex break-inside-avoid flex-col gap-6 rounded-3xl border border-rice/10 bg-char p-7"
            >
              <i className="ri-double-quotes-l text-3xl text-shu-bright" aria-hidden />
              <blockquote className="font-display text-xl font-semibold leading-snug text-rice sm:text-2xl">
                {r.quote}
              </blockquote>
              <figcaption className="flex items-center justify-between gap-4 border-t border-rice/10 pt-4 text-sm">
                <span className="font-medium text-rice/85">{r.author}</span>
                <span className="text-mist">{r.source}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
