import React, { useState } from "react";
import "./index.css"; // 이 파일에 CSS를 복사해두세요.
import main from "../../../assets/navbar/main.png";
import dream_default from "../../../assets/navbar/dream_default.png";
import dream_activate from "../../../assets/navbar/dream_activate.png";
import my from "../../../assets/navbar/my.png";

const Navbar = () => {
  const [logoActivate, setLogoActivate] = useState<boolean>(false);

  return (
    <div className="navbarWrapper" id="nav-bar">
      <a className="navbarMain" href="/">
        <img src={main} alt="main" />
      </a>
      <div
        className="navbarLogo"
        onClick={() => setLogoActivate(!logoActivate)}
      >
        {logoActivate ? (
          <img src={dream_default} alt="dream_default" />
        ) : (
          <img src={dream_activate} alt="dream_activate" />
        )}
      </div>
      <div className="navbarMy">
        <img src={my} alt="my" />
      </div>
    </div>
  );
};

export default Navbar;
