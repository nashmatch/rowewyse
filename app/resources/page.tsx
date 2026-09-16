import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Market Insights & Property Resources — Nashville & Memphis",
  description:
    "Market reports, guides, and property management insights for Nashville and Memphis real estate owners and investors.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <Hero
        eyebrow="Resources"
        title="Smart Real Estate. Strategic Management. Stronger Returns."
        subhead="Helping homeowners and investors maximize value through expert property management and residential sales in Nashville & Memphis."
        image="/images/placeholders/resources-hero.jpg"
        imageAlt="Nashville & Memphis market resources"
        ctas={[
          { label: "Get a Rental Analysis", href: "/property-management" },
          { label: "Schedule a Consultation", href: "/contact", variant: "ghost-light" },
        ]}
      />

      <section className="bg-navy py-20 text-cream">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <SectionEyebrow light>Stay Updated</SectionEyebrow>
          <SectionHeading as="h2" light center className="mt-3">
            Market Insights, Delivered
          </SectionHeading>
          <p className="mt-5 text-cream/75">
            Get exclusive market insights, strategic updates, and direct access to our
            Nashville &amp; Memphis property management reports.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <LeadForm variant="newsletter" sourcePage="/resources" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionEyebrow>Guides &amp; Market Reports</SectionEyebrow>
        <SectionHeading as="h2" className="mt-3 max-w-2xl">
          Articles &amp; Insights
        </SectionHeading>

        {articles.length === 0 ? (
          <p className="mt-10 max-w-xl text-ink-muted">
            Market reports and buying/selling guides are coming soon — subscribe above to be
            the first to know when new resources are published.
          </p>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <article key={a.slug} className="rounded border border-slate-blue/20 bg-white/40 p-6">
                <p className="eyebrow text-ink-muted">{a.category}</p>
                <h3 className="font-display mt-3 text-xl text-navy">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{a.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
