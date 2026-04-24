import React from "react";

function ReviewSection() {

  return (
    <section className="review">

      <h2>레고 앱 리뷰 분석</h2>

      <article className="cont-1">
        <h3>원하는 걸 찾기가 너무 힘들어요</h3>
        <img src="/image/1star.png" alt="rating" />
        <p>
          시리즈별로 보고 싶은데 카테고리가 너무 복잡해요. <br />
          검색 결과가 정확하지 않고 필터 적용이 제대로 안 됩니다.
        </p>
      </article>

      <article className="cont-2">
        <h3>로딩하다가 시간 다 가요</h3>
        <img src="/image/2stars.png" alt="rating" />
        <p>
          사진 하나 뜨는 데 너무 오래 걸려요. <br />
          장바구니 담을 때 멈춤 현상이 있어요.
        </p>
      </article>

      <article className="cont-3">
        <h3>모바일인데 PC 보는 것 같아요</h3>
        <img src="/image/1star.png" alt="rating" />
        <p>
          글자가 너무 작아요. <br />
          버튼 누르기가 너무 불편합니다.
        </p>
      </article>

    </section>
  );
}

export default ReviewSection;