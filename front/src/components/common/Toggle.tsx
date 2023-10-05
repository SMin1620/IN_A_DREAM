import React, { useState } from "react";
import S from "styled-components";

interface TogglePorps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  AbleColor: string;
  DisableColor: string;
  ToggleType: "sell" | "public";
  setSell?: (value: boolean) => void;
  setIsPublic?: (value: boolean) => void;
  status?: boolean;
  data1: string;
  data2: string;
}

const Button = S.button`

  width: 4.2vw;
  text-wrap: nowrap;
  height: 5vh;
  font-size: calc(1rem + 0.5vw);
  text-align: center;
  border: none;
  margin: 1rem 0;
  cursor: pointer;
  font-family: "Pretendard Variable";

  @media (max-width:1024px) {
    width:7vw; 
    height:5vh; 
    font-size:calc(1rem + 0.5vw);
  }
`;

const OnButton = S(Button)`
  border-radius: 1rem 0 0 1rem;
  margin-left: 0.1rem;
  font-size:1rem;
  
  @media (max-width:1024px) {
    font-size:0.8rem;
  }
`;

const OffButton = S(Button)`
  border-radius: 0 1rem 1rem 0;
  margin-right: 0.1rem;
  font-size:1rem;
  @media (max-width:1024px) {
    font-size:0.8rem;
  }

`;

const Toggle = ({
  onClick,
  setSell,
  setIsPublic,
  status,
  AbleColor,
  DisableColor,
  ToggleType,
  data1,
  data2,
}: TogglePorps) => {
  const Able = {
    border: "none",
    backgroundColor: AbleColor,
    color: "black",
    fontWeight: "bold",
  };

  const Disable = {
    border: "none",
    backgroundColor: DisableColor,
    color: "white",
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (ToggleType === "sell" && setSell) {
      setSell(!status);
    }
    if (ToggleType === "public" && setIsPublic) {
      setIsPublic(!status);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div>
      <OnButton style={status ? Able : Disable} onClick={handleClick}>
        {data1}
      </OnButton>
      <OffButton style={status ? Disable : Able} onClick={handleClick}>
        {data2}
      </OffButton>
    </div>
  );
};

export default Toggle;
