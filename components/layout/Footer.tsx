import Image from "next/image";
import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/site-config";
import { socialIconMap } from "@/components/ui/SocialIcons";
import { EqualHousingIcon } from "@/components/ui/EqualHousingIcon";

const isExternal = (href: string) => href.startsWith("http");

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/images/logo-light.png"
              alt="ROWE | WYSE Partners"
              width={453}
              height={191}
              className="h-16 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/75">
              Nashville &amp; Memphis real estate, operating under {siteConfig.brokerage}.
            </p>
          </div>

          <div>
            <p className="eyebrow text-taupe-gold">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={isExternal(link.href) ? "_blank" : undefined}
                    rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
                    className="text-sm text-cream/80 transition-colors hover:text-taupe-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-taupe-gold">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-taupe-gold">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.officePhone.href} className="hover:text-taupe-gold">
                  {siteConfig.officePhone.display}
                </a>
              </li>
              <li className="pt-1">
                <p className="font-subhead text-sm font-bold uppercase tracking-wide text-cream">
                  {siteConfig.brokerage}
                </p>
                <p className="mt-1 text-cream/70">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                </p>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-4">
              {siteConfig.social.map((s) => {
                const Icon = socialIconMap[s.name];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    className="text-cream/70 transition-colors hover:text-taupe-gold"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-cream/15 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs tracking-wide text-cream/60">
            &copy; {year} ROWE | WYSE PARTNERS. ALL RIGHTS RESERVED. EQUAL HOUSING OPPORTUNITY.
          </p>
          <EqualHousingIcon className="text-taupe-gold" />
        </div>
      </div>
    </footer>
  );
}
