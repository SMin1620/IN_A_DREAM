import React, { useState, useEffect } from "react";
import Navbar from "../components/features/NavbarComponents/Navbar";
import Calendar from "../components/features/CalendarComponents/Calendar";
import "./styles/Mypage.css";
import DiaryDrrList from "../components/features/DiaryDrrList/DiaryDrrList";
import { useMyDiaries } from "../hooks/useMyDiary";
import { DiaryInfo } from "../types/ApiType";

const MyPage = () => {
  const [MyDiaryData, setMyDiaryData] = useState<DiaryInfo[]>([]);

  const {
    data: response,
    isLoading,
    error,
  } = useMyDiaries({ page: 0, size: 1 });

  useEffect(() => {
    if (response) {
      console.log(response.data.data);
      setMyDiaryData(response.data.data); // Assuming response.data.data is of type DiaryInfo[]
    }
  }, [response]); // Only run this effect when 'response' changes

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
          <DiaryDrrList diaries={MyDiaryData} />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
