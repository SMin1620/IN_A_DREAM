import React from "react";
import ImgCard from "../common/imgCard";
import styled, { keyframes, css } from "styled-components";

const images = [
  "/card/background1.png",
  "/card/dff.png",
  "/card/ggum3.jpg",
  "/card/igi4_tam5_210723.jpg",
  // 나머지 이미지 경로들...
];

const appear = keyframes`
from {
    transform: translateZ(-100px);
}

to {
    transform: translateZ(0);
}
`;

interface CardProps {
  index: number;
}

const CardWrapper = styled.div`
  display: flex;
  flexdirection: column-reverse;
  alignitems: center;
  position: relative;
  perspective: 1200px;
`;

const StyledCard = styled.div<CardProps>`
  position: absolute;
  top: ${(props) => `${props.index * 10}px`};
  z-index: ${(props) => `${props.index}`};
  animation: ${(props) =>
    css`
      ${appear} ${(props.index + 1) * 0.5}s ease-in-out forwards
    `};
  transform-style: preserve-3d;
`;

const CardDeck = () => {
  return (
    <CardWrapper>
      {images.map((image, index) => (
        <StyledCard key={index} index={index}>
          <ImgCard
            image={image}
            width="8rem"
            height="16rem"
            border="3px solid black"
            borderRadius="20px"
          />
        </StyledCard>
      ))}
    </CardWrapper>
  );
};

export default CardDeck;
