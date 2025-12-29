import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MeshGradient } from "@mesh-gradient/react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import "./index.css"

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { id: "hero", label: "RE:WIND" },
  { id: "about", label: "소개" },
  { id: "impact", label: "Impact" },
  { id: "awards", label: "수상" },
  { id: "expansion", label: "확장" },
  { id: "team", label: "팀" },
  { id: "viven", label: "VIVEN" },
  { id: "tech", label: "기술" },
  { id: "projects", label: "프로젝트" },
  { id: "project-1", label: "판타지아" },
  { id: "project-1-gallery", label: "갤러리" },
  { id: "project-2", label: "심리상담" },
  { id: "project-2-gallery", label: "갤러리" },
  { id: "project-3", label: "AI교육" },
  { id: "project-3-gallery", label: "갤러리" },
  { id: "project-4", label: "침술VR" },
  { id: "project-5", label: "햅틱" },
  { id: "project-5-gallery", label: "갤러리" },
  { id: "project-etc", label: "기타" },
  { id: "events", label: "행사" },
  { id: "events-gallery", label: "갤러리" },
  { id: "partnership", label: "협력" },
  { id: "summary", label: "현황" },
  { id: "retrospective", label: "회고" },
  { id: "closing", label: "마무리" },
  { id: "thankyou", label: "감사" },
  { id: "qna", label: "Q&A" },
]

// Particles configuration for dark sections
const particlesOptions = {
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    color: { value: "#ffffff" },
    links: {
      color: "#ffffff",
      distance: 180,
      enable: true,
      opacity: 0.08,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none" as const,
      random: false,
      straight: false,
      outModes: { default: "out" as const },
    },
    number: {
      density: { enable: true, area: 800 },
      value: 300,
    },
    opacity: { value: 0.25 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 2 } },
  },
  detectRetina: true,
}

// Text Spotlight Component - light follows mouse with physics
function TextSpotlight({ text, className = '' }: { text: string, className?: string }) {
  const textRef = useRef<HTMLHeadingElement>(null)
  const mousePos = useRef({ x: 50, y: 50 })
  const currentPos = useRef({ x: 50, y: 50 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    // Smooth lerp animation
    const animate = () => {
      const ease = 0.08 // Lower = more smooth/laggy
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * ease
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * ease

      el.style.setProperty('--mouse-x', `${currentPos.current.x}%`)
      el.style.setProperty('--mouse-y', `${currentPos.current.y}%`)

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mousePos.current.x = ((e.clientX - rect.left) / rect.width) * 100
      mousePos.current.y = ((e.clientY - rect.top) / rect.height) * 100
    }

    el.addEventListener('mousemove', handleMouseMove)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <h2
      ref={textRef}
      className={`text-spotlight ${className}`}
      data-text={text.replace(/<br\s*\/?>/gi, '\n')}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [particlesReady, setParticlesReady] = useState(false)

  // Initialize particles engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setParticlesReady(true)
    })
  }, [])

  useEffect(() => {
    // Track active section
    const sections = document.querySelectorAll("[data-section]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target as Element)
            setActiveSection(index)
          }
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Wheel event for single scroll = next/prev section
  useEffect(() => {
    let isScrolling = false
    let currentIndex = 0

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (isScrolling) return

      const sections = document.querySelectorAll("[data-section]")
      const direction = e.deltaY > 0 ? 1 : -1
      currentIndex = Math.max(0, Math.min(sections.length - 1, activeSection + direction))

      if (currentIndex !== activeSection) {
        isScrolling = true
        sections[currentIndex]?.scrollIntoView({ behavior: "smooth" })

        setTimeout(() => {
          isScrolling = false
        }, 800)
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [activeSection])

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll("[data-section]")
    sections[index]?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ========================================
      // HERO ENTRY ANIMATION (3 seconds)
      // Pure font-weight animation using CSS variable --wght
      // ========================================
      const heroTimeline = gsap.timeline()

      // Subtitle (TWENTYOZ R&D TEAM)
      const subtitleChars = gsap.utils.toArray<HTMLElement>(".hero-anim-subtitle > span:not(.mx-4)")

      // Initial state - extremely thin (almost invisible line)
      gsap.set(subtitleChars, {
        "--wght": 100,
        opacity: 0
      })

      // Fade in first
      heroTimeline.to(subtitleChars, {
        opacity: 0.55,
        duration: 0.3,
        stagger: { each: 0.02, from: "center" }
      }, 0)

      // Weight animation: 100 → 500
      heroTimeline.to(subtitleChars, {
        "--wght": 500,
        duration: 2.5,
        stagger: { each: 0.03, from: "center" },
        ease: "power2.out"
      }, 0.2)

      // Flicker effect during weight transition
      subtitleChars.forEach((char, i) => {
        heroTimeline.to(char, {
          "--wght": 200,
          duration: 0.08,
          yoyo: true,
          repeat: 3,
          ease: "power1.inOut"
        }, 0.4 + i * 0.015)
      })

      // Title (RE:WIND) - pure font-weight animation
      const titleChars = gsap.utils.toArray<HTMLElement>(".hero-anim-title > span")

      // Initial state - hairline thin
      gsap.set(titleChars, {
        "--wght": 100,
        opacity: 0
      })

      // Fade in + Weight animation: 100 → 900 (thin line → black)
      heroTimeline.to(titleChars, {
        opacity: 1,
        "--wght": 900,
        duration: 2.8,
        stagger: { each: 0.08, from: "start" },
        ease: "power3.out"
      }, 0.3)

      // Flicker during weight build-up
      titleChars.forEach((char, i) => {
        heroTimeline.to(char, {
          "--wght": 300,
          duration: 0.1,
          yoyo: true,
          repeat: 2,
          ease: "power1.inOut"
        }, 0.5 + i * 0.08)
      })

      // ========================================
      // CONTINUOUS BREATHING ANIMATION - Weight + Color
      // ========================================
      const titleWeightTargets = [650, 800, 550, 750, 700, 850, 600] // R E : W I N D
      const titleColorTargets = [0.85, 0.92, 0.78, 0.88, 0.82, 0.95, 0.85]

      titleChars.forEach((char, i) => {
        gsap.to(char, {
          "--wght": titleWeightTargets[i] || 700,
          color: `rgba(255, 255, 255, ${titleColorTargets[i] || 0.85})`,
          duration: 1.5 + Math.random() * 1,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 3.5 + i * 0.15
        })
      })

      // Hero bar animation - thickness only (scaleX already set in CSS)
      const heroBar = document.querySelector(".hero-bar") as HTMLElement
      if (heroBar) {
        heroTimeline.to(heroBar, {
          scaleY: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out"
        }, 1.5)
      }

      // Year (2025) - same pure weight animation
      const yearChars = gsap.utils.toArray<HTMLElement>(".hero-anim-year > span")

      gsap.set(yearChars, {
        "--wght": 100,
        opacity: 0
      })

      heroTimeline.to(yearChars, {
        opacity: 0.5,
        duration: 0.3,
        stagger: { each: 0.08, from: "end" }
      }, 0.8)

      heroTimeline.to(yearChars, {
        "--wght": 900,
        duration: 2.2,
        stagger: { each: 0.1, from: "end" },
        ease: "power2.out"
      }, 0.9)


      // ========================================
      // SECTION ANIMATIONS - Staggered entrance with replay on scroll back
      // ========================================

      // Each section gets its own timeline for staggered animations
      gsap.utils.toArray<HTMLElement>("[data-section]").forEach((section) => {
        const sectionId = section.getAttribute("data-section")
        if (sectionId === "hero") return // Hero has its own animation

        // Get elements in order of visual hierarchy
        const caption = section.querySelector(".text-caption:not(.fade-up *)")
        const title = section.querySelector(".title-section, .title-large, .title-hero, .title-project, .title-closing")
        const titleSpans = section.querySelectorAll(".title-section .split-line span")
        const subtitles = section.querySelectorAll(".title-medium.fade-up")
        const bodyTexts = section.querySelectorAll(".text-body:not(.fade-up .text-body)")
        const fadeUps = section.querySelectorAll(".fade-up:not(.project-details .fade-up)")
        const listRows = section.querySelectorAll(".list-row, .event-row")
        const numbers = section.querySelectorAll(".number-huge")
        const lines = section.querySelectorAll(".line-reveal")

        // Create section timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 20%",
            toggleActions: "play none none reverse", // Play on enter, reverse on leave back
          }
        })

        // 1. Caption first (0s)
        if (caption) {
          gsap.set(caption, { opacity: 0, y: 20, letterSpacing: "0.3em" })
          tl.to(caption, {
            opacity: 1,
            y: 0,
            letterSpacing: "0.12em",
            duration: 0.6,
            ease: "power2.out"
          }, 0)
        }

        // 2. Title (0.2s delay)
        if (titleSpans.length > 0) {
          gsap.set(titleSpans, { opacity: 0, y: 80 })
          tl.to(titleSpans, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
          }, 0.2)
        } else if (title) {
          gsap.set(title, { opacity: 0, y: 60 })
          tl.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
          }, 0.2)
        }

        // 3. Numbers (0.4s delay) - dramatic entrance
        if (numbers.length > 0) {
          gsap.set(numbers, { opacity: 0, scale: 0.5, y: 50 })
          tl.to(numbers, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.2)"
          }, 0.4)
        }

        // 4. Subtitles (0.5s delay)
        if (subtitles.length > 0) {
          gsap.set(subtitles, { opacity: 0, y: 40 })
          tl.to(subtitles, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out"
          }, 0.5)
        }

        // 5. Line reveals (0.6s delay)
        if (lines.length > 0) {
          gsap.set(lines, { scaleX: 0, transformOrigin: "left center" })
          tl.to(lines, {
            scaleX: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.inOut"
          }, 0.6)
        }

        // 6. List rows (0.7s delay) - staggered from top
        if (listRows.length > 0) {
          gsap.set(listRows, { opacity: 0, x: -30 })
          tl.to(listRows, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out"
          }, 0.7)
        }

        // 7. Fade up elements (0.5s delay) - general content
        if (fadeUps.length > 0) {
          gsap.set(fadeUps, { opacity: 0, y: 40 })
          tl.to(fadeUps, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
          }, 0.5)
        }

        // 8. Body texts last (0.8s delay)
        if (bodyTexts.length > 0 && !section.querySelector(".fade-up")) {
          gsap.set(bodyTexts, { opacity: 0, y: 30 })
          tl.to(bodyTexts, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out"
          }, 0.8)
        }

        // 9. Project thumbnails (0.6s delay) - scale + fade
        const thumbnails = section.querySelectorAll(".project-thumbnail")
        if (thumbnails.length > 0) {
          gsap.set(thumbnails, { opacity: 0, scale: 0.9, y: 30 })
          tl.to(thumbnails, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
          }, 0.6)
        }

        // 10. Project details (0.5s delay) - staggered entrance for right column content
        const projectDetails = section.querySelector(".project-details")
        if (projectDetails) {
          const detailItems = projectDetails.querySelectorAll(":scope > *")
          gsap.set(detailItems, { opacity: 0, x: 30 })
          tl.to(detailItems, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
          }, 0.5)
        }

        // 11. Text emphasis (0.8s delay) - subtle weight transition
        const emphasisTexts = section.querySelectorAll(".text-emphasis")
        if (emphasisTexts.length > 0) {
          gsap.set(emphasisTexts, { opacity: 0.4 })
          tl.to(emphasisTexts, {
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
          }, 0.8)
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-black text-white">
      {/* Page Indicator */}
      <nav className="page-indicator">
        {SECTIONS.map((section, index) => (
          <button
            key={section.id}
            className={`page-indicator-dot ${activeSection === index ? "active" : ""}`}
            onClick={() => scrollToSection(index)}
          >
            <span className="page-indicator-label">{section.label}</span>
          </button>
        ))}
      </nav>

      <nav className="nav">
        <div className="flex gap-8 md:gap-12">
          <a href="#about">Impact</a>
          <a href="#team">Team</a>
          <a href="#projects">Projects</a>
          <a href="#retrospective">Retrospective</a>
        </div>
        <span className="nav-title">RE:WIND 2025</span>
      </nav>

      {/* Hero Title - RE:WIND 2025 */}
      <section data-section="hero" className="section section-black min-h-screen flex items-center justify-center py-0 relative overflow-hidden">
        {/* Mesh Gradient Background */}
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-50"
          style={{ background: '#000' }}
          options={{
            colors: ['#1a1a1a', '#2d2d2d', '#0f0f0f', '#3a3a3a'],
            animationSpeed: 0.3,
            seed: 2025,
            appearance: 'default',
          }}
        />
        <div className="hero-title-wrapper relative z-10">
          <p className="hero-sub-justified hero-anim-subtitle">
            <span>T</span><span>W</span><span>E</span><span>N</span><span>T</span><span>Y</span><span>O</span><span>Z</span>
            <span className="mx-4">&nbsp;</span>
            <span>R</span><span>&</span><span>D</span>
            <span className="mx-4">&nbsp;</span>
            <span>T</span><span>E</span><span>A</span><span>M</span>
          </p>
          <h1 className="title-hero hero-anim-title">
            <span>R</span><span>E</span><span>:</span><span>W</span><span>I</span><span>N</span><span>D</span>
          </h1>
          <div className="hero-bar"></div>
          <p className="title-hero-year text-right hero-anim-year">
            <span>2</span><span>0</span><span>2</span><span>5</span>
          </p>
        </div>
      </section>

      {/* Opening Hook */}
      <section data-section="about" id="about" className="section section-white py-40 relative overflow-hidden">
        <div className="animated-gradient animated-gradient-light"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              <p className="text-caption opacity-40 mb-6 fade-up">2025년, 우리 팀에게 일어난 일</p>
              <h2 className="title-large fade-up">R&D팀이<br />1년 동안 만들어낸<br />성과들</h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <p className="text-body opacity-60 fade-up">
                우리 팀이 1년 동안 <span className="text-emphasis">3개의 상</span>을 받고, <span className="text-emphasis">7개 대학</span>과 손을 잡고, <span className="text-emphasis">메타버스</span>부터 <span className="text-emphasis">AI 자동제어</span>까지 영역을 넓혔습니다.
              </p>
              <p className="text-body opacity-60 mt-8 fade-up">
                단순히 프로젝트를 완료한 게 아니라 우리만의 플랫폼 <span className="text-emphasis strong">VIVEN</span>을 생태계로 확장했고, 새로운 기술 영역에서 <span className="text-emphasis strong">상업화 가능성</span>을 증명했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section data-section="impact" className="section section-black py-40 relative overflow-hidden">
        {/* Particles Background */}
        {particlesReady && (
          <Particles
            className="absolute inset-0 w-full h-full"
            options={particlesOptions}
          />
        )}
        <div className="container relative z-10">
          <p className="text-caption opacity-50 mb-16 text-center fade-up">PART 1. IMPACT</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="fade-up">
              <span className="number-huge">3</span>
              <p className="text-caption opacity-50 mt-4">Awards</p>
              <p className="text-body opacity-40 mt-2">대상급 2건 포함</p>
            </div>
            <div className="fade-up">
              <span className="number-huge">7</span>
              <p className="text-caption opacity-50 mt-4">Universities</p>
              <p className="text-body opacity-40 mt-2">산학협력 파트너</p>
            </div>
            <div className="fade-up">
              <span className="number-huge">9</span>
              <p className="text-caption opacity-50 mt-4">Completed</p>
              <p className="text-body opacity-40 mt-2">완료 프로젝트</p>
            </div>
            <div className="fade-up">
              <span className="number-huge">7</span>
              <p className="text-caption opacity-50 mt-4">Ongoing</p>
              <p className="text-body opacity-40 mt-2">진행 중</p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section data-section="awards" id="awards" className="section section-white py-40 relative overflow-hidden">
        <div className="animated-gradient animated-gradient-light"></div>
        <div className="container relative z-10">
          <p className="text-caption opacity-40 mb-8 fade-up">Awards 2025</p>
          <h2 className="title-section mb-20">
            <span className="split-line"><span>3관왕</span></span>
          </h2>
          <div className="space-y-0">
            <div className="list-row list-row-dark">
              <div><h3 className="title-medium">최우수상 (대상)</h3><p className="text-body opacity-50 mt-2">실감미디어경진대회</p></div>
              <div className="text-right"><p className="text-caption opacity-40">판타지아</p><p className="text-body opacity-30 mt-1">금융교육게임</p></div>
            </div>
            <div className="list-row list-row-dark">
              <div><h3 className="title-medium">교육부장관상</h3><p className="text-body opacity-50 mt-2">COSHOW 실감미디어</p></div>
              <div className="text-right"><p className="text-caption opacity-40">교육부</p><p className="text-body opacity-30 mt-1">더블 수상</p></div>
            </div>
            <div className="list-row list-row-dark border-b-0">
              <div><h3 className="title-medium">우수 학술연구 장려상</h3><p className="text-body opacity-50 mt-2">고미의 심리상담 섬</p></div>
              <div className="text-right"><p className="text-caption opacity-40">아시아휴먼서비스학회</p><p className="text-body opacity-30 mt-1">학술적 가치 인정</p></div>
            </div>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="fade-up">
              <p className="text-caption opacity-40 mb-6">입찰 / 외주 성과</p>
              <div className="space-y-4">
                <p className="text-body opacity-60">하반기 5건 제안 작성 및 수주</p>
                <p className="text-body opacity-60">신규 고객: 대구한의대학교 콘텐츠 용역</p>
                <p className="text-body opacity-60">지오멕스소프트 디지털트윈 모델링 외주</p>
              </div>
            </div>
            <div className="fade-up">
              <p className="text-caption opacity-40 mb-6">대학 파트너십</p>
              <p className="text-body opacity-60">경희대 / 중앙대 / 건국대 / 계원예대 / 한양대 / 한신대 / 대구한의대</p>
              <p className="text-body opacity-40 mt-4">7개 대학 파트너십 체결</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Expansion */}
      <section data-section="expansion" className="section section-black py-40">
        <div className="container">
          <p className="text-caption opacity-50 mb-8 fade-up">Business Expansion</p>
          <h2 className="title-section mb-16">
            <span className="split-line"><span>사업 영역 확장</span></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            <div className="fade-up">
              <p className="text-caption opacity-30 mb-4">과거</p>
              <h3 className="title-medium">메타버스 플랫폼</h3>
              <p className="text-body opacity-50 mt-4">XR 교육 콘텐츠</p>
            </div>
            <div className="fade-up">
              <p className="text-caption opacity-30 mb-4">2025</p>
              <h3 className="title-medium">+ AI/에너지 솔루션</h3>
              <p className="text-body opacity-50 mt-4">+ 데이터센터 자동화<br />+ 산학협력 확대</p>
            </div>
            <div className="fade-up">
              <p className="text-caption opacity-30 mb-4">2026~</p>
              <h3 className="title-medium">SDK 생태계</h3>
              <p className="text-body opacity-50 mt-4">상업화 추진<br />글로벌 확장</p>
            </div>
          </div>
          <div className="h-[1px] bg-white/10 w-full my-20 line-reveal"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            <div className="fade-up"><p className="text-caption opacity-30 mb-3">VIVEN</p><p className="text-body opacity-60">플랫폼 고도화 → SDK 생태계 구축</p></div>
            <div className="fade-up"><p className="text-caption opacity-30 mb-3">AI/LLM</p><p className="text-body opacity-60">데이터센터 자동제어 → 상업화 추진</p></div>
            <div className="fade-up"><p className="text-caption opacity-30 mb-3">XR 교육</p><p className="text-body opacity-60">금융, 심리, 한의학, 문화</p></div>
            <div className="fade-up"><p className="text-caption opacity-30 mb-3">산학협력</p><p className="text-body opacity-60">6개 대학 파트너십</p></div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section data-section="team" id="team" className="section section-white py-40">
        <div className="container">
          <p className="text-caption opacity-40 mb-8 fade-up">PART 2. TEAM</p>
          <h2 className="title-section mb-20">
            <span className="split-line"><span>연구개발팀</span></span>
          </h2>
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-5">
              <h3 className="title-large text-black fade-up">Team<br />Composition</h3>
              <p className="text-body opacity-50 mt-4 fade-up">다양한 전문성을 갖춘 팀</p>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <div className="list-row list-row-dark"><span className="text-body">개발자</span><p className="text-body opacity-50 mt-1">Unity, 백엔드, AI/ML</p></div>
              <div className="list-row list-row-dark"><span className="text-body">디자이너</span><p className="text-body opacity-50 mt-1">3D 모델링, UI/UX</p></div>
              <div className="list-row list-row-dark"><span className="text-body">기획</span><p className="text-body opacity-50 mt-1">콘텐츠 기획, 사업 개발</p></div>
              <div className="list-row list-row-dark border-b-0"><span className="text-body">운영</span><p className="text-body opacity-50 mt-1">PM, 일정/품질 관리</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* VIVEN Platform */}
      <section data-section="viven" className="section section-black py-40 relative overflow-hidden">
        <div className="animated-gradient animated-gradient-dark"></div>
        <div className="container relative z-10">
          <p className="text-caption opacity-50 mb-8 fade-up">Platform</p>
          <h2 className="title-section mb-8"><span className="split-line"><span>VIVEN</span></span></h2>
          <p className="title-medium opacity-60 mb-20 fade-up">자체 개발 멀티플랫폼 메타버스</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="fade-up"><p className="text-caption opacity-50">경희대</p></div>
            <div className="fade-up"><p className="text-caption opacity-50">중앙대</p></div>
            <div className="fade-up"><p className="text-caption opacity-50">건국대</p></div>
            <div className="fade-up"><p className="text-caption opacity-50">한신대</p></div>
          </div>
          <div className="h-[1px] bg-white/10 w-full my-12 line-reveal"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="fade-up"><p className="text-caption opacity-50 mb-2">XR ↔ PC 전환</p><p className="text-body opacity-30">크로스 플랫폼</p></div>
            <div className="fade-up"><p className="text-caption opacity-50 mb-2">OpenXR</p><p className="text-body opacity-30">Quest, Pico, Vive</p></div>
            <div className="fade-up"><p className="text-caption opacity-50 mb-2">VRM 아바타</p><p className="text-body opacity-30">표준 3D 아바타</p></div>
            <div className="fade-up"><p className="text-caption opacity-50 mb-2">Lua SDK</p><p className="text-body opacity-30">JIT Compiler</p></div>
            <div className="fade-up"><p className="text-caption opacity-50 mb-2">자체 서버 DTS</p><p className="text-body opacity-30">고성능 인프라</p></div>
          </div>
          <div className="mt-20 p-8 border border-white/10 fade-up">
            <p className="text-caption opacity-50 mb-8">2025년 고도화</p>
            <p className="text-body opacity-60">SDK Wiki 구축 (wiki.viven.app) · 콘텐츠 개발 워크숍 · 레벨디자인 워크숍</p>
            <p className="text-body opacity-40 mt-4 italic">"SDK Wiki는 외부 개발자들이 VIVEN 콘텐츠를 직접 만들 수 있도록 한 첫 시도. 2026년 해커톤으로 확장 예정!"</p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section data-section="tech" className="section section-white py-40">
        <div className="container">
          <p className="text-caption opacity-40 mb-8 fade-up">Technology</p>
          <h2 className="title-section mb-20"><span className="split-line"><span>기술 스택</span></span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="fade-up">
              <p className="text-caption opacity-40 mb-6">게임 엔진</p>
              <p className="title-medium">Unity3D</p>
              <p className="text-body opacity-50 mt-2">XR Interaction Toolkit<br />HDRP/URP<br />OpenXR</p>
              <p className="text-body opacity-30 mt-4">Unreal Engine 4</p>
            </div>
            <div className="fade-up">
              <p className="text-caption opacity-40 mb-6">XR 기술</p>
              <p className="title-medium">OpenXR</p>
              <p className="text-body opacity-50 mt-2">멀티플랫폼<br />Hand Tracking<br />Haptic 장비 연동</p>
            </div>
            <div className="fade-up">
              <p className="text-caption opacity-40 mb-6">AI/ML</p>
              <p className="title-medium">Transformer</p>
              <p className="text-body opacity-50 mt-2">온도 예측 모델<br />LLM 자동제어<br />Pose Estimation</p>
            </div>
            <div className="fade-up">
              <p className="text-caption opacity-40 mb-6">모델링/디자인</p>
              <p className="title-medium">Blender</p>
              <p className="text-body opacity-50 mt-2">Substance<br />Photoshop</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Header */}
      <section data-section="projects" id="projects" className="section section-black py-40">
        <div className="container">
          <p className="text-caption opacity-50 mb-8 fade-up">PART 3. PROJECTS</p>
          <h2 className="title-section">
            <span className="split-line"><span>9 COMPLETED</span></span>
            <br />
            <span className="split-line"><span>7 ONGOING</span></span>
          </h2>
        </div>
      </section>

      {/* Project 1: Fantasia */}
      <section data-section="project-1" className="section section-white py-40">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5 flex flex-col">
              {/* 왼쪽 상단: 타이틀 */}
              <div className="mb-8">
                <p className="text-caption opacity-40 mb-8 fade-up">01</p>
                <h3 className="title-project mb-4 fade-up">판타지아</h3>
                <p className="title-medium opacity-60 fade-up">금융교육게임</p>
                <p className="text-caption opacity-40 mt-8 fade-up">🏆 최우수상 + 교육부장관상</p>
              </div>
              {/* 왼쪽 하단: 썸네일 */}
              <div className="mt-auto project-thumbnail">
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src="/images/projects/fantasia/fantasia-12.jpg"
                    alt="판타지아 - 금융교육게임"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-6 project-details">
              <div className="fade-up"><p className="text-caption opacity-40 mb-2">기간</p><p className="text-body opacity-60">2025.06.03 ~ 06.17 (약 2주)</p></div>
              <div className="fade-up"><p className="text-caption opacity-40 mb-2">클라이언트</p><p className="text-body opacity-60">경희대학교 / 금융감독원</p></div>
              <div className="fade-up"><p className="text-caption opacity-40 mb-2">플랫폼</p><p className="text-body opacity-60">VIVEN 메타버스</p></div>
              <div className="h-[1px] bg-black/10 w-full my-8 line-reveal"></div>
              <p className="text-body opacity-60 fade-up">'마법이 존재하는 섬나라' 세계관에서 대학생/청소년이 자산관리, 투자, 대출, 부동산, 사업 운영 등 금융 개념을 체험</p>
              <div className="p-6 bg-black/5 fade-up">
                <p className="text-body opacity-50 italic">"딱딱한 금융교육을 어떻게 재미있게 만들까?"라는 고민에서 시작. '마법 섬나라' 세계관으로 몰입도를 높이고, 실제 금융 시나리오를 게임 미션으로 녹여냄. 결과: 더블 수상이라는 쾌거!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fantasia Gallery */}
      <section data-section="project-1-gallery" className="gallery-section">
        <div className="gallery-mosaic">
          <img src="/images/projects/fantasia/fantasia-01.png" alt="판타지아" className="span-2x2" />
          <img src="/images/projects/fantasia/fantasia-02.png" alt="판타지아" />
          <img src="/images/projects/fantasia/fantasia-03.png" alt="판타지아" />
          <img src="/images/projects/fantasia/fantasia-04.png" alt="판타지아" className="span-2x1" />
          <img src="/images/projects/fantasia/fantasia-05.png" alt="판타지아" />
          <img src="/images/projects/fantasia/fantasia-06.png" alt="판타지아" />
          <img src="/images/projects/fantasia/fantasia-07.png" alt="판타지아" />
          <img src="/images/projects/fantasia/fantasia-08.png" alt="판타지아" className="span-1x2" />
          <img src="/images/projects/fantasia/fantasia-09.png" alt="판타지아" />
          <img src="/images/projects/fantasia/fantasia-10.png" alt="판타지아" />
          <img src="/images/projects/fantasia/fantasia-11.png" alt="판타지아" />
          <img src="/images/projects/fantasia/fantasia-12.jpg" alt="판타지아" />
        </div>
        <div className="gallery-title">
          <h3>FANTASIA</h3>
          <p>금융교육게임 · 최우수상</p>
        </div>
      </section>

      {/* Project 2: Psychology Island */}
      <section data-section="project-2" className="section section-black py-40">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5 flex flex-col">
              {/* 왼쪽 상단: 타이틀 */}
              <div className="mb-8">
                <p className="text-caption opacity-50 mb-8 fade-up">02</p>
                <h3 className="title-project mb-4 fade-up">고미의<br />심리상담 섬</h3>
                <p className="title-medium opacity-60 fade-up">한신대 BA 심리상담</p>
                <p className="text-caption opacity-50 mt-8 fade-up">🏆 학술연구 장려상</p>
              </div>
              {/* 왼쪽 하단: 썸네일 */}
              <div className="mt-auto project-thumbnail">
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src="/images/projects/psychology/psychology-35.jpg"
                    alt="고미의 심리상담 섬"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-6 project-details">
              <div className="fade-up"><p className="text-caption opacity-50 mb-2">기간</p><p className="text-body opacity-60">2025.06.17 ~ 08.13 (2개월)</p></div>
              <div className="fade-up">
                <p className="text-caption opacity-50 mb-2">5개 테마 섬 구성</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <p className="text-body opacity-40">1. 상담 섬</p><p className="text-body opacity-40">2. 갈림길 섬</p>
                  <p className="text-body opacity-40">3. OX퀴즈 섬</p><p className="text-body opacity-40">4. 가치과녁 섬</p>
                  <p className="text-body opacity-40">5. 보물찾기 섬</p>
                </div>
              </div>
              <div className="h-[1px] bg-white/10 w-full my-8 line-reveal"></div>
              <div className="fade-up">
                <p className="text-caption opacity-50 mb-4">주요 기능</p>
                <div className="space-y-3">
                  <p className="text-body opacity-60"><span className="opacity-40">관리자 패널</span> — 학생 이동/착석, 역할 변경, 배지 수여, 회기 전환</p>
                  <p className="text-body opacity-60"><span className="opacity-40">학습자 인터랙션</span> — 활동기록장 팝업, 역할 라벨 UI, 콘텐츠 자동 인식</p>
                  <p className="text-body opacity-60"><span className="opacity-40">몰입형 디자인</span> — 자연 기반 저자극 색상, 부드러운 오브젝트</p>
                </div>
              </div>
              <div className="fade-up"><p className="text-caption opacity-50 mb-2">지원환경</p><p className="text-body opacity-60">PC/VR (메타버스) · 모바일 (Android/iOS)</p></div>
              <div className="p-6 border border-white/10 fade-up">
                <p className="text-body opacity-50 italic">행동활성화(BA) 기법을 메타버스로 구현. 우울한 청소년들이 5개 테마 섬을 탐색하며 심리적 변화를 체험. 학술대회 발표 → 장려상 수상! 청소년센터/상담센터 B2B 확장 검토 중.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Psychology Gallery */}
      <section data-section="project-2-gallery" className="gallery-section">
        <div className="gallery-mosaic">
          <img src="/images/projects/psychology/psychology-33.jpg" alt="심리상담 섬" className="span-2x2" />
          <img src="/images/projects/psychology/psychology-21.jpg" alt="심리상담 섬" />
          <img src="/images/projects/psychology/psychology-22.jpg" alt="심리상담 섬" />
          <img src="/images/projects/psychology/psychology-20.jpg" alt="심리상담 섬" className="span-2x1" />
          <img src="/images/projects/psychology/psychology-37.jpg" alt="심리상담 섬" />
          <img src="/images/projects/psychology/psychology-38.jpg" alt="심리상담 섬" />
          <img src="/images/projects/psychology/psychology-01.png" alt="심리상담 섬" />
          <img src="/images/projects/psychology/psychology-05.png" alt="심리상담 섬" className="span-1x2" />
          <img src="/images/projects/psychology/psychology-10.png" alt="심리상담 섬" />
          <img src="/images/projects/psychology/psychology-15.png" alt="심리상담 섬" />
          <img src="/images/projects/psychology/psychology-31.jpg" alt="심리상담 섬" />
          <img src="/images/projects/psychology/psychology-36.jpg" alt="심리상담 섬" />
        </div>
        <div className="gallery-title">
          <h3>PSYCHOLOGY</h3>
          <p>고미의 심리상담 섬 · 5개 테마</p>
        </div>
      </section>

      {/* Project 3: AI Creative Education */}
      <section data-section="project-3" className="section section-white py-40">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5 flex flex-col">
              {/* 왼쪽 상단: 타이틀 */}
              <div className="mb-8">
                <p className="text-caption opacity-40 mb-8 fade-up">03</p>
                <h3 className="title-project mb-4 fade-up">AI 창의<br />교육콘텐츠</h3>
                <p className="title-medium opacity-60 fade-up">경희대학교</p>
              </div>
              {/* 왼쪽 하단: 썸네일 */}
              <div className="mt-auto project-thumbnail">
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src="/images/projects/creative-edu/creative-20.png"
                    alt="AI 창의 교육콘텐츠"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-6 project-details">
              <div className="fade-up"><p className="text-caption opacity-40 mb-2">기간</p><p className="text-body opacity-60">2025.09.11 ~ 12.31</p></div>
              <div className="fade-up"><p className="text-caption opacity-40 mb-2">목표</p><p className="text-body opacity-60">해외 학생 대상 한국 역사/문화 체험</p></div>
              <div className="h-[1px] bg-black/10 w-full my-8 line-reveal"></div>
              <div className="fade-up">
                <p className="text-caption opacity-40 mb-4">5종 테마 월드</p>
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-body opacity-60">한국 골목길</span><span className="text-body opacity-40">레트로</span></div>
                  <div className="flex justify-between"><span className="text-body opacity-60">광장</span><span className="text-body opacity-40">전통+현대</span></div>
                  <div className="flex justify-between"><span className="text-body opacity-60">판문점</span><span className="text-body opacity-40">긴장감</span></div>
                  <div className="flex justify-between"><span className="text-body opacity-60">낙안읍성</span><span className="text-body opacity-40">화사함</span></div>
                  <div className="flex justify-between"><span className="text-body opacity-60">서울역</span><span className="text-body opacity-40">세련됨</span></div>
                </div>
              </div>
              <div className="fade-up">
                <p className="text-caption opacity-40 mb-4">핵심 작업</p>
                <div className="space-y-2">
                  <p className="text-body opacity-50">공간별 조명 및 포스트 프로세싱 디자인</p>
                  <p className="text-body opacity-50">고품질 3D 환경 모델링 및 텍스처</p>
                  <p className="text-body opacity-50">메타버스용 3D 에셋 최적화</p>
                </div>
              </div>
              <div className="p-6 bg-black/5 fade-up">
                <p className="text-body opacity-50 italic">해외 학생들이 "한국에 가보고 싶다"고 느끼게 만드는 것이 목표. 시대와 장소의 고유한 분위기를 재현. AI 에이전트 도입을 위한 확장 설계 완료!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Education Gallery */}
      <section data-section="project-3-gallery" className="gallery-section">
        <div className="gallery-mosaic">
          <img src="/images/projects/creative-edu/creative-15.png" alt="창의교육" className="span-2x2" />
          <img src="/images/projects/creative-edu/creative-01.png" alt="창의교육" />
          <img src="/images/projects/creative-edu/creative-05.png" alt="창의교육" />
          <img src="/images/projects/creative-edu/creative-25.png" alt="창의교육" className="span-2x1" />
          <img src="/images/projects/creative-edu/creative-30.png" alt="창의교육" />
          <img src="/images/projects/creative-edu/creative-35.png" alt="창의교육" />
          <img src="/images/projects/creative-edu/creative-10.png" alt="창의교육" />
          <img src="/images/projects/creative-edu/creative-40.png" alt="창의교육" className="span-1x2" />
          <img src="/images/projects/creative-edu/creative-18.png" alt="창의교육" />
          <img src="/images/projects/creative-edu/creative-22.png" alt="창의교육" />
          <img src="/images/projects/creative-edu/creative-28.png" alt="창의교육" />
          <img src="/images/projects/creative-edu/creative-32.png" alt="창의교육" />
        </div>
        <div className="gallery-title">
          <h3>CREATIVE EDU</h3>
          <p>AI 창의 교육콘텐츠 · 5종 테마 월드</p>
        </div>
      </section>

      {/* Project 4: ACU-DEX */}
      <section data-section="project-4" className="section section-black py-40">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5 flex flex-col">
              {/* 왼쪽 상단: 타이틀 */}
              <div className="mb-8">
                <p className="text-caption opacity-50 mb-8 fade-up">04</p>
                <h3 className="title-project mb-4 fade-up">ACU-DEX<br />침술 VR</h3>
                <p className="title-medium opacity-60 fade-up">대구한의대학교</p>
                <p className="text-caption opacity-50 mt-8 fade-up">K-MEDI 실크로드</p>
              </div>
              {/* 왼쪽 하단: 유튜브 영상 자리 */}
              <div className="mt-auto project-thumbnail">
                <div className="relative overflow-hidden rounded-lg shadow-2xl bg-white/5 aspect-video flex items-center justify-center">
                  {/* TODO: 유튜브 링크로 교체 */}
                  <div className="text-center">
                    <p className="text-caption opacity-50">▶ 영상 준비 중</p>
                    <p className="text-body opacity-30 mt-2">YouTube Embed</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-6 project-details">
              <div className="fade-up"><p className="text-caption opacity-50 mb-2">기간</p><p className="text-body opacity-60">2025.11.20 ~ 2026.01.31</p></div>
              <div className="fade-up"><p className="text-caption opacity-50 mb-2">목적</p><p className="text-body opacity-60">해외 한의학 교육</p></div>
              <div className="h-[1px] bg-white/10 w-full my-8 line-reveal"></div>
              <div className="fade-up"><p className="text-caption opacity-50 mb-8">주요 기능</p><p className="text-body opacity-60">VR 기반 침술 교육 시뮬레이션 · NPC 환자 문진 시스템 · 시나리오 기반 학습 (견비통, 요통 등) · 혈자리 위치/깊이/각도 표시</p></div>
              <div className="fade-up"><p className="text-caption opacity-50 mb-2">활용 계획</p><p className="text-body opacity-60">2026년 1학기 선택과목 수업 (30-40명)</p></div>
              <div className="p-6 border border-white/10 fade-up">
                <p className="text-body opacity-50 italic">한의학이라는 전문 분야를 VR로 구현하는 도전. 실제 침술 교수님과 수차례 미팅하며 혈자리 위치, 각도를 정밀하게 반영. "해외에 한의학을 알린다"는 K-MEDI 사업의 의미 있는 첫 걸음!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project 5: Haptic */}
      <section data-section="project-5" className="section section-white py-40">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5 flex flex-col">
              {/* 왼쪽 상단: 타이틀 */}
              <div className="mb-8">
                <p className="text-caption opacity-40 mb-8 fade-up">05</p>
                <h3 className="title-project mb-4 fade-up">콘텐츠진흥원<br />햅틱 과제</h3>
                <p className="title-medium opacity-60 fade-up">3차년도 완료</p>
              </div>
              {/* 왼쪽 하단: 썸네일 */}
              <div className="mt-auto project-thumbnail">
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src="/images/projects/kfood/kfood-07.jpg"
                    alt="K-FOOD RUSH 햅틱"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-6 project-details">
              <div className="fade-up"><p className="text-caption opacity-40 mb-2">기간</p><p className="text-body opacity-60">2023.10 ~ 2025.10 (3년)</p></div>
              <div className="fade-up"><p className="text-caption opacity-40 mb-2">연구 내용</p><p className="text-body opacity-60">햅틱 장갑 인터페이스 개발 · Unity3D SDK 및 Plugin 개발 · 가야금 연주 VR 콘텐츠 · K-food Rush 요리 콘텐츠</p></div>
              <div className="h-[1px] bg-black/10 w-full my-8 line-reveal"></div>
              <div className="fade-up"><p className="text-caption opacity-40 mb-2">성과물</p><p className="text-body opacity-60">SDK 개발 보고서 · 연구 노트 체계화 · IRIS 성과 등록 · K-food Rush 상업화 기획 중</p></div>
              <div className="p-6 bg-black/5 fade-up">
                <p className="text-body opacity-50 italic">3년간의 연구과제가 드디어 마무리! 햅틱 장갑으로 가야금을 연주하고, 요리를 만드는 VR 콘텐츠 완성. K-food Rush는 상업화까지 이어질 가능성!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* K-FOOD RUSH Gallery */}
      <section data-section="project-5-gallery" className="gallery-section">
        <div className="gallery-mosaic">
          <img src="/images/projects/kfood/kfood-01.jpg" alt="K-FOOD RUSH" className="span-2x2" />
          <img src="/images/projects/kfood/kfood-02.png" alt="K-FOOD RUSH" />
          <img src="/images/projects/kfood/kfood-08.png" alt="K-FOOD RUSH" />
          <img src="/images/projects/kfood/kfood-10.png" alt="K-FOOD RUSH" className="span-2x1" />
          <img src="/images/projects/kfood/kfood-12.png" alt="K-FOOD RUSH" />
          <img src="/images/projects/kfood/kfood-14.png" alt="K-FOOD RUSH" />
          <img src="/images/projects/kfood/kfood-03.jpg" alt="K-FOOD RUSH" />
          <img src="/images/projects/kfood/kfood-16.png" alt="K-FOOD RUSH" className="span-1x2" />
          <img src="/images/projects/kfood/kfood-04.jpg" alt="K-FOOD RUSH" />
          <img src="/images/projects/kfood/kfood-05.jpg" alt="K-FOOD RUSH" />
          <img src="/images/projects/kfood/kfood-17.png" alt="K-FOOD RUSH" />
          <img src="/images/projects/kfood/kfood-18.png" alt="K-FOOD RUSH" />
        </div>
        <div className="gallery-title">
          <h3>K-FOOD RUSH</h3>
          <p>햅틱 요리 콘텐츠 · 상업화 추진</p>
        </div>
      </section>

      {/* Project 6-9: Smaller Projects */}
      <section data-section="project-etc" className="section section-black py-40">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20">
            <div className="fade-up">
              <p className="text-caption opacity-50 mb-8">06</p>
              <h3 className="title-medium mb-4">K-FOOD RUSH</h3>
              <p className="text-body opacity-50">요리 햅틱 콘텐츠</p>
              <p className="text-body opacity-40 mt-4">2025.09 ~ 10월 · 콘텐츠진흥원 문화산업 · 저작권 구미인증 진행 중 · 상업화 추진</p>
            </div>
            <div className="fade-up">
              <p className="text-caption opacity-50 mb-8">07</p>
              <h3 className="title-medium mb-4">버튜버 토크 콘서트</h3>
              <p className="text-body opacity-50">경희대학교</p>
              <p className="text-body opacity-40 mt-4">메타버스 내 토크 콘서트 전용 강연장 구축. 고품질 3D 아바타 제작. VRM 변환, VSeeFace 연동.</p>
            </div>
            <div className="fade-up">
              <p className="text-caption opacity-50 mb-8">08</p>
              <h3 className="title-medium mb-4">디지털 트윈</h3>
              <p className="text-body opacity-50">경희대 국제캠퍼스</p>
              <p className="text-body opacity-40 mt-4">캠퍼스 투어 콘텐츠. 우정원 및 X-Space, XR Studio 모델링.</p>
            </div>
            <div className="fade-up">
              <p className="text-caption opacity-50 mb-8">09</p>
              <h3 className="title-medium mb-4">RFS 자동제어</h3>
              <p className="text-body opacity-50">하남 데이터센터</p>
              <p className="text-body opacity-40 mt-4">트랜스포머 모델 · LLM 기반 서버실 자동제어. 상업화 추진 중!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section data-section="events" className="section section-white py-40">
        <div className="container">
          <p className="text-caption opacity-40 mb-8 fade-up">Events</p>
          <h2 className="title-section mb-16"><span className="split-line"><span>2025년 주요 행사</span></span></h2>
          <div className="space-y-0">
            <div className="event-row"><span className="event-date">07-11</span><span className="event-name">크리에이터 미디어 산업대전</span><span className="event-info">인천</span></div>
            <div className="event-row"><span className="event-date">08-21</span><span className="event-name">가상융합혁신인재 심포지엄</span><span className="event-info">—</span></div>
            <div className="event-row"><span className="event-date">10-18</span><span className="event-name">중앙대 We-meet 본사 탐방</span><span className="event-info">120분</span></div>
            <div className="event-row"><span className="event-date">10-21</span><span className="event-name">건국대 메타버스 스튜디오 시연</span><span className="event-info">—</span></div>
            <div className="event-row"><span className="event-date">11-12</span><span className="event-name">대한민국 가상융합대전 KMF</span><span className="event-info">—</span></div>
            <div className="event-row"><span className="event-date">11-21</span><span className="event-name">대한민국 AI교육 페스티벌</span><span className="event-info">—</span></div>
            <div className="event-row event-highlight"><span className="event-date">11-26</span><span className="event-name">CO-SHOW 실감미디어</span><span className="event-info font-bold">장관상</span></div>
            <div className="event-row border-b-0"><span className="event-date">12-22</span><span className="event-name">경희대 확산프로그램 워크숍 & 해커톤</span><span className="event-info">레벨디자인</span></div>
          </div>
        </div>
      </section>

      {/* Events Gallery */}
      <section data-section="events-gallery" className="gallery-section">
        <div className="gallery-mosaic">
          <img src="/images/events/event-01.jpg" alt="행사" className="span-2x2" />
          <img src="/images/events/event-02.jpg" alt="행사" />
          <img src="/images/events/event-03.jpg" alt="행사" />
          <img src="/images/events/event-04.jpg" alt="행사" className="span-2x1" />
          <img src="/images/events/event-05.jpg" alt="행사" />
          <img src="/images/events/event-06.jpg" alt="행사" />
          <img src="/images/events/event-07.jpg" alt="행사" />
          <img src="/images/events/event-08.jpg" alt="행사" className="span-1x2" />
          <img src="/images/events/event-09.jpg" alt="행사" />
          <img src="/images/events/event-10.jpg" alt="행사" />
        </div>
        <div className="gallery-title">
          <h3>EVENTS 2025</h3>
          <p>7개 행사 운영 및 홍보</p>
        </div>
      </section>

      {/* Partnership */}
      <section data-section="partnership" className="section section-black py-40">
        <div className="container">
          <p className="text-caption opacity-50 mb-8 fade-up">Partnership</p>
          <h2 className="title-section mb-20"><span className="split-line"><span>산학협력 현황</span></span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-0">
              <div className="list-row"><div><p className="title-medium">경희대학교</p><p className="text-body opacity-50 mt-1">실감미디어사업단</p></div><p className="text-caption opacity-40">VIVEN</p></div>
              <div className="list-row"><div><p className="title-medium">중앙대학교</p><p className="text-body opacity-50 mt-1">We-meet, 본사 탐방</p></div><p className="text-caption opacity-40">VIVEN</p></div>
              <div className="list-row"><div><p className="title-medium">한신대학교</p><p className="text-body opacity-50 mt-1">BA 심리상담</p></div><p className="text-caption opacity-40">VIVEN</p></div>
            </div>
            <div className="space-y-0">
              <div className="list-row"><div><p className="title-medium">건국대학교</p><p className="text-body opacity-50 mt-1">스튜디오 시연</p></div><p className="text-caption opacity-40">VIVEN</p></div>
              <div className="list-row"><div><p className="title-medium">대구한의대</p><p className="text-body opacity-50 mt-1">침술 VR</p></div><p className="text-caption opacity-40">VR</p></div>
              <div className="list-row"><div><p className="title-medium">강릉영동대</p><p className="text-body opacity-50 mt-1">AI 메타버스 툴킷</p></div><p className="text-caption opacity-40">VIVEN</p></div>
            </div>
          </div>
          <div className="mt-20 p-8 border border-white/10 fade-up">
            <p className="text-caption opacity-50 mb-8">PBL (프로젝트 기반 학습)</p>
            <p className="text-body opacity-60">의왕시 지역 역사/설화 메타버스 콘텐츠</p>
            <p className="text-body opacity-40 mt-2">협력: 의왕시, 의왕문화원</p>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section data-section="summary" className="section section-white py-40">
        <div className="container">
          <p className="text-caption opacity-40 mb-8 fade-up">Summary</p>
          <h2 className="title-section mb-20"><span className="split-line"><span>프로젝트 현황</span></span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-caption opacity-40 mb-8 fade-up">완료 (9건)</p>
              <div className="space-y-3">
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black rounded-full"></span><p className="text-body">판타지아 (금융교육게임) — 더블 수상</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black rounded-full"></span><p className="text-body">한신대 BA 심리상담 — 학술상</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black rounded-full"></span><p className="text-body">경희대 버튜버 콜로키움 행사</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black rounded-full"></span><p className="text-body">VIVEN 플랫폼 3차 고도화</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black rounded-full"></span><p className="text-body">K-FOOD RUSH 요리 콘텐츠</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black rounded-full"></span><p className="text-body">빅데이터/실감미디어 AIB 프로젝트</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black rounded-full"></span><p className="text-body">WE-MEET 1학기/2학기</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black rounded-full"></span><p className="text-body">지오멕스소프트 디지털트윈 외주</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black rounded-full"></span><p className="text-body">7개 행사 운영 및 홍보</p></div>
              </div>
            </div>
            <div>
              <p className="text-caption opacity-40 mb-8 fade-up">진행 중 (7건)</p>
              <div className="space-y-3">
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black/30 rounded-full"></span><p className="text-body opacity-60">RFS 데이터센터 솔루션 & 상업화</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black/30 rounded-full"></span><p className="text-body opacity-60">LLM 기반 서버실 자동제어 시스템</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black/30 rounded-full"></span><p className="text-body opacity-60">경희대 창의 교육 콘텐츠</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black/30 rounded-full"></span><p className="text-body opacity-60">경희대 프로그래밍 교육 &lt;KHU1&gt;</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black/30 rounded-full"></span><p className="text-body opacity-60">대구한의대 침술 VR &lt;ACU-DEX&gt;</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black/30 rounded-full"></span><p className="text-body opacity-60">경희대 해커톤/워크샵/콜로키움</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black/30 rounded-full"></span><p className="text-body opacity-60">건국대학교 SHOWCASE</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retrospective */}
      <section data-section="retrospective" id="retrospective" className="section section-black py-40 relative overflow-hidden">
        <div className="animated-gradient animated-gradient-dark"></div>
        <div className="container relative z-10">
          <p className="text-caption opacity-50 mb-8 fade-up">PART 4. RETROSPECTIVE</p>
          <h2 className="title-section mb-20"><span className="split-line"><span>회고</span></span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="fade-up">
              <p className="text-caption opacity-50 mb-6">잘한 점</p>
              <div className="space-y-4">
                <p className="text-body opacity-60">3관왕 달성 (대상 + 장관상 + 학술상)</p>
                <p className="text-body opacity-60">6개 대학 파트너십 확보</p>
                <p className="text-body opacity-60">VIVEN SDK 생태계 구축</p>
                <p className="text-body opacity-60">AI/LLM 상업화 추진</p>
                <p className="text-body opacity-60">다양한 XR 콘텐츠 개발 경험</p>
              </div>
            </div>
            <div className="fade-up">
              <p className="text-caption opacity-50 mb-6">아쉬운 점</p>
              <div className="space-y-4">
                <p className="text-body opacity-40">프로젝트 관리</p><p className="text-body opacity-30 text-sm">(팀 내부 논의 필요)</p>
                <p className="text-body opacity-40">기술적 측면</p><p className="text-body opacity-30 text-sm">(팀 내부 논의 필요)</p>
                <p className="text-body opacity-40">커뮤니케이션</p><p className="text-body opacity-30 text-sm">(팀 내부 논의 필요)</p>
              </div>
            </div>
            <div className="fade-up">
              <p className="text-caption opacity-50 mb-6">2026년 목표</p>
              <div className="space-y-4">
                <p className="text-body opacity-40">사업 목표</p><p className="text-body opacity-30 text-sm">(팀 내부 논의 필요)</p>
                <p className="text-body opacity-40">기술 목표</p><p className="text-body opacity-30 text-sm">(팀 내부 논의 필요)</p>
                <p className="text-body opacity-40">팀 목표</p><p className="text-body opacity-30 text-sm">(팀 내부 논의 필요)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section data-section="closing" className="section section-white py-40 relative overflow-hidden">
        <div className="container text-center relative z-10">
          <p className="text-caption opacity-40 mb-8 fade-up">PART 5. CLOSING</p>
          <TextSpotlight text="BEYOND<br/>BOUNDARIES" className="title-closing mb-8 fade-up" />
          <div className="h-[1px] bg-black/10 w-24 mx-auto my-12 line-reveal"></div>
          <p className="title-large opacity-60 max-w-[60rem] mx-auto fade-up">"경계를 넘어, 새로운 가능성을 증명한 한 해"</p>
          <div className="mt-12 space-y-2 fade-up">
            <p className="text-body opacity-50">메타버스 → AI/에너지로 영역 확장</p>
            <p className="text-body opacity-50">플랫폼 → 생태계(SDK)로 성장</p>
            <p className="text-body opacity-50">프로젝트 → 수상 + 학술적 인정</p>
          </div>
        </div>
      </section>

      {/* Thank You */}
      <section data-section="thankyou" className="section section-black py-40 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Mesh Gradient Background */}
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-50"
          style={{ background: '#000' }}
          options={{
            colors: ['#2a2a2a', '#1a1a1a', '#3d3d3d', '#0f0f0f'],
            animationSpeed: 0.2,
            seed: 1225,
            appearance: 'default',
          }}
        />
        <div className="container text-center relative z-10">
          <p className="text-caption opacity-50 mb-8 fade-up">RE:WIND 2025</p>
          <h2 className="title-hero mb-12"><span className="split-line"><span>THANK YOU</span></span></h2>
          <p className="title-medium opacity-60 fade-up">R&D팀 모두 수고하셨습니다.</p>
          <div className="mt-20 fade-up"><p className="text-caption opacity-30">TWENTYOZ R&D TEAM</p></div>
        </div>
      </section>

      {/* Q&A */}
      <section data-section="qna" className="section section-white py-40 min-h-screen flex items-center justify-center">
        <div className="container text-center">
          <p className="text-caption opacity-40 mb-8 fade-up">Q&A</p>
          <h2 className="title-section mb-8 fade-up">질문 있으신가요?</h2>
          <p className="text-body opacity-50 fade-up">발표 내용에 대해 궁금한 점이 있으시면 질문해주세요.</p>
        </div>
      </section>

    </div>
  )
}

export default App
