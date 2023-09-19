import React from "react";
import S from "styled-components";
import { LoginButton } from "../../types/index";

const StyledButton = S.button<LoginButton>`
  background-color: ${(props) => props.backgroundColor || "black"};
  height: ${(props) => props.height || "4rem"};
  width: ${(props) => props.width || "100%"};
  border: ${(props) => props.border || "1px solid black"};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color || "white"};

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: lightgray;
    color: black;
    border: none;
  }
`;

const Button2: React.FC<LoginButton> = ({
  onClick,
  children,
  width,
  height,
  border,
  margin,
  backgroundColor,
  color,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      width={width}
      height={height}
      border={border}
      margin={margin}
      backgroundColor={backgroundColor}
      color={color}
    >
      {children}
    </StyledButton>
  );
};

export default Button2;
