import React, { useState } from "react";
import "./styles/Navbar.css"; // 이 파일에 CSS를 복사해두세요.
import main from "../../../assets/navbar/main.png";
import dream_default from "../../../assets/navbar/dream_default.png";
import dream_activate from "../../../assets/navbar/dream_activate.png";
import my from "../../../assets/navbar/my.png";

const Navbar = () => {
  const [logoActivate, setLogoActivate] = useState<boolean>(false);

  return (
    <div className="navbar-wrapper">
      <a className="navbar-main" href="/">
        <img src={main} alt="main" />
      </a>
      <div
        className="navbar-logo"
        onClick={() => setLogoActivate(!logoActivate)}
      >
        {logoActivate ? (
          <img src={dream_default} alt="dream_default" />
        ) : (
          <img src={dream_activate} alt="dream_activate" />
        )}
      </div>
      <div className="navbar-my">
        <img src={my} alt="my" />
      </div>
    </div>
  );
};

export default Navbar;
