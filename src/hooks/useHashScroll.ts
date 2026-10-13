import { useEffect, useState } from "react";
import { useLocation } from "react-router";

/**
 * Posizione dell'elemento calcolata sul layout (offsetTop), quindi indipendente
 * dal translate dell'animazione d'ingresso della pagina.
 */
function scrollToElement(el: HTMLElement, behavior: ScrollBehavior) {
  let y = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    y += node.offsetTop;
  }
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  window.scrollTo({ top: y - padding - margin, behavior });
}

/**
 * Porta in vista l'elemento indicato nell'hash.
 * Subito dopo il cambio pagina salta senza animazione, poi scorre in modo fluido.
 */
export function useHashScroll() {
  const { hash, key } = useLocation();
  const [mountKey] = useState(key);

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!el) return;
    const id = requestAnimationFrame(() => scrollToElement(el, key === mountKey ? "instant" : "smooth"));
    return () => cancelAnimationFrame(id);
  }, [hash, key, mountKey]);
}
