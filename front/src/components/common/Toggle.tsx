import React, { useState } from "react";
import S from "styled-components";

interface TogglePorps {
  AbleColor: string;
  DisableColor: string;
}

const Button = S.button`
  width: 4vw;
  height: 5vh;
  font-size: calc(1rem + 0.5vw);
  text-align: center;
  border: none;
  margin: 1rem 0;

  @media (max-width:1024px) {
    width:7vw; 
    height:5vh; 
    font-size:calc(1rem + 0.5vw);
  }
`;

const OnButton = S(Button)`
  border-radius: 1rem 0 0 1rem;
  margin-left: 1rem
`;

const OffButton = S(Button)`
  border-radius: 0 1rem 1rem 0;
  margin-right: 1rem;
`;

const Toggle = ({ AbleColor, DisableColor }: TogglePorps) => {
  const [sell, setSell] = useState(false);
  const Able = {
    border: "none",
    backgroundColor: AbleColor,
    color: "white",
  };

  const Disable = {
    border: "none",
    backgroundColor: DisableColor,
    color: "white",
  };

  return (
    <div>
      <OnButton style={sell ? Able : Disable} onClick={() => setSell(true)}>
        ON
      </OnButton>
      <OffButton style={sell ? Disable : Able} onClick={() => setSell(false)}>
        OFF
      </OffButton>
    </div>
  );
};

export default Toggle;
