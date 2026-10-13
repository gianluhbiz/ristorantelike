import { motion } from "framer-motion";
import { EASE_OUT, VIEWPORT } from "../../config/motion";
import { site } from "../../config/site";
import CountUp from "../ui/CountUp";
import { Eyebrow, LineReveal, Reveal } from "../ui/Reveal";
import Seigaiha from "../ui/Seigaiha";

const plans = [
  { ...site.formula.lunch, icon: "ri-sun-line", dark: false },
  { ...site.formula.dinner, icon: "ri-moon-line", dark: true },
];

export default function Formula() {
  return (
    <section id="formula" className="relative bg-rice py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div className="flex flex-col gap-6">
            <Reveal>
              <Eyebrow tone="dark">La formula</Eyebrow>
            </Reveal>
            <LineReveal
              className="font-display text-5xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-6xl"
              lines={["Paghi una volta,", "ordini a giri."]}
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-ink/70">
              Scegli dal menu, scrivi i numeri dei piatti sul foglio della comanda e la cucina prepara al momento.
              Hai ancora fame? Ordini il giro successivo.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1fr_0.9fr]">
          {plans.map((p, i) => (
            <motion.article
              key={p.label}
              initial={{ opacity: 0, transform: "translateY(32px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: i * 0.08, ease: EASE_OUT }}
              className={`relative flex flex-col gap-10 overflow-hidden rounded-[1.75rem] p-8 sm:p-10 ${
                p.dark ? "bg-ink text-rice" : "border border-ink/10 bg-paper"
              }`}
            >
              {p.dark && <Seigaiha className="text-rice/[0.06]" fill="var(--color-ink)" r={18} />}
              <div className="relative flex items-center justify-between">
                <h3 className="font-display text-3xl font-bold">{p.label}</h3>
                <i className={`${p.icon} text-2xl ${p.dark ? "text-shu-bright" : "text-shu"}`} aria-hidden />
              </div>
              <div className="relative">
                <p className="flex items-start gap-1 font-display font-bold leading-none">
                  <span className="mt-2 text-3xl">€</span>
                  <CountUp to={p.price} decimals={2} className="text-7xl tracking-[-0.03em] sm:text-8xl" />
                </p>
                <p className={`mt-3 text-sm ${p.dark ? "text-mist" : "text-ink/60"}`}>a persona, all you can eat</p>
              </div>
              <p
                className={`relative flex items-center gap-2 border-t pt-5 text-sm font-medium ${
                  p.dark ? "border-rice/15" : "border-ink/10"
                }`}
              >
                <i className="ri-time-line" aria-hidden /> {p.when}
              </p>
            </motion.article>
          ))}

          <motion.article
            initial={{ opacity: 0, transform: "translateY(32px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0.16, ease: EASE_OUT }}
            className="flex flex-col gap-6 rounded-[1.75rem] bg-shu p-8 text-white sm:p-10 md:col-span-2 lg:col-span-1"
          >
            <i className="ri-takeaway-line text-4xl" aria-hidden />
            <h3 className="font-display text-3xl font-bold leading-tight">Da asporto o a casa tua</h3>
            <p className="leading-relaxed text-white/85">
              Ordina al telefono e passa a ritirare, oppure fatti portare il sushi a casa. Consegniamo a Biella e nei
              paesi intorno.
            </p>
            <a
              href={site.phone.href}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-white py-3.5 font-semibold text-shu-deep transition-transform duration-150 active:scale-[0.97]"
            >
              <i className="ri-phone-line" aria-hidden /> Ordina al {site.phone.label}
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
