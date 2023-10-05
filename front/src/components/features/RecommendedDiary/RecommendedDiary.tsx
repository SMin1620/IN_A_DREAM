import React, { useEffect } from "react";
import "./RecommendedDiary.css";
import useRecomendDiary from "../../../hooks/useRecomendDiary";
import { DiaryInfo } from "../../../types/ApiType";
import { SERVER_URL } from "../../../constants";
import { SlideSpan } from "../../common/SlideSpan";
import { useNavigate } from "react-router-dom";

interface OwnProps {
  diaryId: number;
}

const RecommendedDiary: React.FC<OwnProps> = ({ diaryId }) => {
  const { getSimilarDiary, recomendDiaryList } = useRecomendDiary();
  const navigate = useNavigate();

  useEffect(() => {
    getSimilarDiary(diaryId);
  }, [diaryId]);

  const handleNavigate = (diaryId: number) => {
    navigate(`/DreamDetail/${diaryId}`);
    window.location.reload();
  };

  return recomendDiaryList ? (
    <div style={{ margin: "5%" }}>
      <h1>이 일기와 비슷한 일기들</h1>
      <div className="recommend-diary-box">
        {recomendDiaryList.map((diary: DiaryInfo) => {
          return (
            <span key={diary.id} className="recommend-diary">
              <SlideSpan startposition={300} endposition={-300} speed={15}>
                <img
                  src={`${SERVER_URL}/${diary.image}`}
                  alt="비슷한 일기들"
                  className="recommend-diary-image"
                  onClick={() => handleNavigate(diary.id)}
                />
                <p>{diary.title}</p>
              </SlideSpan>
            </span>
          );
        })}
      </div>
    </div>
  ) : (
    <h1>비슷한 일기가 없어용</h1>
  );
};

export default RecommendedDiary;
