import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { MenuCategory } from "../../data/menu";

type Props = {
  categories: MenuCategory[];
  active: string;
  query: string;
  onQuery: (q: string) => void;
  onSelect: (id: string) => void;
};

/** Barra sticky: categorie con indicatore che scivola e ricerca. Resta sotto l'header. */
export default function CategoryNav({ categories, active, query, onQuery, onSelect }: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  // Tiene in vista la categoria attiva quando la barra scorre in orizzontale (mobile).
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !el) return;
    const left = el.offsetLeft - list.clientWidth / 2 + el.offsetWidth / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <div
      data-category-nav
      className="sticky z-30 border-y border-rice/10 bg-ink/85 backdrop-blur-xl transition-[top] duration-300 ease-out-strong"
      style={{ top: "var(--header-h, 0px)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-8 md:flex-row md:items-center md:gap-6">
        <ul
          ref={listRef}
          className="-mx-4 flex flex-1 gap-1 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:px-0"
          aria-label="Categorie del menu"
        >
          {categories.map((c) => {
            const on = c.id === active;
            return (
              <li key={c.id} data-id={c.id} className="shrink-0">
                <a
                  href={`#${c.id}`}
                  aria-current={on ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelect(c.id);
                  }}
                  className={`relative isolate block rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    on ? "text-white" : "text-rice/65 hover:text-rice"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-shu"
                      transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                    />
                  )}
                  {c.title}
                </a>
              </li>
            );
          })}
        </ul>

        <label className="relative flex items-center md:w-64">
          <span className="sr-only">Cerca un piatto</span>
          <i className="ri-search-line pointer-events-none absolute left-4 text-rice/50" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Cerca: salmone, ravioli..."
            className="w-full rounded-full border border-rice/15 bg-coal py-2.5 pl-11 pr-4 text-sm text-rice placeholder:text-rice/40 focus:border-shu-bright focus:outline-none"
          />
        </label>
      </div>
    </div>
  );
}
