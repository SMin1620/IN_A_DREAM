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
      <div className="만들떄바구쎄요">
        <h1>COME SEE OUR USERS</h1>
        <h1>DREAM STATISCTICS</h1>
        <h5>네번째 페이지 상점페이지입니다요</h5>

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
      </div>
    </div>
  );
};

export default MainFourth;
