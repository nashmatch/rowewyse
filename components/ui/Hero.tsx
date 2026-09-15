import Image from "next/image";
import { Button } from "./Button";

interface HeroCta {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost-light";
}

export function Hero({
  eyebrow,
  title,
  subhead,
  image,
  imageAlt,
  imagePosition = "center",
  ctas = [],
  height = "large",
}: {
  eyebrow?: string;
  title: string;
  subhead?: string;
  image: string;
  imageAlt: string;
  /** CSS object-position value, e.g. "center top" or "50% 20%" — lets a tall
   *  or off-center source photo be reframed within the hero without cropping
   *  the wrong part of the image. */
  imagePosition?: string;
  ctas?: HeroCta[];
  height?: "large" | "medium";
}) {
  return (
    <section
      className={`relative flex items-end overflow-hidden ${
        height === "large" ? "min-h-[88vh]" : "min-h-[55vh]"
      }`}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: imagePosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:px-10 md:pb-24">
        {eyebrow && (
          <p className="eyebrow mb-4 text-taupe-gold">{eyebrow}</p>
        )}
        <h1 className="font-display max-w-3xl text-4xl leading-[1.05] text-cream md:text-6xl">
          {title}
        </h1>
        {subhead && (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
            {subhead}
          </p>
        )}
        {ctas.length > 0 && (
          <div className="mt-9 flex flex-wrap gap-4">
            {ctas.map((cta) => (
              <Button key={cta.label} href={cta.href} variant={cta.variant ?? "secondary"}>
                {cta.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
