import React, { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionWrap = styled.section`
  background: #000;
  width: 100%;
`;

const Stage = styled.div`
  width: 100%;
  height: 100vh;
  background: #000;
  position: relative;
  overflow: hidden;
`;

const CenterWrap = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GroupBefore = styled.div`
  position: absolute;
  width: min(860px, 88vw);
  z-index: 10;
  will-change: transform, opacity, filter;
`;

const GroupAfter = styled.div`
  position: absolute;
  width: min(860px, 88vw);
  z-index: 5;
  will-change: opacity;
`;

const ImgWrap = styled.div`
  position: relative;
  width: 100%;
  img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 68vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.85);
  }
`;

const ProblemLabel = styled.span`
  position: absolute;
  background: rgba(255, 255, 255, 0.05); /* 아주 투명한 화이트 */
  backdrop-filter: blur(4px); /* 뒤 배경 살짝 흐리게 */
  color: rgba(255, 255, 255, 0.9); /* 흰색이지만 불투명도를 낮춰 존재감 조절 */
  padding: 20px 30px;
  font-size: 24px;
  font-weight: 300;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3); /* 밑줄만 주어 불완전한 느낌 */
  letter-spacing: -0.02em;
  pointer-events: none;
  &.p-1 { bottom: 30%;    right: -10%; }
  &.p-2 { bottom: 22%; left: -7%; }
  &.p-3 { top: 18%;     left: -10%; }
  
  &::before { /* 앞에 작은 점을 찍어 시선 유도 */
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    background: #e50914; /* 넷플릭스 레드만 포인트로 */
    border-radius: 50%;
    margin-right: 16px;
    vertical-align: middle;
  }
`;

const DescBox = styled.div`
  position: absolute;
  width: 350px;
  padding: 30px 36px;
  background: rgba(16, 16, 16, 0.93);
  backdrop-filter: blur(6px);
  color: #fff;
  opacity: 0;
  pointer-events: none;
  will-change: opacity, transform;
  word-break: keep-all;
  h4 {
    color: #e50914;
    margin: 0 0 10px 0;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  p {
    font-size: 14px;
    color: #aaa;
    line-height: 1.5;
    margin: 0;
  }
  &.box-1 {
    border-left: 3px solid #e50914;
    border-radius: 0 4px 4px 0;
    left: -230px;
    top: 28%;
  }
  &.box-2 {
    border-left: 3px solid #e50914;
    border-radius: 0 4px 4px 0;
    right: -230px;
    top: 28%;
  }
  &.box-3 {
    width: 340px;
    border-left: 3px solid #e50914;
    border-radius: 0 4px 4px 0;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

function NetflixSection() {
  const sectionRef = useRef(null);
  const stageRef   = useRef(null);
  const beforeRef  = useRef(null);
  const afterRef   = useRef(null);

  useLayoutEffect(() => {
    // 초기 상태
    gsap.set(beforeRef.current, { opacity: 1, x: 0, scale: 1, filter: "none" });
    gsap.set(afterRef.current,  { opacity: 0, scale: 0.96 });
    gsap.set(".nf-desc-1", { x: -24, opacity: 0 });
    gsap.set(".nf-desc-2", { x:  24, opacity: 0 });
    gsap.set(".nf-desc-3", { y:  20, opacity: 0 });

    // paused 타임라인
    const tl = gsap.timeline({ paused: true })
      .to(beforeRef.current, {
        x: "-36vw",
        scale: 0.68,
        opacity: 0,
        filter: "blur(5px) brightness(0.75)",
        duration: 1,
        ease: "power2.inOut",
      })
      .to(afterRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }, "<")
      .to(".nf-desc-1", { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .to(".nf-desc-2", { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.4")
      .to(".nf-desc-3", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.4");

    // pin만 담당
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=100%",
      pin: stageRef.current,
      pinSpacing: true,
    });

    // 내부 상태
    let step = 0;       // 0: before, 1: after
    let busy = false;

    const onWheel = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      // 이 섹션이 화면에 고정돼 있을 때만 처리
      const inView = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!inView) return;

      e.preventDefault();
      if (busy) return;

      if (e.deltaY > 0) {
        if (step === 0) {
          step = 1;
          busy = true;
          tl.play();
          setTimeout(() => { busy = false; }, 1100);
        } else {
          // 다음 섹션으로
          window.dispatchEvent(new CustomEvent('section:escape', {
            detail: { direction: 1, fromId: 'netflix' },
          }));
        }
      } else {
        if (step === 1) {
          step = 0;
          busy = true;
          tl.reverse();
          setTimeout(() => { busy = false; }, 1100);
        } else {
          // 이전 섹션으로
          window.dispatchEvent(new CustomEvent('section:escape', {
            detail: { direction: -1, fromId: 'netflix' },
          }));
        }
      }
    };

    // 섹션 진입 시 step 리셋
    const onEnter = (e) => {
      if (e.detail?.sectionId === 'netflix') {
        step = 0;
        busy = false;
        tl.pause(0); // 타임라인 처음으로 리셋
        gsap.set(beforeRef.current, { opacity: 1, x: 0, scale: 1, filter: "none" });
        gsap.set(afterRef.current,  { opacity: 0, scale: 0.96 });
        gsap.set(".nf-desc-1", { x: -24, opacity: 0 });
        gsap.set(".nf-desc-2", { x:  24, opacity: 0 });
        gsap.set(".nf-desc-3", { y:  20, opacity: 0 });
      }
    };

    window.addEventListener('wheel',        onWheel, { passive: false });
    window.addEventListener('section:enter', onEnter);

    return () => {
      window.removeEventListener('wheel',        onWheel);
      window.removeEventListener('section:enter', onEnter);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <SectionWrap id="netflix" ref={sectionRef}>
      <Stage ref={stageRef}>
        <CenterWrap>
          <GroupBefore ref={beforeRef}>
            <ImgWrap>
              <img src="/image/Netflix-search-before.png" alt="Before redesign" />
              <ProblemLabel className="p-1">시각적 노이즈</ProblemLabel>
              <ProblemLabel className="p-2">경직된 탐색</ProblemLabel>
              <ProblemLabel className="p-3">텍스트 편향성</ProblemLabel>
            </ImgWrap>
          </GroupBefore>
          <GroupAfter ref={afterRef}>
            <ImgWrap>
              <img src="/image/Netflix-search-after.png" alt="After redesign" />
            </ImgWrap>
            <DescBox className="nf-desc-1 box-1">
              <h4>시각적 집중도 강화</h4>
              <p>시각적 요소를 정돈하여 텍스트 데이터에 대한 가독성 극대화</p>
            </DescBox>
            <DescBox className="nf-desc-2 box-2">
              <h4>정밀한 태그 시스템</h4>
              <p>콘텐츠의 속성을 기반으로 하여 사용자가 취향에 맞는 결과에 효율적으로 도달</p>
            </DescBox>
            <DescBox className="nf-desc-3 box-3">
              <h4>직관적인 태그 네이밍</h4>
              <p>사용자가 평소 사용하는 언어 습관을 반영한 의미론적 설계</p>
            </DescBox>
          </GroupAfter>
        </CenterWrap>
      </Stage>
    </SectionWrap>
  );
}

export default NetflixSection;