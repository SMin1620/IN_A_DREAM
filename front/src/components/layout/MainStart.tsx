import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TypeAnimation } from "react-type-animation";

const MainStartDiv = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 102vh; // make it full screen
`;

const ResponsiveTypeAnimation = styled(TypeAnimation)`
  white-space: pre-line;
  font-size: calc(1.5em + 1vw); // dynamic font size based on viewport width
  display: inline-block;
  color: white;

  @media (max-width: 768px) {
    font-size: calc(1em + 1vw);
  }
`;

interface OverlayProps {
  show?: boolean;
}

const OverlayText = styled.span<OverlayProps>`
  position: absolute;
  z-index: ${(props) => (props.show ? "2" : "-1")};
  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: 0.5s ease-in-out;
  font-size: calc(7em + 1vw);
  line-height: 0.8;
  color: #e9e4d9;
  @media (max-width: 768px) {
    font-size: calc(5em + 1vw);
  }
`;

const MainStart = () => {
  const [showOverlayText, setShowOverlayText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlayText(true);
    }, 4000); // Change this to control the delay

    return () => clearTimeout(timer);
  }, []);
  return (
    <MainStartDiv>
      <ResponsiveTypeAnimation
        sequence={[
          "What was your dream\nlast night?\nShare your dreams here!",
          500,
        ]}
        wrapper="span"
        speed={50}
      />
      <OverlayText show={showOverlayText}>
        IN
        <br />A<br />
        DREAM
      </OverlayText>
    </MainStartDiv>
  );
};

export default MainStart;
