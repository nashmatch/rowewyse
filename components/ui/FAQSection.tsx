import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageJsonLd, type FaqItem } from "@/lib/structured-data";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionHeading } from "./SectionHeading";

export function FAQSection({
  eyebrow = "FAQ",
  heading,
  items,
}: {
  eyebrow?: string;
  heading: string;
  items: FaqItem[];
}) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 md:px-10">
      <JsonLd data={faqPageJsonLd(items)} />
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <SectionHeading as="h2" className="mt-3">
        {heading}
      </SectionHeading>
      <dl className="mt-10 space-y-8">
        {items.map((item) => (
          <div key={item.question} className="border-t border-slate-blue/20 pt-6">
            <dt className="font-display text-lg text-navy">{item.question}</dt>
            <dd className="mt-2 leading-relaxed text-ink-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
