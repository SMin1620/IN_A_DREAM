import React, { useEffect, useState } from "react";
import "./styles/MainThird.css";
import ImgScrollCardBox from "../features/ImgScrollCardBox/ImgScrollCardBox";
import CardList from "../features/Card/CardList";
import { useAllDiary } from "../../hooks/useAllDiary";
import { DiaryInfo } from "../../types/ApiType";

const MainThird = () => {
  const [diaries, setDiaries] = useState<DiaryInfo[]>([]);

  const {
    data: response,
    isLoading,
    error,
  } = useAllDiary({ page: 0, size: 6 });

  useEffect(() => {
    if (response) {
      console.log(response.data.data);
      setDiaries(response.data.data);
    }
  }, [response]);

  return (
    <div className="main-third-wrapper">
      <h1>STORE</h1>
      <h5>SEE ALL DREAMS</h5>
      <div className="main-third-storeshop">
        {diaries && <CardList diaries={diaries} />}
      </div>
    </div>
  );
};

export default MainThird;
