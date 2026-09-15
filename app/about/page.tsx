import type { Metadata } from "next";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BioCard } from "@/components/ui/BioCard";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Meet Austin Rowe & Eric Wyse — Nashville & Memphis REALTORS®",
  description:
    "Meet the founding partners of ROWE | WYSE Partners — Nashville and Memphis REALTORS® combining deep local insight with a personalized, collaborative approach to residential real estate.",
};

const austinBio = [
  "Austin Rowe is a relationship-driven real estate professional and business leader focused on helping people build wealth, stability, and opportunity through real estate. As a co-founder of ROWE | WYSE Partners, he brings a thoughtful, strategic approach to residential and commercial sales, as well as property management across Tennessee.",
  "With over 60 transactions spanning residential, commercial, and investment real estate, and more than $40 million in total sales volume, Austin has built a track record of delivering results across both Middle and West Tennessee. His experience ranges from working with first-time buyers to advising seasoned investors, always with a focus on aligning each decision with long-term goals.",
  "Austin's work is rooted in the belief that real estate is more than transactions; it's about people, timing, and long-term impact. He is known for taking the time to understand each client's goals, offering clear guidance, and creating tailored strategies that reflect both the market and the individual.",
  "In addition to his professional work, Austin has been deeply involved in industry leadership. He served as the founding Secretary of the LGBTQ+ Real Estate Alliance and is the incoming 2028 National President, reflecting his commitment to advocacy, inclusion, and the advancement of professionals within the real estate industry.",
  "Outside of work, Austin enjoys spending time outdoors — whether hiking, exploring local farmers markets, or staying active through volleyball and other intramural sports. He also appreciates a good happy hour and the opportunity to connect with friends and community.",
  "At the core of everything he does is a simple philosophy: when you lead with people, the business follows.",
];

const ericBio = [
  "An experienced Nashville REALTOR® and trusted advisor for buyers and sellers across Middle Tennessee, Eric Wyse was brought to Music City by the music business more than three decades ago — but it is an enduring love for Nashville that has kept him rooted here. Originally from Vermont, he has come to see Nashville as an exceptional place to live, work, and build community. He lives in the Bellevue community of West Nashville with his husband, Stephen, and continues to enjoy all that makes this region such a remarkable place to call home. Drawing on his background as a songwriter, keyboardist, and producer, he channels that same creativity and discipline — along with a reputation as a strong negotiator and industry leader — into helping clients buy and sell the homes that make Nashville living so rewarding.",
  "With more than 60 transactions spanning 15 counties across Middle Tennessee, Eric brings broad experience to every client relationship. His track record includes over $30 million in closed business across a diverse range of property types — residential single-family homes, condos, mixed-use, commercial, estates, and land — and he has successfully utilized auction strategies as well.",
  "Community has always been a cornerstone of Eric's life. Volunteer efforts have included Habitat for Humanity, The Nashville Food Project, Room In The Inn, Nashville CARES, the Human Rights Campaign, and leadership roles within multiple homeowners associations.",
  "A 2019 graduate of Tennessee REALTORS®' Leadership Program and a 2021 graduate of the Greater Nashville REALTORS® Leadership Class, Eric is committed to professional growth and industry excellence. He co-founded and served as President of the Nashville Chapter of the LGBTQ+ Real Estate Alliance.",
  "Currently, Eric serves on the Governmental Affairs Committee at Greater Nashville REALTORS® and the Professional Development Committee at Williamson County Association of REALTORS®. He has chaired the Professional Development Committee for Greater Nashville REALTORS®, served on the Board of Directors for both Greater Nashville and Tennessee REALTORS®, and serves as a Trustee of the Tennessee Real Estate Education Foundation (TREEF).",
  "Eric holds a Bachelor of Science from Belmont University and a Master of Church Music from Lee University. An avid bicyclist, most weekends find him exploring Tennessee's scenic greenways.",
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-28 text-center md:px-10 md:pt-36">
        <SectionEyebrow className="justify-center">Leaders in Nashville + Memphis.</SectionEyebrow>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
          Dedicated to guiding homeowners through the complex landscape of residential real
          estate, our partnership combines deep local insight with a personalized touch. We
          ensure every buyer and seller in Tennessee benefits from a collaborative approach
          that prioritizes your move.
        </p>

        <SectionHeading as="h1" center className="mx-auto mt-12 max-w-3xl">
          Real Estate Guidance You Trust
        </SectionHeading>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
          We prioritize clear communication and expert advocacy. Our philosophy is rooted in
          providing a seamless residential experience, where local market knowledge and
          strategic planning come together to help you find your perfect home or sell for the
          best value.
        </p>
      </section>

      <section className="mx-auto max-w-6xl space-y-24 px-6 pb-24 md:px-10">
        <div>
          <SectionEyebrow>Your Partners in Home Ownership</SectionEyebrow>
        </div>

        <BioCard
          name="Austin Rowe"
          title="Principal Partner & REALTOR®"
          headshot="/images/placeholders/austin-rowe-headshot.jpg"
          bio={austinBio}
          ctaLabel="Contact Austin"
          ctaHref="tel:6159384223"
        />

        <div className="gold-divider mx-auto" />

        <BioCard
          name="Eric Wyse"
          title="Principal Partner & REALTOR®"
          headshot="/images/placeholders/eric-wyse-headshot.jpg"
          bio={ericBio}
          ctaLabel="Contact Eric"
          ctaHref="mailto:ericwyse@rowewyse.com?subject=Website Inquiry"
        />
      </section>

      <section className="bg-navy py-20 text-center text-cream">
        <div className="mx-auto max-w-2xl px-6 md:px-10">
          <SectionHeading as="h2" light center>
            Get in Touch
          </SectionHeading>
          <p className="mt-5 text-cream/80">
            Ready to make your next move in Nashville or Memphis? Connect with our team today
            to start your journey toward your dream Tennessee home.
          </p>
          <Button href="/contact" variant="secondary" className="mt-8">
            Book Your Home Strategy
          </Button>
        </div>
      </section>
    </>
  );
}
