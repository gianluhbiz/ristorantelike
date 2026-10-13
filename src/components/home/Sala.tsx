import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASE_OUT, VIEWPORT } from "../../config/motion";
import { salaFacts } from "../../data/home";
import { Eyebrow, LineReveal, Reveal } from "../ui/Reveal";

export default function Sala() {
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "center center"] });
  // La foto si apre fino ai bordi mentre arriva al centro dello schermo.
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(6% 7% 6% 7% round 2rem)", "inset(0% 0% 0% 0% round 1.5rem)"]);
  const transform = useTransform(scrollYProgress, [0, 1], ["scale(1.15)", "scale(1)"]);

  return (
    <section id="sala" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div className="flex flex-col gap-6">
            <Reveal>
              <Eyebrow>La sala</Eyebrow>
            </Reveal>
            <LineReveal
              className="font-display text-5xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-6xl"
              lines={["Luci calde,", "colori scuri."]}
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-rice/70">
              Una sala raccolta, arredata con gusto discreto. Molti clienti la scelgono per le cene in famiglia perché
              al tavolo si chiacchiera senza alzare la voce.
            </p>
          </Reveal>
        </div>

        <motion.div ref={frameRef} style={{ clipPath }} className="mt-14 aspect-[4/3] overflow-hidden sm:aspect-[2/1]">
          <motion.img
            style={{ transform }}
            src="/images/sala.webp"
            alt="La sala di Like: tavoli apparecchiati con tovaglie bianche, parete in pietra chiara e bancone scuro"
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        </motion.div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[1fr_1fr_1.1fr]">
          {[
            { src: "/images/sala-banco.webp", alt: "Il bancone con le lanterne rosse e la sala sullo sfondo" },
            { src: "/images/sala-tavolo.webp", alt: "Un tavolo apparecchiato con una rosa rossa" },
          ].map((img, i) => (
            <motion.div
              key={img.src}
              className="aspect-[5/4] overflow-hidden rounded-3xl"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={VIEWPORT}
              transition={{ duration: 1.1, delay: i * 0.1, ease: EASE_OUT }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="size-full object-cover" />
            </motion.div>
          ))}

          <ul className="flex flex-col justify-center gap-1 rounded-3xl border border-rice/10 bg-coal p-6 sm:p-8">
            {salaFacts.map((f, i) => (
              <motion.li
                key={f.label}
                initial={{ opacity: 0, transform: "translateX(-12px)" }}
                whileInView={{ opacity: 1, transform: "translateX(0px)" }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: EASE_OUT }}
                className="flex items-center gap-4 border-b border-rice/10 py-3 last:border-0"
              >
                <i className={`${f.icon} text-xl text-shu-bright`} aria-hidden />
                <span className="text-rice/85">{f.label}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
