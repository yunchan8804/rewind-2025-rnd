interface ScrollIndicatorProps {
  total: number
  current: number
  onNavigate: (index: number) => void
}

export default function ScrollIndicator({ total, current, onNavigate }: ScrollIndicatorProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onNavigate(index)}
          className={`
            w-3 h-3 rounded-full transition-all duration-300 
            ${current === index 
              ? 'bg-[var(--accent-blue)] scale-125 shadow-[0_0_10px_var(--accent-blue)]' 
              : 'bg-[var(--text-secondary)] hover:bg-[var(--accent-purple)] hover:scale-110'
            }
          `}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}
