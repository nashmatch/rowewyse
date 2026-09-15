type Tag = "h1" | "h2" | "h3";

const sizes: Record<Tag, string> = {
  h1: "text-4xl md:text-6xl leading-[1.05]",
  h2: "text-3xl md:text-5xl leading-[1.1]",
  h3: "text-2xl md:text-3xl leading-tight",
};

export function SectionHeading({
  as = "h2",
  children,
  className = "",
  light = false,
  center = false,
}: {
  as?: Tag;
  children: React.ReactNode;
  className?: string;
  light?: boolean;
  center?: boolean;
}) {
  const Tag = as;
  return (
    <Tag
      className={`font-display ${sizes[as]} ${light ? "text-cream" : "text-navy"} ${
        center ? "text-center" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
