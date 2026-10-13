type Props = { value: number; className?: string };

/** Stelle piene, mezze e vuote per un punteggio su 5. */
export default function Stars({ value, className = "" }: Props) {
  return (
    <span className={`inline-flex gap-0.5 text-shu-bright ${className}`} role="img" aria-label={`${value} su 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i
          key={i}
          aria-hidden
          className={value >= i ? "ri-star-fill" : value >= i - 0.5 ? "ri-star-half-line" : "ri-star-line"}
        />
      ))}
    </span>
  );
}
