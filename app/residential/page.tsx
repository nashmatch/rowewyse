import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/ui/Hero";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NumberedFeatureCard } from "@/components/ui/NumberedFeatureCard";
import { NeighborhoodCard } from "@/components/ui/NeighborhoodCard";
import { Button } from "@/components/ui/Button";
import { neighborhoods } from "@/lib/neighborhoods";
import { listingsSearchUrl } from "@/lib/site-config";
import { LineChart, Camera, Handshake, KeyRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Nashville & Memphis Homes for Sale — Residential Real Estate",
  description:
    "Expert residential guidance for buyers and sellers across Nashville and Memphis — local market pricing, negotiation strength, and a seamless closing process.",
  alternates: { canonical: "/residential" },
};

const sellServices = [
  { title: "Local Market Pricing" },
  { title: "Stellar Home Presence" },
  { title: "Advocacy & Negotiation" },
  { title: "Smooth Closing Path" },
];

const journey = [
  {
    number: "01",
    icon: LineChart,
    title: "Discovery Discussion",
    description:
      "We begin with a personal meeting to understand your lifestyle needs and home goals to align our search or sale with your vision.",
  },
  {
    number: "02",
    icon: Camera,
    title: "Market Positioning",
    description:
      "Our expert team performs a detailed analysis of local neighborhood trends and home values to determine your best list or offer price.",
  },
  {
    number: "03",
    icon: Handshake,
    title: "Showcasing Your Home",
    description:
      "We launch high-impact visual marketing and home tours with precision to ensure your property stands out to the right local buyers.",
  },
  {
    number: "04",
    icon: KeyRound,
    title: "Closing The Chapter",
    description:
      "From the accepted offer to the final keys, we provide the professional guidance and support you need for a successful transition.",
  },
];

const galleryImages = [
  "/images/placeholders/residential-hero-1.jpg",
  "/images/placeholders/residential-hero-2.jpg",
  "/images/placeholders/residential-hero-3.jpg",
];

export default function ResidentialPage() {
  return (
    <>
      <Hero
        eyebrow="Residential Real Estate"
        title="Expert Residential Guidance. Trusted Partnerships. Results."
        subhead="Guiding homeowners and buyers through seamless residential sales with local market expertise across Nashville and Memphis."
        image="/images/placeholders/residential-hero-main.jpg"
        imageAlt="Modern residential home exterior"
        ctas={[
          { label: "Selling a Home", href: "/contact" },
          { label: "Buying a Home", href: listingsSearchUrl, variant: "ghost-light" },
        ]}
      />

      <section id="featured-listings" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {galleryImages.map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded">
              <Image
                src={src}
                alt="Residential listing photography"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href={listingsSearchUrl}>Search All Listings</Button>
        </div>
      </section>

      <section className="bg-slate-blue/10 py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionEyebrow>For Sellers</SectionEyebrow>
          <SectionHeading as="h2" className="mt-3 max-w-2xl">
            Sell Your Property
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
            We provide the local insight and negotiation strength required to navigate the
            Nashville and Memphis housing markets with total confidence.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sellServices.map((s) => (
              <div
                key={s.title}
                className="rounded border border-taupe-gold/50 bg-cream px-6 py-8 text-center font-subhead text-sm font-semibold uppercase tracking-widest text-navy"
              >
                {s.title}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionEyebrow>Process</SectionEyebrow>
        <SectionHeading as="h2" className="mt-3 max-w-2xl">
          The Journey
        </SectionHeading>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((step) => (
            <NumberedFeatureCard key={step.number} {...step} />
          ))}
        </div>
      </section>

      <section className="bg-navy py-24 text-cream">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionEyebrow light>Strategic Areas</SectionEyebrow>
          <SectionHeading as="h2" light className="mt-3 max-w-2xl">
            Explore Tennessee&rsquo;s Most Vibrant Markets
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-cream/75">
            From historic architectural gems to emerging urban hubs, these neighborhoods offer
            exceptional lifestyle and value.
          </p>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {neighborhoods.map((n) => (
              <NeighborhoodCard
                key={n.slug}
                slug={n.slug}
                name={n.name}
                description={n.description}
                image={n.image}
                dark
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="mx-auto max-w-2xl px-6 md:px-10">
          <SectionHeading as="h2" center>
            Let&rsquo;s Find Your Home
          </SectionHeading>
          <p className="mt-5 text-ink-muted">
            Ready to start your next chapter? Schedule a consultation with our residential
            experts in Tennessee today.
          </p>
          <Button href="/contact" className="mt-8">
            Book Your Consultation
          </Button>
        </div>
      </section>
    </>
  );
}
