type Bezier = [number, number, number, number];

/** Ease-out deciso per ingressi e uscite. */
export const EASE_OUT: Bezier = [0.23, 1, 0.32, 1];
/** Ease-in-out per movimenti sullo schermo (timbro e sipario tra le pagine). */
export const EASE_IN_OUT: Bezier = [0.77, 0, 0.175, 1];

export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;
