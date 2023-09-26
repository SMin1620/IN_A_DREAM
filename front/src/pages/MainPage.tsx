import React, { useState, useEffect } from "react";
import CursorSizeContext from "../context/CursorSizeContext";
import NavBar from "../components/features/NavbarComponents/Navbar";
import MainPageIntro from "../components/layout/MainPageIntro";
import MainStart from "../components/layout/MainStart";
import MainSecond from "../components/layout/MainSecond";
import MainThird from "../components/layout/MainThird";
import MainFourth from "../components/layout/MainFourth";
import MainFifth from "../components/layout/MainFifth";
import MainSixth from "../components/layout/MainSixth";
import useMousePosition from "../hooks/useMousPosition";
import "./styles/MainPage.css";

const MainPage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [bgColor, setBgColor] = useState("black");
  const [cursorSize, setCursorSize] = useState("3vw");

  const { x, y } = useMousePosition();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 6000); // After 5 seconds

    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let currentScrollY = window.scrollY;

      if (currentScrollY >= window.innerHeight * 4.7) {
        setBgColor("black");
      } else if (currentScrollY >= window.innerHeight * 2.5) {
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
      <NavBar />
      <CursorSizeContext.Provider value={{ cursorSize, setCursorSize }}>
        <div style={{ marginLeft: "4rem" }}>
          {showIntro ? <MainPageIntro /> : <MainStart />}
          <MainSecond />
          <MainThird />
          <MainFourth />
          <MainFifth />
          <MainSixth />
          <div
            className="mouse-cursor"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: cursorSize,
              height: cursorSize,
            }}
          />
        </div>
      </CursorSizeContext.Provider>
    </div>
  );
};

export default MainPage;
