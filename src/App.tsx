import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./index.css"

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title animation - scrub linked to scroll
      gsap.utils.toArray<HTMLElement>(".title-hero .split-line span").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 120, opacity: 0, rotateX: -45 },
          {
            y: 0, opacity: 1, rotateX: 0,
            scrollTrigger: {
              trigger: el.closest("section"),
              start: "top 80%",
              end: "top 20%",
              scrub: 0.5,
            }
          }
        )
      })

      // Section titles - dramatic entrance with scrub
      gsap.utils.toArray<HTMLElement>(".title-section .split-line span").forEach((el) => {
        gsap.fromTo(el,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1,
            scrollTrigger: {
              trigger: el.closest("section"),
              start: "top 85%",
              end: "top 35%",
              scrub: 0.5,
            }
          }
        )
      })

      // Fade up elements with scrub
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 60%",
              scrub: 0.5,
            }
          }
        )
      })

      // Number animations with scrub
      gsap.utils.toArray<HTMLElement>(".number-huge").forEach((el) => {
        gsap.fromTo(el,
          { scale: 0.5, opacity: 0, y: 50 },
          {
            scale: 1, opacity: 1, y: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 40%",
              scrub: 0.5,
            }
          }
        )
      })

      // Line reveal animations
      gsap.utils.toArray<HTMLElement>(".line-reveal").forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 55%",
              scrub: 0.5,
            }
          }
        )
      })

      // List row stagger with scrub
      gsap.utils.toArray<HTMLElement>(".list-row").forEach((el, i) => {
        gsap.fromTo(el,
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 70%",
              scrub: 0.3,
            }
          }
        )
      })

      // Text caption - thin weight emphasis
      gsap.utils.toArray<HTMLElement>(".text-caption").forEach((el) => {
        gsap.fromTo(el,
          { letterSpacing: "0.4em", opacity: 0 },
          {
            letterSpacing: "0.2em", opacity: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 70%",
              scrub: 0.5,
            }
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-black text-white">
      <nav className="nav">
        <div className="flex gap-12">
          <a href="#about">소개</a>
          <a href="#awards">수상</a>
          <a href="#projects">프로젝트</a>
          <a href="#team">팀</a>
        </div>
        <span>RE:WIND 2025</span>
      </nav>

      {/* Hero Title - RE:WIND 2025 */}
      <section className="section section-black min-h-screen flex items-center justify-center">
        <div className="container text-center">
          <p className="text-caption opacity-50 mb-8 fade-up">
            TWENTYOZ R&D TEAM · 2025 Annual Review
          </p>
          <h1 className="title-hero">
            <span className="split-line"><span>RE:WIND</span></span>
            <br />
            <span className="split-line"><span>2025</span></span>
          </h1>
          <div className="h-[1px] bg-white/20 w-24 mx-auto my-12 line-reveal"></div>
          <p className="text-body opacity-50 max-w-[50rem] mx-auto fade-up">
            메타버스에서 AI까지, 경계를 넘어선 한 해
          </p>
        </div>
      </section>

      {/* Opening Hook */}
      <section id="about" className="section section-white py-40">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              <p className="text-caption opacity-40 mb-6 fade-up">2025년, 우리 팀에게 일어난 일</p>
              <h2 className="title-large fade-up">14명의 팀이<br />1년 동안 만들어낸<br />성과들</h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <p className="text-body opacity-60 fade-up">
                14명의 팀이 1년 동안 3개의 상을 받고, 6개 대학과 손을 잡고, 메타버스부터 AI 자동제어까지 영역을 넓혔습니다.
              </p>
              <p className="text-body opacity-60 mt-8 fade-up">
                단순히 프로젝트를 완료한 게 아니라 우리만의 플랫폼 VIVEN을 생태계로 확장했고, 새로운 기술 영역에서 상업화 가능성을 증명했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="section section-black py-40">
        <div className="container">
          <p className="text-caption opacity-50 mb-16 text-center fade-up">PART 1. IMPACT</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="fade-up">
              <span className="number-huge">3</span>
              <p className="text-caption opacity-50 mt-4">Awards</p>
              <p className="text-body opacity-40 mt-2">대상급 2건 포함</p>
            </div>
            <div className="fade-up">
              <span className="number-huge">6</span>
              <p className="text-caption opacity-50 mt-4">Universities</p>
              <p className="text-body opacity-40 mt-2">전국 주요 대학</p>
            </div>
            <div className="fade-up">
              <span className="number-huge">14</span>
              <p className="text-caption opacity-50 mt-4">Members</p>
              <p className="text-body opacity-40 mt-2">개발/디자인/기획/운영</p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section id="awards" className="section section-white py-40">
        <div className="container">
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
        </div>
      </section>

      {/* Business Expansion */}
      <section className="section section-black py-40">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="fade-up"><p className="text-caption opacity-30 mb-2">VIVEN</p><p className="text-body opacity-60">플랫폼 고도화 → SDK 생태계 구축</p></div>
            <div className="fade-up"><p className="text-caption opacity-30 mb-2">AI/LLM</p><p className="text-body opacity-60">데이터센터 자동제어 → 상업화 추진</p></div>
            <div className="fade-up"><p className="text-caption opacity-30 mb-2">XR 교육</p><p className="text-body opacity-60">금융, 심리, 한의학, 문화</p></div>
            <div className="fade-up"><p className="text-caption opacity-30 mb-2">산학협력</p><p className="text-body opacity-60">6개 대학 파트너십</p></div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section section-white py-40">
        <div className="container">
          <p className="text-caption opacity-40 mb-8 fade-up">PART 2. TEAM</p>
          <h2 className="title-section mb-20">
            <span className="split-line"><span>연구개발팀</span></span>
          </h2>
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-5">
              <span className="number-huge text-black">14</span>
              <p className="text-caption opacity-40 mt-4 fade-up">Total Members</p>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <div className="list-row list-row-dark"><div><span className="text-body">개발자</span><p className="text-body opacity-50 mt-1">Unity, 백엔드, AI/ML</p></div><span className="title-medium">4</span></div>
              <div className="list-row list-row-dark"><div><span className="text-body">디자이너</span><p className="text-body opacity-50 mt-1">3D 모델링, UI/UX</p></div><span className="title-medium">4</span></div>
              <div className="list-row list-row-dark"><div><span className="text-body">기획</span><p className="text-body opacity-50 mt-1">콘텐츠 기획, 사업 개발</p></div><span className="title-medium">3</span></div>
              <div className="list-row list-row-dark border-b-0"><div><span className="text-body">운영</span><p className="text-body opacity-50 mt-1">PM, 일정/품질 관리</p></div><span className="title-medium">3</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* VIVEN Platform */}
      <section className="section section-black py-40">
        <div className="container">
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
      <section className="section section-white py-40">
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
      <section id="projects" className="section section-black py-40">
        <div className="container">
          <p className="text-caption opacity-50 mb-8 fade-up">PART 3. PROJECTS</p>
          <h2 className="title-section">
            <span className="split-line"><span>5 COMPLETED</span></span>
            <br />
            <span className="split-line"><span>4 ONGOING</span></span>
          </h2>
        </div>
      </section>

      {/* Project 1: Fantasia */}
      <section className="section section-white py-40">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <p className="text-caption opacity-40 mb-8 fade-up">01</p>
              <h3 className="title-section mb-4"><span className="split-line"><span>판타지아</span></span></h3>
              <p className="title-medium opacity-60 fade-up">금융교육게임</p>
              <p className="text-caption opacity-40 mt-8 fade-up">최우수상 + 교육부장관상</p>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-6">
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

      {/* Project 2: Psychology Island */}
      <section className="section section-black py-40">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <p className="text-caption opacity-50 mb-8 fade-up">02</p>
              <h3 className="title-section mb-4"><span className="split-line"><span>고미의</span></span><br /><span className="split-line"><span>심리상담 섬</span></span></h3>
              <p className="title-medium opacity-60 fade-up">한신대 BA 심리상담</p>
              <p className="text-caption opacity-50 mt-8 fade-up">학술연구 장려상</p>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-6">
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
              <div className="fade-up"><p className="text-caption opacity-50 mb-2">주요 기능</p><p className="text-body opacity-60">관리자 패널 (학생 관리, 배지 수여) · 활동기록장 시스템 · 자연 기반 저자극 디자인</p></div>
              <div className="p-6 border border-white/10 fade-up">
                <p className="text-body opacity-50 italic">심리상담 전문가와 협업하여 '행동활성화(BA)' 기법을 메타버스로 구현. 학술대회에서 발표 → 학술연구 장려상 수상! 청소년센터, 상담센터 B2B 확장 논의 중.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project 3: AI Creative Education */}
      <section className="section section-white py-40">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <p className="text-caption opacity-40 mb-8 fade-up">03</p>
              <h3 className="title-section mb-4"><span className="split-line"><span>AI 창의</span></span><br /><span className="split-line"><span>교육콘텐츠</span></span></h3>
              <p className="title-medium opacity-60 fade-up">경희대학교</p>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-6">
              <div className="fade-up"><p className="text-caption opacity-40 mb-2">기간</p><p className="text-body opacity-60">2025.09.11 ~ 12.31</p></div>
              <div className="fade-up"><p className="text-caption opacity-40 mb-2">목표</p><p className="text-body opacity-60">해외 학생 대상 한국 역사/문화 체험</p></div>
              <div className="h-[1px] bg-black/10 w-full my-8 line-reveal"></div>
              <div className="fade-up">
                <p className="text-caption opacity-40 mb-8">5종 테마 월드</p>
                <div className="space-y-4">
                  <div className="flex justify-between"><span className="text-body opacity-60">한국 골목길</span><span className="text-body opacity-40">레트로</span></div>
                  <div className="flex justify-between"><span className="text-body opacity-60">광장</span><span className="text-body opacity-40">전통+현대</span></div>
                  <div className="flex justify-between"><span className="text-body opacity-60">판문점</span><span className="text-body opacity-40">긴장감</span></div>
                  <div className="flex justify-between"><span className="text-body opacity-60">낙안읍성</span><span className="text-body opacity-40">화사함</span></div>
                  <div className="flex justify-between"><span className="text-body opacity-60">서울역</span><span className="text-body opacity-40">세련됨</span></div>
                </div>
              </div>
              <div className="p-6 bg-black/5 fade-up">
                <p className="text-body opacity-50 italic">해외 학생들이 "한국에 가보고 싶다"고 느끼게 만드는 것이 목표. 각 월드마다 고유한 분위기와 스토리를 담아냄. AI 에이전트 도입을 위한 확장 설계도 완료!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project 4: ACU-DEX */}
      <section className="section section-black py-40">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <p className="text-caption opacity-50 mb-8 fade-up">04</p>
              <h3 className="title-section mb-4"><span className="split-line"><span>ACU-DEX</span></span><br /><span className="split-line"><span>침술 VR</span></span></h3>
              <p className="title-medium opacity-60 fade-up">대구한의대학교</p>
              <p className="text-caption opacity-50 mt-8 fade-up">K-MEDI 실크로드</p>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-6">
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
      <section className="section section-white py-40">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <p className="text-caption opacity-40 mb-8 fade-up">05</p>
              <h3 className="title-section mb-4"><span className="split-line"><span>콘텐츠진흥원</span></span><br /><span className="split-line"><span>햅틱 과제</span></span></h3>
              <p className="title-medium opacity-60 fade-up">3차년도 완료</p>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-6">
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

      {/* Project 6-8: Smaller Projects */}
      <section className="section section-black py-40">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="fade-up">
              <p className="text-caption opacity-50 mb-8">06</p>
              <h3 className="title-medium mb-4">버튜버 토크 콘서트</h3>
              <p className="text-body opacity-50">경희대학교</p>
              <p className="text-body opacity-40 mt-4">메타버스 내 토크 콘서트 전용 강연장 구축. 고품질 3D 아바타 제작. VRM 변환, VSeeFace 연동.</p>
            </div>
            <div className="fade-up">
              <p className="text-caption opacity-50 mb-8">07</p>
              <h3 className="title-medium mb-4">디지털 트윈</h3>
              <p className="text-body opacity-50">경희대 국제캠퍼스</p>
              <p className="text-body opacity-40 mt-4">"경희랜드의 벚꽃 캠퍼스를 언제 어디서든" 캠퍼스 투어 콘텐츠. 우정원 및 X-Space, XR Studio 모델링.</p>
            </div>
            <div className="fade-up">
              <p className="text-caption opacity-50 mb-8">08</p>
              <h3 className="title-medium mb-4">RFS 자동제어</h3>
              <p className="text-body opacity-50">하남 데이터센터</p>
              <p className="text-body opacity-40 mt-4">트랜스포머 모델 · SPH 유체 시뮬레이션 · ACS 자동제어. 상업화 추진 중!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="section section-white py-40">
        <div className="container">
          <p className="text-caption opacity-40 mb-8 fade-up">Events</p>
          <h2 className="title-section mb-20"><span className="split-line"><span>2025년 주요 행사</span></span></h2>
          <div className="space-y-0">
            <div className="list-row list-row-dark"><div><p className="text-caption opacity-40">07-11</p><p className="text-body opacity-60">크리에이터 미디어 산업대전</p></div><p className="text-body opacity-40">인천</p></div>
            <div className="list-row list-row-dark"><div><p className="text-caption opacity-40">08-21</p><p className="text-body opacity-60">가상융합혁신인재 심포지엄</p></div><p className="text-body opacity-40">-</p></div>
            <div className="list-row list-row-dark"><div><p className="text-caption opacity-40">10-18</p><p className="text-body opacity-60">중앙대 We-meet 본사 탐방</p></div><p className="text-body opacity-40">120분</p></div>
            <div className="list-row list-row-dark"><div><p className="text-caption opacity-40">10-21</p><p className="text-body opacity-60">건국대 메타버스 스튜디오 시연</p></div><p className="text-body opacity-40">-</p></div>
            <div className="list-row list-row-dark"><div><p className="text-caption opacity-40">11-12</p><p className="text-body opacity-60">대한민국 가상융합대전 KMF</p></div><p className="text-body opacity-40">-</p></div>
            <div className="list-row list-row-dark"><div><p className="text-caption opacity-40">11-21</p><p className="text-body opacity-60">대한민국 AI교육 페스티벌</p></div><p className="text-body opacity-40">-</p></div>
            <div className="list-row list-row-dark"><div><p className="text-caption text-black">11-26</p><p className="title-medium">CO-SHOW</p></div><p className="title-medium">장관상</p></div>
            <div className="list-row list-row-dark border-b-0"><div><p className="text-caption opacity-40">12-22</p><p className="text-body opacity-60">경희대 워크숍</p></div><p className="text-body opacity-40">레벨디자인</p></div>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="section section-black py-40">
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
      <section className="section section-white py-40">
        <div className="container">
          <p className="text-caption opacity-40 mb-8 fade-up">Summary</p>
          <h2 className="title-section mb-20"><span className="split-line"><span>프로젝트 현황</span></span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-caption opacity-40 mb-8 fade-up">완료 (5건)</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black rounded-full"></span><p className="text-body">판타지아 (금융교육게임) — 수상</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black rounded-full"></span><p className="text-body">한신대 BA 심리상담 — 수상</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black rounded-full"></span><p className="text-body">경희대 버튜버 토크 콘서트</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black rounded-full"></span><p className="text-body">VIVEN 플랫폼 고도화</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black rounded-full"></span><p className="text-body">RFS 내곡동 납품</p></div>
              </div>
            </div>
            <div>
              <p className="text-caption opacity-40 mb-8 fade-up">진행 중 (4건)</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black/30 rounded-full"></span><p className="text-body opacity-60">AI 창의교육콘텐츠 (12월 완료)</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black/30 rounded-full"></span><p className="text-body opacity-60">대구한의대 침술 VR (1월 완료)</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black/30 rounded-full"></span><p className="text-body opacity-60">RFS 상업화</p></div>
                <div className="flex items-center gap-4 fade-up"><span className="w-2 h-2 bg-black/30 rounded-full"></span><p className="text-body opacity-60">K-food Rush 상업화</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retrospective */}
      <section className="section section-black py-40">
        <div className="container">
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
      <section className="section section-white py-40">
        <div className="container text-center">
          <p className="text-caption opacity-40 mb-8 fade-up">PART 5. CLOSING</p>
          <h2 className="title-hero text-black mb-8">
            <span className="split-line"><span>BEYOND</span></span><br />
            <span className="split-line"><span>BOUNDARIES</span></span>
          </h2>
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
      <section className="section section-black py-40 min-h-screen flex items-center justify-center">
        <div className="container text-center">
          <p className="text-caption opacity-50 mb-8 fade-up">RE:WIND 2025</p>
          <h2 className="title-hero mb-12"><span className="split-line"><span>THANK YOU</span></span></h2>
          <p className="title-medium opacity-60 fade-up">14명의 팀원 모두 수고하셨습니다.</p>
          <div className="mt-20 fade-up"><p className="text-caption opacity-30">TWENTYOZ R&D TEAM</p></div>
        </div>
      </section>

      {/* Q&A */}
      <section className="section section-white py-40">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              <p className="text-caption opacity-40 mb-8 fade-up">Q&A</p>
              <h2 className="title-section"><span className="split-line"><span>질문</span></span><br /><span className="split-line"><span>있으신가요?</span></span></h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <p className="text-caption opacity-40 mb-6 fade-up">예상 질문</p>
              <div className="space-y-6">
                <div className="fade-up"><p className="text-body opacity-60">VIVEN 플랫폼의 차별점은?</p></div>
                <div className="fade-up"><p className="text-body opacity-60">AI/LLM 자동제어 상업화 일정은?</p></div>
                <div className="fade-up"><p className="text-body opacity-60">2026년 산학협력 계획은?</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="scroll-hint fade-up">↓ Scroll to RE:WIND</div>
    </div>
  )
}

export default App
