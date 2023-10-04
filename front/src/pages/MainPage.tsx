import React, { useState, useEffect } from "react";
import NavBar from "../components/features/NavbarComponents/Navbar";
import MainPageIntro from "../components/layout/MainPageIntro";
import MainStart from "../components/layout/MainStart";
import MainSecond from "../components/layout/MainSecond";
import MainThird from "../components/layout/MainThird";
import MainFourth from "../components/layout/MainFourth";
import MainFifth from "../components/layout/MainFifth";
import MainSixth from "../components/layout/MainSixth";
import { useMediaQuery } from "react-responsive";
import CloudBar from "../assets/image/cloudBar.png";
import { useNavigate } from "react-router-dom";

import "./styles/MainPage.css";

const MainPage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [bgColor, setBgColor] = useState("black");
  const navigate = useNavigate();

  const isMobileView = useMediaQuery({
    query: "(max-width: 768px)",
  });

  // const { x, y } = useMousePosition();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 6000); // After 5 seconds

    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let currentScrollY = window.scrollY;

      if (currentScrollY >= window.innerHeight * 7.7) {
        setBgColor("black");
      } else if (currentScrollY >= window.innerHeight * 3.5) {
        setBgColor("#E9E4D9");
      } else {
        setBgColor("black");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="MainPage"
      style={{
        backgroundColor: bgColor,
        transition: "background-color 1.5s",
      }}
    >
      {!showIntro && <NavBar />}
      {!showIntro && (
        <img
          src={CloudBar}
          alt="Cloud Bar"
          className="cloud-bar"
          onClick={() => navigate("/cloud")}
        />
      )}
      {/* 네브바 옆에 중앙정렬을 위해 마진레프트 네브바 만큼줬씀다 */}
      <div style={{ marginLeft: !showIntro && !isMobileView ? "4rem" : "0" }}>
        {showIntro ? <MainPageIntro /> : <MainStart />}
        <MainSecond />
        <MainThird />
        <MainFourth />
        <MainFifth />
        <MainSixth />
      </div>
    </div>
  );
};

export default MainPage;
