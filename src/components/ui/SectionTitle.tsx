interface SectionTitleProps {
  title: string
  subtitle?: string
  highlight?: string
  className?: string
}

export default function SectionTitle({ title, subtitle, highlight, className = '' }: SectionTitleProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {subtitle && (
        <p className="text-[var(--accent-blue)] text-lg font-medium mb-2 tracking-wide uppercase">
          {subtitle}
        </p>
      )}
      <h2 className="text-5xl md:text-7xl font-bold mb-4">
        {title}
        {highlight && (
          <span className="text-[var(--accent-gold)] text-glow-gold"> {highlight}</span>
        )}
      </h2>
    </div>
  )
}
