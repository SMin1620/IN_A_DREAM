import React from "react";
import CardDeck from "../features/CardDeck/CardDeck";
import styled from "styled-components";
import { SlideSpan } from "../common/SlideSpan";
const images = [
  "/card/background1.png",
  "/card/dff.png",
  "/card/ggum3.jpg",
  "/card/igi4_tam5_210723.jpg",
  "/card/background1.png",
  "/card/dff.png",
  "/card/ggum3.jpg",
  "/card/igi4_tam5_210723.jpg",
  "/card/background1.png",
  "/card/dff.png",
  "/card/ggum3.jpg",
  "/card/igi4_tam5_210723.jpg",
  "/card/background1.png",
  "/card/dff.png",
  "/card/ggum3.jpg",
  "/card/igi4_tam5_210723.jpg",
  "/card/background1.png",
  "/card/dff.png",
  "/card/ggum3.jpg",
  "/card/igi4_tam5_210723.jpg",
  "/card/background1.png",
  "/card/dff.png",
  "/card/ggum3.jpg",
  "/card/igi4_tam5_210723.jpg",
  "/card/background1.png",
  "/card/dff.png",
  "/card/ggum3.jpg",
  "/card/igi4_tam5_210723.jpg",
  "/card/ggum3.jpg",
  "/card/igi4_tam5_210723.jpg",
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
            width: "8.1rem",
            height: "8.6rem",
            borderRadius: "10px",
          }}
        />
      </CardDeckWrapper>
    </MainPageIntroDiv>
  );
};
export default MainPageIntro;
