import React, { useState, useEffect } from "react";
import NavBar from "../components/features/NavbarComponents/Navbar";
import MainPageIntro from "../components/layout/MainPageIntro";
import MainStart from "../components/layout/MainStart";
import MainSecond from "../components/layout/MainSecond";
import MainThird from "../components/layout/MainThird";

const MainPage = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 6000); // After 5 seconds

    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  return (
    <div style={{ backgroundColor: "black" }}>
      <NavBar />
      <div>
        {showIntro ? <MainPageIntro /> : <MainStart />}
        <MainSecond />
        <MainThird />
      </div>
    </div>
  );
};

export default MainPage;
