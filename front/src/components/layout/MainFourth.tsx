import React from "react";
import "./styles/MainFourth.css";
import ImageSlide from "../features/ImgSlide/ImgSlide";

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
        <ImageSlide images={itemData} />
      </div>
    </div>
  );
};

export default MainFourth;
