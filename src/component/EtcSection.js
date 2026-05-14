import React, { useState } from "react";
import styled from "styled-components";

const EtcWrapper = styled.section`
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  .inner {
    width: 100%;
    max-width: 1100px;
    text-align: center;
  }

  .section-title {
    font-size: 1.5rem;
    color: #555;
    margin-bottom: 50px;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
  }

  .button-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    padding: 20px;
  }

  .project-btn {
    position: relative;
    height: 280px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    cursor: pointer;
    transition: all 0.4s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-content {
    text-align: center;
    .num { font-size: 0.9rem; color: #e50914; font-weight: bold; }
    h3 { font-size: 1.4rem; color: #fff; margin-top: 10px; }
  }

  /* --- 정중앙 확장 모달 스타일 --- */
  .modal-content-inner {
    width: 100%;
    height: 100%;
    /* 내용이 바뀔 때마다 0.3초 동안 부드럽게 나타남 */
    animation: fadeInContent 0.4s ease-out forwards;
  }

  @keyframes fadeInContent {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .center-expand-view {
    position: fixed;
    top: 50%;
    left: 50%;
    /* 처음 상태: 살짝 아래에 있고 투명함 */
    transform: translate(-50%, -45%) scale(0.95); 
    width: 800px;
    height: 500px;
    background: #1a1a1a;
    border-radius: 30px;
    overflow: hidden;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    
    /* 핵심: opacity와 transform에 부드러운 transition 부여 */
    /* 획획 바뀌는 느낌을 없애기 위해 0.4초 정도의 시간을 줍니다. */
    transition: 
      opacity 0.4s ease-in-out, 
      transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    
    box-shadow: 0 50px 100px rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.15);

    &.active {
      opacity: 1;
      /* 나타날 때 상태: 정중앙으로 부드럽게 올라옴 */
      transform: translate(-50%, -50%) scale(1);
      pointer-events: auto;
    }
    
    /* 이미지가 바뀔 때 깜빡거리는 현상을 방지하기 위한 스타일 */
    .preview-img-full {
      width: 100%;
      height: 75%;
      object-fit: cover;
      filter: brightness(1.1);
      transition: opacity 0.3s ease; /* 이미지 교체 시 부드러움 추가 */
    }
  }

    .info-area {
      height: 25%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px;
      background: #111;

      .text-group {
        text-align: left;
        .cat { color: #e50914; font-size: 0.8rem; font-weight: bold; }
        h4 { color: #fff; font-size: 1.5rem; margin: 5px 0 0 0; }
      }
    }

    .visit-btn {
      background: #e50914;
      color: #fff;
      padding: 12px 30px;
      border-radius: 30px;
      font-size: 0.9rem;
      font-weight: bold;
      text-decoration: none;
      transition: transform 0.2s;
      &:hover { transform: scale(1.05); background: #ff0f1a; }
    }
  }

  /* 뒷배경 어둡게 (딤 처리는 유지하되 모달보다 아래에 위치) */
  .screen-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s;
    z-index: 999;
    &.active { opacity: 1; }
  }
`;

const projects = [
  { id: 1, title: "한국도자기", category: "Hankook Chinaware", img: "/image/HankookChinaware.png", url: "https://junha9583-rgb.github.io/project-HankookChinaware/archive.html" },
  { id: 2, title: "tvN", category: "즐거움엔 끝이 없다", img: "/image/Tvn.png", url: "https://junha9583-rgb.github.io/project-Tvn/" },
  { id: 3, title: "네이버 클로바", category: "Naver Clova", img: "/image/NaverClova.png", url: "https://junha9583-rgb.github.io/project-NaverClova/" },
  { id: 4, title: "Nike", category: "AirMax", img: "/image/Nike.png", url: "https://junha9583-rgb.github.io/project-Nike/" },
];

function EtcSection() {
  const [hoveredId, setHoveredId] = useState(null);
  const handleMouseLeave = () => {
    setHoveredId(null);
    // 대신 setTimeout을 써서 아주 짧은 지연을 줄 수도 있지만, 
    // 위 CSS transition 수정만으로도 충분히 자연스러워질 겁니다.
  };

  // 현재 호버된 프로젝트 데이터 찾기
  const activeProject = projects.find(p => p.id === hoveredId);

  return (
    <EtcWrapper id="etc">
      {/* 1. 배경 오버레이 (위치는 그대로) */}
      <div className={`screen-overlay ${hoveredId ? 'active' : ''}`} />

      <div className="inner">
        <h2 className="section-title">Other Projects</h2>

        <div className="button-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-btn"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="btn-content">
                <span className="num">0{project.id}</span>
                <h3>{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 모달 영역을 별도로 분리 (중첩되지 않게 하나만 렌더링) */}
      {/* 이 부분이 버튼들과 섞여있지 않고 독립되어야 스크롤 꼬임이 없습니다. */}
      <div 
  className={`center-expand-view ${hoveredId ? 'active' : ''}`}
  style={{ pointerEvents: hoveredId ? 'auto' : 'none' }}
  onMouseEnter={() => setHoveredId(hoveredId)}
  onMouseLeave={() => setHoveredId(null)}
>
  {/* key를 부여해서 프로젝트가 바뀔 때마다 내부가 새로 렌더링되게 함 */}
  {activeProject && (
    <div key={activeProject.id} className="modal-content-inner">
      <img src={activeProject.img} alt={activeProject.title} className="preview-img-full" />
      <div className="info-area">
        <div className="text-group">
          <span className="cat">{activeProject.category}</span>
          <h4>{activeProject.title}</h4>
        </div>
        <a href={activeProject.url} target="_blank" rel="noopener noreferrer" className="visit-btn">
          Visit Project
        </a>
      </div>
    </div>
  )}
</div>
    </EtcWrapper>
  );
}

export default EtcSection;