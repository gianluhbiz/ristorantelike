/** Minuti dalla mezzanotte. */
const t = (h: number, m = 0) => h * 60 + m;

const lunch: [number, number] = [t(12), t(15)];
const dinner: [number, number] = [t(18), t(23, 45)];

export const site = {
  name: "Like",
  fullName: "Ristorante Like",
  tagline: "Sushi e cucina cinese",
  address: {
    street: "Via Fratelli Rosselli 72",
    city: "13900 Biella",
    maps: "https://www.google.com/maps/place/Like/@45.554428,8.0466579,17z/data=!3m1!4b1!4m6!3m5!1s0x478620da85deef4d:0x3994fa294c9d9138!8m2!3d45.5544243!4d8.0492328!16s%2Fg%2F11fy42nqwg",
  },
  phone: { label: "015 099 1377", href: "tel:+390150991377" },
  email: "ristorantelike47@gmail.com",
  facebook: "https://www.facebook.com/Ristorantelike/",
  tripadvisor:
    "https://www.tripadvisor.it/Restaurant_Review-g1025226-d12830375-Reviews-Ristorante_Like-Biella_Province_of_Biella_Piedmont.html",
  rating: {
    score: 4.2,
    count: 449,
    source: "Google",
    distribution: [
      { stars: 5, count: 271 },
      { stars: 4, count: 83 },
      { stars: 3, count: 49 },
      { stars: 2, count: 19 },
      { stars: 1, count: 27 },
    ],
  },
  /** Formula all you can eat (volantino Facebook, maggio 2025: da confermare). */
  formula: {
    lunch: { label: "Pranzo", price: 14.9, when: "Martedì - domenica, 12:00 - 15:00" },
    dinner: { label: "Cena", price: 23.9, when: "Tutte le sere, dalle 18:00" },
  },
};

/** Indice 0 = domenica, come Date.getDay(). Fonte: Google Maps. */
export const openingHours: { day: string; slots: [number, number][] }[] = [
  { day: "Domenica", slots: [lunch, dinner] },
  { day: "Lunedì", slots: [[t(18), t(23)]] },
  { day: "Martedì", slots: [lunch, dinner] },
  { day: "Mercoledì", slots: [lunch, dinner] },
  { day: "Giovedì", slots: [lunch, dinner] },
  { day: "Venerdì", slots: [lunch, dinner] },
  { day: "Sabato", slots: [lunch, dinner] },
];

export const navLinks = [
  { label: "Formula", hash: "formula" },
  { label: "Cucina", hash: "cucina" },
  { label: "Sala", hash: "sala" },
  { label: "Recensioni", hash: "recensioni" },
  { label: "Contatti", hash: "contatti" },
];
