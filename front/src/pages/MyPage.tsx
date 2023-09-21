import React from "react";
import Navbar from "../components/features/NavbarComponents/Navbar";
import Calendar from "../components/features/CalendarComponents/Calendar";
import "./styles/Mypage.css";
import DiaryDrrList from "../components/features/DiaryDrrList/DiaryDrrList";

const MyPage = () => {
  const diaries = [
    {
      id: 1,
      author: "Alice",
      title: "오늘의 일기",
      keyword: "행복",
      emotion: ["기쁨:20", "우울:20", "중립:20"],
      imageURL: "URL_기쁨_이미지",
      content: "오늘은 기분이 좋았어요!",
    },
    {
      id: 2,
      author: "Bob",
      title: "우울한 날",
      keyword: "우울",
      emotion: ["기쁨:20", "우울:20", "중립:20"],
      imageURL: "URL_우울_이미지",
      content: "오늘은 기분이 안 좋았어요.",
    },
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
        <div className="mypage-bottom-diaryDrr">카드 드르륵 컴포넌트</div>
        <DiaryDrrList diaries={diaries} />
      </div>
    </div>
  );
};

export default MyPage;
