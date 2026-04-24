import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap"; // 나중에 애니메이션 구현 시 주석 해제
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AfterSectionWrapper = styled.section`
  width: 100%;
  background-color: #000; /* Before 섹션과 동일한 블랙 배경 */
  overflow: hidden;
  position: relative;

  .trigger-container {
    width: 100%;
    height: 400vh; /* 애니메이션 길이. 스크롤을 많이 하도록 길게 잡음 */
  }

  .sticky-wrapper {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .build-stage {
    position: relative;
    width: 1600px; /* 개선된 디자인 스크린샷의 가로 너비 */
    height: 100%; /* 화면 높이에 맞춤 */
    max-height: 900px; /* 너무 커지는 것 방지 */
  }

  /* 레고 파트 공통 스타일 */
  .build-item {
    position: absolute;
    width: 100%;
    left: 0;
    opacity: 0; /* 초기값 투명 */
    transform: translateY(100vh); /* 초기값 화면 밑에 대기 */
    z-index: 1;
    transition: box-shadow 0.3s ease;

    img {
      width: 100%;
      display: block;
    }
  }

  /* 각 파트별 수직 최종 위치 (디자인에 맞춰 미세조정) */
  .part-header { top: 0; z-index: 2; }
  .part-atelier { top: 25%; }
  .part-data { top: 55%; }
  .part-footer { bottom: 0; }

  /* 설명 박스 스타일 (Before 섹션과 일체감 유지) */
  .desc-box {
    position: absolute;
    width: 320px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    z-index: 10;
    opacity: 0; /* 초기값 투명 */
    color: white;

    h4 { font-size: 1.1rem; margin-bottom: 10px; color: #fff; }
    ul, li { font-size: 0.9rem; color: #ccc; list-style: none; }
  }

  /* 설명 박스 위치 지정 */
  .left-top { left: -380px; top: 10%; }
  .right-top { right: -380px; top: 30%; }
  .left-bottom { left: -380px; bottom: 30%; }
  .right-bottom { right: -380px; bottom: 10%; }
`;

function AfterSection() {
  // GSAP 애니메이션을 위한 Ref 이름표들
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const item1Ref = useRef(null); // 헤더/비주얼
  const item2Ref = useRef(null); // 디지털 아틀리에
  const item3Ref = useRef(null); // 데이터 맥락화
  const item4Ref = useRef(null); // 네비게이션
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const box4Ref = useRef(null);

  // useEffect(() => {
  //   // 여기에 GSAP 타임라인 로직이 들어갑니다.
  // }, []);

  return (
    <AfterSectionWrapper id="after" ref={sectionRef}>
      {/* 1. GSAP ScrollTrigger의 기준점이 될 긴 컨테이너 */}
      <div className="trigger-container" ref={triggerRef}>

        {/* 2. 화면에 고정(pin)될 영역 */}
        <div className="sticky-wrapper">

          {/* 3. 레고 파트들이 조립될 무대 */}
          <div className="build-stage">

            {/* 파트 1: 브릭 아이덴티티 반영 (상단) */}
            <div className="build-item part-header" ref={item1Ref}>
              <img src="/image/after-part1.png" alt="Header & Visual" />
            </div>

            {/* 파트 2: 디지털 아틀리에 컨셉 (중간) */}
            <div className="build-item part-atelier" ref={item2Ref}>
              <img src="/image/after-part2.png" alt="Digital Atelier" />
            </div>

            {/* 파트 3: 데이터 맥락화 (Best/New) */}
            <div className="build-item part-data" ref={item3Ref}>
              <img src="/image/after-part3.png" alt="Data Context" />
            </div>

            {/* 파트 4: 미니멀 네비게이션 (하단) */}
            <div className="build-item part-footer" ref={item4Ref}>
              <img src="/image/after-part4.png" alt="Footer Navigation" />
            </div>

            {/* 개선 포인트 1: 브릭 아이덴티티 */}
            <div className="desc-box box-1 left-top" ref={box1Ref}>
              <h4>브릭 아이덴티티 반영</h4>
              <ul>
                <li>레고 결합 모티프를 UI 컴포넌트에 적용하여 브랜드 개성 강화</li>
                <li>풀 그리드 레이아웃으로 첫인상 및 몰입도 극대화</li>
                <li>WebP 포맷 전환으로 고해상도 비주얼 유지 및 초기 로딩 속도 단축</li>
              </ul>
            </div>

            {/* 개선 포인트 2: 디지털 아틀리에 */}
            <div className="desc-box box-2 right-top" ref={box2Ref}>
              <h4>디지털 아틀리에 컨셉</h4>
              <ul>
                <li>단순 나열을 탈피한 스토리텔링형 배치로 제품의 '작품성' 강조</li>
                <li>대형 모델 이미지를 전면에 배치하여 주 타겟층(어린이/키덜트)의 관심 유도</li>
                <li>미니멀한 텍스트 배치로 시선 분산을 방지하고 핵심 메시지에 집중</li>
              </ul>
            </div>

            {/* 개선 포인트 3: 데이터 맥락화 */}
            <div className="desc-box box-3 left-bottom" ref={box3Ref}>
              <h4>데이터 맥락화</h4>
              <ul>
                <li>Best(스테디셀러)와 New(신제품)의 명확한 구분으로 탐색 피로도 감소</li>
                <li>브릭 보드 도트 패턴 배경을 적용하여 섹션 간 테마 연결성 강화</li>
                <li>사용자의 구매 의사결정 경로를 고려한 단순화된 정보 구조 설계</li>
              </ul>
            </div>

            {/* 개선 포인트 4: 미니멀 네비게이션 */}
            <div className="desc-box box-4 right-bottom" ref={box4Ref}>
              <h4>미니멀 네비게이션</h4>
              <ul>
                <li>불필요한 노이즈를 제거하고 필수 정보 위주로 그룹화 재정의</li>
                <li>법적 고지 및 고객 지원 메뉴의 가독성 개선으로 브랜드 신뢰도 확보</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </AfterSectionWrapper>
  );
}

export default AfterSection;