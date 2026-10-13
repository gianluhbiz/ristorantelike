import { useEffect, useState } from "react";
import { getOpenStatus } from "../lib/hours";

/** Stato apertura calcolato sull'ora di Biella, aggiornato ogni minuto. */
export function useOpenStatus() {
  const [status, setStatus] = useState(getOpenStatus);
  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}
