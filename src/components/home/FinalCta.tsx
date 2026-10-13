import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "../../config/site";
import { LineReveal, Reveal } from "../ui/Reveal";
import TransitionLink from "../ui/TransitionLink";

export default function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const sun = useTransform(scrollYProgress, [0, 1], ["translateY(25%) scale(0.85)", "translateY(-10%) scale(1.1)"]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden border-t border-rice/10 py-28 sm:py-40">
      <motion.div
        aria-hidden
        style={{ transform: sun }}
        className="absolute left-1/2 top-1/2 -z-10 -ml-[min(35vw,22rem)] -mt-[min(35vw,22rem)] size-[min(70vw,44rem)] rounded-full bg-shu"
      />
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 text-center">
        <LineReveal
          className="font-display text-5xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-7xl"
          lines={["Stasera", "sushi da Like?"]}
        />
        <Reveal delay={0.1}>
          <p className="max-w-md text-lg leading-relaxed text-white/85">
            Chiama per prenotare il tavolo o ordinare da asporto. Prima vuoi vedere cosa c'è? Il menu è qui.
          </p>
        </Reveal>
        <Reveal delay={0.18} className="flex flex-wrap justify-center gap-3">
          <a
            href={site.phone.href}
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-ink transition-transform duration-150 active:scale-[0.97]"
          >
            <i className="ri-phone-line" aria-hidden /> {site.phone.label}
          </a>
          <TransitionLink
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-ink/30 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-[transform,background-color] duration-150 hover:bg-ink/50 active:scale-[0.97]"
          >
            Sfoglia il menu <i className="ri-arrow-right-line" aria-hidden />
          </TransitionLink>
        </Reveal>
      </div>
    </section>
  );
}
