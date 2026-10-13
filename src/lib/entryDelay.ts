import { createContext, useContext } from "react";

/**
 * Secondi da attendere prima delle animazioni d'ingresso di una pagina:
 * dopo una navigazione il timbro copre la pagina per un attimo, al primo caricamento no.
 */
export const EntryDelayContext = createContext(0);

export const useEntryDelay = () => useContext(EntryDelayContext);
