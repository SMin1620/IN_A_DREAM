import React from "react";
import styled from "styled-components";
import { LoginLabel } from "../../types/LoginTypes";

const StyledLabel = styled.label<LoginLabel>`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  margin-bottom: ${(props) => props.marginBottom};
`;

const Label: React.FC<LoginLabel> = ({
  htmlFor,
  children,
  fontSize,
  fontWeight,
  marginBottom,
}) => {
  return (
    <StyledLabel
      htmlFor={htmlFor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      marginBottom={marginBottom}
    >
      {children}
    </StyledLabel>
  );
};

export default Label;
