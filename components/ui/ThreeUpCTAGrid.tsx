import { Button } from "./Button";

interface CTACard {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}

export function ThreeUpCTAGrid({ cards }: { cards: CTACard[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex flex-col rounded border border-slate-blue/20 bg-white/40 p-8"
        >
          <h3 className="font-display text-xl text-navy">{card.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
            {card.description}
          </p>
          <Button href={card.href} variant="ghost" className="mt-6 self-start">
            {card.ctaLabel}
          </Button>
        </div>
      ))}
    </div>
  );
}
