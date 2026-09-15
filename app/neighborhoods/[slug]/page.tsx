import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { neighborhoods } from "@/lib/neighborhoods";

export async function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = neighborhoods.find((n) => n.slug === slug);
  if (!neighborhood) return {};
  return {
    title: `${neighborhood.name} — Neighborhood Guide`,
    description: neighborhood.description,
  };
}

// Placeholder detail page — full neighborhood guides (schools, walkability,
// recent sales, local businesses) can be built out here without changing
// the Residential page's NeighborhoodCard links.
export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const neighborhood = neighborhoods.find((n) => n.slug === slug);
  if (!neighborhood) notFound();

  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 pt-28 md:px-10 md:pt-36">
      <SectionEyebrow>{neighborhood.city}, Tennessee</SectionEyebrow>
      <SectionHeading as="h1" className="mt-3">
        {neighborhood.name}
      </SectionHeading>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden">
        <Image
          src={neighborhood.image}
          alt={`${neighborhood.name} neighborhood`}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />
      </div>

      <p className="mt-8 max-w-2xl leading-relaxed text-ink-muted">{neighborhood.description}</p>

      <p className="mt-4 max-w-2xl text-sm italic text-ink-muted">
        A full guide to {neighborhood.name} — schools, walkability, recent sales, and local
        favorites — is coming soon.
      </p>

      <Button href="/contact" className="mt-10">
        Ask About {neighborhood.name}
      </Button>

      <div className="mt-6">
        <Link href="/residential" className="text-sm text-navy underline hover:text-taupe-gold">
          Back to Residential
        </Link>
      </div>
    </section>
  );
}
