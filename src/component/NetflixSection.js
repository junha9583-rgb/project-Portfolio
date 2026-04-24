import React, { useRef } from "react";
import styled from "styled-components";

const NetflixWrapper = styled.section`
  /* 기존 설정 유지 */

  /* [BEFORE] 문제점 라벨: 작고 직관적으로 */
  .problem-label {
    position: absolute;
    background: rgba(229, 9, 20, 0.9); /* 넷플릭스 레드 */
    color: white;
    padding: 6px 12px;
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: 4px;
    z-index: 2;
    /* 초기 위치는 왼쪽 목업 주변 */
  }
  .p-1 { top: 20%; left: 5%; }
  .p-2 { top: 15%; left: 25%; }
  .p-3 { top: 45%; left: 2%; }

  /* [AFTER] 개선점 박스: 이전 섹션들과 일체감 있게 */
  .desc-box {
    position: absolute;
    width: 280px;
    padding: 20px;
    background: rgba(30, 30, 30, 0.9);
    backdrop-filter: blur(10px);
    border-left: 4px solid #e50914; /* 포인트 컬러 */
    color: #fff;
    z-index: 10;
    opacity: 0; /* 초기 투명 */

    h4 { color: #e50914; font-size: 1.1rem; margin-bottom: 8px; }
    p { font-size: 0.9rem; color: #ccc; line-height: 1.4; }
  }
  
  /* 개선 화면(중앙) 기준 좌우 배치 */
  .box-1 { left: -150px; top: 30%; }
  .box-2 { right: -150px; top: 30%; }
  .box-3 { left: 50%; bottom: -50px; transform: translateX(-50%); width: 400px; }
`;

function NetflixSection() {
  const sectionRef = useRef(null);
  const beforeImgRef = useRef(null);
  const afterImgRef = useRef(null);
  const beforeDescRef = useRef(null); // 추가
  const afterDescRef = useRef(null);  // 추가

  return (
    <NetflixWrapper ref={sectionRef}>
      <div className="trigger-container">
        <div className="sticky-wrapper">
          <div className="visual-stage">

            {/* --- BEFORE 그룹 (기존 화면 + 문제점) --- */}
            <div className="group-before">
              <div className="img-container before" ref={beforeImgRef}>
                <img src="/image/netflix-before-total.png" alt="Current Netflix UX" />
              </div>
              <div className="desc-layer before-labels" ref={beforeDescRef}>
                <div className="problem-label p-1">Complexity</div>
                <div className="problem-label p-2">Low Discoverability</div>
                <div className="problem-label p-3">Text-based Search</div>
              </div>
            </div>

            {/* --- AFTER 그룹 (개선 화면 + 해결책) --- */}
            <div className="group-after">
              <div className="img-container after" ref={afterImgRef}>
                <img src="/image/netflix-after-total.png" alt="Improved Netflix UX" />
              </div>
              <div className="desc-layer after-boxes" ref={afterDescRef}>
                <div className="desc-box box-1">
                  <h4>Intent-focused UX</h4>
                  <p>사용자의 시청 의도에 집중한 레이아웃 설계</p>
                </div>
                <div className="desc-box box-2">
                  <h4>Intuitive Keywords</h4>
                  <p>타이핑 없이 클릭만으로 탐색 가능한 키워드</p>
                </div>
                <div className="desc-box box-3">
                  <h4>High Engagement</h4>
                  <p>직관적인 탐색 경험을 통한 사용자 체류 시간 증대</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </NetflixWrapper>
  );
}

export default NetflixSection;