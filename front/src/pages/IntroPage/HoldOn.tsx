import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // react-router-dom을 사용한다고 가정
import styled from "styled-components";
import castleImg from "../../assets/image/castle.png";

const PreloaderBtn = styled.button`
  position: absolute;
  z-index: 50;
  bottom: 1vh;
  left: 50vw;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: none;
  opacity: 0.7;
  color: #fff;
  transform-origin: center bottom; // 여기를 추가!
  background-color: #f1cf83;
  margin-top: -60px;
  margin-left: -60px;
  text-shadow: 1px 0px #494949, 0px 1px #494949, 1px 0px #494949,
    0px 1px #494949;
`;

const PreloaderBtnHold = styled.div`
  font-size: 19px;
  line-height: 20px;
  font-weight: 800;
  letter-spacing: normal;
`;

const Castle = styled.img.attrs({
  src: castleImg,
})`
  height: 70vh; // 높이를 자동으로 설정하여 이미지의 원래 비율을 유지합니다.
  width: auto; // 너비도 자동으로 설정합니다.
  left: 50%;
  bottom: 0;
  transform: translateX(-49%);
  position: absolute;
  z-index: 1;
`;

const HoldOn: React.FC = () => {
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();

  const preloaderHideThreshold = 10;

  const intervalId = useRef<NodeJS.Timeout | number | null>(null);

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null); // 이 참조의 정확한 타입은 해당 요소의 타입에 따라 달라집니다.
  const imageRef = useRef<HTMLImageElement | null>(null);

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
      setScale((prevScale) => prevScale + 0.075);
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
        <PreloaderBtnHold ref={textRef}>
          IN <br />A <br />
          DREAM
        </PreloaderBtnHold>
        <Castle />
      </PreloaderBtn>
    </div>
  );
};

export default HoldOn;
