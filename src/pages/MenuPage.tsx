import { AnimatePresence, motion } from "framer-motion";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import CategoryNav from "../components/menu/CategoryNav";
import MenuHero from "../components/menu/MenuHero";
import MenuSection from "../components/menu/MenuSection";
import { Reveal } from "../components/ui/Reveal";
import TransitionLink from "../components/ui/TransitionLink";
import { EASE_OUT } from "../config/motion";
import { site } from "../config/site";
import { menu, type MenuCategory } from "../data/menu";
import { useHashScroll } from "../hooks/useHashScroll";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

function filterMenu(query: string): MenuCategory[] {
  const q = normalize(query.trim());
  if (!q) return menu;
  return menu
    .map((c) => ({
      ...c,
      items: c.items.filter((i) => normalize(`${i.n ?? ""} ${i.name} ${i.desc ?? ""} ${c.title}`).includes(q)),
    }))
    .filter((c) => c.items.length > 0);
}

/** Porta la sezione sotto header e barra categorie. Scendendo l'header si nasconde, salendo torna. */
function scrollToCategory(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const nav = document.querySelector<HTMLElement>("[data-category-nav]");
  const y = el.getBoundingClientRect().top + window.scrollY;
  const goingDown = y > window.scrollY;
  const header = goingDown ? 0 : document.querySelector("header")?.offsetHeight ?? 0;
  window.scrollTo({ top: y - header - (nav?.offsetHeight ?? 0) + 1, behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

export default function MenuPage() {
  useHashScroll();
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const categories = useMemo(() => filterMenu(deferred), [deferred]);
  const [active, setActive] = useState(menu[0].id);
  const total = categories.reduce((n, c) => n + c.items.length, 0);

  // Categoria attiva: quella che attraversa la fascia alta dello schermo.
  useEffect(() => {
    const sections = categories.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [categories]);

  return (
    <main>
      <MenuHero />
      <CategoryNav
        categories={categories.length ? categories : menu}
        active={active}
        query={query}
        onQuery={setQuery}
        onSelect={scrollToCategory}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <AnimatePresence initial={false}>
          {deferred.trim() && (
            <motion.p
              key="count"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className="pt-8 text-sm text-mist"
              aria-live="polite"
            >
              {total ? `${total} piatti per “${deferred.trim()}”` : ""}
            </motion.p>
          )}
        </AnimatePresence>

        {categories.length ? (
          categories.map((c, i) => <MenuSection key={c.id} category={c} index={i} />)
        ) : (
          <div className="flex flex-col items-center gap-4 py-24 text-center" aria-live="polite">
            <i className="ri-search-eye-line text-4xl text-shu-bright" aria-hidden />
            <p className="font-display text-3xl font-bold">Nessun piatto per “{deferred.trim()}”</p>
            <p className="max-w-sm text-rice/65">Prova con un ingrediente, come salmone o gamberetti, oppure chiedi in sala.</p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-2 rounded-full border border-rice/20 px-6 py-3 font-semibold transition-[transform,background-color] duration-150 hover:bg-rice/5 active:scale-[0.97]"
            >
              Mostra tutto il menu
            </button>
          </div>
        )}

        <Reveal className="my-16 flex flex-col gap-6 rounded-[1.75rem] border border-rice/10 bg-coal p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex flex-col gap-2">
            <p className="font-display text-2xl font-bold sm:text-3xl">Allergie o intolleranze?</p>
            <p className="max-w-lg text-rice/65">
              Dillo in sala prima di ordinare: ti indichiamo gli allergeni di ogni piatto.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-2 rounded-full bg-shu px-6 py-3.5 font-semibold text-white transition-[transform,background-color] duration-150 hover:bg-shu-deep active:scale-[0.97]"
            >
              <i className="ri-phone-line" aria-hidden /> {site.phone.label}
            </a>
            <TransitionLink
              to={{ pathname: "/", hash: "#contatti" }}
              className="inline-flex items-center gap-2 rounded-full border border-rice/20 px-6 py-3.5 font-semibold transition-[transform,background-color] duration-150 hover:bg-rice/5 active:scale-[0.97]"
            >
              Orari e indirizzo
            </TransitionLink>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
