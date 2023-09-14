import "./index.css";
import React, { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import bgImage from "../../assets/background/blackBG.jpg";
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

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden; // 좌우 스크롤을 숨깁니다.
  }
`;

const IntroPage = () => {
  const listItemWrapperRef = useRef<HTMLUListElement | null>(null);
  const listItemsRef = useRef<NodeListOf<HTMLLIElement> | null>(null);

  useEffect(() => {
    let listStyleChangeStartY = 0;
    let listStyleChangeEndY = 0;

    if (listItemWrapperRef.current) {
      listStyleChangeStartY = listItemWrapperRef.current.offsetTop - 283;
      listStyleChangeEndY =
        listItemWrapperRef.current.offsetTop +
        listItemWrapperRef.current.clientHeight;
      listItemsRef.current = document.querySelectorAll(".list-item"); // 리스트 아이템들을 참조
      console.log(listStyleChangeStartY);
      console.log(listStyleChangeEndY);
    }

    const handleScroll = () => {
      console.log(window.scrollY);
      const onElement = document.getElementById("on");
      if (onElement) {
        onElement.removeAttribute("id");
      }
      if (
        window.scrollY > listStyleChangeStartY &&
        window.scrollY < listStyleChangeEndY &&
        listItemsRef.current
      ) {
        const division =
          (listStyleChangeEndY - listStyleChangeStartY) /
          listItemsRef.current.length;
        const targetIndex = Math.floor(
          (window.scrollY - listStyleChangeStartY) / division,
        );
        listItemsRef.current[targetIndex].id = "on";
      }
    };

    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 unmount될 때 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // useEffect 안에 빈 dependency array를 넣어주어 컴포넌트가 마운트될 때만 이벤트 리스너가 등록되게 합니다.

  return (
    <>
      <GlobalStyle />

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
      <ul id="list-item-wrapper" ref={listItemWrapperRef}>
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
