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
  height: 300vh;
  width: 100vw;
  z-index: -1;
  position: absolute;
`;

const Impimg = styled.img`
  height: 95vh;
  width: auto;
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
  transition: 1.5s;
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

    const observer = new IntersectionObserver(observerCallback);

    divRefs.forEach((divRef) => {
      if (divRef.current) {
        observer.observe(divRef.current);
      }
    });

    let imageStyleChangeStartY = 0;
    let listStyleChangeEndY = 0;

    if (imageRef.current) {
      imageStyleChangeStartY = imageRef.current.offsetTop;
      const imagePositionVH =
        (imageStyleChangeStartY / window.innerHeight) * 100;
      console.log("imagePositionVH : ", imagePositionVH);
      // listStyleChangeEndY =
      //   imageRef.current.offsetTop + imageRef.current.clientHeight;
      // listItemsRef.current = document.querySelectorAll(".list-item"); // 리스트 아이템들을 참조
      console.log(imageStyleChangeStartY);
      // console.log(listStyleChangeEndY);
    }

    const handleScroll = () => {
      console.log(window.scrollY);
      const scrollPositionVH = (window.scrollY / window.innerHeight) * 100;
      console.log("scrollPositionVH : ", scrollPositionVH);
      const onElement = document.getElementById("on");
      if (onElement) {
        onElement.removeAttribute("id");
      }
      if (
        window.scrollY > imageStyleChangeStartY &&
        window.scrollY < listStyleChangeEndY &&
        listItemsRef.current
      ) {
        const division =
          (listStyleChangeEndY - imageStyleChangeStartY) /
          listItemsRef.current.length;
        const targetIndex = Math.floor(
          (window.scrollY - imageStyleChangeStartY) / division,
        );
        listItemsRef.current[targetIndex].id = "on";
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
