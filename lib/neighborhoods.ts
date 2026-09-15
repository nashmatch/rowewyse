export interface Neighborhood {
  slug: string;
  name: string;
  city: "Nashville" | "Memphis";
  description: string;
  image: string;
}

export const neighborhoods: Neighborhood[] = [
  {
    slug: "east-nashville",
    name: "East Nashville",
    city: "Nashville",
    description:
      "Known for creative energy and historic bungalows, this area offers a walkable lifestyle. It is a premier choice for those seeking high demand and eclectic charm.",
    image: "/images/placeholders/neighborhood-east-nashville.svg",
  },
  {
    slug: "central-gardens-memphis",
    name: "Central Gardens (Memphis)",
    city: "Memphis",
    description:
      "This historic district features grand midtown estates and a strong community bond. It remains a top tier market for long-term residential stability and beauty.",
    image: "/images/placeholders/neighborhood-central-gardens-memphis.svg",
  },
  {
    slug: "donelson",
    name: "Donelson",
    city: "Nashville",
    description:
      "A suburban sanctuary featuring mid-century ranch homes and easy city access. Buyers love the spacious lots while sellers benefit from its rising market profile.",
    image: "/images/placeholders/neighborhood-donelson.svg",
  },
  {
    slug: "east-memphis",
    name: "East Memphis",
    city: "Memphis",
    description:
      "Offering a blend of classic luxury and modern convenience, this area is a pillar of stability. Professionals gravitate here for the top schools and solid equity.",
    image: "/images/placeholders/neighborhood-east-memphis.svg",
  },
];
