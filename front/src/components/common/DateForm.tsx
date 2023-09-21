import React from "react";
import S from "styled-components";
import { LoginButton } from "../../types/index";

const StyledDate = S.div<LoginButton>`
background-color: ${(props) => props.backgroundColor}
height: ${(props) => props.height}
width: ${(props) => props.width}
border: ${(props) => props.border}
margin: ${(props) => props.margin}
color: ${(props) => props.color}  
border-radius: ${(props) => props.borderRadius};
`;

const DateForm: React.FC<LoginButton> = ({
  width,
  height,
  border,
  backgroundColor,
  borderRadius,
  color,
  margin,
}) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0");

  return (
    <StyledDate
      width={width}
      height={height}
      border={border}
      margin={margin}
      color={color}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
    >
      {`${year}.${month}.${day}`}
    </StyledDate>
  );
};

export default DateForm;
