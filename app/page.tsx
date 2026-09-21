import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NumberedFeatureCard } from "@/components/ui/NumberedFeatureCard";
import { StatCallout } from "@/components/ui/StatCallout";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { ThreeUpCTAGrid } from "@/components/ui/ThreeUpCTAGrid";
import { FAQSection } from "@/components/ui/FAQSection";
import { listingsSearchUrl } from "@/lib/site-config";
import { LineChart, MessageSquare, Handshake, Compass, KeyRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Nashville & Memphis Real Estate — ROWE | WYSE Partners",
  description:
    "Trusted, local real estate expertise guiding homeowners through every step in Nashville & Memphis, Tennessee.",
  alternates: { canonical: "/" },
};

const valueProps = [
  {
    number: "01",
    icon: LineChart,
    title: "Strategic Home Valuation",
    description: "Precise market pricing to secure top dollar while minimizing time on market.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Clear and Constant Communication",
    description: "Consistent updates and advice throughout every transaction.",
  },
  {
    number: "03",
    icon: Handshake,
    title: "Expert Negotiation Advocacy",
    description: "Fierce advocacy managing complex offers and terms.",
  },
  {
    number: "04",
    icon: Compass,
    title: "Deep Local Memphis & Nashville Knowledge",
    description: "Unparalleled insight into neighborhood trends and property values.",
  },
  {
    number: "05",
    icon: KeyRound,
    title: "Seamless Transition Management",
    description: "Handling every detail of the move and closing process.",
  },
];

const stats = [
  { value: "$60M+", label: "Sales Volume" },
  { value: "97%", label: "List-to-Sale Ratio" },
  { value: "28", label: "Average Days on Market" },
  { value: "100%", label: "Client Satisfaction" },
];

const faqItems = [
  {
    question: "What areas does ROWE | WYSE Partners serve?",
    answer:
      "We work across Nashville and Memphis, Tennessee, operating under Onward Real Estate, offering residential sales and property management services throughout both metro areas.",
  },
  {
    question: "How do I get started buying or selling a home?",
    answer:
      "The best first step is a consultation with our team. Reach out through our Contact page and we'll walk you through pricing, timeline, and next steps for your specific situation.",
  },
  {
    question: "Do you help with down payment assistance programs?",
    answer:
      "Yes. We help buyers navigate Shelby County down payment assistance programs — visit our Down Payment Assistance page to check a specific address or learn more about available programs.",
  },
  {
    question: "Is ROWE | WYSE Partners a licensed real estate brokerage?",
    answer:
      "ROWE | WYSE Partners operates under Onward Real Estate, a licensed Tennessee real estate brokerage.",
  },
  {
    question: "Do you offer property management services?",
    answer:
      "Yes, we provide full-service property management in Nashville and Memphis — leasing, tenant screening, rent collection, maintenance coordination, and financial reporting. Visit our Property Management page for details.",
  },
];

const planCards = [
  {
    title: "Home Search Session",
    description:
      "Find your dream home with a personalized consultation focused on the best neighborhoods in Nashville and Memphis.",
    ctaLabel: "Book Session",
    href: "/contact",
  },
  {
    title: "Home Value Estimate",
    description:
      "Get an accurate market valuation of your property to ensure you sell for the best price in today's market.",
    ctaLabel: "Get My Value",
    href: "/contact",
  },
  {
    title: "Expert Strategy Call",
    description:
      "Schedule a confidential call to discuss your buying or selling goals and create a clear path to your new home.",
    ctaLabel: "Start Planning",
    href: "/contact",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Nashville & Memphis, Tennessee"
        title="Making Tennessee Home"
        subhead="Trusted, local expertise guiding you through every step of the Nashville and Memphis real estate journey."
        image="/images/placeholders/hero-nashville-skyline.jpg"
        imageAlt="Nashville skyline"
        imagePosition="center 15%"
        ctas={[
          { label: "Search Listings", href: listingsSearchUrl },
          { label: "Listing Consultation", href: "/contact", variant: "ghost-light" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionEyebrow>Our Approach</SectionEyebrow>
        <SectionHeading as="h2" className="mt-3 max-w-2xl">
          Moving with Confidence. Selling with Certainty.
        </SectionHeading>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((v) => (
            <NumberedFeatureCard key={v.number} {...v} />
          ))}
        </div>
      </section>

      <section className="bg-navy py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4 md:px-10">
          {stats.map((s) => (
            <StatCallout key={s.label} {...s} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <TestimonialCard
          quote="ROWE | WYSE Partners guided us through buying our home in Nashville with such care and expertise. They made a stressful process feel incredibly smooth, helping us feel completely confident in our final choice."
          attribution="East Nashville Client, Nashville, TN"
        />
      </section>

      <section className="bg-slate-blue/10 py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionEyebrow>Get Started</SectionEyebrow>
          <SectionHeading as="h2" className="mt-3 max-w-2xl">
            Plan Your Next Big Move
          </SectionHeading>
          <div className="mt-12">
            <ThreeUpCTAGrid cards={planCards} />
          </div>
        </div>
      </section>

      <FAQSection heading="Frequently Asked Questions" items={faqItems} />
    </>
  );
}
