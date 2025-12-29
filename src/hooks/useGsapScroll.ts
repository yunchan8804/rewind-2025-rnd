import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export const useGsapScroll = (containerRef: React.RefObject<HTMLElement | null>) => {
  const slidesRef = useRef<HTMLElement[]>([])
  const currentIndex = useRef(0)
  const isScrolling = useRef(false)

  useEffect(() => {
    if (!containerRef.current) return

    const slides = gsap.utils.toArray<HTMLElement>('.slide')
    slidesRef.current = slides

    // 각 슬라이드에 패럴랙스 효과 설정
    slides.forEach((slide, index) => {
      const bg = slide.querySelector('.parallax-bg')
      const content = slide.querySelector('.slide-content')

      // 배경 패럴랙스
      if (bg) {
        gsap.fromTo(bg,
          { y: index === 0 ? 0 : 100 },
          {
            y: -100,
            ease: 'none',
            scrollTrigger: {
              trigger: slide,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            }
          }
        )
      }

      // 콘텐츠 페이드인 애니메이션
      if (content) {
        gsap.fromTo(content,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: slide,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }
    })

    // 스냅 스크롤 설정
    ScrollTrigger.create({
      snap: {
        snapTo: 1 / (slides.length - 1),
        duration: { min: 0.3, max: 0.6 },
        delay: 0,
        ease: 'power1.inOut',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [containerRef])

  const goToSlide = (index: number) => {
    if (isScrolling.current) return
    isScrolling.current = true
    
    const slides = slidesRef.current
    if (index >= 0 && index < slides.length) {
      gsap.to(window, {
        scrollTo: { y: slides[index], autoKill: false },
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          isScrolling.current = false
          currentIndex.current = index
        }
      })
    } else {
      isScrolling.current = false
    }
  }

  return { goToSlide, currentIndex }
}
