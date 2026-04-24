import React from 'react';
import Header from './component/Header';
import HeroSection from './component/HeroSection';
// import ReasonSection from './component/ReasonSection';
// import ReviewSection from './component/ReviewSection';
// import AuditSection from './component/AuditSection';
// import BeforeSection from './component/BeforeSection';
// import AfterSection from './component/AfterSection';
// import NetflixSection from './component/NetflixSection';
// import EtcSection from './component/EtcSection';
// import EpilogueSection from './component/EpilogueSection';
// import Footer from './component/Footer';
import { GlobalStyle } from './style/GlobalStyle';
// import './App.css';

function App() {
  return (
    <div className="all-wrap">
      <GlobalStyle />
      <Header />
      <HeroSection />
      {/* <ReasonSection /> */}
      {/* <ReviewSection /> */}
      {/* <AuditSection /> */}
      {/* <BeforeSection /> */}
      {/* <AfterSection /> */}
      {/* <NetflixSection /> */}
      {/* <EtcSection /> */}
      {/* <EpilogueSection /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;