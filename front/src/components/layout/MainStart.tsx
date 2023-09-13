import React from "react";
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

// const H1 = styled.h1`
//   font-size: 13.5rem;
//   @media (max-width: 768px) {
//     font-size: 6rem;
//   }
// `;

const MainStart = () => {
  return (
    <MainStartDiv>
      {/* <H1>
        IN <br /> A <br /> DREAM
      </H1> */}
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          "IN \n A \n DREAM",
          1000, // wait 1s before replacing "Mice" with "Hamsters"
          "IN \n A \n DREAM IN \n A \n DREAM",
          1000,
          "IN \n A \n DREAMIN \n A \n DREAMIN \n A \n DREAMIN \n A \n DREAM",
          1000,
          "IN\nA\nDREAM",
          1000,
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: "10em", display: "inline-block", color: "white" }}
      />
    </MainStartDiv>
  );
};

export default MainStart;
