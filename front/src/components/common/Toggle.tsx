import React, { useState } from "react";
import S from "styled-components";

const Button = S.button`
  width: 5rem;
  height: 4rem;
  font-size: 2rem;
  text-align: center;
  border: none;
`;

const OnButton = S(Button)`
  border-radius: 1rem 0 0 1rem;
`;

const OffButton = S(Button)`
  border-radius: 0 1rem 1rem 0;
`;

const Able = {
  border: "none",
  backgroundColor: "#e9c980",
  color: "white",
};

const Disable = {
  backgroundColor: "#c3baa5",
  color: "white",
};

const Toggle = () => {
  const [sell, setSell] = useState(false);

  return (
    <div>
      <OnButton style={sell ? Able : Disable} onClick={() => setSell(true)}>
        on
      </OnButton>
      <OffButton style={sell ? Disable : Able} onClick={() => setSell(false)}>
        off
      </OffButton>
    </div>
  );
};

export default Toggle;
