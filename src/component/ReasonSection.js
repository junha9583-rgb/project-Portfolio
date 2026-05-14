import React from "react";
import styled from "styled-components";

function ReasonSection() {
  return (
    <SectionContainer>
      <ContentWrapper>
        <SideLabel>01. PHILOSOPHY</SideLabel>
        
        <MainContent>
          <Headline>
            컴포넌트는 <span>레고 브릭</span>이며,<br />
            디자인은 논리적인 조립의 과정입니다.
          </Headline>
          
          <Description>
            레고(LEGO®)의 본질은 무한한 확장성과 정교한 규격화에 있습니다. <br />
            작고 독립적인 브릭들이 모여 거대한 성을 이루듯, <br />
            현대 웹 개발의 핵심인 React 컴포넌트 역시 독립적인 모듈로서 존재하며 <br />
            시스템 전체의 효율을 결정합니다.
            <br /><br />
            저는 디자인을 단순한 심미적 유희로 보지 않습니다. <br />
            경영학적 관점에서 자원의 효율을 극대화하는 <strong>'모듈형 사고'</strong>를 바탕으로, <br />
            재사용 가능한 구조를 설계하고 비즈니스의 문제를 가장 경제적으로 해결하는 것. <br />
            그것이 제가 정의하는 <em>'DESIGN OVER ART'</em>의 실체입니다.
          </Description>
        </MainContent>
      </ContentWrapper>
      
      {/* 배경에 은은하게 깔리는 레고 모티브 데코 (선택 사항) */}
      <BackgroundShape />
    </SectionContainer>
  );
}

// Styled Components
const SectionContainer = styled.section`
  width: 100%;
  height: 100vh;
  background: radial-gradient(
      circle at 50% 50%, 
    #1a1a1a 0%, 
    #000000 100%
  );
  color: #fff; /* 글자색 반전 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10%;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  gap: 50px;
  z-index: 1;
`;

const SideLabel = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  writing-mode: vertical-rl; /* 세로 텍스트로 잡지 느낌 강조 */
  transform: rotate(180deg);
  color: #bbb;
  border-left: 1px solid #ddd;
  padding-left: 15px;
`;

const MainContent = styled.div`
  flex: 1;
`;

const Headline = styled.h2`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  line-height: 1.3;
  color: #fff;
  margin-bottom: 50px;
  word-break: keep-all; /* 한글 단어 끊김 방지 */

  span {
    color: #e3000b; /* 레고의 시그니처 레드를 포인트 컬러로 사용 */
  }
`;

const Description = styled.p`
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  line-height: 2;
  color: #aaa;
  max-width: 700px;
  font-weight: 400;

  strong {
    color: #fff;
    background: none;
    border-bottom: 2px solid #e3000b; /* 형광펜 대신 밑줄로 강조 */
  }

  em {
    font-style: normal;
    text-decoration: underline;
    text-underline-offset: 5px;
  }
`;

const BackgroundShape = styled.div`
  position: absolute;
  /* 위치를 더 극단적으로 우측 하단에 배치 */
  right: -2%; 
  bottom: -5%; 
  
  /* 크기를 키워서 여백의 미를 살림 */
  width: 500px;
  height: 500px;
  
  background-color: #1a1a1a; /* 검은 배경이므로 너무 밝지 않은 다크 그레이로 수정 */
  opacity: 0.8;
  
  /* 기하학적 느낌을 더 날카롭게 조절 */
  clip-path: polygon(100% 0, 100% 100%, 0 100%); 
  
  z-index: 0;
  pointer-events: none; /* 배경 클릭 방지 */
`;

export default ReasonSection;