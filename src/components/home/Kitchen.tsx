import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT } from "../../config/motion";
import { pillars } from "../../data/home";
import { Eyebrow, LineReveal, Reveal } from "../ui/Reveal";

function Pillar({ index, active, onActive }: { index: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  // Attivo quando attraversa la fascia centrale dello schermo.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const p = pillars[index];

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex flex-col gap-6 py-10 lg:min-h-[70vh] lg:justify-center lg:py-0">
      <img
        src={p.image}
        alt={p.alt}
        loading="lazy"
        decoding="async"
        className="aspect-[4/3] w-full rounded-3xl object-cover lg:hidden"
      />
      <div
        className={`flex flex-col gap-5 transition-opacity duration-500 ${active ? "lg:opacity-100" : "lg:opacity-35"}`}
      >
        <div className="flex items-center gap-4">
          <span className="grid size-12 place-items-center rounded-full border border-shu-bright/40 text-xl text-shu-bright">
            <i className={p.icon} aria-hidden />
          </span>
          <span className="font-display text-sm font-semibold tabular-nums text-mist">0{index + 1}</span>
        </div>
        <h3 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{p.title}</h3>
        <p className="max-w-lg text-lg leading-relaxed text-rice/70">{p.body}</p>
      </div>
    </div>
  );
}

export default function Kitchen() {
  const [active, setActive] = useState(0);

  return (
    <section id="cucina" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex max-w-3xl flex-col gap-6">
          <Reveal>
            <Eyebrow>La cucina</Eyebrow>
          </Reveal>
          <LineReveal
            className="font-display text-5xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-6xl"
            lines={["Tre motivi per sederti", "da noi stasera."]}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-16 lg:mt-6 lg:grid-cols-2">
          <div className="hidden lg:block">
            <div className="sticky top-[15vh] h-[70vh]">
              <div className="relative size-full overflow-hidden rounded-[2rem]">
                {pillars.map((p, i) => (
                  <motion.img
                    key={p.image}
                    src={p.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover"
                    initial={false}
                    animate={{
                      opacity: active === i ? 1 : 0,
                      transform: active === i ? "scale(1)" : "scale(1.06)",
                      filter: active === i ? "blur(0px)" : "blur(6px)",
                    }}
                    transition={{ duration: 0.7, ease: EASE_OUT }}
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 flex gap-2 p-6">
                  {pillars.map((p, i) => (
                    <span key={p.title} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                      <motion.span
                        className="block h-full origin-left bg-white"
                        initial={false}
                        animate={{ transform: `scaleX(${i <= active ? 1 : 0})` }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col divide-y divide-rice/10 lg:divide-y-0">
            {pillars.map((p, i) => (
              <Pillar key={p.title} index={i} active={active === i} onActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
