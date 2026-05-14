/* eslint-disable */
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ANALYSIS_DATA = [
  {
    id: 1,
    title: "브랜드 정체성과 괴리된 비주얼 및 불균형한 정보 구조(IA)",
    desc: "정적 디자인으로 인한 브랜드 몰입도 및 유대감 저하, 정보 구조 파편화 및 링크 결손으로 인한 신뢰도 하락",
    top: "10%",
  },
  {
    id: 2,
    title: "시선 집중 저해 및 정보 위계 미확립",
    desc: "과도한 정보 배치, 모바일 환경에서의 렌더링 지연",
    top: "20%",
  },
  {
    id: 3,
    title: "제한적인 카테고리 분류 및 탐색 편의성 결여",
    desc: "탭 분류의 단순화로 인한 사용자 선택권 제약, 직관적이지 않은 명칭 사용으로 탐색 비용 증가",
    top: "40%",
  },
  {
    id: 4,
    title: "데이터 시각화의 불균형 및 정보 과부하 초래",
    desc: "텍스트 정보량 과다 및 비체계적인 레이아웃 배치, 일관성 없는 컬러 시스템으로 인한 시각적 피로도 상승",
    top: "40%",
  },
  {
    id: 5,
    title: "콘텐츠 맥락 불일치 및 전환 유도 장치 부재",
    desc: "섹션 타이틀과 실제 상품 데이터 간의 정렬성(Relevance) 부족, 프로모션(이벤트, 할인) 정보 누락으로 인한 구매 전환 기회 상실",
    top: "30%",
  },
  {
    id: 6,
    title: "비효율적인 정보 구조(IA) 및 메뉴 그룹화 부재",
    desc: "유사 맥락의 콘텐츠가 개별적으로 나열되어 불필요한 시각적 뎁스(Depth) 생성, 계층 구조 설계 미흡으로 인한 사용자 정보 인지 효율 저하",
    top: "45%",
  },
];

const BeforeSectionWrapper = styled.section`
  width: 100%;
  height: 500vh;
  background: radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000000 100%);
  position: relative;
`;

const StickyWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  pointer-events: none;
`;

const VisualStage = styled.div`
  position: relative;
  width: 1200px;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  z-index: 100;

  .mac-mockup {
    position: relative;
    width: 100%;
    z-index: 10;

    .device-img {
      width: 100%;
      height: auto;
      position: relative;
      z-index: 100;
      pointer-events: none;
      display: block;
    }

    .screen-mask {
      position: absolute;
      top: 19%;
      left: 7%;
      width: 86%;
      height: 53%;
      z-index: 50;
      overflow: hidden;
      background: #000;

      .scrolling-content {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;

        img {
          width: 100% !important;
          height: auto;
          display: block;
          filter: brightness(0.8) blur(1.5px);
        }
      }
    }
  }
`;

const DescBox = styled.div`
  position: absolute;
  width: 500px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  z-index: 150;
  opacity: 0;
  top: ${props => props.top};

  h4 {
    font-size: 1.4rem;
    color: #e50914;
    margin-bottom: 30px;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.2);
    font-weight: 400;
    line-height: 1.4;
    word-break: keep-all;
  }

  p {
    font-size: 1.2rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.8;
    word-break: keep-all;
    letter-spacing: -1px;
    word-spacing: 1px;
  }

  &.left  { left: -120px;  text-align: left; }
  &.right { right: -120px; text-align: left; }
`;

function BeforeSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const boxesRef   = useRef([]);

  useEffect(() => {
    const totalBoxes = boxesRef.current.length;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      if (contentRef.current) {
        const img = contentRef.current.querySelector('img');

        tl.to(contentRef.current, {
          y: () => {
            const renderedImgHeight = img.getBoundingClientRect().height;
            const maskHeight = contentRef.current.parentElement.offsetHeight;
            return -(renderedImgHeight - maskHeight);
          },
          ease: "none",
          duration: 1,
        }, 0);

        boxesRef.current.forEach((box, idx) => {
          if (box) {
            const appearAt    = idx * (1 / totalBoxes);
            const stayDuration = (1 / totalBoxes) * 0.8;
            const leaveAt     = appearAt + stayDuration;

            tl.to(box, { opacity: 1, y: -20, duration: 0.02, immediateRender: false }, appearAt)
              .to(box, { opacity: 0, y: -40, duration: 0.02 }, leaveAt);
          }
        });
      }
    }, sectionRef);

    // 경계 감지: before 섹션 top/bottom에서 탈출 이벤트 발사
    const onWheel = (e) => {
      const el = sectionRef.current;
      if (!el) return;
      const { offsetTop, offsetHeight } = el;
      const scroll = window.scrollY;

      // before 섹션 안에 있을 때만
      if (scroll < offsetTop - 5 || scroll > offsetTop + offsetHeight) return;

      const atTop    = scroll <= offsetTop + 5;
      const atBottom = scroll + window.innerHeight >= offsetTop + offsetHeight - 5;

      if (e.deltaY < 0 && atTop) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('section:escape', {
          detail: { direction: -1, fromId: 'before' },
        }));
      } else if (e.deltaY > 0 && atBottom) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('section:escape', {
          detail: { direction: 1, fromId: 'before' },
        }));
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      ctx.revert();
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <BeforeSectionWrapper ref={sectionRef} id="before">
      <StickyWrapper>
        <VisualStage>
          {ANALYSIS_DATA.map((item, idx) => (
            <DescBox
              key={item.id}
              top={item.top}
              className={idx % 2 === 0 ? 'left' : 'right'}
              ref={el => (boxesRef.current[idx] = el)}
            >
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </DescBox>
          ))}

          <div className="mac-mockup">
            <img src="/image/MacMockup.png" className="device-img" alt="Mac Mockup" />
            <div className="screen-mask">
              <div className="scrolling-content" ref={contentRef}>
                <img src="/image/Current-lego-capture.png" alt="Analysis" />
              </div>
            </div>
          </div>
        </VisualStage>
      </StickyWrapper>
    </BeforeSectionWrapper>
  );
}

export default BeforeSection;