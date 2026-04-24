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
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%", // 애니메이션 호흡을 길게 가져감
          pin: true,
          scrub: 1,
        }
      });

      // 1. 초기 상태: 파편들을 랜덤한 위치와 각도로 흩뿌림
      fragmentsRef.current.forEach((frag) => {
        gsap.set(frag, {
          x: gsap.utils.random(-500, 500),
          y: gsap.utils.random(-300, 300),
          rotation: gsap.utils.random(-180, 180),
          opacity: 0
        });
      });

      // 2. 조립 애니메이션: 파편들이 중앙으로 모이며 선명해짐
      tl.to(fragmentsRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        stagger: 0.02,
        ease: "power2.inOut"
      })
        // 3. 반전: 배경색이 딥블랙으로 변하며 글자가 강조됨
        .to(sectionRef.current, {
          backgroundColor: "#000",
          duration: 0.5
        }, "-=0.2")
        .to(textRef.current, {
          scale: 1.1,
          filter: "drop-shadow(0 0 20px rgba(229, 9, 20, 0.5))", // 은은한 레드광
          duration: 0.5
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <EpilogueWrapper ref={sectionRef}>
      <div className="background-grid" />

      <div className="assembly-stage">
        <h1 className="main-statement" ref={textRef}>
          {/* 각 글자를 파편 객체로 분리 */}
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