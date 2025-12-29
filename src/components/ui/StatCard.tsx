interface StatCardProps {
  value: string | number
  label: string
  sublabel?: string
  icon?: string
  color?: 'blue' | 'gold' | 'purple'
}

export default function StatCard({ value, label, sublabel, icon, color = 'blue' }: StatCardProps) {
  const colorClasses = {
    blue: 'text-[var(--accent-blue)] border-[var(--accent-blue)]/30 shadow-[0_0_30px_rgba(0,212,255,0.2)]',
    gold: 'text-[var(--accent-gold)] border-[var(--accent-gold)]/30 shadow-[0_0_30px_rgba(251,191,36,0.2)]',
    purple: 'text-[var(--accent-purple)] border-[var(--accent-purple)]/30 shadow-[0_0_30px_rgba(139,92,246,0.2)]'
  }

  return (
    <div className={`
      bg-[var(--bg-secondary)] rounded-2xl p-8 border 
      ${colorClasses[color]}
      hover:scale-105 transition-transform duration-300
    `}>
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <div className={`text-5xl md:text-6xl font-bold mb-2 ${colorClasses[color].split(' ')[0]}`}>
        {value}
      </div>
      <div className="text-xl font-semibold text-[var(--text-primary)]">{label}</div>
      {sublabel && (
        <div className="text-sm text-[var(--text-secondary)] mt-1">{sublabel}</div>
      )}
    </div>
  )
}
