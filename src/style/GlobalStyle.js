import { createGlobalStyle } from 'styled-components';

const size = {
  mobile: '768px',
  tablet: '1024px',
};

export const GlobalStyle = createGlobalStyle`
  /* Reset Style */
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
  }

  body {
    line-height: 1;
    font-size: 20px;
    background: radial-gradient(
      circle at 50% 50%, 
    #1a1a1a 0%, 
    #000000 100%
    );
    color: #fff;
    overflow-x: hidden;
  }

  ul, ol { list-style: none; }
  a { color: inherit; text-decoration: none; }
  
  .blind {
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(0 0 0 0);
    overflow: hidden;
  }

  /* Common Style */
  [class$="inner"] {

    section:not(#netflix) {
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }

    /* 태블릿 */
    @media (max-width: ${size.tablet}) {
      width: 94%;
    }

    /* 모바일 */
    @media (max-width: ${size.mobile}) {
      width: 100%;
      padding: 0 20px; 
    }
  }
`;