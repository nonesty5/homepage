interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  align?: "left" | "center";
  line?: boolean;
  number?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  label,
  align = "center",
  line = false,
  number,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-14 animate-fade-in ${isCenter ? "text-center" : ""}`}
    >
      {/* Editorial label strip — number + label + line */}
      {label && (
        <div
          className={`flex items-center gap-4 mb-6 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          {number && (
            <span className="font-mono-meta text-[10px] uppercase text-subtle tabular-figures">
              N°&nbsp;{number}
            </span>
          )}
          {number && <span className="h-px w-8 bg-border" />}
          <span className="font-mono-meta text-[10px] uppercase text-muted">
            {label}
          </span>
          <span className="h-px w-8 bg-border" />
        </div>
      )}

      {/* Decorative Line (above title) */}
      {line && (
        <div
          className={`mb-5 ${isCenter ? "flex justify-center" : ""}`}
        >
          <span className="block w-10 h-0.5 bg-accent animate-line-reveal" />
        </div>
      )}

      {/* Title */}
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.15]">
        {title}
      </h2>

      {/* Subtitle in serif italic for editorial pulled-quote feel */}
      {subtitle && (
        <p
          className={`mt-5 font-serif-display italic text-muted text-lg md:text-xl leading-relaxed ${
            isCenter ? "max-w-2xl mx-auto" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
