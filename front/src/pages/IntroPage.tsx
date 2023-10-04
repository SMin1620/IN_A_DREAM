import "./styles/IntroPage.css";
import React, { useState, useEffect, useRef } from "react";
import HoldOn from "../components/features/IntroComponents/HoldOn";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import bgImage from "../assets/background/blackBG.jpg";
import moonImg from "../assets/image/moon.png";
import landingImg from "../assets/image/landing.png";
import hangingImg from "../assets/image/hanging.png";
import ropeImg from "../assets/image/rope.png";
import { useNavigate } from "react-router";

const backWhiteAnimation = keyframes`
  from {
    opacity: 0;
    background-color: transparent;
    z-index: 4;
  }
  to {
    opacity: 1;
    background-color: white;
    z-index: 15;
  }
`;

const landAnimation = keyframes`
  from {
    opacity: 1;
    left: 53%;
  }
  to {
    opacity: 0;
    left: 48%;
  }
`;

// styled-component 정의는 컴포넌트 외부에 위치해야 합니다.
const BackGround = styled.div`
  background-image: url(${bgImage});
  background-repeat: repeat;
  background-size: 100vw 25vh;
  height: 500vh;
  width: 100vw;
  z-index: -5;
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
      height: 200vh;
    }
  }
`;

const HangImg = styled.img`
  height: 10vh;
  width: auto;
  top: 25vh;
  transform: translateX(30%);
  z-index: 3;
  position: relative;
  transition: 1.5s;
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

type ShowProps = {
  show: boolean;
};

const LandImg = styled.div<ShowProps>`
  background-image: url(${landingImg});
  background-size: cover;
  height: 10vh;
  width: calc(10vh * 226 / 213); /* 비율을 기반으로 width 계산 */
  z-index: 2;
  position: absolute;
  bottom: 0;
  left: 53%;
  opacity: 0;
  transition: 5s;
  animation: ${(props) =>
    props.show
      ? css`
          ${landAnimation} 3s ease-out forwards
        `
      : "none"};
`;

const GlobalStyle = createGlobalStyle`
body {
  overflow-x: hidden; // 좌우 스크롤을 숨깁니다.
}
`;

type FadeProps = {
  fade: boolean;
};

const Overlay = styled.div<FadeProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 4; // 다른 요소들보다 위에 위치하도록 z-index 설정
  animation: ${(props) =>
    props.fade
      ? css`
          ${backWhiteAnimation} 3s ease-out forwards
        `
      : "none"};
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

  const holdOnRef = useRef<HTMLDivElement>(null);

  const divRefs = [ref1, ref2, ref3, ref4, ref5, ref6, ref7];

  const imageRef = useRef<HTMLImageElement | null>(null);

  const navigate = useNavigate();

  const [fade, setFade] = useState(false);

  const [showLandImg, setShowLandImg] = useState(false);

  const handleSkip = () => {
    setFade(true);

    // 3초 후 (애니메이션이 완료된 후)에 네비게이션을 수행합니다.
    setTimeout(() => {
      navigate("/Login");
    }, 3000); // 애니메이션 지속 시간과 동일하게 설정합니다.
  };

  useEffect(() => {
    const handleMouseDown = () => {
      setShowLandImg(true);
    };
    const handleMouseUp = () => {
      setShowLandImg(false);
    };

    const holdOnElement = holdOnRef.current;
    if (holdOnElement) {
      holdOnElement.addEventListener("mousedown", handleMouseDown);
      holdOnElement.addEventListener("mouseup", handleMouseUp);
    }

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
      document.documentElement.scrollHeight
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
          imageRef.current.style.transform = `translateX(30%) translateY(${translateYValue}px)`;
        } else if (imageRef.current) {
          // scrollPositionVH 값이 40 미만이 되면 원래대로 돌려놓습니다.
          imageRef.current.style.transform = `translateX(30%)`;
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
      if (holdOnElement) {
        holdOnElement.removeEventListener("mousedown", handleMouseDown);
        holdOnElement.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, []); // useEffect 안에 빈 dependency array를 넣어주어 컴포넌트가 마운트될 때만 이벤트 리스너가 등록되게 합니다.

  return (
    <div className="intro">
      <GlobalStyle />
      <BackGround>
        <button className="skip" onClick={handleSkip}>
          {/* <div className="skip-wrapper"> */}
          <p>Skip &gt; &gt;</p>
          {/* <img
            id="leftRight"
            src="./skip-arrow.png"
            alt="skip arrow icon"
          ></img> */}
          {/* </div> */}
        </button>
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
            오늘 당신은 어떤 꿈을 꾸셨나요?
          </div>
          <div className="introtext" ref={ref2}>
            아름다운 꿈이었나요, 아니면 조금 무서웠나요?
          </div>
          <div className="introtext" ref={ref3}>
            당신의 꿈, 그것은 당신만의 독특한 이야기입니다.
          </div>
          <div className="introtext" ref={ref4}>
            그 이야기를 우리와 함께 나누어 보시겠어요?
          </div>

          <div className="introtext" ref={ref5}>
            여러분이 기록하는 각각의 이야기가 다른 사람들에게도
            <br />
            작은 위안과 공감, 그리고 힘이 될 수 있습니다.
          </div>
          <div className="introtext" ref={ref6}>
            지금 바로, 당신만의 꿈을 적어보세요.
            <br />
            여러분의 소중한 꿈일기를 시작하세요!
          </div>
        </ul>
        <div id="hold-on">
          <p id="dream-text">HOLD ON!</p>
          <img
            id="down-arrow-icon"
            src="./down-arrow.png"
            alt="down arrow icon"
          ></img>
        </div>
        <HoldOn ref={holdOnRef} />
        <Overlay fade={fade} />
        <LandImg show={showLandImg} ref={ref7} />
        {/* <Castle /> */}
      </BackGround>
    </div>
  );
};

export default IntroPage;
