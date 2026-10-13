/**
 * Voci trascritte dalle foto del menu cartaceo su Tripadvisor (numeri compresi),
 * più tre piatti citati nelle recensioni. Nessun prezzo per piatto: il locale lavora
 * a formula all you can eat. Tutto da confermare con il cliente (vedi SOURCES.md).
 */
export type Tag = "veg" | "piccante" | "crudo" | "offerto";

export type MenuItem = {
  n?: string;
  name: string;
  desc?: string;
  tags?: Tag[];
};

export type MenuCategory = {
  id: string;
  title: string;
  note?: string;
  image?: { src: string; alt: string };
  items: MenuItem[];
};

export const tagLabels: Record<Tag, { label: string; icon: string }> = {
  veg: { label: "Vegetariano", icon: "ri-leaf-line" },
  piccante: { label: "Piccante", icon: "ri-fire-line" },
  crudo: { label: "Pesce crudo", icon: "ri-drop-line" },
  offerto: { label: "Offerto", icon: "ri-gift-line" },
};

export const menu: MenuCategory[] = [
  {
    id: "antipasti",
    title: "Antipasti e ravioli",
    note: "Il pane cinese e le nuvolette di gamberetti li offre la casa.",
    items: [
      { n: "81", name: "Pane cinese", tags: ["offerto"] },
      { name: "Nuvolette di gamberetti", tags: ["offerto"] },
      { n: "20", name: "Patatine fritte", tags: ["veg"] },
      { n: "24", name: "Involtino primavera" },
      { n: "26", name: "Ravioli di carne", desc: "Al vapore o alla piastra" },
      { n: "27", name: "Ravioli di gamberetti al vapore" },
    ],
  },
  {
    id: "insalate",
    title: "Insalate",
    items: [
      { n: "17A", name: "Insalata verde", tags: ["veg"] },
      { n: "29", name: "Insalata verde con granchio" },
      { n: "30", name: "Insalata di alghe cinese", tags: ["veg"] },
    ],
  },
  {
    id: "nigiri",
    title: "Nigiri e sashimi",
    note: "Nigiri da 2 pezzi.",
    image: { src: "/images/sashimi-salmone.webp", alt: "Sashimi di salmone disposto a fiore" },
    items: [
      { n: "106", name: "Nigiri di tonno", tags: ["crudo"] },
      { n: "107", name: "Nigiri di salmone", tags: ["crudo"] },
      { n: "108", name: "Nigiri di gamberetti cotti" },
      { n: "111", name: "Nigiri di polipo" },
      { name: "Sashimi di salmone", desc: "Tagliato al banco", tags: ["crudo"] },
    ],
  },
  {
    id: "uramaki",
    title: "Uramaki",
    note: "8 pezzi a porzione.",
    image: { src: "/images/sushi-tavola.webp", alt: "Tagliere di uramaki con tobiko" },
    items: [
      { n: "114", name: "Sake uramaki", desc: "Salmone o tonno, avocado e philadelphia", tags: ["crudo"] },
      { n: "116", name: "Tempura uramaki", desc: "Rotoli di tempura con philadelphia" },
      { n: "124", name: "Uramaki vegetale", desc: "Cetrioli e avocado", tags: ["veg"] },
      { n: "124A", name: "Cipolla uramaki", desc: "Salmone, avocado, maionese con salsa", tags: ["crudo"] },
    ],
  },
  {
    id: "primi",
    title: "Spaghetti e ramen",
    items: [
      { name: "Spaghetti ai frutti di mare", desc: "Gamberetti, seppie e un gamberone" },
      { name: "Ramen" },
      { name: "Spaghetti al pomodoro", tags: ["veg"] },
      { name: "Spaghetti al salmone" },
      { name: "Spaghetti all'arrabbiata", tags: ["veg", "piccante"] },
    ],
  },
  {
    id: "secondi",
    title: "Dalla piastra e dal wok",
    items: [
      { n: "16", name: "Petto di pollo alla griglia" },
      { n: "51", name: "Spiedini di pollo" },
      { n: "53", name: "Spiedini di gamberetti alla griglia" },
      { n: "55", name: "Gamberetti con verdure miste" },
      { n: "63A", name: "Manzo con patate e peperoni" },
      { n: "67", name: "Pollo con patate" },
      { n: "69", name: "Pollo piccante con peperoni e cipolla", tags: ["piccante"] },
      { n: "78", name: "Maiale con patate e peperoni" },
      { n: "79", name: "Maiale al curry con patate e cipolla" },
    ],
  },
];
