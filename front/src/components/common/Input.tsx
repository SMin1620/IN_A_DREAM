import React from "react";
import S from "styled-components";
import { LoginInput } from "../../types/LoginTypes";

const StyledInput = S.input<LoginInput>`
  background-color: ${(props) => props.backgroundColor || "white"};
  height: ${(props) => props.height || "3rem"};
  width: ${(props) => props.width || "99%"};
  border: ${(props) => props.border || "1px solid black"};
  margin-bottom: ${(props) => props.marginBottom || "2rem"};
`;

const Input: React.FC<LoginInput> = ({
  placeholder,
  value,
  type,
  onChange,
  backgroundColor,
  height,
  width,
  border,
  marginBottom,
}) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      backgroundColor={backgroundColor}
      height={height}
      width={width}
      border={border}
      marginBottom={marginBottom}
    />
  );
};

export default Input;
