import React from "react";
import Navbar from "../components/features/NavbarComponents/Navbar";
import Calendar from "../components/features/CalendarComponents/Calendar";
import "./styles/Mypage.css";
import DiaryDrrList, {
  Diary,
} from "../components/features/DiaryDrrList/DiaryDrrList";

const MyPage = () => {
  const diaries: Diary[] = [
    {
      id: 1,
      author: "Author 1",
      title: "Title 1",
      emotion: ["happy"],
      keyword: "Keyword 1",
      imageURL: "https://example.com/image1.jpg",
    },
    {
      id: 2,
      author: "Author 2",
      title: "Title 2",
      emotion: ["sad"],
      keyword: "Keyword 2",
      imageURL: "https://example.com/image2.jpg",
    },
    // Add more diary objects as needed...
  ];
  return (
    <div className="MyPage-main">
      <Navbar></Navbar>
      <div className="mypage-top">
        <div className="mypage-top-calendar">{/* <Calendar /> */}캘린더 존</div>
        <div className="mypage-top-keyword">키워드 존</div>
        <div className="mypage-top-statistics">스태티스틱 존</div>
      </div>
      <div className="mypage-bottom">
        <div className="mypage-bottom-diaryDrr">
          <DiaryDrrList diaries={diaries} />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
