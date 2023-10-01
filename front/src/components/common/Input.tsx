import React from "react";
import S from "styled-components";
import { LoginInput } from "../../types/index";

const StyledInput = S.input<LoginInput>`
  background-color: ${(props) => props.backgroundcolor || "white"};
  height: ${(props) => props.height || "3rem"};
  width: ${(props) => props.width || "99%"};
  border: ${(props) => props.border || "1px solid black"};
  margin-bottom: ${(props) => props.marginbottom || "2rem"};
  border-radius: 5px;
  font-size: 1rem;
`;

const Input: React.FC<LoginInput> = ({
  placeholder,
  value,
  type,
  onChange,
  onKeyUp,
  backgroundcolor,
  height,
  width,
  border,
  marginbottom,
}) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
      backgroundcolor={backgroundcolor}
      height={height}
      width={width}
      border={border}
      marginbottom={marginbottom}
    />
  );
};

export default Input;
