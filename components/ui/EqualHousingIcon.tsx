import type { SVGProps } from "react";

export function EqualHousingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="10.5" />
      <path d="M6.5 12.5 12 7l5.5 5.5" />
      <path d="M8 11.5V17h8v-5.5" />
      <path d="M10.3 17v-3h3.4v3" />
    </svg>
  );
}
