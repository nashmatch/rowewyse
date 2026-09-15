import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "ghost-light";

interface ButtonProps {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-navy text-cream hover:bg-navy/90 border border-navy",
  secondary: "bg-taupe-gold text-navy hover:bg-taupe-gold/90 border border-taupe-gold",
  ghost: "bg-transparent text-navy border border-navy hover:bg-navy hover:text-cream",
  "ghost-light": "bg-transparent text-cream border border-cream hover:bg-cream hover:text-navy",
};

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 font-subhead font-semibold text-sm uppercase tracking-widest transition-colors duration-200";

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps & (ComponentPropsWithoutRef<"a"> | ComponentPropsWithoutRef<"button">)) {
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    const isAnchor = href.startsWith("#");
    if (isExternal || isAnchor || href.startsWith("tel:") || href.startsWith("mailto:")) {
      const externalProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
      return (
        <a
          {...externalProps}
          {...(rest as ComponentPropsWithoutRef<"a">)}
          href={href}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link {...(rest as ComponentPropsWithoutRef<"a">)} href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...(rest as ComponentPropsWithoutRef<"button">)} className={classes}>
      {children}
    </button>
  );
}
