import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

const AfterSectionWrapper = styled.section`
  width: 100%;
  background-color: #000;

  .sticky-viewport {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .slide {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;
  }

  .slide.active { pointer-events: auto; }

  .slide img {
    width: 100%;
    max-width: 1400px;
    max-height: 90vh;
    object-fit: contain;
    display: block;
    filter: drop-shadow(0 0 20px rgba(255,255,255,0.2))
            drop-shadow(0 10px 40px rgba(255,255,255,0.1));
  }

  .desc-box {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(8, 8, 12, 0.82);
    backdrop-filter: blur(12px);
    border-top: 3px solid #e63946;
    padding: 18px 500px;
    display: flex;
    align-items: center;
    gap: 28px;
    z-index: 10;

    .slide-num {
      font-size: 42px;
      font-weight: 800;
      color: #e63946;
      line-height: 1;
      min-width: 52px;
      letter-spacing: -2px;
    }

    .divider {
      width: 1px;
      height: 100px;
      background: rgba(255,255,255,0.15);
      flex-shrink: 0;
    }

    .text {
      display: flex;
      align-items: center;
      gap: 28px;
      flex: 1;
      h4 {
        font-size: 30px;
        font-weight: 600;
        color: #fff;
        margin: 0 0 5px;
        word-break: keep-all;
      }
      ul {
        margin: 0;
        padding: 0 80px;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 16px;
        li {
          font-size: 20px;
          color: rgba(255,255,255,0.55);
          position: relative;
          padding-left: 20px;
          word-break: keep-all;
          &::before {
            content: "–";
            position: absolute;
            left: 0;
            color: #e63946;
          }
        }
      }
    }

    .total {
      font-size: 16px;
      color: rgba(255,255,255,0.3);
      letter-spacing: 1px;
      flex-shrink: 0;
    }
  }

  .indicator {
    position: absolute;
    right: 28px;
    top: 44%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 100;
  }

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    transition: background 0.3s, transform 0.3s;
    cursor: pointer;
  }

  .dot.active {
    background: #e63946;
    transform: scale(1.5);
  }
`;

const partData = [
  { id: 1, src: "/image/after-part1.png", title: "브릭 아이덴티티 반영",  desc: ["레고 결합 모티프를 UI에 적용", "브랜드 개성 및 몰입도 강화"] },
  { id: 2, src: "/image/after-part2.png", title: "디지털 아틀리에",       desc: ["스토리텔링형 제품 배치", "작품성을 강조한 비주얼"] },
  { id: 3, src: "/image/after-part3.png", title: "인터랙티브 요소",       desc: ["마우스 호버 시 브릭 애니메이션", "생동감 넘치는 사용자 경험"] },
  { id: 4, src: "/image/after-part4.png", title: "데이터 맥락화",         desc: ["Best/New 섹션의 명확한 구분", "사용자 탐색 피로도 감소"] },
  { id: 5, src: "/image/after-part5.png", title: "반응형 그리드",         desc: ["다양한 디바이스 최적화", "일관된 브랜드 경험 유지"] },
  { id: 6, src: "/image/after-part6.png", title: "미니멀 네비게이션",     desc: ["불필요한 노이즈 제거", "필수 정보 그룹화 재정의"] },
];

const ANIM_DURATION = 0.65;
const COOLDOWN_MS   = 800;

function AfterSection() {
  const sectionRef = useRef(null);
  const slidesRef  = useRef([]);
  const dotsRef    = useRef([]);
  const currentRef = useRef(0);
  const isAnimRef  = useRef(false);

  const goTo = (next, direction = 1) => {
    if (isAnimRef.current) return;
    const total = partData.length;
    if (next < 0 || next >= total) return;

    isAnimRef.current = true;
    const prev = currentRef.current;
    currentRef.current = next;

    dotsRef.current.forEach((dot, i) => {
      dot?.classList.toggle("active", i === next);
    });

    const slideOut = slidesRef.current[prev];
    const slideIn  = slidesRef.current[next];

    gsap.set(slideIn, { opacity: 0, y: direction > 0 ? 60 : -60 });
    slideIn.classList.add("active");

    gsap.to(slideOut, {
      opacity: 0,
      y: direction > 0 ? -60 : 60,
      duration: ANIM_DURATION,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(slideOut, { y: 0 });
        slideOut.classList.remove("active");
      },
    });

    gsap.to(slideIn, {
      opacity: 1,
      y: 0,
      duration: ANIM_DURATION,
      ease: "power2.inOut",
      onComplete: () => { isAnimRef.current = false; },
    });
  };

  useEffect(() => {
    const total = partData.length;

    gsap.set(slidesRef.current[0], { opacity: 1, y: 0 });
    slidesRef.current[0].classList.add("active");
    dotsRef.current[0]?.classList.add("active");

    // ── 진입 감지: currentIndex 동기화용 ──────────────────────────
    const enterObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.dispatchEvent(new CustomEvent('section:enter', {
            detail: { sectionId: 'after' },
          }));
        }
      },
      { threshold: 0, rootMargin: '0px 0px -99% 0px' }
    );
    enterObserver.observe(sectionRef.current);

    let lastWheel = 0;

    const onWheel = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const inView = rect.top <= 0 && rect.bottom >= window.innerHeight;
      if (!inView) return;

      const now       = Date.now();
      const cur       = currentRef.current;
      const goingDown = e.deltaY > 0;
      const atFirst   = cur === 0;
      const atLast    = cur === total - 1;

      if (atFirst && !goingDown) {
        window.dispatchEvent(new CustomEvent('section:escape', {
          detail: { direction: -1, fromId: 'after' },
        }));
        return;
      }
      if (atLast && goingDown) {
        window.dispatchEvent(new CustomEvent('section:escape', {
          detail: { direction: 1, fromId: 'after' },
        }));
        return;
      }

      e.preventDefault();
      if (now - lastWheel < COOLDOWN_MS) return;
      lastWheel = now;
      goTo(cur + (goingDown ? 1 : -1), goingDown ? 1 : -1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
      enterObserver.disconnect();
    };
  }, []);

  return (
    <AfterSectionWrapper id="after" ref={sectionRef}>
      <div style={{ height: "100vh" }}>
        <div className="sticky-viewport">
          {partData.map((part, i) => (
            <div
              key={part.id}
              className="slide"
              ref={el => slidesRef.current[i] = el}
              style={{ zIndex: i + 1 }}
            >
              <img src={part.src} alt={part.title} />
              <div className="desc-box">
                <span className="slide-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="divider" />
                <div className="text">
                  <h4>{part.title}</h4>
                  <ul>
                    {part.desc.map((line, j) => <li key={j}>{line}</li>)}
                  </ul>
                </div>
                <span className="total">/ {String(partData.length).padStart(2, "0")}</span>
              </div>
            </div>
          ))}

          <div className="indicator">
            {partData.map((_, i) => (
              <div
                key={i}
                className="dot"
                ref={el => dotsRef.current[i] = el}
                onClick={() => goTo(i, i > currentRef.current ? 1 : -1)}
              />
            ))}
          </div>
        </div>
      </div>
    </AfterSectionWrapper>
  );
}

export default AfterSection;