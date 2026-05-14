import React from "react";
import styled from "styled-components";

// Styled Components
const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 40px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  pointer-events: none; /* 헤더 영역이 클릭을 방해하지 않도록 설정 */
`;

const Logo = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.05em;
  margin: 0;
  color: #eee;
  pointer-events: auto; /* 로고는 클릭 가능하게 */
`;

const Nav = styled.nav`
  position: fixed;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: auto;
  
  /* 첫 페이지에서 숨기기 위한 초기값 (나중에 GSAP으로 등장시킬 예정) */
  opacity: 0; 
  visibility: hidden;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  li {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  a {
    text-decoration: none;
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.3s;
    
    &:hover {
      color: #000;
    }
  }

  .indicator {
    width: 6px;
    height: 6px;
    background-color: #ddd;
    border-radius: 50%;
    transition: all 0.3s;

    &.active {
      background-color: #000;
      transform: scale(1.5);
    }
  }
`;

function Header() {
  return (
    // <header> 대신 정의한 <HeaderContainer> 사용
    <HeaderContainer>
      
      {/* <h1> 대신 정의한 <Logo> 사용 */}
      <Logo>JUNHA KIM</Logo>

      {/* <nav> 대신 정의한 <Nav> 사용 */}
      <Nav>
        <ul>
          <li>
            <a href="#projects">Project</a>
            <span className="indicator active"></span>
          </li>
          <li>
            <a href="#about">About</a>
            <span className="indicator"></span>
          </li>
          <li>
            <a href="#contact">Contact</a>
            <span className="indicator"></span>
          </li>
        </ul>
      </Nav>

    </HeaderContainer>
  );
}

export default Header;