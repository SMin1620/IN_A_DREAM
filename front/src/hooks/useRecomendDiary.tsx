import { useState } from "react";
import { recommendedDiaries } from "../api/services/diaryAPI";
import { DiaryInfo } from "../types/ApiType";

const useRecomendDiary = () => {
  const [recomendDiaryList, setRecomendDiaryList] = useState<
    DiaryInfo[] | null
  >(null);

  const getSimilarDiary = async (diaryId: number) => {
    try {
      const response = await recommendedDiaries(diaryId);
      setRecomendDiaryList(response.data.data);
    } catch (error: any) {
      console.log("현재비슷한일기없어오");
      console.error(error);
    }
  };
  return {
    getSimilarDiary,
    setRecomendDiaryList,
    recomendDiaryList,
  };
};

export default useRecomendDiary;
