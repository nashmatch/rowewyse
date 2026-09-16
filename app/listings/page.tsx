import type { Metadata } from "next";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RechatListingsWidget } from "@/components/listings/RechatListingsWidget";
import { siteConfig, listingsSearchUrl, rechatBrandId } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Search Listings — Nashville & Memphis Homes for Sale",
  description:
    "Search active Nashville & Memphis, TN home listings in real time with ROWE | WYSE Partners.",
};

export default function ListingsPage() {
  return (
    <section className="pt-24 pb-16 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionEyebrow>Nashville &amp; Memphis</SectionEyebrow>
        <SectionHeading as="h1" className="mt-3">
          Search Listings
        </SectionHeading>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
          Browse active homes for sale across Nashville and Memphis in real time. Prefer a
          saved-search account instead?{" "}
          <a
            href={listingsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-navy"
          >
            Search on RealScout
          </a>{" "}
          instead.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-6 md:px-10">
        <div className="overflow-hidden rounded border border-slate-blue/25">
          <RechatListingsWidget brandId={rechatBrandId} />
        </div>
        {/* TREC Rule 1260-02-.12(4): a page showing listings from an outside
            database must disclose that some or all may not belong to this firm. */}
        <p className="mt-4 text-xs text-ink-muted">
          Listing data is sourced from area MLS feeds. Some or all of the listings shown above
          may not belong to {siteConfig.brokerage}, the firm whose website you are visiting.
        </p>
      </div>
    </section>
  );
}
