type Props = { className?: string; size?: "sm" | "lg" };

/**
 * Marchio ricostruito dal logo del locale: la scritta "Like" e il sigillo rosso con 可.
 * Va sostituito con il logo vettoriale originale quando il cliente lo fornisce.
 */
export default function Logo({ className = "", size = "sm" }: Props) {
  const lg = size === "lg";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`font-display font-bold leading-none tracking-[0.04em] text-rice ${lg ? "text-6xl" : "text-[1.7rem]"}`}
      >
        Like
      </span>
      <span
        aria-hidden
        className={`grid shrink-0 place-items-center rounded-full bg-shu font-display font-bold leading-none text-white ${
          lg ? "size-12 text-2xl" : "size-6 text-[0.8rem]"
        }`}
      >
        可
      </span>
    </span>
  );
}
