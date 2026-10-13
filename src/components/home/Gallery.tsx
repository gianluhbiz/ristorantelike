import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { gallery } from "../../data/home";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Eyebrow, LineReveal, Reveal } from "../ui/Reveal";

function Heading() {
  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <Eyebrow>Dal banco al tavolo</Eyebrow>
      </Reveal>
      <LineReveal
        className="font-display text-5xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-6xl"
        lines={["Piatti veri,", "foto dei clienti."]}
      />
      <Reveal delay={0.1}>
        <p className="max-w-sm leading-relaxed text-rice/65">
          Sono i piatti come arrivano in sala, fotografati da chi li ha mangiati.
        </p>
      </Reveal>
    </div>
  );
}

function Card({ item, className = "" }: { item: (typeof gallery)[number]; className?: string }) {
  const tall = item.h > item.w;
  return (
    <figure className={`group flex shrink-0 flex-col gap-4 ${className}`}>
      <div
        className={`overflow-hidden rounded-[1.75rem] bg-char ${
          tall ? "aspect-[3/4] w-[68vw] sm:w-[340px] lg:h-[58vh] lg:w-auto" : "aspect-[4/3] w-[82vw] sm:w-[460px] lg:h-[50vh] lg:w-auto"
        }`}
      >
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-out-strong [@media(hover:hover)]:group-hover:scale-[1.04]"
        />
      </div>
      <figcaption className="flex items-center gap-3 text-sm text-rice/70">
        <span className="size-1.5 rounded-full bg-shu" />
        {item.caption}
      </figcaption>
    </figure>
  );
}

/** Desktop: la fila scorre in orizzontale mentre la pagina scende. */
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
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ transform }} className="flex w-max items-center gap-10 pl-8 pr-[8vw]">
          <div className="w-[min(30rem,32vw)] shrink-0 pl-[max(0px,calc((100vw-80rem)/2))]">
            <Heading />
          </div>
          {gallery.map((g, i) => (
            <Card key={g.src} item={g} className={i % 2 ? "lg:translate-y-10" : "lg:-translate-y-6"} />
          ))}
        </motion.div>
        <div className="mx-auto mt-12 h-px w-full max-w-7xl bg-rice/10 px-8">
          <motion.div style={{ transform: bar }} className="h-px origin-left bg-shu-bright" />
        </div>
      </div>
    </section>
  );
}

/** Mobile e "riduci movimento": scorrimento orizzontale nativo con aggancio. */
function SwipeGallery() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Heading />
      </div>
      <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:scroll-px-8 sm:px-8">
        {gallery.map((g) => (
          <Card key={g.src} item={g} className="snap-start" />
        ))}
      </div>
    </section>
  );
}

export default function Gallery() {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();
  return desktop && !reduce ? <PinnedGallery /> : <SwipeGallery />;
}
