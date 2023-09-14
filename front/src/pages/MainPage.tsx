import React, { useState, useEffect } from "react";
import NavBar from "../components/features/Navbar";
import MainStart from "../components/layout/MainStart";
import MainPageIntro from "../components/layout/MainPageIntro";

const MainPage = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 6000); // After 5 seconds

    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  return (
    <div>
      <NavBar />
      {showIntro ? <MainPageIntro /> : <MainStart />}
    </div>
  );
};

export default MainPage;
