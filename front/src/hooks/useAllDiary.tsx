import { useState } from "react";
import { fetchAllDiaries } from "../api/services/diaryAPI";

const useAllDiary = () => {
  const handleGetAllDiary = async () => {
    console.log("다이어리 다 불러오기 함수 실행");

    try {
      const response = await fetchAllDiaries();
      console.log(response);
      console.log("성공");
    } catch (error) {
      console.log(error);
      console.log("실패");
    }
  };

  return { handleGetAllDiary };
};

export default useAllDiary;
