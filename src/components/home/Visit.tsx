import { motion } from "framer-motion";
import { EASE_OUT, VIEWPORT } from "../../config/motion";
import { openingHours, site } from "../../config/site";
import { useOpenStatus } from "../../hooks/useOpenStatus";
import { formatMinutes } from "../../lib/hours";
import { Eyebrow, LineReveal, Reveal } from "../ui/Reveal";
import Seigaiha from "../ui/Seigaiha";

const weekOrder = [1, 2, 3, 4, 5, 6, 0];

export default function Visit() {
  const status = useOpenStatus();

  const contacts = [
    { icon: "ri-map-pin-2-line", label: "Indirizzo", value: `${site.address.street}, ${site.address.city}`, href: site.address.maps, external: true },
    { icon: "ri-phone-line", label: "Telefono", value: site.phone.label, href: site.phone.href },
    { icon: "ri-mail-line", label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: "ri-facebook-circle-line", label: "Facebook", value: "Ristorante Li Ke", href: site.facebook, external: true },
  ];

  return (
    <section id="contatti" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col gap-6">
          <Reveal>
            <Eyebrow>Contatti e orari</Eyebrow>
          </Reveal>
          <LineReveal
            className="font-display text-5xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-6xl"
            lines={["Ci trovi in", "via Rosselli 72."]}
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="relative overflow-hidden rounded-[1.75rem] border border-rice/10 bg-coal p-7 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-display text-3xl font-bold">Orari</h3>
              <span
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                  status.open ? "bg-jade/15 text-jade" : "bg-rice/10 text-rice/75"
                }`}
              >
                <span className={`size-2 rounded-full ${status.open ? "bg-jade" : "bg-ash"}`} />
                {status.label}
              </span>
            </div>
            <ul className="mt-8 flex flex-col">
              {weekOrder.map((d, i) => {
                const today = d === status.today;
                return (
                  <motion.li
                    key={d}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.5, delay: i * 0.04, ease: EASE_OUT }}
                    className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-rice/10 py-4 last:border-0 ${
                      today ? "text-rice" : "text-rice/70"
                    }`}
                  >
                    <span className="flex items-center gap-3 font-medium">
                      {openingHours[d].day}
                      {today && (
                        <span className="rounded-full bg-shu px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider text-white">
                          Oggi
                        </span>
                      )}
                    </span>
                    <span className="tabular-nums">
                      {openingHours[d].slots.map(([a, b]) => `${formatMinutes(a)} - ${formatMinutes(b)}`).join("   ·   ")}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
            <p className="mt-6 text-sm text-mist">Il lunedì siamo aperti solo a cena.</p>
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={0.08} className="flex flex-col rounded-[1.75rem] border border-rice/10 bg-coal p-3">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl p-4 transition-colors duration-200 hover:bg-rice/5"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-shu/15 text-lg text-shu-bright">
                    <i className={c.icon} aria-hidden />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-xs uppercase tracking-[0.18em] text-mist">{c.label}</span>
                    <span className="truncate font-medium text-rice">{c.value}</span>
                  </span>
                  <i
                    className="ri-arrow-right-up-line ml-auto text-lg text-rice/40 transition-transform duration-300 ease-out-strong group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rice"
                    aria-hidden
                  />
                </a>
              ))}
            </Reveal>

            <Reveal delay={0.14} className="relative flex-1 overflow-hidden rounded-[1.75rem] bg-shu p-8 text-white">
              <Seigaiha className="text-white/15" fill="var(--color-shu)" r={20} />
              <div className="relative flex h-full flex-col gap-5">
                <h3 className="font-display text-3xl font-bold leading-tight">Come arrivare</h3>
                <p className="leading-relaxed text-white/85">
                  Siamo a pochi passi dal Palazzetto dello Sport. Il parcheggio in strada è gratuito.
                </p>
                <a
                  href={site.address.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3.5 font-semibold text-shu-deep transition-transform duration-150 active:scale-[0.97]"
                >
                  <i className="ri-direction-line" aria-hidden /> Apri in Google Maps
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
