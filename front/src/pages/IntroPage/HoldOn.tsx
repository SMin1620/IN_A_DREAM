import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // react-router-dom을 사용한다고 가정
import styled from "styled-components";

const PreloaderBtn = styled.button`
  position: absolute;
  z-index: 50;
  bottom: 1vh;
  left: 50vw;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: none;
  opacity: 0.5;
  color: rgb(213, 165, 78);
  background-color: rgb(30, 64, 41);
  margin-top: -60px;
  margin-left: -60px;
`;

const PreloaderBtnHold = styled.div`
  font-size: 19px;
  line-height: 20px;
  font-weight: 800;
  letter-spacing: normal;
`;

const HoldOn: React.FC = () => {
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();

  const preloaderHideThreshold = 18;

  const intervalId = useRef<NodeJS.Timeout | number | null>(null);

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null); // 이 참조의 정확한 타입은 해당 요소의 타입에 따라 달라집니다.

  const setPreloaderStyle = (currentScale: number) => {
    if (btnRef.current) {
      btnRef.current.style.transform = `scale(${currentScale})`;
    }
    if (textRef.current) {
      textRef.current.style.opacity = (
        1 -
        (currentScale - 1) / preloaderHideThreshold
      ).toString();
    }
  };

  useEffect(() => {
    setPreloaderStyle(scale);

    if (scale >= 1 + preloaderHideThreshold) {
      navigate("/Login");
      if (intervalId.current !== null) {
        clearInterval(intervalId.current as number); // 타입 assertion 사용
      }
    }
  }, [scale, navigate]);

  const handleMouseDown = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current as number); // 현재 실행 중인 인터벌 정리
    }
    intervalId.current = setInterval(() => {
      setScale((prevScale) => prevScale + 0.175);
    }, 10) as unknown as number; // 새 인터벌 설정
  };

  const handleMouseUp = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current as number); // 타입 assertion 사용
    }
    intervalId.current = setInterval(() => {
      setScale((prevScale) => {
        if (prevScale <= 1) {
          if (intervalId.current !== null) {
            clearInterval(intervalId.current as number); // 타입 assertion 사용
          }
          return 1;
        }
        return prevScale - 0.075;
      });
    }, 10) as unknown as number; // 타입 assertion 사용
  };

  return (
    <div className="preloader">
      <PreloaderBtn
        ref={btnRef} // 참조 연결
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <PreloaderBtnHold ref={textRef}>Dream</PreloaderBtnHold>
      </PreloaderBtn>
    </div>
  );
};

export default HoldOn;
