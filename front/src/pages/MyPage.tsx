import React from "react";
import Navbar from "../components/features/NavbarComponents/Navbar";
import Calendar from "../components/features/CalendarComponents/Calendar";

const MyPage = () => {
  return (
    <div className="MyPage-main">
      <Navbar></Navbar>
      <div className="mypage-top">
        <Calendar />
      </div>
    </div>
  );
};

export default MyPage;
