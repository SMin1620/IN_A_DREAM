import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TypeAnimation } from "react-type-animation";
import CardSplit from "../features/CardSplit/CardSplit";
import { motion } from "framer-motion";

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
  font-size: calc(10em + 1vw);
  line-height: 0.8;
  color: #e9e4d9;
  @media (max-width: 768px) {
    font-size: calc(5em + 1vw);
  }
`;

const CardWrapper = styled(motion.div)<OverlayProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  width: 100vw;
  height: 100vh;
`;

const MainStart = () => {
  const [showOverlayText, setShowOverlayText] = useState(false);
  const [showCardSplit, setShowCardSplit] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowOverlayText(true);
    }, 4000); // Change this to control the delay

    const timer2 = setTimeout(() => {
      setShowCardSplit(true);
    }, 6000); // Show CardSplit after this delay

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
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

      {showCardSplit && (
        <CardWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: showCardSplit ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardSplit />
        </CardWrapper>
      )}
    </MainStartDiv>
  );
};

export default MainStart;
