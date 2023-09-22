import { useState } from "react";
import { fetchAllDiaries } from "../api/services/diaryAPI";
import { DiaryInfo } from "../types/ApiType";

const useAllDiary = () => {
  const [diaries, setDiaries] = useState<Array<DiaryInfo>>([]);

  const handleGetAllDiary = async () => {
    console.log("다이어리 다 불러오기 함수 실행");

    try {
      const response = await fetchAllDiaries();
      // console.log(response.data.data);
      setDiaries(response.data.data);
      console.log("성공");
    } catch (error) {
      console.log(error);
    }
  };

  return { handleGetAllDiary, diaries };
};

export default useAllDiary;
