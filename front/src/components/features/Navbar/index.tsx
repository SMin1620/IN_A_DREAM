import React from "react";
import "./index.css"; // 이 파일에 CSS를 복사해두세요.

const Navbar = () => {
  return (
    <div className="nav__bar" id="nav-bar">
      <a className="nav__logo" href="/">
        <img src="/images/nav_logo.svg" alt="Logo" />
      </a>
      <div className="nav__toggle" id="nav-toggle">
        <img className="nav__dot dot1" src="/images/nav_dot.svg" alt="d" />
        <img className="nav__dot dot2" src="/images/nav_dot.svg" alt="e" />
        <img className="nav__dot dot3" src="/images/nav_dot.svg" alt="t" />
        <img className="nav__dot dot4" src="/images/nav_dot.svg" alt="t" />
        <img className="nav__dot dot5" src="/images/nav_dot.svg" alt="t" />
      </div>

      {/* 이메일 주소에 대한 링크는 React Router나 외부 링크 처리 방법에 따라 변경해야 할 수 있습니다. */}
      {/* 또한, data-cursor 속성은 필요에 따라 다른 방식으로 처리해야 할 수도 있습니다. */}
      <a className="nav__barCta dotLink" href="mailto:hello@rogue.studio">
        Start A Project
      </a>
    </div>
  );
};

export default Navbar;
