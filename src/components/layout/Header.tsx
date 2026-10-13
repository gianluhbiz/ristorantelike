import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { EASE_OUT } from "../../config/motion";
import { navLinks, site } from "../../config/site";
import { useOpenStatus } from "../../hooks/useOpenStatus";
import TransitionLink from "../ui/TransitionLink";
import Logo from "./Logo";

export default function Header() {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const status = useOpenStatus();
  const ref = useRef<HTMLElement>(null);
  const onMenu = pathname === "/menu";

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 520);
  });

  // Altezza visibile dell'header, usata dalla barra categorie del menu per restare sotto.
  useEffect(() => {
    const h = hidden || !ref.current ? 0 : ref.current.offsetHeight;
    document.documentElement.style.setProperty("--header-h", `${h}px`);
  }, [hidden]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Chiude il menu mobile a ogni navigazione.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const linkTo = (hash: string) => ({ pathname: "/", hash: `#${hash}` });

  return (
    <>
      <motion.header
        ref={ref}
        className="fixed inset-x-0 top-0 z-50"
        animate={{ transform: hidden && !open ? "translateY(-100%)" : "translateY(0%)" }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      >
        <div
          className={`border-b transition-[background-color,border-color] duration-300 ${
            scrolled || open ? "border-rice/10 bg-ink/85 backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:h-20 sm:px-8">
            <TransitionLink
              to="/"
              onClick={() => pathname === "/" && window.scrollTo({ top: 0, behavior: "smooth" })}
              className="shrink-0"
              aria-label="Like, torna alla home"
            >
              <Logo />
            </TransitionLink>

            <nav className="hidden items-center gap-8 lg:flex" aria-label="Sezioni">
              {navLinks.map((l) => (
                <TransitionLink
                  key={l.hash}
                  to={linkTo(l.hash)}
                  className="group relative py-2 text-sm text-rice/70 transition-colors duration-200 hover:text-rice"
                >
                  {l.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-shu-bright transition-transform duration-300 ease-out-strong group-hover:scale-x-100" />
                </TransitionLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-2 text-xs text-rice/65 xl:flex">
                <span className={`relative flex size-2 rounded-full ${status.open ? "bg-jade" : "bg-ash"}`}>
                  {status.open && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-jade/70 motion-reduce:hidden" />
                  )}
                </span>
                {status.label}
              </span>

              {onMenu ? (
                <a
                  href={site.phone.href}
                  className="hidden items-center gap-2 rounded-full bg-shu px-5 py-2.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 hover:bg-shu-deep active:scale-[0.97] sm:inline-flex"
                >
                  <i className="ri-phone-line" aria-hidden /> Prenota un tavolo
                </a>
              ) : (
                <TransitionLink
                  to="/menu"
                  className="hidden items-center gap-2 rounded-full bg-shu px-5 py-2.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 hover:bg-shu-deep active:scale-[0.97] sm:inline-flex"
                >
                  Il menu <i className="ri-arrow-right-up-line" aria-hidden />
                </TransitionLink>
              )}

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="grid size-11 place-items-center rounded-full border border-rice/20 text-xl text-rice transition-transform duration-150 active:scale-[0.95] lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Chiudi menu" : "Apri menu"}
              >
                <i className={open ? "ri-close-line" : "ri-menu-4-line"} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-4 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.3, ease: EASE_OUT } }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <nav className="flex flex-col" aria-label="Menu mobile">
              {[
                ...navLinks.map((l) => ({ label: l.label, to: linkTo(l.hash) })),
                { label: "Il menu", to: { pathname: "/menu" } },
              ].map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, transform: "translateY(20px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.045, ease: EASE_OUT }}
                >
                  <TransitionLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-rice/10 py-4 font-display text-3xl font-semibold text-rice"
                  >
                    {l.label}
                    <i className="ri-arrow-right-line text-xl text-shu-bright" aria-hidden />
                  </TransitionLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="mt-auto flex flex-col gap-3 pt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <p className="flex items-center gap-2 text-sm text-rice/70">
                <span className={`size-2 rounded-full ${status.open ? "bg-jade" : "bg-ash"}`} />
                {status.label}
              </p>
              <a
                href={site.phone.href}
                className="flex items-center justify-center gap-2 rounded-full bg-shu py-4 font-semibold text-white transition-transform duration-150 active:scale-[0.97]"
              >
                <i className="ri-phone-line" aria-hidden /> Chiama {site.phone.label}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
