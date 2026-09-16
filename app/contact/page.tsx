import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact ROWE | WYSE Partners — Nashville & Memphis Real Estate",
  description:
    "Get in touch with ROWE | WYSE Partners for a rental analysis, home valuation, or consultation across the Nashville and Memphis markets.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-28 md:px-10 md:pt-36">
      <div className="grid gap-16 lg:grid-cols-[1fr_360px]">
        <div>
          <SectionEyebrow>Let&rsquo;s Build Your Strategy</SectionEyebrow>
          <SectionHeading as="h1" className="mt-3">
            Real Estate Inquiry
          </SectionHeading>
          <p className="mt-5 max-w-xl text-ink-muted">
            Whether you&rsquo;re looking for a rental analysis, a home valuation, or a
            consultation, we are ready to help you navigate the Nashville and Memphis markets.
          </p>

          <div className="mt-12 max-w-2xl">
            <LeadForm variant="contact" sourcePage="/contact" />
          </div>
        </div>

        <aside className="space-y-8">
          <div className="border-t-2 border-taupe-gold pt-6">
            <p className="eyebrow text-ink-muted">Office</p>
            <p className="mt-2 flex items-start gap-2 text-sm text-navy">
              <MapPin className="mt-0.5 shrink-0 text-taupe-gold" size={18} strokeWidth={1.5} />
              Nashville &amp; Memphis Headquarters
              <br />
              {siteConfig.address.line1}, {siteConfig.address.line2}
            </p>
          </div>

          <div className="border-t-2 border-taupe-gold pt-6">
            <p className="eyebrow text-ink-muted">Contact</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-navy">
              <Mail className="text-taupe-gold" size={18} strokeWidth={1.5} />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-taupe-gold">
                {siteConfig.email}
              </a>
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-navy">
              <Phone className="text-taupe-gold" size={18} strokeWidth={1.5} />
              <a href={siteConfig.contactPhone.href} className="hover:text-taupe-gold">
                {siteConfig.contactPhone.display}
              </a>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
