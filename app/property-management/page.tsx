import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NumberedFeatureCard } from "@/components/ui/NumberedFeatureCard";
import { PricingPhilosophyCard } from "@/components/ui/PricingPhilosophyCard";
import { Button } from "@/components/ui/Button";
import {
  Building2,
  Users,
  TrendingUp,
  Home as HomeIcon,
  Megaphone,
  ShieldCheck,
  Wallet,
  FileCheck2,
  BarChart3,
  Wrench,
  ClipboardCheck,
  Gauge,
  Network,
  LineChart,
  Camera,
  Settings2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nashville & Memphis Property Management for Investors",
  description:
    "Full-service property management for Nashville and Memphis owners — leasing, tenant screening, rent collection, maintenance, and financial reporting.",
  alternates: { canonical: "/property-management" },
};

const audiences = [
  { icon: HomeIcon, title: "Out-of-State Owners" },
  { icon: Users, title: "Accidental Landlords" },
  { icon: Building2, title: "Investors Scaling Portfolios" },
  { icon: Wrench, title: "Owners Tired of Self-Managing" },
];

const services = [
  {
    icon: Megaphone,
    title: "Leasing & Marketing",
    description:
      "We implement data-driven pricing and targeted marketing strategies to maximize occupancy and rental income.",
  },
  {
    icon: ClipboardCheck,
    title: "Tenant Screening",
    description:
      "Comprehensive background and credit checks to ensure a safe and reliable living environment for all residents.",
  },
  {
    icon: Wallet,
    title: "Rent Collection",
    description:
      "Efficient and transparent collection processes designed to minimize stress for owners while maximizing cash flow.",
  },
  {
    icon: Wrench,
    title: "Maintenance Coordination",
    description:
      "Proactive maintenance planning and vendor management to protect property value and ensure resident satisfaction.",
  },
  {
    icon: BarChart3,
    title: "Financial Reporting",
    description:
      "Transparent monthly reports detailing income, expenses, and performance metrics for full portfolio oversight.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Risk",
    description:
      "Expert management of legal requirements and risk mitigation strategies to safeguard your investment.",
  },
];

const investorFeatures = [
  { icon: TrendingUp, title: "Strategic rent pricing" },
  { icon: Gauge, title: "Faster leasing timelines" },
  { icon: Network, title: "Vendor network control" },
  { icon: FileCheck2, title: "Transparent reporting" },
];

const pricingCards = [
  {
    eyebrow: "Management Fee",
    title: "Competitive Management",
    description:
      "A flat-fee structure based on property value and performance. No hidden administrative costs or surprise markups.",
  },
  {
    eyebrow: "Leasing Fee",
    title: "Performance-Based",
    description:
      "Our leasing fees are calculated as a percentage of the first month's rent. We only earn when you earn.",
  },
  {
    eyebrow: "Consultation",
    title: "Zero Surprises",
    description:
      "Transparent reporting and clear communication from day one. We provide the data you need to make informed decisions.",
  },
];

const process = [
  {
    number: "01",
    icon: LineChart,
    title: "Property Evaluation",
    description:
      "We conduct a comprehensive analysis of your property's current market value and potential for growth.",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Pricing Strategy",
    description:
      "Utilizing data-driven insights to determine optimal rent levels that maximize your return on investment.",
  },
  {
    number: "03",
    icon: Camera,
    title: "Marketing & Leasing",
    description:
      "High-impact marketing campaigns designed to attract quality tenants and shorten your leasing timeline.",
  },
  {
    number: "04",
    icon: ClipboardCheck,
    title: "Ongoing Management",
    description:
      "Full-service coordination of maintenance, tenant screening, and financial reporting to ensure peace of mind.",
  },
  {
    number: "05",
    icon: Settings2,
    title: "Optimization & Growth",
    description:
      "Continuous performance reviews and strategic adjustments to scale your portfolio and maximize long-term value.",
  },
];

export default function PropertyManagementPage() {
  return (
    <>
      <Hero
        eyebrow="Property Management"
        title="Smart Real Estate. Strategic Management. Stronger Returns."
        subhead="Helping homeowners and investors maximize value through expert property management and residential sales in Nashville & Memphis."
        image="/images/placeholders/property-management-hero.jpg"
        imageAlt="Nashville rental property"
        ctas={[
          { label: "Get Rental Analysis", href: "#our-process" },
          { label: "Schedule a Consultation", href: "/contact", variant: "ghost-light" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <SectionEyebrow>Who It&rsquo;s For</SectionEyebrow>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="flex flex-col items-start gap-4 rounded border border-slate-blue/20 bg-white/40 p-7"
            >
              <a.icon className="text-taupe-gold" size={26} strokeWidth={1.4} />
              <p className="font-subhead text-sm font-semibold text-navy">{a.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-blue/10 py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionEyebrow>Full-Service Management</SectionEyebrow>
          <SectionHeading as="h2" className="mt-3 max-w-2xl">
            Everything Your Property Needs
          </SectionHeading>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <NumberedFeatureCard key={s.title} number="" icon={s.icon} title={s.title} description={s.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionEyebrow>Built For Owners</SectionEyebrow>
        <SectionHeading as="h2" className="mt-3 max-w-2xl">
          Investor-Minded. System-Driven.
        </SectionHeading>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {investorFeatures.map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <f.icon className="shrink-0 text-navy" size={22} strokeWidth={1.5} />
              <p className="text-sm font-medium text-navy">{f.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionEyebrow light>Pricing Philosophy</SectionEyebrow>
          <SectionHeading as="h2" light className="mt-3 max-w-2xl">
            Simple. Transparent. Aligned.
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-cream/75">
            We believe in clear communication and performance-based results. Our pricing
            structures are designed to eliminate hidden surprises and focus on your long-term
            success.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {pricingCards.map((c) => (
              <PricingPhilosophyCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      <section id="our-process" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionEyebrow>How It Works</SectionEyebrow>
        <SectionHeading as="h2" className="mt-3 max-w-2xl">
          A Clear Path From Evaluation to Growth
        </SectionHeading>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((step) => (
            <NumberedFeatureCard key={step.number} {...step} />
          ))}
        </div>
      </section>

      <section className="bg-slate-blue/10 py-24 text-center">
        <div className="mx-auto max-w-2xl px-6 md:px-10">
          <SectionHeading as="h2" center>
            Maximize Your Property&rsquo;s Value
          </SectionHeading>
          <p className="mt-5 text-ink-muted">
            Get a strategic rental analysis to understand your property&rsquo;s true earning
            potential and optimize your investment strategy.
          </p>
          <Button href="/contact" className="mt-8">
            Get Rental Analysis
          </Button>
        </div>
      </section>
    </>
  );
}
