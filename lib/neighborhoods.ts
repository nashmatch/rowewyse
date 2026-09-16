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
      "Known for its creative energy and historic bungalows, this walkable area features eclectic architecture and strong, well-documented buyer demand.",
    image: "/images/placeholders/neighborhood-east-nashville.svg",
  },
  {
    slug: "central-gardens-memphis",
    name: "Central Gardens (Memphis)",
    city: "Memphis",
    description:
      "This historic Midtown district features grand early-20th-century estates on tree-lined streets, with a long track record of stable long-term home values.",
    image: "/images/placeholders/neighborhood-central-gardens-memphis.svg",
  },
  {
    slug: "donelson",
    name: "Donelson",
    city: "Nashville",
    description:
      "A suburban area featuring mid-century ranch homes on spacious lots, with easy access to downtown Nashville and a rising market profile.",
    image: "/images/placeholders/neighborhood-donelson.svg",
  },
  {
    slug: "east-memphis",
    name: "East Memphis",
    city: "Memphis",
    description:
      "Offering a blend of classic architecture and modern convenience, this established area combines mature infrastructure with strong long-term equity growth.",
    image: "/images/placeholders/neighborhood-east-memphis.svg",
  },
];
