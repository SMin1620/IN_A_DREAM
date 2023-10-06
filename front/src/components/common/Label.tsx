import React from "react";
import styled from "styled-components";
import { LoginLabel } from "../../types/index";

const StyledLabel = styled.label<LoginLabel>`
  font-size: ${(props) => props.fontsize || "1rem"};
  font-weight: ${(props) => props.fontweight || "bold"};
  margin-bottom: ${(props) => props.marginbottom || "2rem"};
`;

const Label: React.FC<LoginLabel> = ({
  htmlFor,
  children,
  fontsize,
  fontweight,
  marginbottom,
}) => {
  return (
    <StyledLabel
      htmlFor={htmlFor}
      fontsize={fontsize}
      fontweight={fontweight}
      marginbottom={marginbottom}
    >
      {children}
    </StyledLabel>
  );
};

export default Label;
