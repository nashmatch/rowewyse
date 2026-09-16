import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FAQSection } from "@/components/ui/FAQSection";

export const metadata: Metadata = {
  title: "Memphis Down Payment Assistance Eligibility Search",
  description:
    "Search Shelby County down payment assistance programs and understand your options for bridging the gap to homeownership in Memphis, TN.",
  alternates: { canonical: "/dpa" },
};

const faqItems = [
  {
    question: "What is down payment assistance?",
    answer:
      "Down payment assistance (DPA) programs help eligible homebuyers cover some or all of the upfront costs of purchasing a home, often through grants or forgivable second mortgages.",
  },
  {
    question: "How do I check if my address is eligible for a Shelby County DPA program?",
    answer:
      "Use the eligibility map on this page to search a specific Shelby County address, or contact our team for a personalized review of your options.",
  },
  {
    question: "Do I have to be a first-time homebuyer to qualify?",
    answer:
      "Eligibility requirements vary by program — some require first-time homebuyer status while others do not. Our team can help you identify which programs you may qualify for.",
  },
  {
    question: "Does ROWE | WYSE Partners provide the down payment assistance funds directly?",
    answer:
      "No. We help connect buyers with third-party down payment assistance programs offered through local and state agencies; ROWE | WYSE Partners does not administer the funds itself.",
  },
];

export default function DpaPage() {
  return (
    <>
      <Hero
        title="Memphis Down Payment Assistance Search"
        image="/images/placeholders/dpa-hero.svg"
        imageAlt="Memphis neighborhood street"
        height="medium"
      />

      <section className="mx-auto max-w-4xl px-6 py-20 md:px-10">
        <SectionEyebrow>Shelby County</SectionEyebrow>
        <SectionHeading as="h2" className="mt-3">
          Understanding Shelby County Down Payment Assistance
        </SectionHeading>
        <p className="mt-6 leading-relaxed text-ink-muted">
          Down payment assistance (DPA) programs are designed to help homebuyers bridge the
          gap between their savings and the required upfront costs of purchasing a home. In
          Shelby County, these programs primarily function as secondary loans or grants —
          often with forgivable terms — that can be applied toward your down payment or
          closing costs, making homeownership more accessible for qualifying individuals and
          families.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <SectionEyebrow>Check Your Address</SectionEyebrow>
        <SectionHeading as="h2" className="mt-3">
          Shelby County Eligibility Map
        </SectionHeading>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
          Search an address or click any area on the map to see which down payment assistance
          programs apply, then check your eligibility directly.
        </p>

        <div className="mt-10 overflow-hidden rounded border border-slate-blue/25">
          <iframe
            src="/dpa-map.html"
            title="Shelby County Down Payment Assistance Eligibility Map"
            className="h-[640px] w-full border-0 sm:h-[720px] lg:h-[800px]"
          />
        </div>
      </section>

      <FAQSection heading="Down Payment Assistance FAQ" items={faqItems} />

      <section className="bg-navy py-20 text-center text-cream">
        <div className="mx-auto max-w-2xl px-6 md:px-10">
          <SectionHeading as="h2" light center>
            Confused by the Options?
          </SectionHeading>
          <p className="mt-5 text-cream/80">
            We can help you navigate Shelby County&rsquo;s assistance programs.
          </p>
          <Button href="/contact" variant="secondary" className="mt-8">
            Schedule a Free Consultation
          </Button>
        </div>
      </section>
    </>
  );
}
