import React, { useEffect, useState } from "react";
import "./styles/MainFourth.css";
import ImageSlide from "../features/ImgSlide/ImgSlide";
import { SlideSpan } from "../common/SlideSpan";
import { useAllDiary } from "../../hooks/useAllDiary";
import { DiaryInfo } from "../../types/ApiType";
const MainFourth = () => {
  const [diaries, setDiaries] = useState<DiaryInfo[]>([]);
  const {
    data: response,
    isLoading,
    error,
  } = useAllDiary({ page: 0, size: 10 });
  useEffect(() => {
    if (response) {
      console.log("폴슾페이지", response.data.data);
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
                    width: index % 2 === 0 ? "400px" : "300px", // 짝수는 100px, 홀수는 150px
                    height: index % 2 === 0 ? "300px" : "400px", // 짝수는 100px, 홀수는 150px
                    borderRadius: 20,
                    margin: "40px",
                  }}
                  src={`http://192.168.30.162:8080/${diary.image}`}
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
