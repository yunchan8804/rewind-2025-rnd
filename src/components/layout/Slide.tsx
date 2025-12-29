import { ReactNode } from 'react'

interface SlideProps {
  children: ReactNode
  id?: string
  className?: string
  bgImage?: string
  bgGradient?: 'dark' | 'accent' | 'none'
}

export default function Slide({ 
  children, 
  id, 
  className = '', 
  bgImage,
  bgGradient = 'dark'
}: SlideProps) {
  const gradientClass = {
    dark: 'bg-gradient-dark',
    accent: 'bg-gradient-accent',
    none: ''
  }[bgGradient]

  return (
    <section 
      id={id}
      className={`slide ${gradientClass} ${className}`}
    >
      {bgImage && (
        <div 
          className="parallax-bg absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="slide-content relative z-10 w-full max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}
