import React, { useState } from "react";
import S from "styled-components";

interface TogglePorps {
  AbleColor: string;
  DisableColor: string;
  setSell?: (value: boolean) => void;
  setIsPublic?: (value: boolean) => void;
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

const Toggle = ({
  AbleColor,
  DisableColor,
  setSell,
  setIsPublic,
}: TogglePorps) => {
  const [status, setStatus] = useState<boolean>(false);
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

  const handleClick = () => {
    const newStatus = !status;
    setStatus(newStatus);

    if (setSell) {
      setSell(newStatus);
    }

    if (setIsPublic) {
      setIsPublic(newStatus);
    }
  };

  return (
    <div>
      <OnButton style={status ? Able : Disable} onClick={handleClick}>
        ON
      </OnButton>
      <OffButton style={status ? Disable : Able} onClick={handleClick}>
        OFF
      </OffButton>
    </div>
  );
};

export default Toggle;
