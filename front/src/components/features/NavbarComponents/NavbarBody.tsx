import React, { useState } from "react";
import "./styles/NavbarBody.css";
import main from "../../../assets/navbar/main.png";
import dream_default from "../../../assets/navbar/dream_default.png";
import dream_activate from "../../../assets/navbar/dream_activate.png";
import my_default from "../../../assets/navbar/my_default.png";
import my_activate from "../../../assets/navbar/my_activate.png";

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
      <a className="navbar-body-main" href="/">
        <img src={main} alt="main" />
      </a>
      <div className="navbar-body-logo" onClick={() => handleOpenNavbarModal()}>
        {logoActivate ? (
          <img src={dream_activate} alt="dream_activate" />
        ) : (
          <img src={dream_default} alt="dream_default" />
        )}
      </div>
      <div className="navbar-body-my" onClick={() => handleOpenMyModal()}>
        {myActivate ? (
          <img src={my_activate} alt="my_activate" />
        ) : (
          <img src={my_default} alt="my_default" />
        )}
      </div>
    </div>
  );
};

export default NavbarBody;
