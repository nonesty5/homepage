interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  align?: "left" | "center";
  line?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  label,
  align = "center",
  line = false,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-14 animate-fade-in ${isCenter ? "text-center" : ""}`}
    >
      {/* Optional Label */}
      {label && (
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-4">
          {label}
        </p>
      )}

      {/* Decorative Line (above title) */}
      {line && (
        <div
          className={`mb-5 ${isCenter ? "flex justify-center" : ""}`}
        >
          <span className="block w-10 h-px bg-accent animate-line-reveal" />
        </div>
      )}

      {/* Title */}
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`mt-5 text-muted text-base md:text-lg leading-relaxed ${
            isCenter ? "max-w-2xl mx-auto" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
