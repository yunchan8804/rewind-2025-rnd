interface TimelineItemProps {
  date: string
  title: string
  description?: string
  highlight?: boolean
}

export default function TimelineItem({ date, title, description, highlight = false }: TimelineItemProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className={`
        w-4 h-4 rounded-full mt-1.5 flex-shrink-0
        ${highlight 
          ? 'bg-[var(--accent-gold)] shadow-[0_0_10px_var(--accent-gold)]' 
          : 'bg-[var(--accent-blue)]'
        }
      `} />
      <div>
        <div className={`text-sm font-medium mb-1 ${highlight ? 'text-[var(--accent-gold)]' : 'text-[var(--accent-blue)]'}`}>
          {date}
        </div>
        <div className={`text-lg font-semibold ${highlight ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)]'}`}>
          {title}
        </div>
        {description && (
          <div className="text-sm text-[var(--text-secondary)] mt-1">{description}</div>
        )}
      </div>
    </div>
  )
}
