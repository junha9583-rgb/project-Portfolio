import React, { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './component/Header';
import HeroSection from './component/HeroSection';
import ReasonSection from './component/ReasonSection';
import ReviewSection from './component/ReviewSection';
import BeforeSection from './component/BeforeSection';
import AfterSection from './component/AfterSection';
import NetflixSection from './component/NetflixSection';
import EtcSection from './component/EtcSection';
// import EpilogueSection from './component/EpilogueSection';
import Footer from './component/Footer';
import { GlobalStyle } from './style/GlobalStyle';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

function App() {
  useLayoutEffect(() => {
    const sections = gsap.utils.toArray('section');
    let currentIndex = 0;
    let animating = false;

    const SPECIAL = ['after', 'netflix'];

    const scrollToY = (y, onComplete) => {
      animating = true;
      gsap.to(window, {
        scrollTo: { y, autoKill: false },
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          animating = false;
          onComplete?.();
        },
      });
    };

    const goToSection = (index) => {
      if (index < 0 || index >= sections.length || animating) return;
      currentIndex = index;
      scrollToY(sections[index].offsetTop);
    };

    // 특수 섹션에서 탈출할 때 방향에 따라 진입 위치 결정
    const goToSectionFrom = (index, fromDirection) => {
      if (index < 0 || index >= sections.length || animating) return;
      currentIndex = index;
      const target = sections[index];
      // before는 역방향 진입 시 bottom으로
      const y = (target?.id === 'before' && fromDirection === -1) ? target.offsetTop + target.offsetHeight - window.innerHeight : target.offsetTop;
      scrollToY(y);
    };

    // 일반 섹션 휠만 처리, 특수 섹션은 각자 처리
    const handleWheel = (e) => {
      const currentSection = sections[currentIndex];
      if (SPECIAL.includes(currentSection?.id)) {
        e.preventDefault(); // 브라우저 기본 스크롤만 막아줌
        return;
      }

      if (currentSection?.id === 'before') return;

      e.preventDefault();
      if (animating) return;
      e.deltaY > 0 ? goToSection(currentIndex + 1) : goToSection(currentIndex - 1);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    // 특수 섹션들이 공통으로 쏘는 탈출 이벤트
    // App.js 수정 제안
    const onEscape = (e) => {
      const { direction, fromId } = e.detail;

      // 1. sections 배열이 렌더링 시점에 정확히 잡혔는지 확인 (id 기반)
      const allSections = gsap.utils.toArray('section');
      const idx = allSections.findIndex(s => s.id === fromId);

      if (idx !== -1) {
        const nextIdx = idx + direction;

        // 범위 체크
        if (nextIdx >= 0 && nextIdx < allSections.length) {
          currentIndex = nextIdx; // 다음 인덱스로 즉시 갱신

          // animating 강제 해제 (혹시 모를 락 방지)
          animating = false;

          console.log(`Moving from ${fromId} to index: ${nextIdx}`);
          goToSectionFrom(nextIdx, direction);
        }
      }
    };

    // currentIndex 동기화 (특수 섹션 진입 시)
    const onEnter = (e) => {
      const idx = sections.findIndex(s => s.id === e.detail?.sectionId);
      if (idx !== -1) currentIndex = idx;
    };

    window.addEventListener('section:escape', onEscape);
    window.addEventListener('section:enter', onEnter);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('section:escape', onEscape);
      window.removeEventListener('section:enter', onEnter);
    };
  }, []);

  return (
    <div className="all-wrap">
      <GlobalStyle />
      <Header />
      <HeroSection />
      <ReasonSection />
      <ReviewSection />
      <BeforeSection />
      <AfterSection />
      <NetflixSection />
      <EtcSection />
      {/* <EpilogueSection /> */}
      <Footer />
    </div>
  );
}

export default App;