import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import bgImage from "../assets/background/blueBG.jpg";
import moonImg from "../assets/image/moon.png";
import castleImg from "../assets/image/castle.png";

// styled-component 정의는 컴포넌트 외부에 위치해야 합니다.
const BackGround = styled.img.attrs({
  src: bgImage,
})`
  height: 400vh;
  width: 100vw;
  z-index: -1;
  position: absolute;
`;
const Wrap = styled.div``;

const Moon = styled.img.attrs({
  src: moonImg,
})`
  height: 100%;
  z-index: 1;
`;
const Castle = styled.img.attrs({
  src: castleImg,
})`
  height: 100%;
  z-index: 1;
`;

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden; // 좌우 스크롤을 숨깁니다.
  }
`;

const IntroPage = () => {
  return (
    <>
      <GlobalStyle />
      <Wrap>
        <BackGround /> 배경 이미지 컴포넌트를 사용합니다.
        <Moon />
        <Castle />
        <Intro>
          IntroPage 당신은 어떤 꿈을 꾸셨나요? “아름다운 꿈이었나요, 아니면 조금
          무서웠나요?" "당신의 꿈은 당신만의 이야기입니다. 그 이야기를 우리와
          함께 나누어 보시겠어요?" "지금 바로 당신의 꿈일기를 시작하세요!
          여러분의 독특한 이야기가 다른 사람들에게도 도움이 될 수 있습니다."
        </Intro>
      </Wrap>
    </>
  );
};

export default IntroPage;

const Intro = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  color: rgb(255, 255, 255);
  font-size: 14px;
  letter-spacing: 3px;
  z-index: 1;
  width: 100%;
`;
