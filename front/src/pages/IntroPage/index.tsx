import "./index.css";
import React, { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import bgImage from "../../assets/background/blackBG.jpg";
import moonImg from "../../assets/image/moon.png";
import castleImg from "../../assets/image/castle.png";
// import landingImg from "../assets/image/landing.png";

// styled-component 정의는 컴포넌트 외부에 위치해야 합니다.
const BackGround = styled.div`
  background-image: url(${bgImage});
  background-repeat: repeat;
  height: 400vh;
  width: 100vw;
  z-index: -1;
  position: absolute;
`;

const myli = styled.li`
  margin-top: 500px
  color: white;
  text-align: center;
  opacity: 0;
  transition: all 1s
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
  bottom: 0;
  align: center;
  z-index: 1;
`;

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden; // 좌우 스크롤을 숨깁니다.
  }
`;

const IntroPage: React.FC = () => {
  // 4개의 div 요소를 위한 refs 생성
  const divRefs: React.RefObject<HTMLDivElement>[] = [];
  for (let i = 0; i < 4; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    divRefs.push(useRef<HTMLDivElement>(null));
  }

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // 타입 단언을 사용하여 오류를 수정합니다.
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          target.style.opacity = "1";
        } else {
          target.style.opacity = "0";
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback);

    divRefs.forEach((divRef) => {
      if (divRef.current) observer.observe(divRef.current);
    });

    return () => {
      divRefs.forEach((divRef) => {
        if (divRef.current) observer.unobserve(divRef.current);
      });
    };
  }, []); // useEffect 안에 빈 dependency array를 넣어주어 컴포넌트가 마운트될 때만 이벤트 리스너가 등록되게 합니다.

  return (
    <>
      <GlobalStyle />
      <Wrap>
        <BackGround />
        <div id="intro-main">
          <p>IN</p>
          <p>A</p>
          <p>DREAM</p>
          <p id="join-us-text">Join us!</p>
          <img
            id="down-arrow-icon"
            src="./down-arrow.png"
            alt="down arrow icon"
          ></img>
        </div>
        <ul id="list-item-wrapper">
          <li className="list-item">당신은 어떤 꿈을 꾸셨나요?</li>
          <li className="list-item">
            아름다운 꿈이었나요, 아니면 조금 무서웠나요?
          </li>
          <li className="list-item">당신의 꿈은 당신만의 이야기입니다.</li>
          <li className="list-item">
            그 이야기를 우리와 함께 나누어 보시겠어요?
          </li>
          <li className="list-item">지금 바로 당신의 꿈일기를 시작하세요!</li>
          <li className="list-item">
            여러분의 독특한 이야기가 다른 사람들에게도 도움이 될 수 있습니다.
          </li>
        </ul>
        {/* <Impimg src={landingImg} alt="img" /> */}
        {/* <Moon /> */}
        {/* <Castle /> */}
        {/* <Intro>
          IntroPage 당신은 어떤 꿈을 꾸셨나요? “아름다운 꿈이었나요, 아니면 조금
          무서웠나요?" "당신의 꿈은 당신만의 이야기입니다. 그 이야기를 우리와
          함께 나누어 보시겠어요?" "지금 바로 당신의 꿈일기를 시작하세요!
          여러분의 독특한 이야기가 다른 사람들에게도 도움이 될 수 있습니다."
        </Intro> */}
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

const Impimg = styled.img`
  height: 100%;
`;
