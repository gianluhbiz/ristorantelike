import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASE_OUT } from "../../config/motion";
import { site } from "../../config/site";
import { useOpenStatus } from "../../hooks/useOpenStatus";
import { useEntryDelay } from "../../lib/entryDelay";
import { Eyebrow, LineReveal } from "../ui/Reveal";
import Seigaiha from "../ui/Seigaiha";
import Stars from "../ui/Stars";
import TransitionLink from "../ui/TransitionLink";

const euro = (n: number) => n.toLocaleString("it-IT", { style: "currency", currency: "EUR" });

/** Foto che si scopre dal basso, con l'immagine che rientra leggermente di scala. */
function Photo({
  src,
  alt,
  className,
  delay,
  priority,
}: {
  src: string;
  alt: string;
  className: string;
  delay: number;
  priority?: boolean;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1.2, delay, ease: EASE_OUT }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="size-full object-cover"
        initial={{ transform: "scale(1.18)" }}
        animate={{ transform: "scale(1)" }}
        transition={{ duration: 1.6, delay, ease: EASE_OUT }}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const entry = useEntryDelay();
  const status = useOpenStatus();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const slow = useTransform(scrollYProgress, [0, 1], ["translateY(0px)", "translateY(-60px)"]);
  const fast = useTransform(scrollYProgress, [0, 1], ["translateY(0px)", "translateY(-160px)"]);
  const sun = useTransform(scrollYProgress, [0, 1], ["translateY(0px) scale(1)", "translateY(90px) scale(1.15)"]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, transform: "translateY(18px)" },
    animate: { opacity: 1, transform: "translateY(0px)" },
    transition: { duration: 0.9, delay: entry + delay, ease: EASE_OUT },
  });

  return (
    <section ref={ref} className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 lg:min-h-svh lg:pb-24">
      <Seigaiha className="-z-10 text-rice/[0.07] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />

      <div className="mx-auto grid grid-cols-1 max-w-7xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="flex flex-col gap-7">
          <motion.div {...fade(0)}>
            <Eyebrow>Sushi e cucina cinese · Biella</Eyebrow>
          </motion.div>

          <LineReveal
            as="h1"
            trigger="mount"
            delay={0.1}
            className="font-display text-[3.1rem] font-bold leading-[1.02] tracking-[-0.02em] text-balance sm:text-7xl xl:text-[5.6rem]"
            lines={[
              "Il sushi",
              "lo tagliamo",
              <span className="text-shu-bright">davanti a te.</span>,
            ]}
          />

          <motion.p {...fade(0.45)} className="max-w-md text-lg leading-relaxed text-rice/75">
            All you can eat a pranzo e a cena in via Fratelli Rosselli 72. Pesce fresco ogni mattina, ravioli alla
            piastra e un banco sushi a vista.
          </motion.p>

          <motion.div {...fade(0.55)} className="flex flex-wrap gap-3">
            <TransitionLink
              to="/menu"
              className="group inline-flex items-center gap-3 rounded-full bg-shu py-4 pl-7 pr-5 font-semibold text-white transition-[transform,background-color] duration-150 hover:bg-shu-deep active:scale-[0.97]"
            >
              Sfoglia il menu
              <span className="grid size-7 place-items-center rounded-full bg-white/15 transition-transform duration-300 ease-out-strong group-hover:translate-x-1">
                <i className="ri-arrow-right-line" aria-hidden />
              </span>
            </TransitionLink>
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-2 rounded-full border border-rice/20 px-6 py-4 font-semibold text-rice transition-[transform,border-color,background-color] duration-150 hover:border-rice/40 hover:bg-rice/5 active:scale-[0.97]"
            >
              <i className="ri-phone-line" aria-hidden />
              {site.phone.label}
            </a>
          </motion.div>

          <motion.dl {...fade(0.7)} className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-rice/10 pt-6">
            <div className="flex items-center gap-3">
              <dt className="sr-only">Valutazione su Google</dt>
              <dd className="font-display text-4xl font-bold">4,2</dd>
              <dd className="flex flex-col gap-1 text-xs text-mist">
                <Stars value={site.rating.score} className="text-sm" />
                {site.rating.count} recensioni su Google
              </dd>
            </div>
            <div className="h-10 w-px bg-rice/10" aria-hidden />
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-mist">All you can eat a pranzo</dt>
              <dd className="font-display text-2xl font-bold">{euro(site.formula.lunch.price)}</dd>
            </div>
          </motion.dl>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[540px]">
          <motion.div
            aria-hidden
            style={{ transform: sun }}
            className="absolute -left-4 top-[6%] -z-10 aspect-square w-[72%] rounded-full bg-shu sm:-left-10"
          />
          <motion.div style={{ transform: slow }} className="absolute inset-y-0 right-0 w-[78%]">
            <Photo
              src="/images/sashimi-salmone.webp"
              alt="Sashimi di salmone disposto a fiore con semi di sesamo"
              className="size-full rounded-[2rem] shadow-2xl shadow-black/60"
              delay={entry + 0.2}
              priority
            />
          </motion.div>
          <motion.div style={{ transform: fast }} className="absolute bottom-[8%] left-0 w-[52%]">
            <Photo
              src="/images/roll-anguilla.webp"
              alt="Uramaki con anguilla e avocado"
              className="aspect-[4/3] rounded-3xl border-4 border-ink shadow-2xl shadow-black/60"
              delay={entry + 0.45}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, transform: "translateY(12px) scale(0.96)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            transition={{ duration: 0.7, delay: entry + 1, ease: EASE_OUT }}
            className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-ink/70 px-4 py-2 text-xs font-medium text-rice backdrop-blur-md sm:right-6 sm:top-6"
          >
            <span className={`relative flex size-2 rounded-full ${status.open ? "bg-jade" : "bg-ash"}`}>
              {status.open && <span className="absolute inset-0 animate-ping rounded-full bg-jade/70 motion-reduce:hidden" />}
            </span>
            {status.label}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
