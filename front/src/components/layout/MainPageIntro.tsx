import React from "react";
import CardDeck from "../features/CardDeck/CardDeck";
import styled from "styled-components";
import { SlideSpan } from "../common/SlideSpan";

const images = [
  "/card/image1.jpg",
  "/card/image2.jpg",
  "/card/image3.jpg",
  "/card/image4.jpg",
  "/card/image5.jpg",
  "/card/image6.jpg",
  "/card/image7.jpg",
  "/card/image8.jpg",
  "/card/image9.jpg",
  "/card/image10.jpg",
  "/card/image11.jpg",
  "/card/image12.jpg",
  "/card/image13.jpg",
  "/card/image14.jpg",
  "/card/image15.jpg",
  "/card/image16.jpg",
  "/card/image17.jpg",
  "/card/image18.jpg",
  "/card/image19.jpg",
  "/card/image20.jpg",
  "/card/image21.png",
];

const MainPageIntroDiv = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const H1 = styled.h1`
  color: white;
  position: absolute;
  display: flex;
  white-space: nowrap;
`;

const CardDeckWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const MainPageIntro = () => {
  return (
    <MainPageIntroDiv>
      <H1>
        <SlideSpan startposition={-100} endposition={100} speed={8} width="90%">
          <span className="navbar-font5">IN A DREAM</span>
          <span>{"   "}</span>
          <span className="navbar-font2">IN A DREAM</span>
          <span>{"    "}</span>
          <span className="navbar-font6">IN A DREAM</span>
          <span>{"    "}</span>
        </SlideSpan>
      </H1>
      <CardDeckWrapper>
        <CardDeck
          images={images}
          imgCardProps={{
            // width: "8.1rem",
            // height: "8.6rem",
            // borderRadius: "10px",
            width: "20rem",
            height: "20rem",
            borderRadius: "20px",
          }}
        />
      </CardDeckWrapper>
    </MainPageIntroDiv>
  );
};
export default MainPageIntro;
