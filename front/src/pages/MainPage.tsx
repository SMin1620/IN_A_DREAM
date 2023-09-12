import React from "react";
import NavBar from "../components/features/Navbar";
import MainStart from "../components/layout/MainStart";
import MainPageIntro from "../components/layout/MainPageIntro";

const MainPage = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <MainPageIntro />
      <MainStart />
      소개 프로젝트
    </div>
  );
};

export default MainPage;
