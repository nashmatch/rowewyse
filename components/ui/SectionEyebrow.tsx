export function SectionEyebrow({
  children,
  className = "",
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "text-taupe-gold" : "text-ink-muted"} ${className}`}>
      {children}
    </p>
  );
}
