import React, { useState } from "react";
import styled from "styled-components";

const FooterWrapper = styled.section`
  width: 100%;
  padding: 80px 10% 40px;
  background: #000;
  border-top: 1px solid rgba(255, 255, 255, 0.05); /* 경계선만 아주 살짝 */
  color: #fff;

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 60px;
  }

  .left-side {
    text-align: left;
  }

  .footer-name {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 10px;
    letter-spacing: -0.02em;
  }

  .footer-tagline {
    color: #666;
    font-size: 0.9rem;
  }

  .right-side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .contact-item {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 5px;

    .label {
      font-size: 0.8em;
      color: #e50914; /* 넷플릭스/레고 포인트 컬러 */
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 6px;
      letter-spacing: 0.05em;
    }

    /* 이메일 복사 그룹 스타일 */
    .copy-group {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      position: relative;

      &:hover .value {
        color: #fff;
      }

      &:hover .copy-btn {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .value {
      font-size: 1em;
      color: #ccc;
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: #fff;
        text-decoration: underline;
      }
    }

    /* 복사 버튼 디테일 */
    .copy-btn {
      font-size: 0.65rem;
      padding: 3px 8px;
      background: #e50914;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      opacity: 0; /* 평소엔 숨김 */
      transform: translateX(-10px); /* 살짝 왼쪽에서 나타나는 효과 */
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      white-space: nowrap;
      cursor: pointer;
    }
  }

  .copyright {
    text-align: center;
    font-size: 0.75rem;
    color: #333;
    border-top: 1px solid rgba(255, 255, 255, 0.03);
    padding-top: 30px;
  }

  /* 모바일 대응 */
  @media (max-width: 768px) {
    padding: 60px 5% 30px;

    .footer-content {
      flex-direction: column;
      gap: 40px;
    }

    .right-side, 
    .contact-item {
      align-items: flex-start;
    }

    .copy-btn {
      opacity: 1; /* 모바일은 호버가 없으므로 항상 노출 */
      transform: translateX(0);
    }
  }
`;

function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "junha9583@naver.com";
  const phone = "010-9526-0803";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2초 후 알림 사라짐
  };

  return (
    <FooterWrapper>
      <div className="footer-content">
        <div className="left-side">
          <h2 className="footer-name">KIM JUN HA</h2> {/* */}
          <p className="footer-tagline">Designing Logic, Building Experience.</p>
        </div>

        <div className="right-side">
          <div className="contact-item">
            <span className="label">EMAIL</span>
            <div className="copy-group" onClick={handleCopy}>
              <button className="copy-btn">
                {copied ? "COPIED!" : "COPY"}
              </button>
              <span className="value">{email}</span>
            </div>
            <span className="label">PHONE</span>
            <div className="copy-group" onClick={handleCopy}>
              <button className="copy-btn">
                {copied ? "COPIED!" : "COPY"}
              </button>
              <span className="value">{phone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright">
        © 2026. KIM JUN HA. All rights reserved.
      </div>
    </FooterWrapper>
  );
}

export default Footer;