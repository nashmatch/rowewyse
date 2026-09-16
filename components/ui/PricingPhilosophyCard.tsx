export function PricingPhilosophyCard({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded border-t-2 border-taupe-gold bg-navy p-8 text-cream">
      <p className="eyebrow text-taupe-gold">{eyebrow}</p>
      <h3 className="font-display mt-3 text-xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-cream/75">{description}</p>
    </div>
  );
}
