"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

// Rechat's real-estate widgets are plain custom elements (no React bindings),
// registered globally once the SDK script loads. Building the fixed markup
// via innerHTML on a plain <div> — rather than JSX — sidesteps needing
// JSX.IntrinsicElements typings for tags React/TypeScript don't know about.
function widgetMarkup(brandId: string) {
  return `
    <rechat-root brand_id="${brandId}" data-theme="rowewyse" style="display:block;">
      <rechat-listings>
        <rechat-map-filter></rechat-map-filter>
        <rechat-map></rechat-map>
        <rechat-map-listings-grid></rechat-map-listings-grid>
        <rechat-listings-pagination></rechat-listings-pagination>
      </rechat-listings>
    </rechat-root>
  `;
}

export function RechatListingsWidget({ brandId }: { brandId: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el && el.childElementCount === 0) {
      el.innerHTML = widgetMarkup(brandId);
    }
  }, [brandId]);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/@rechat/sdk@latest/dist/rechat.min.css" />
      <Script
        src="https://unpkg.com/@rechat/sdk@latest/dist/rechat.min.js"
        strategy="afterInteractive"
      />
      <div ref={containerRef} className="min-h-[600px]" />
    </>
  );
}
