import React from "react";
import styled from "styled-components";

function ReviewSection() {
  return (
    <SectionContainer>
      <ContentInner>
        {/* 1. 텍스트가 위, 선이 아래로 흐르는 사이드 라벨 */}
        <SideLabelWrapper>
          <span className="label-text">02. USER RESEARCH</span>
          <div className="vertical-line" />
        </SideLabelWrapper>

        <MainContent>
          <Title>
            레고 앱 <span>리뷰 분석</span>
          </Title>

          {/* 2. 카드들을 담는 기준 컨테이너 (relative) */}
          <CardsArea>
            <ReviewCard className="card-1">
              <h3>원하는 걸 찾기가 너무 힘들어요</h3>
              <StarImage src="/image/1star.png" alt="rating" />
              <p>
                시리즈별로 보고 싶은데 카테고리가 너무 복잡해요. <br />
                검색 결과가 정확하지 않고 필터 적용이 제대로 안 됩니다.
              </p>
            </ReviewCard>

            <ReviewCard className="card-2">
              <h3>로딩하다가 시간 다 가요</h3>
              <StarImage src="/image/2stars.png" alt="rating" />
              <p>
                사진 하나 뜨는 데 너무 오래 걸려요. <br />
                장바구니 담을 때 멈춤 현상이 있어요.
              </p>
            </ReviewCard>

            <ReviewCard className="card-3">
              <h3>모바일인데 PC 보는 것 같아요</h3>
              <StarImage src="/image/1star.png" alt="rating" />
              <p>
                글자가 너무 작아요. <br />
                버튼 누르기가 너무 불편합니다.
              </p>
            </ReviewCard>
          </CardsArea>
        </MainContent>
      </ContentInner>

      <LegoDots>
        <div /><div /><div /><div />
      </LegoDots>
    </SectionContainer>
  );
}

// --- Styled Components ---

const SectionContainer = styled.section`
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
  position: relative;
  overflow: hidden;
`;

const ContentInner = styled.div`
  display: flex;
  width: 100%;
  max-width: 1400px;
  height: 80vh; /* 선의 길이를 결정하는 기준 */
  gap: 50px;
  padding: 0 5%;
`;

const SideLabelWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  /* align-items: center; */
  /* 캡처 화면처럼 제목과 여백을 맞추기 위해 상단 패딩 추가 */
  padding-top: 15px; 
  height: 100%; /* 부모(ContentInner)의 높이만큼 꽉 차게 */
  border-right: 1px solid #bbb;
  padding-right: 15px;

  .label-text {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: #bbb;
    white-space: nowrap;
  }

  /* .vertical-line {
    flex: 1;
    width: 1px;
    background-color: #222;
  } */
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 50px;
  letter-spacing: -0.02em;
  color: #fff;
  span { color: #e3000b; }
`;

/* 카드들의 절대 좌표 기준점이 될 영역 */
const CardsArea = styled.div`
  flex: 1;
  position: relative; 
  width: 100%;
`;

const ReviewCard = styled.article`
  background-color: #0c0c0c;
  border: 1px solid #1a1a1a;
  border-radius: 30px;
  padding: 45px;
  width: 510px; /* 카드 볼륨감 상향 */
  position: absolute;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);

  h3 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
    line-height: 1.3;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #ccc; /* 텍스트 색상 밝게 조정 */
  }

  /* 카드별 밀집 위치 재배정 */
  &.card-1 {
    top: 0;
    left: 0;
    z-index: 2;
  }

  &.card-2 {
    top: 50px;
    right: 50px;
    z-index: 1;
  }

  &.card-3 {
    bottom: 50px;
    left: 200px;
    z-index: 3;
  }
`;

const StarImage = styled.img`
  height: 28px;
  margin-bottom: 25px;
  display: block;
`;

const LegoDots = styled.div`
  position: absolute;
  bottom: 60px;
  right: 80px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  opacity: 0.1;
  div { width: 20px; height: 20px; background-color: #fff; border-radius: 50%; }
`;

export default ReviewSection;