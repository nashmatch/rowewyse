import { siteConfig } from "./site-config";

/**
 * Sitewide RealEstateAgent/LocalBusiness structured data (JSON-LD), rendered
 * once in the root layout. This is the single biggest lever for AEO/AI
 * answer engines and Google's knowledge panel — it gives crawlers an
 * unambiguous, machine-readable statement of who this business is, where it
 * operates, and how to reach it, instead of leaving them to infer it from
 * prose.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo-navy.png`,
    image: `${siteConfig.url}/images/logo-navy.png`,
    telephone: siteConfig.officePhone.display,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: "Nashville",
      addressRegion: "TN",
      postalCode: "37204",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Nashville", "@id": "https://en.wikipedia.org/wiki/Nashville,_Tennessee" },
      { "@type": "City", name: "Memphis", "@id": "https://en.wikipedia.org/wiki/Memphis,_Tennessee" },
    ],
    parentOrganization: {
      "@type": "RealEstateAgent",
      name: siteConfig.brokerage,
    },
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
