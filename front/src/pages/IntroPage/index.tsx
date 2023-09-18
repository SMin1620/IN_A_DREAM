import "./index.css";
import React, { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import bgImage from "../../assets/background/blackBG.jpg";
import moonImg from "../../assets/image/moon.png";
import castleImg from "../../assets/image/castle.png";
import landingImg from "../../assets/image/landing.png";
import hangingImg from "../../assets/image/hanging.png";
import ropeImg from "../../assets/image/rope.png";

// styled-component 정의는 컴포넌트 외부에 위치해야 합니다.
const BackGround = styled.div`
  background-image: url(${bgImage});
  background-repeat: repeat;
  background-size: 100vw 25vh;
  height: 500vh;
  width: 100vw;
  z-index: -1;
  position: absolute;
`;

const Impimg = styled.img`
  height: 180vh;
  width: 4.6vw;
  left: 3vh;
  z-index: 1;
  position: relative;

  &.second {
    @media (max-height: 520px) {
      height: 50vh;
    }
  }
`;

const HangImg = styled.img`
  height: 10vh;
  width: auto;
  top: 25vh;
  left: 50%;
  transform: translateX(-20%);
  z-index: 3;
  position: relative;
  transition: 1.5s;
  // left: 50%;
  // bottom: 0;
`;

const Moon = styled.img.attrs({
  src: moonImg,
})`
  height: 30vh;
  width: auto;
  // left: 50%;
  // transform: translateX(-50%);
  z-index: 1;
  position: relative;
`;
const Castle = styled.img.attrs({
  src: castleImg,
})`
  height: 70vh; // 높이를 자동으로 설정하여 이미지의 원래 비율을 유지합니다.
  width: auto; // 너비도 자동으로 설정합니다.
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  position: absolute;
  z-index: 1;
`;

const LandImg = styled.div`
  background-image: url(${landingImg});
  background-size: cover;
  height: 10vh;
  width: calc(10vh * 226 / 213); /* 비율을 기반으로 width 계산 */
  z-index: 2;
  position: absolute;
  bottom: 0;
  left: 50%;
  opacity: 0;
  transition: 5s;
`;

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden; // 좌우 스크롤을 숨깁니다.
  }
`;

const IntroPage: React.FC = () => {
  // Intro 텍스트가 뷰포트에 보이면 애니메이션 효과 주기 위한 로직들
  // 4개의 div 요소를 위한 refs 생성
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
  const ref6 = useRef<HTMLDivElement>(null);
  const ref7 = useRef<HTMLDivElement>(null);

  const divRefs = [ref1, ref2, ref3, ref4, ref5, ref6, ref7];

  const imageRef = useRef<HTMLImageElement | null>(null);
  const listItemsRef = useRef<NodeListOf<HTMLLIElement> | null>(null);

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
    console.log(
      "document.documentElement.scrollHeight",
      document.documentElement.scrollHeight,
    );

    const observer = new IntersectionObserver(observerCallback);

    divRefs.forEach((divRef) => {
      if (divRef.current) {
        observer.observe(divRef.current);
      }
    });

    let imageStyleChangeStartY = 0;

    if (imageRef.current) {
      imageStyleChangeStartY = imageRef.current.offsetTop;
      const imagePositionVH =
        (imageStyleChangeStartY / window.innerHeight) * 100;
      console.log("imagePositionVH : ", imagePositionVH);
      console.log(imageStyleChangeStartY);
    }

    let startScrollY = 0; // scrollPositionVH가 40이 될 때의 scrollY 값을 저장하기 위한 변수

    const handleScroll = () => {
      console.log(window.scrollY);
      const scrollPositionVH = (window.scrollY / window.innerHeight) * 100;
      console.log("scrollPositionVH : ", scrollPositionVH);

      // 스크롤이 맨 아래에 도달했는지 확인
      const isLanding =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 0.05 * window.innerHeight;

      if (imageRef.current) {
        if (scrollPositionVH >= 40) {
          if (startScrollY === 0) {
            // 처음으로 scrollPositionVH가 40이 되는 순간의 scrollY 값을 저장
            startScrollY = window.scrollY;
          }

          // 현재 scrollY에서 시작 scrollY 값을 뺀 값만큼 이미지를 움직이게 합니다.
          const translateYValue = window.scrollY - startScrollY;
          imageRef.current.style.transform = `translateX(-20%) translateY(${translateYValue}px)`;
        } else if (imageRef.current) {
          // scrollPositionVH 값이 40 미만이 되면 원래대로 돌려놓습니다.
          imageRef.current.style.transform = `translateX(-20%)`;
          startScrollY = 0; // startScrollY 값을 초기화
        }
        // isLanding에 따라 이미지의 opacity를 설정합니다.
        imageRef.current.style.opacity = isLanding ? "0" : "1";
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      divRefs.forEach((divRef) => {
        if (divRef.current) observer.unobserve(divRef.current);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // useEffect 안에 빈 dependency array를 넣어주어 컴포넌트가 마운트될 때만 이벤트 리스너가 등록되게 합니다.

  return (
    <div className="intro">
      <GlobalStyle />
      <BackGround>
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
        <div id="image-wrapper">
          <Moon />
          <Impimg src={ropeImg} alt="img" />
          <Impimg className="second" src={ropeImg} alt="img" />
        </div>
        <HangImg src={hangingImg} alt="img" ref={imageRef} />
        <ul id="list-item-wrapper">
          <div className="introtext" ref={ref1}>
            당신은 어떤 꿈을 꾸셨나요?
          </div>
          <div className="introtext" ref={ref2}>
            아름다운 꿈이었나요, 아니면 조금 무서웠나요?
          </div>
          <div className="introtext" ref={ref3}>
            당신의 꿈은 당신만의 이야기입니다.
          </div>
          <div className="introtext" ref={ref4}>
            그 이야기를 우리와 함께 나누어 보시겠어요?
          </div>
          <div className="introtext" ref={ref5}>
            지금 바로 당신의 꿈일기를 시작하세요!
          </div>
          <div className="introtext" ref={ref6}>
            여러분의 독특한 이야기가 다른 사람들에게도 <br /> 도움이 될 수
            있습니다.
          </div>
        </ul>
        <LandImg ref={ref7} />
        <Castle />
      </BackGround>
    </div>
  );
};

export default IntroPage;
