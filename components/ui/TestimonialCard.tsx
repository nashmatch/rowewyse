export function TestimonialCard({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <figure className="mx-auto max-w-3xl text-center">
      <div className="gold-divider mx-auto mb-8" />
      <blockquote className="font-display text-xl leading-relaxed text-navy md:text-2xl">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="eyebrow mt-6 text-ink-muted">{attribution}</figcaption>
    </figure>
  );
}
