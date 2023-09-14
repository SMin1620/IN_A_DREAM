import React from "react";
import styled from "styled-components";
import { LoginLabel } from "../../types/index";

const StyledLabel = styled.label<LoginLabel>`
  font-size: ${(props) => props.fontSize || "1rem"};
  font-weight: ${(props) => props.fontWeight || "bold"};
  margin-bottom: ${(props) => props.marginBottom || "2rem"};
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
