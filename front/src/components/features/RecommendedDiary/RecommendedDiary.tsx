import React, { useEffect } from "react";
import "./RecommendedDiary.css";
import useRecomendDiary from "../../../hooks/useRecomendDiary";
import { DiaryInfo } from "../../../types/ApiType";
import { SERVER_URL } from "../../../constants";
import { SlideSpan } from "../../common/SlideSpan";

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
    <>
      <h1>이 일기와 비슷한 일기들</h1>
      <div className="recommend-diary-box">
        {recomendDiaryList.map((diary: DiaryInfo) => {
          return (
            <span key={diary.id} className="recommend-diary">
              <SlideSpan startposition={1000} endposition={-1200} speed={30}>
                <img
                  src={`${SERVER_URL}/${diary.image}`}
                  alt="비슷한 일기들"
                  className="recommend-diary-image"
                />
                <p>{diary.title}</p>
              </SlideSpan>
            </span>
          );
        })}
      </div>
    </>
  ) : null;
};

export default RecommendedDiary;
