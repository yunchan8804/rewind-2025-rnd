interface AwardCardProps {
  title: string
  project: string
  organization?: string
  icon?: string
}

export default function AwardCard({ title, project, organization, icon = '🏆' }: AwardCardProps) {
  return (
    <div className="
      bg-gradient-to-br from-[var(--accent-gold)]/10 to-[var(--accent-gold)]/5
      border border-[var(--accent-gold)]/30
      rounded-2xl p-6
      hover:from-[var(--accent-gold)]/20 hover:to-[var(--accent-gold)]/10
      transition-all duration-300
      hover:scale-105
      shadow-[0_0_40px_rgba(251,191,36,0.1)]
    ">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-[var(--accent-gold)] mb-2">{title}</h3>
      <p className="text-lg text-[var(--text-primary)] font-medium">{project}</p>
      {organization && (
        <p className="text-sm text-[var(--text-secondary)] mt-2">{organization}</p>
      )}
    </div>
  )
}
