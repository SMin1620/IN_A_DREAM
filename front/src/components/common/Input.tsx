import React from "react";
import styled from "styled-components";
import { LoginInput } from "../../types/LoginTypes";

const Input: React.FC<LoginInput> = ({
  placeholder,
  value,
  type,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
