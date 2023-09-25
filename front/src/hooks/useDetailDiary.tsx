import { useState } from "react";
import { DiaryData } from "./useMakeDiary";
import { fetchDiaryDetail } from "./../api/services/diaryAPI";
import { DiaryInfo } from "./../types/ApiType";

const useDetailDiary = () => {
  const [diaryDetail, setDiaryDetail] = useState<DiaryInfo>();
  const getDiaryDetail = async (diaryId: number) => {
    try {
      const response = await fetchDiaryDetail(diaryId);
      setDiaryDetail(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getDiaryDetail,
    setDiaryDetail,
    diaryDetail,
  };
};

export default useDetailDiary;
