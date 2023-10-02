import React, { useEffect, useState } from "react";
import "./styles/MainThird.css";
import ImgScrollCardBox from "../features/ImgScrollCardBox/ImgScrollCardBox";
import CardList from "../features/Card/CardList";
import { useAllDiary } from "../../hooks/useAllDiary";
import { DiaryInfo } from "../../types/ApiType";
import { Link } from "react-router-dom";

const MainThird = () => {
  const [diaries, setDiaries] = useState<DiaryInfo[]>([]);

  const {
    data: response,
    isLoading,
    error,
  } = useAllDiary({ page: 0, size: 9 });

  useEffect(() => {
    if (response) {
      setDiaries(response.data?.data?.diaryList);
    }
  }, [response]);

  return (
    <div className="main-third-wrapper">
      <Link to="/Dreamshop" className="main-third-box">
        <h1>SHOP</h1>
        <h5>SEE ALL DREAMS</h5>
      </Link>

      <div className="main-third-storeshop">
        {diaries && <CardList diaries={diaries} />}
      </div>
    </div>
  );
};

export default MainThird;
