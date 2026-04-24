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

  .inner {
    width: 100%;
    max-width: 1000px;
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
    grid-template-rows: repeat(2, 1fr);
    gap: 40px; /* 버튼 사이 간격 넉넉히 */
    padding: 20px;
  }

  .project-btn {
    position: relative;
    height: 280px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: translateY(-10px);
      border-color: rgba(255, 255, 255, 0.2);
    }
  }

  .btn-content {
    text-align: center;
    transition: opacity 0.3s ease;
    
    .num { font-size: 0.9rem; color: #e50914; font-weight: bold; }
    h3 { font-size: 1.4rem; color: #fff; margin-top: 10px; }
  }

  /* 호버 시 페이드인 되는 모달 레이어 */
  .modal-fade-in {
    position: absolute;
    inset: 0; /* 전체 채우기 */
    background: rgba(15, 15, 15, 0.95);
    backdrop-filter: blur(15px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;

    &.active {
      opacity: 1;
      pointer-events: auto;
    }

    .category { color: #e50914; font-size: 0.8rem; margin-bottom: 12px; }
    p { color: #ccc; font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px; }
    
    .view-more {
      background: none;
      border: 1px solid #fff;
      color: #fff;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 0.8rem;
      cursor: pointer;
      &:hover { background: #fff; color: #000; }
    }
  }
`;

const projects = [
  { id: 1, title: "Yaamstore", category: "B2B Platform", desc: "핵심 포지셔닝 전략 및 페르소나 분석" },
  { id: 2, title: "Genie Music", category: "App UX Audit", desc: "사용자 리뷰 기반 UX 진단 및 개선안" },
  { id: 3, title: "Hankook Chinaware", category: "Brand Redesign", desc: "역사와 브랜드 가치를 담은 웹 리뉴얼" },
  { id: 4, title: "Future Project", category: "UI Exploration", desc: "실험적인 인터랙션 디자인 연구" },
];

function EtcSection() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <EtcWrapper id="etc">
      <div className="inner">
        <h2 className="section-title">Other Explorations</h2>
        
        <div className="button-grid">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="project-btn"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* 버튼 기본 아이콘/텍스트 */}
              <div className="btn-content">
                <span className="num">0{project.id}</span>
                <h3>{project.title}</h3>
              </div>

              {/* 호버 시 나타날 모달창 느낌의 레이어 */}
              <div className={`modal-fade-in ${hoveredId === project.id ? 'active' : ''}`}>
                <span className="category">{project.category}</span>
                <p>{project.desc}</p>
                <button className="view-more">View Project</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EtcWrapper>
  );
}

export default EtcSection;