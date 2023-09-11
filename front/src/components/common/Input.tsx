import React from "react";
import styled from "styled-components";
import { LoginInput } from "../../types/LoginTypes";

const StyledInput = styled.input<LoginInput>`
  background-color: ${(props) => props.backgroundColor};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border: ${(props) => props.border};
  margin-bottom: ${(props) => props.marginBottom};
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
