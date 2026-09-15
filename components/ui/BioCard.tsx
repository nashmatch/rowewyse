import Image from "next/image";
import { Button } from "./Button";

export function BioCard({
  name,
  title,
  headshot,
  bio,
  ctaLabel,
  ctaHref,
}: {
  name: string;
  title: string;
  headshot: string;
  bio: string[];
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12">
      <div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={headshot}
            alt={`${name} headshot`}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            className="object-cover"
          />
        </div>
        <h3 className="font-display mt-5 text-2xl text-navy">{name}</h3>
        <p className="eyebrow mt-1 text-ink-muted">{title}</p>
        <Button href={ctaHref} variant="ghost" className="mt-5 w-full sm:w-auto">
          {ctaLabel}
        </Button>
      </div>
      <div className="space-y-4 font-body-serif text-[15px] leading-relaxed text-navy/85 md:text-base">
        {bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
