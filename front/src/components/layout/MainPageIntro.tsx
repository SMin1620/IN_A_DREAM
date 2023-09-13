import React from "react";
import ImgCard from "../common/imgCard";
import CardDeck from "../features/cardDeck";
import styled from "styled-components";

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
`;

const CardDeckWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const MainPageIntro = () => {
  return (
    <MainPageIntroDiv>
      <H1>In A DREAM, In A DREAM, In A DREAM</H1>
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
