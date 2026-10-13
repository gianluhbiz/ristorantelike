import { useId } from "react";

type Props = { className?: string; /** colore dello sfondo che copre le onde dietro */ fill?: string; r?: number };

/**
 * Motivo a onde seigaiha (lo stesso dei volantini del locale), come texture di sfondo.
 * Ogni onda è un cerchio pieno con anelli concentrici: disegnate dall'alto in basso,
 * quelle sotto coprono la metà inferiore di quelle sopra. Il tratto usa `currentColor`.
 */
export default function Seigaiha({ className = "", fill = "var(--color-ink)", r = 22 }: Props) {
  const id = `seigaiha-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const rows: [number, number[]][] = [
    [-r / 2, [r]],
    [0, [0, 2 * r]],
    [r / 2, [r]],
    [r, [0, 2 * r]],
    [(3 * r) / 2, [r]],
  ];
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 size-full ${className}`}>
      <defs>
        <pattern id={id} width={2 * r} height={r} patternUnits="userSpaceOnUse">
          {rows.map(([y, xs]) =>
            xs.map((x) => (
              <g key={`${x}-${y}`} stroke="currentColor" strokeWidth="1">
                <circle cx={x} cy={y} r={r} style={{ fill }} />
                {[0.75, 0.5, 0.25].map((k) => (
                  <circle key={k} cx={x} cy={y} r={r * k} fill="none" />
                ))}
              </g>
            )),
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
