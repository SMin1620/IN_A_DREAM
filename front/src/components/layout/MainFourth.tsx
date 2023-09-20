import React from "react";
import "./styles/MainFourth.css";
import ImageSlide from "../features/ImgSlide/ImgSlide";
import { SlideSpan } from "../common/SlideSpan";

const itemData = [
  "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
  "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
  "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
];
const MainFourth = () => {
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
        <div style={{ display: "flex", overflow: "hidden" }}>
          <SlideSpan
            startPosition={-100}
            endPosition={100}
            speed={7}
            width="90%"
          >
            <span>
              <img
                style={{ width: "100px", height: "100px" }}
                src="https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62"
                alt=""
              />
            </span>
            <span>
              <img
                style={{ width: "100px", height: "100px" }}
                src="https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62"
                alt=""
              />
            </span>
            <span>
              <img
                style={{ width: "100px", height: "100px" }}
                src="https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62"
                alt=""
              />
            </span>
            <span>
              <img
                style={{ width: "100px", height: "100px" }}
                src="https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62"
                alt=""
              />
            </span>
          </SlideSpan>
        </div>
        <div>여기는 나중에 위에 슬라이드스팬 크기 조절해서 채우고 없애기</div>
      </div>
    </div>
  );
};

export default MainFourth;
