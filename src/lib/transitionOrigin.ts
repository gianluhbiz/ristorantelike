export type Origin = { x: number; y: number };

/** Punto da cui parte il timbro rosso al prossimo cambio pagina. */
let origin: Origin | null = null;

export function setTransitionOrigin(event: React.MouseEvent<HTMLElement>) {
  // Da tastiera clientX/Y valgono 0: si parte dal centro dell'elemento.
  if (event.clientX || event.clientY) {
    origin = { x: event.clientX, y: event.clientY };
  } else {
    const r = event.currentTarget.getBoundingClientRect();
    origin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
}

/** Dopo il cambio pagina: i tasti avanti/indietro del browser partono dal centro. */
export function resetTransitionOrigin() {
  origin = null;
}

export function getTransitionOrigin(): Origin {
  if (typeof window === "undefined") return { x: 0, y: 0 };
  return origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

/** Raggio che copre tutto il viewport partendo da quel punto. */
export function coverRadius({ x, y }: Origin) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return Math.ceil(Math.hypot(Math.max(x, w - x), Math.max(y, h - y)));
}
