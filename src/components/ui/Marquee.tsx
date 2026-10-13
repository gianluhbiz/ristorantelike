type Props = { items: string[]; className?: string };

/** Nastro di testo continuo. Si ferma con "riduci movimento" e al passaggio del mouse. */
export default function Marquee({ items, className = "" }: Props) {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-display text-2xl font-semibold sm:px-9 sm:text-4xl">{item}</span>
          <span aria-hidden className="size-2.5 rounded-full bg-shu" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
