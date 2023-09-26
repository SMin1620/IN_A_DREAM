import React, { useEffect } from "react";
import useRecomendDiary from "../../../hooks/useRecomendDiary";
import { DiaryInfo } from "../../../types/ApiType";

interface OwnProps {
  diaryId: number;
}

const RecommendedDiary: React.FC<OwnProps> = ({ diaryId }) => {
  const { getSimilarDiary, recomendDiaryList } = useRecomendDiary();

  useEffect(() => {
    console.log(diaryId);
    console.log("실행됨");
    getSimilarDiary(diaryId);
  }, [diaryId]);

  console.log(recomendDiaryList);

  return recomendDiaryList ? (
    <div>
      {recomendDiaryList.map((diary: DiaryInfo) => {
        return <div key={diary.id}>{diary.image}</div>;
      })}
    </div>
  ) : null;
};

export default RecommendedDiary;
