import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function NeighborhoodCard({
  slug,
  name,
  description,
  image,
  dark = false,
}: {
  slug: string;
  name: string;
  description: string;
  image: string;
  dark?: boolean;
}) {
  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={`${name} neighborhood`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className={`font-display mt-5 text-xl ${dark ? "text-cream" : "text-navy"}`}>{name}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-cream/70" : "text-ink-muted"}`}>
        {description}
      </p>
      <Link
        href={`/neighborhoods/${slug}`}
        className={`mt-4 inline-flex items-center gap-1.5 font-subhead text-xs font-semibold uppercase tracking-widest hover:text-taupe-gold ${
          dark ? "text-taupe-gold" : "text-navy"
        }`}
      >
        View More <ArrowRight size={14} />
      </Link>
    </div>
  );
}
