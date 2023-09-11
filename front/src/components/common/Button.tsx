import React from "react";
import S from "styled-components";

const StyledButton = S.button`
position: absolute;
bottom: 10%;
right: 10%;
outline: none;
// border: none;
border-radius: 15px;
// color: white;
font-weight: bold;
padding-left: 1rem;
padding-right: 1rem;
background-color:transparent;
height: 2rem;
width: 6rem;
font-size: 1rem;
`;

const Button = () => {
  return <StyledButton>Button</StyledButton>;
};

export default Button;
