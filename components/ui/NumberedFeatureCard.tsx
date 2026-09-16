import type { LucideIcon } from "lucide-react";

export function NumberedFeatureCard({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: string;
  icon?: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded border border-slate-blue/25 bg-cream p-8">
      <div className="flex items-center justify-between">
        <span className="font-display text-3xl text-taupe-gold">{number}</span>
        {Icon && <Icon className="text-navy" size={26} strokeWidth={1.4} />}
      </div>
      <h3 className="font-display mt-5 text-xl text-navy">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{description}</p>
    </div>
  );
}
