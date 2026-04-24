/* eslint-disable */
import React, { useRef } from "react";
import styled from "styled-components";

// 1. 스타일 정의는 함수 "바깥"에 둡니다. (여기선 Ref를 쓰지 않습니다)
const BeforeSectionWrapper = styled.section`
  width: 100%;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
  position: relative;

  .sticky-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .visual-stage {
    position: relative;
    width: 1200px;
    height: 800px;
  }

  .desc-box {
    position: absolute;
    width: 350px;
    padding: 24px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    z-index: 10;
    opacity: 0; /* 초기값 0 */
    
    h4 { font-size: 1.1rem; color: #fff; margin-bottom: 12px; }
    ul { list-style: none; li { font-size: 0.9rem; color: #ccc; } }
  }

  .left { left: -400px; }
  .right { right: -400px; }
  .point-1 { top: 10%; }
  .point-2 { top: 15%; }
  .point-3 { top: 40%; }
  .point-4 { top: 45%; }
  .point-5 { top: 70%; }
  .point-6 { top: 75%; }

  .mac-mockup {
    position: relative;
    width: 100%;
    img { width: 100%; }
    .screen-mask {
      position: absolute;
      top: 5.5%; left: 5.1%;
      width: 89.8%; height: 83.5%;
      overflow: hidden;
      background: #1a1a1a;
      .scrolling-content {
        width: 100%;
        img { width: 100%; height: auto; display: block; }
      }
    }
  }
`;

// 2. 메인 함수 컴포넌트
function BeforeSection() {
  // ★ 중요 ★: Ref 정의는 반드시 여기(함수 내부)에 있어야 합니다.
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const box4Ref = useRef(null);
  const box5Ref = useRef(null);
  const box6Ref = useRef(null);
  const contentRef = useRef(null);

  return (
    <BeforeSectionWrapper id="before">
      <div className="sticky-wrapper">
        <div className="visual-stage">
          
          {/* 분석 포인트 박스들 */}
          <div className="desc-box point-1 left" ref={box1Ref}>
            <h4>브랜드 정체성과 괴리된 비주얼 및 불균형한 정보 구조(IA)</h4>
            <ul>
              <li>정적 디자인으로 인한 브랜드 몰입도 저하</li>
              <li>정보 구조 파편화로 인한 신뢰도 하락</li>
            </ul>
          </div>

          <div className="desc-box point-2 right" ref={box2Ref}>
            <h4>시선 집중 저해 및 정보 위계 미확립</h4>
            <ul>
              <li>과도한 정보 배치로 인한 피로도 증가</li>
              <li>모바일 환경의 렌더링 지연(LCP 7.2s)</li>
            </ul>
          </div>

          <div className="desc-box point-3 left" ref={box3Ref}>
            <h4>제한적인 카테고리 분류 및 탐색 편의성 결여</h4>
            <ul>
              <li>탭 분류의 단순화로 인한 선택권 제약</li>
              <li>비직관적 명칭 사용으로 탐색 비용 증가</li>
            </ul>
          </div>

          <div className="desc-box point-4 right" ref={box4Ref}>
            <h4>데이터 시각화의 불균형 및 정보 과부하</h4>
            <ul>
              <li>텍스트 정보량 과다 및 비체계적 레이아웃</li>
              <li>일관성 없는 컬러 시스템으로 인한 시각적 피로</li>
            </ul>
          </div>

          <div className="desc-box point-5 left" ref={box5Ref}>
            <h4>콘텐츠 맥락 불일치 및 전환 유도 부재</h4>
            <ul>
              <li>섹션 타이틀과 실제 데이터 간 정렬성 부족</li>
              <li>프로모션 정보 누락으로 인한 전환 기회 상실</li>
            </ul>
          </div>

          <div className="desc-box point-6 right" ref={box6Ref}>
            <h4>비효율적 정보 구조 및 메뉴 그룹화 부재</h4>
            <ul>
              <li>불필요한 시각적 뎁스(Depth) 생성</li>
              <li>명확한 영역 구분 부재로 탐색 피로도 증가</li>
            </ul>
          </div>

          {/* 중앙 맥 목업 영역 */}
          <div className="mac-mockup">
            <img src="/image/mac-device.png" alt="Mac Mockup" />
            <div className="screen-mask">
              <div className="scrolling-content" ref={contentRef}>
                <img src="/image/lego-long-capture.jpg" alt="Current Site Analysis" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </BeforeSectionWrapper>
  );
}

export default BeforeSection;