export function StatCallout({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl text-taupe-gold md:text-5xl">{value}</p>
      <p className="eyebrow mt-2 text-cream/80">{label}</p>
    </div>
  );
}
