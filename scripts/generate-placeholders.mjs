// One-off script to generate branded SVG placeholder images. Run with:
//   node scripts/generate-placeholders.mjs
// Real photography should replace these files (same filenames, swap the
// extension to .jpg/.webp and update the <Image> src if needed).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images", "placeholders");
mkdirSync(outDir, { recursive: true });

const NAVY = "#092c4a";
const SLATE = "#627383";
const GOLD = "#bfb091";
const CREAM = "#ede6d8";

function svg({ width, height, label, sublabel = "", tone = "navy" }) {
  const bg = tone === "navy" ? NAVY : tone === "slate" ? SLATE : CREAM;
  const fg = tone === "cream" ? NAVY : CREAM;
  const accent = GOLD;
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="diag" width="28" height="28" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <rect width="28" height="28" fill="${bg}" />
      <line x1="0" y1="0" x2="0" y2="28" stroke="${accent}" stroke-opacity="0.12" stroke-width="10" />
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#diag)" />
  <rect x="0" y="0" width="${width}" height="${height}" fill="${bg}" fill-opacity="0.35" />
  <line x1="${width / 2 - 28}" y1="${height / 2 + 14}" x2="${width / 2 + 28}" y2="${height / 2 + 14}" stroke="${accent}" stroke-width="2" />
  <text x="50%" y="48%" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.max(20, Math.min(width, height) / 14)}" fill="${fg}" letter-spacing="0.5">${label}</text>
  ${sublabel ? `<text x="50%" y="56%" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.max(12, Math.min(width, height) / 34)}" fill="${accent}" letter-spacing="2" >${sublabel.toUpperCase()}</text>` : ""}
</svg>`;
}

const images = [
  { file: "hero-nashville-skyline.svg", width: 1920, height: 1080, label: "Nashville Skyline", sublabel: "Hero Photography Placeholder", tone: "navy" },
  { file: "hero-memphis-skyline.svg", width: 1920, height: 1080, label: "Memphis Skyline", sublabel: "Hero Photography Placeholder", tone: "navy" },
  { file: "austin-rowe-headshot.svg", width: 800, height: 1000, label: "Austin Rowe", sublabel: "Headshot Placeholder", tone: "slate" },
  { file: "eric-wyse-headshot.svg", width: 800, height: 1000, label: "Eric Wyse", sublabel: "Headshot Placeholder", tone: "slate" },
  { file: "residential-hero-1.svg", width: 1600, height: 1000, label: "Residential Listing", sublabel: "Gallery Placeholder 1", tone: "navy" },
  { file: "residential-hero-2.svg", width: 1600, height: 1000, label: "Residential Listing", sublabel: "Gallery Placeholder 2", tone: "slate" },
  { file: "residential-hero-3.svg", width: 1600, height: 1000, label: "Residential Listing", sublabel: "Gallery Placeholder 3", tone: "navy" },
  { file: "neighborhood-east-nashville.svg", width: 1200, height: 900, label: "East Nashville", sublabel: "Neighborhood Photo", tone: "slate" },
  { file: "neighborhood-central-gardens-memphis.svg", width: 1200, height: 900, label: "Central Gardens", sublabel: "Neighborhood Photo", tone: "navy" },
  { file: "neighborhood-donelson.svg", width: 1200, height: 900, label: "Donelson", sublabel: "Neighborhood Photo", tone: "slate" },
  { file: "neighborhood-east-memphis.svg", width: 1200, height: 900, label: "East Memphis", sublabel: "Neighborhood Photo", tone: "navy" },
  { file: "property-management-hero.svg", width: 1920, height: 1080, label: "Property Management", sublabel: "Hero Photography Placeholder", tone: "navy" },
  { file: "resources-hero.svg", width: 1920, height: 1080, label: "Market Resources", sublabel: "Hero Photography Placeholder", tone: "navy" },
  { file: "dpa-hero.svg", width: 1920, height: 700, label: "Down Payment Assistance", sublabel: "Hero Photography Placeholder", tone: "navy" },
  { file: "contact-office.svg", width: 1200, height: 900, label: "Nashville Office", sublabel: "Office Photo Placeholder", tone: "slate" },
  { file: "og-image.svg", width: 1200, height: 630, label: "ROWE | WYSE Partners", sublabel: "Nashville & Memphis Real Estate", tone: "navy" },
];

for (const img of images) {
  writeFileSync(join(outDir, img.file), svg(img));
}

console.log(`Generated ${images.length} placeholder images in ${outDir}`);
