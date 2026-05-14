import React from "react";
import styled from "styled-components";

function HeroSection() {
  return (
    <HeroContainer>
      <TitleWrapper>
        <MainTitle>
          DESIGN <br />
          <SpanLine>OVER</SpanLine> ART
        </MainTitle>
        <SubText>Technical Understanding Meets Business Strategy</SubText>
      </TitleWrapper>
    </HeroContainer>
  );
}

// Styled Components
const HeroContainer = styled.section`
  width: 100%;
  height: 100vh;
  background: radial-gradient(
      circle at 50% 50%, 
    #1a1a1a 0%, 
    #000000 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  overflow: hidden;
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const MainTitle = styled.h2`
  font-size: clamp(3rem, 10vw, 8rem); /* 화면 크기에 따라 유동적으로 조절 */
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin: 0;
  text-transform: uppercase;
  font-family: 'Inter', sans-serif; /* 깔끔한 산세리프체 추천 */
`;

const SpanLine = styled.span`
  /* 'OVER' 부분만 외곽선으로 표현하여 디자인적 재미 추가 */
  display: block;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6);
  font-style: italic;
  font-weight: 300;
`;

const SubText = styled.p`
  margin-top: 40px;
  font-size: 1rem;
  font-weight: 300;
  color: #888;
  letter-spacing: 0.3em;
  text-transform: uppercase;
`;

export default HeroSection;