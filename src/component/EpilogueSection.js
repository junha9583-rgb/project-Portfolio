import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EpilogueWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #0b0b0b; /* 초기 다크 그레이 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .background-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 1;
  }

  .assembly-stage {
    z-index: 10;
    text-align: center;
  }

  .main-statement {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: 900;
    color: #fff;
    margin-bottom: 2rem;

    .char {
      display: inline-block;
      will-change: transform, opacity;
      /* 레고 조립 느낌을 위해 약간의 입체감 부여 */
      text-shadow: 2px 2px 0px rgba(229, 9, 20, 0.3); 
    }

    .space { width: 0.3em; }
  }

  .sub-text {
    font-size: 1.1rem;
    color: #666;
    letter-spacing: 0.1em;
    opacity: 0; /* 조립 완료 전까지 숨김 */
    animation: fadeIn 1s forwards 2s; /* GSAP으로 제어해도 됨 */
  }
`;

function EpilogueSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const fragmentsRef = useRef([]);

  useEffect(() => {
    // 1. 휠 스크롤 시 튕김을 방지하기 위한 강제 위치 고정 설정
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const ctx = gsap.context(() => {
      // 2. 타임라인 설정
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: true, //
          scrub: 1, // 휠 관성과 부드럽게 동기화
          anticipatePin: 1, // 핀 고정 시점의 오차 계산 방지
          
          // 3. 휠 스크롤 문제를 잡는 핵심 옵션들
          fastScrollEnd: true,
          preventOverlaps: true, // 이전 애니메이션과 겹침 방지
          refreshPriority: 1,    // 이 섹션의 계산 우선순위를 높임
        }
      });

      fragmentsRef.current.forEach((frag) => {
        if (!frag) return;
        gsap.set(frag, {
          x: gsap.utils.random(-500, 500),
          y: gsap.utils.random(-300, 300),
          rotation: gsap.utils.random(-180, 180),
          opacity: 0
        });
      });

      tl.to(fragmentsRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        stagger: 0.02,
        ease: "power2.inOut"
      })
      .to(sectionRef.current, {
        backgroundColor: "#000",
        duration: 0.5
      }, "-=0.2")
      .to(textRef.current, {
        scale: 1.1,
        filter: "drop-shadow(0 0 20px rgba(229, 9, 20, 0.5))",
        duration: 0.5
      });
    }, sectionRef);

    // 4. 모든 섹션의 ScrollTrigger를 다시 계산하도록 유도 (중요)
    // 이전 섹션(EtcSection)의 높이가 확정된 후 계산되어야 함
    window.addEventListener("load", () => ScrollTrigger.refresh());
    
    return () => {
      ctx.revert();
      window.removeEventListener("load", () => ScrollTrigger.refresh());
    };
  }, []);

  return (
    <EpilogueWrapper ref={sectionRef} id="epilogue"> {/* id 추가 */}
      <div className="background-grid" />
      <div className="assembly-stage">
        <h1 className="main-statement" ref={textRef}>
          {"DESIGN OVER ART".split("").map((char, i) => (
            <span
              key={i}
              ref={el => fragmentsRef.current[i] = el}
              className={char === " " ? "space" : "char"}
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="sub-text">
          논리와 분석으로 완성된 정교한 설계의 힘
        </p>
      </div>
    </EpilogueWrapper>
  );
}

export default EpilogueSection;