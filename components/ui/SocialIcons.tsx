import type { SVGProps } from "react";

/**
 * lucide-react dropped brand/social glyphs, so these are small hand-drawn
 * line icons kept in the same thin-stroke style as the rest of the site.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 8.5h2.5V5.2c-.43-.06-1.9-.2-3.05-.2-3.02 0-4.45 1.83-4.45 4.5V12H6.5v3.6H9V22h3.6v-6.4h2.7l.5-3.6h-3.2v-2.1c0-1.05.3-1.4 1.4-1.4Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10.3 9.3v5.4l4.7-2.7-4.7-2.7Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4l16 16M20 4 4 20" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <line x1="7.5" y1="10" x2="7.5" y2="16.5" />
      <circle cx="7.5" cy="7" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 16.5V10M11.5 12.5c0-1.4 1-2.5 2.4-2.5 1.4 0 2.1 1 2.1 2.7v3.8" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 3.5v11a3 3 0 1 1-2.2-2.9" />
      <path d="M13 3.5c.4 2.3 2 3.9 4.3 4.2v2.4c-1.6-.1-3-.6-4.3-1.5" />
    </svg>
  );
}

export const socialIconMap: Record<string, (props: IconProps) => React.JSX.Element> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  X: XIcon,
  LinkedIn: LinkedInIcon,
  TikTok: TikTokIcon,
};
