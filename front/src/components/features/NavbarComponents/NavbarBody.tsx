import React, { useState } from "react";
import "./styles/NavbarBody.css";

interface NavbarBodyProps {
  setIsNavbarModalOpen: (v: boolean) => void;
  setIsMyModalOpen: (v: boolean) => void;
}

const NavbarBody: React.FC<NavbarBodyProps> = ({
  setIsNavbarModalOpen,
  setIsMyModalOpen,
}) => {
  const [logoActivate, setLogoActivate] = useState<boolean>(false);
  const [myActivate, setMyActivate] = useState<boolean>(false);
  const handleOpenNavbarModal = () => {
    setLogoActivate(!logoActivate);
    setIsNavbarModalOpen(!logoActivate);
  };

  const handleOpenMyModal = () => {
    setMyActivate(!myActivate);
    setIsMyModalOpen(!myActivate);
  };

  return (
    <div className="navbar-body-wrapper">
      <a className="navbar-body-main" href="/main">
        <p>^</p>
        <p>MAIN</p>
        {/* <img src={main} alt="main" /> */}
      </a>
      <div
        className={`navbar-body-logo ${
          logoActivate ? "navbar-body-active" : ""
        }`}
        onClick={() => handleOpenNavbarModal()}
      >
        <p>DREAM</p>
      </div>

      <div
        className={`navbar-body-my ${myActivate ? "navbar-body-active" : ""}`}
        onClick={() => handleOpenMyModal()}
      >
        <p>My</p>
      </div>
    </div>
  );
};

export default NavbarBody;
