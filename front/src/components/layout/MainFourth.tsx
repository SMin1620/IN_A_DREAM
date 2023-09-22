import React, { useEffect, useState } from "react";
import "./styles/MainFourth.css";
import ImageSlide from "../features/ImgSlide/ImgSlide";
import { SlideSpan } from "../common/SlideSpan";
import { useAllDiary } from "../../hooks/useAllDiary";
import { DiaryInfo } from "../../types/ApiType";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../constants";

const MainFourth = () => {
  const [diaries, setDiaries] = useState<DiaryInfo[]>([]);
  const {
    data: response,
    isLoading,
    error,
  } = useAllDiary({ page: 0, size: 10 });
  const navigate = useNavigate();

  useEffect(() => {
    if (response) {
      setDiaries(response.data.data);
    }
  }, [response]);

  return (
    <div className="MainFourth">
      <div className="FourthTitleBox">
        <h1>COME SEE OUR USERS</h1>
        <h1>DREAM STATISCTICS</h1>
      </div>

      <div className="SeeMoreButtonBox">
        <h1>You CAN SEE MORE STATISTICS</h1>
      </div>

      <div className="StatisticsBox">
        <div className="StatisticsNum">통계 숫자 들어갈곳</div>
        <div className="StatisticsKeyword">키워드 통계 들어갈곳</div>
      </div>

      <div className="MovigImgBox">
        <div
          className="MovingImgs"
          style={{ display: "flex", overflow: "hidden" }}
        >
          <SlideSpan
            startposition={-100}
            endposition={100}
            speed={15}
            width="100%"
            display="flex"
          >
            {diaries.map((diary, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    width: index % 2 === 0 ? "400px" : "300px",
                    height: index % 2 === 0 ? "300px" : "400px",
                    borderRadius: 40,
                    margin: "40px",
                  }}
                  onClick={() => navigate(`/DreamDetail/${diary.id}`)}
                  src={`${SERVER_URL}/${diary.image}`}
                  alt="Diary"
                />
              </div>
            ))}
          </SlideSpan>
        </div>
      </div>
    </div>
  );
};

export default MainFourth;
