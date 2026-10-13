import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { gallery } from "../../data/home";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Eyebrow, LineReveal, Reveal } from "../ui/Reveal";

type Item = (typeof gallery)[number];

function Heading() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
      <div className="flex flex-col gap-6">
        <Reveal>
          <Eyebrow>Dal banco al tavolo</Eyebrow>
        </Reveal>
        <LineReveal
          className="font-display text-5xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-6xl"
          lines={["Piatti veri,", "foto dei clienti."]}
        />
      </div>
      <Reveal delay={0.1}>
        <p className="max-w-sm leading-relaxed text-rice/65 lg:pb-2 lg:text-right">
          Sono i piatti come arrivano in sala, fotografati da chi li ha mangiati.
        </p>
      </Reveal>
    </div>
  );
}

/** Tutte le foto hanno la stessa altezza: la larghezza segue le proporzioni dell'immagine. */
function Card({ item, className = "" }: { item: Item; className?: string }) {
  return (
    <figure className={`group flex shrink-0 flex-col gap-3 ${className}`}>
      <div className="h-(--card-h) overflow-hidden rounded-[1.5rem] bg-char" style={{ aspectRatio: `${item.w} / ${item.h}` }}>
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="size-full select-none object-cover transition-transform duration-700 ease-out-strong [@media(hover:hover)]:group-hover:scale-[1.04]"
        />
      </div>
      <figcaption className="flex items-center gap-2.5 text-sm text-rice/70">
        <span className="size-1.5 rounded-full bg-shu" />
        {item.caption}
      </figcaption>
    </figure>
  );
}

/** Desktop: il titolo resta fermo, la fila di foto scorre in orizzontale mentre la pagina scende. */
function PinnedGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  // Anche come motion value: la trasformazione legata allo scroll legge sempre la misura aggiornata.
  const distanceMV = useMotionValue(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const d = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      setDistance(d);
      distanceMV.set(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distanceMV]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const transform = useTransform(() => `translateX(${-scrollYProgress.get() * distanceMV.get()}px)`);
  const bar = useTransform(scrollYProgress, [0, 1], ["scaleX(0)", "scaleX(1)"]);

  return (
    <section ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden pt-16">
        <div className="mx-auto w-full max-w-7xl px-8">
          <Heading />
        </div>

        <motion.div
          ref={trackRef}
          style={{ transform }}
          className="flex w-max gap-6 [--card-h:min(50vh,480px)] pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {gallery.map((g) => (
            <Card key={g.src} item={g} />
          ))}
        </motion.div>

        <div className="mx-auto w-full max-w-7xl px-8">
          <div className="h-px bg-rice/10">
            <motion.div style={{ transform: bar }} className="h-px origin-left bg-shu-bright" />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Mobile: carosello infinito. Scorre da solo, si trascina col dito e riparte con l'inerzia del gesto.
 * Le foto sono ripetute due volte e la posizione si avvolge sulla larghezza di una serie.
 */
function InfiniteCarousel() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef);
  const x = useMotionValue(0);
  const transform = useTransform(x, (v) => `translateX(${v}px)`);
  const drag = useRef({ active: false, lastX: 0, lastT: 0, velocity: 0, moved: 0 });
  const SPEED = 0.035; // px per ms

  const wrap = (v: number) => {
    const w = setRef.current?.offsetWidth ?? 0;
    if (!w) return v;
    return ((v % w) - w) % w;
  };

  useAnimationFrame((_, delta) => {
    const d = drag.current;
    if (!inView || d.active) return;
    // Inerzia del lancio che si smorza, poi torna lo scorrimento automatico.
    d.velocity *= Math.pow(0.94, delta / 16);
    if (Math.abs(d.velocity) < 0.01) d.velocity = 0;
    const auto = reduce ? 0 : -SPEED;
    x.set(wrap(x.get() + (auto + d.velocity) * delta));
  });

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { active: true, lastX: e.clientX, lastT: e.timeStamp, velocity: 0, moved: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.lastX;
    const dt = Math.max(1, e.timeStamp - d.lastT);
    d.velocity = dx / dt;
    d.moved += Math.abs(dx);
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    x.set(wrap(x.get() + dx));
  };
  const onPointerUp = () => {
    const d = drag.current;
    d.active = false;
    d.velocity = Math.max(-3, Math.min(3, d.velocity));
  };

  const set = (hidden?: boolean) => (
    <div ref={hidden ? undefined : setRef} className="flex shrink-0 gap-4 pr-4" aria-hidden={hidden || undefined}>
      {gallery.map((g) => (
        <Card key={g.src} item={g} />
      ))}
    </div>
  );

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Heading />
      </div>
      <div
        ref={wrapRef}
        className="mt-12 cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <motion.div style={{ transform }} className="flex w-max pl-4 [--card-h:16rem] sm:pl-8 sm:[--card-h:20rem]">
          {set()}
          {set(true)}
        </motion.div>
      </div>
    </section>
  );
}

export default function Gallery() {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();
  return desktop && !reduce ? <PinnedGallery /> : <InfiniteCarousel />;
}
