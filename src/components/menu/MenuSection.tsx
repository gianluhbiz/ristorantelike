import { motion } from "framer-motion";
import { EASE_OUT, VIEWPORT } from "../../config/motion";
import { tagLabels, type MenuCategory } from "../../data/menu";

type Props = { category: MenuCategory; index: number };

export default function MenuSection({ category, index }: Props) {
  const { id, title, note, image, items } = category;

  return (
    <section id={id} className="scroll-mt-16 border-t border-rice/10 py-14 first:border-0 sm:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="flex flex-col gap-5 lg:sticky lg:top-[calc(var(--header-h,0px)+7rem)] lg:self-start">
          <span className="font-display text-sm font-semibold tabular-nums text-shu-bright">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{title}</h2>
          {note && <p className="max-w-xs leading-relaxed text-rice/65">{note}</p>}
          {image && (
            <motion.div
              className="mt-2 hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block"
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={VIEWPORT}
              transition={{ duration: 1.1, ease: EASE_OUT }}
            >
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="size-full object-cover" />
            </motion.div>
          )}
        </div>

        <ul className="flex flex-col">
          {items.map((item, i) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, transform: "translateY(16px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.04, ease: EASE_OUT }}
              className="group flex items-start gap-5 border-b border-rice/10 py-5 last:border-0"
            >
              <span
                className={`grid size-12 shrink-0 place-items-center rounded-full border font-display text-sm font-bold tabular-nums transition-colors duration-200 ${
                  item.n
                    ? "border-shu-bright/50 text-shu-bright [@media(hover:hover)]:group-hover:border-shu [@media(hover:hover)]:group-hover:bg-shu [@media(hover:hover)]:group-hover:text-white"
                    : "border-rice/15 text-rice/40"
                }`}
                aria-label={item.n ? `Numero ${item.n}` : undefined}
              >
                {item.n ?? <i className="ri-restaurant-2-line text-base" aria-hidden />}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-1">
                <h3 className="text-lg font-semibold leading-snug text-rice sm:text-xl">{item.name}</h3>
                {item.desc && <p className="leading-relaxed text-rice/60">{item.desc}</p>}
                {item.tags && (
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <li
                        key={t}
                        className="flex items-center gap-1.5 rounded-full bg-rice/[0.06] px-2.5 py-1 text-xs text-rice/75"
                      >
                        <i className={`${tagLabels[t].icon} text-shu-bright`} aria-hidden />
                        {tagLabels[t].label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
