import React, { useEffect, useState, useContext } from "react";
import "./styles/MainFourth.css";
import ImageSlide from "../features/ImgSlide/ImgSlide";

import { SlideSpan } from "../common/SlideSpan";
import { useAllDiary } from "../../hooks/useAllDiary";
import { DiaryInfo } from "../../types/ApiType";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../constants";

import KeywordCloud from "../features/KeywordCloud/KeywordCloud";

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
      setDiaries(response.data.data.diaryList);
    }
  }, [response]);

  return (
    <div className="main-fourth-wrapper ">
      <div className="main-fourth-title-box">
        <h1 className="title1">COME SEE OUR USERS'</h1>
        <h1 className="title2">DREAM STATISCTICS</h1>
      </div>

      <div className="SeeMoreButtonBox">
        <h1
          className="SeeMoreButton"
          onClick={() => navigate("/alluserstatistics")}
        >
          YOU CAN SEE MORE STATISTICS
        </h1>
      </div>

      <div className="StatisticsBox">
        <div className="StatisticsNum">
          <div className="MyStatistics">
            <div className="MyStatistics-written">총 내가 쓴 일기 개수:1개</div>
            <div className="MyStatistics-transaction">
              내가 거래한 일기 개수:1개
            </div>
          </div>
          <div className="AllUserStatistics">
            <div className="AllUserStatistics-written">
              모든 유저가 쓴 일 기 개수 : {diaries[0]?.id}개
            </div>
            <div className="AllUserStatistics-transaction">
              모든 유저가 거래한 일기 개수:100개
            </div>
          </div>
        </div>
        <div className="StatisticsKeyword">
          <KeywordCloud startDate="2023-08-26" endDate="2023-12-31" />
        </div>
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
            {diaries &&
              diaries.map((diary, index) => (
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
                      width: index % 2 === 0 ? "360px" : "300px",
                      height: index % 2 === 0 ? "300px" : "340px",
                      borderRadius: "40px",
                      margin: "40px",
                      objectFit: "cover",
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
