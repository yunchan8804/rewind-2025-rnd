import { useRef, useEffect, useState } from 'react'
import { useGsapScroll } from '../../hooks/useGsapScroll'
import ScrollIndicator from '../ui/ScrollIndicator'

interface SlideContainerProps {
  children: React.ReactNode
  totalSlides: number
}

export default function SlideContainer({ children, totalSlides }: SlideContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { goToSlide } = useGsapScroll(containerRef)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const newIndex = Math.round(scrollY / windowHeight)
      setCurrentSlide(Math.min(newIndex, totalSlides - 1))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [totalSlides])

  return (
    <div ref={containerRef} className="relative">
      {children}
      <ScrollIndicator 
        total={totalSlides} 
        current={currentSlide} 
        onNavigate={goToSlide}
      />
    </div>
  )
}
