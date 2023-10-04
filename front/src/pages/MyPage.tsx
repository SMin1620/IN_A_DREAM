import React, { useState, useEffect } from "react";
import Navbar from "../components/features/NavbarComponents/Navbar";
import Calendar from "../components/features/CalendarComponents/Calendar";
import "./styles/Mypage.css";
import DiaryDrrList from "../components/features/DiaryDrrList/DiaryDrrList";
import { useMyDiaries } from "../hooks/useMyDiary";
import { DiaryInfo } from "../types/ApiType";
import useMousePosition from "../hooks/useMousPosition";
import KeywordCloud from "../components/features/KeywordCloud/KeywordCloud";
import Statics from "../components/features/Statics/Statics";

const MyPage = () => {
  const [MyDiaryData, setMyDiaryData] = useState<DiaryInfo[]>([]);
  const { x, y } = useMousePosition();

  let now = new Date();
  let year = now.getFullYear();
  let month = ("0" + (now.getMonth() + 1)).slice(-2);
  let day = ("0" + now.getDate()).slice(-2);
  let today = year + "-" + month + "-" + day;

  let tomorrow = new Date(now.setDate(now.getDate() + 1));
  let tomorrowYear = tomorrow.getFullYear();
  let tomorrowMonth = ("0" + (tomorrow.getMonth() + 1)).slice(-2);
  let tomorrowDay = ("0" + tomorrow.getDate()).slice(-2);
  let nextDay = tomorrowYear + "-" + tomorrowMonth + "-" + tomorrowDay;
  const {
    data: response,
    isLoading,
    error,
  } = useMyDiaries({ page: 0, size: 100 });

  useEffect(() => {
    if (response) {
      setMyDiaryData(response.data.data.diaryList);
    }
  }, [response]);

  return (
    <div className="MyPage-main">
      <Navbar></Navbar>
      <div className="mypage-top">
        <div className="mypage-top-calendar">
          <p className="mypage-statistics-title">{month} 월 STACK</p>
          <Calendar />
        </div>

        <div className="mypage-top-keyword">
          <p className="mypage-statistics-title">KEYWORD</p>
          <KeywordCloud
            startDate="2023-08-26"
            endDate="2023-12-31"
            mydate={true}
            width="20vw"
            height="15vw"
          />
        </div>
        <div className="mypage-top-statistics">
          <p className="mypage-statistics-title">STATISTICS</p>
          <Statics />
        </div>
      </div>
      <div className="mypage-bottom">
        <div className="mypage-bottom-diaryDrr">
          <DiaryDrrList diaries={MyDiaryData} />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
