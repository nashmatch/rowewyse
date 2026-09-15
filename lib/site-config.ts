export const siteConfig = {
  name: "ROWE | WYSE Partners",
  brokerage: "Onward Real Estate",
  url: "https://rowewyse.com",
  email: "partners@rowewyse.com",
  officePhone: { display: "901.656.8599", href: "tel:9016568599" },
  austinPhone: { display: "615.938.4223", href: "tel:6159384223" },
  contactPhone: { display: "615 656 8599", href: "tel:6156568599" },
  address: {
    line1: "2407 8th Ave S #201",
    line2: "Nashville, TN 37204",
  },
  social: [
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "YouTube", href: "#" },
    { name: "X", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "TikTok", href: "#" },
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Residential", href: "/residential" },
  { label: "Property Management", href: "/property-management" },
  { label: "Resources", href: "/resources" },
  { label: "Down Payment Assistance", href: "/dpa" },
  { label: "Contact", href: "/contact" },
] as const;
