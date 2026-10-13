# Fonti e contenuti

Consultazione: 13 ottobre 2026.

- Descrizione del locale ("fresh fish delivered every morning", asporto), cucine, foto dei piatti e del menu cartaceo, recensioni: https://www.tripadvisor.it/Restaurant_Review-g1025226-d12830375-Reviews-Ristorante_Like-Biella_Province_of_Biella_Piedmont.html
- Nome della pagina ("Ristorante Li Ke"), email, servizi (consegna, ritiro, tavoli all'aperto), logo, foto della sala, volantini con i prezzi: https://www.facebook.com/Ristorantelike/
- Orari, punteggio (4,2 su 449 recensioni), distribuzione delle stelle, accessibilità, recensioni: scheda Google Maps fornita dal cliente (coordinate 45.5544243, 8.0492328).

## Da confermare con il cliente prima della pubblicazione

- **Prezzi all you can eat**: pranzo 14,90 €, cena 23,90 € (volantino Facebook del 9 maggio 2025). Lo stesso giorno un altro volantino indica un "menu fisso" a 15,90 € (pranzo, 3 piatti) e 22,90 € (cena, 4 piatti) con acqua, 1/4 di vino e caffè: sembra un'offerta per l'Adunata degli Alpini, quindi non è nel sito. Un volantino del 2021 citato in una recensione dava 11,90 € a pranzo e 6,90 € per i bambini sotto i 120 cm.
- **Menu** (`src/data/menu.ts`): voci e numeri trascritti da due foto del menu cartaceo su Tripadvisor, probabilmente il menu pranzo di qualche anno fa. Le foto sono tagliate: mancano gli hosomaki (n. 126, 128), i risi (n. 34, 36) e alcuni spaghetti (n. 36A, 41, 41A, 43). Serve il menu completo e aggiornato.
  - "Spaghetti al pomodoro / al salmone / all'arrabbiata" sono letti da una colonna tagliata a metà.
  - "Spaghetti ai frutti di mare" viene da una recensione Google (Ruben Viola), "Ramen" da una recensione Tripadvisor del 2022 ("menu rinnovato"), "Sashimi di salmone" da una foto e da una recensione.
  - "Nuvolette di gamberetti" e "Pane cinese" risultano offerti dalla casa sul menu cartaceo.
  - Etichette "Vegetariano", "Piccante", "Pesce crudo" ricavate dai nomi e dalle descrizioni: da verificare.
- **Ordinazione col foglio della comanda**: descritta in una recensione Tripadvisor (aprile 2025). Va confermato che funziona ancora così.
- **Banco sushi a vista** ("il sushi chef lavorava davanti ai clienti, con cappello e divisa"): recensione Google di Marco Rossetti. È il titolo dell'hero, quindi va confermato.
- **Consegna a domicilio "a Biella e nei paesi intorno"**: recensione Google di gaia gloomy e servizi Facebook. Zone e costi da chiedere.
- **Cani benvenuti, parcheggio gratuito in strada**: recensione Google di Morena Trevisan (3 anni fa).
- **Tavoli all'aperto**: solo dalla scheda Facebook.
- **Orari**: Google Maps (lun 18-23; mar-dom 12-15 e 18-23:45). Facebook segnala chiusure per ferie (6-19 luglio 2026) e Natale solo a pranzo: il sito non gestisce le chiusure straordinarie.
- **"A pochi passi dal Palazzetto dello Sport"**: dalla mappa (Palasport Biella a circa 400 m).
- **Recensioni**: citazioni brevi e testuali, con il nome come appare su Google e Tripadvisor. Tripadvisor ha un punteggio di 3,6 su 48 recensioni: il sito mostra solo quello Google.
- **Logo**: ricostruito in HTML (scritta "Like" e sigillo rosso con 可, `src/components/layout/Logo.tsx`). Facebook ha solo una versione da 361 px su fondo nero (`public/images/logo.png`, usato come favicon): serve il file vettoriale.

## Immagini

Convertite in WebP in `public/images/`.

- Foto Facebook del locale (2024-2026): `sala` (copertina della pagina, con l'albero di Natale), `sala-banco`, `sala-tavolo` (post di San Valentino), `logo.png`.
- Foto Tripadvisor caricate da clienti tra il 2019 e il 2020: `sashimi-salmone`, `roll-anguilla`, `barca-sushi`, `sushi-tavola`, `roll-fritti`, `roll-gamberone`, `tartare`. Per la versione pubblica vanno sostituite con foto del locale o usate con il permesso degli autori. Le didascalie della galleria descrivono quello che si vede, non i nomi del menu.
- Non usate: la foto Tripadvisor "interni finemente curati" (arredo diverso da quello attuale) e il volantino Facebook con foto di repertorio.

## Sviluppo

React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion, Remix Icon e React Router 7.

```sh
npm install
npm run dev
npm run build
npm run lint
```

Su PowerShell con script disabilitati usare `npm.cmd` al posto di `npm`.

Percorsi: `/` e `/menu`. Le sezioni hanno URL condivisibili (`/#formula`, `/#contatti`, `/menu#uramaki`). L'hosting deve fare fallback su `index.html` per `/menu` (`vercel.json` già pronto). Font Shippori Mincho e DM Sans da Google Fonts.

### Movimento

- Cambio pagina a timbro (`src/components/layout/PageTransition.tsx`): un cerchio vermiglio si allarga dal punto del clic e copre la pagina, mostra il nome della nuova pagina e si ritira verso l'alto. Il punto del clic lo registra `TransitionLink` (`src/lib/transitionOrigin.ts`). Al primo caricamento non compare.
- Hero con foto che si scoprono dal basso e parallasse leggera; cucina con immagine sticky che cambia mentre scorri; galleria orizzontale legata allo scroll su desktop (su mobile scorrimento nativo con aggancio); sala che si apre fino ai bordi.
- Curve in `src/config/motion.ts` e nei token `ease-out-strong` / `ease-in-out-strong` di `src/index.css`. Si animano solo `transform`, `opacity` e `clip-path`.
- `MotionConfig reducedMotion="user"`: con "riduci movimento" restano le dissolvenze, il timbro diventa una dissolvenza, la galleria passa allo scorrimento nativo e il nastro dei piatti si ferma.
