import React from "react";
import S from "styled-components";

export interface LogoImg {
  src: string;
  width?: string | number;
  height?: string | number;
  border?: string;
  objectfit?: any;
}

const StyledImg = S.img<LogoImg>`
  src = ${(props) => props.src},
  width = ${(props) => props.width || "10rem"}
  height = ${(props) => props.height || "10rem"}
  border = ${(props) => props.border || "none"}
  object-fit = ${(props) => props.objectfit || "cover"}
`;

const LogoImg: React.FC<LogoImg> = ({
  src,
  width,
  height,
  border,
  objectfit,
}) => {
  return (
    <StyledImg
      src={src}
      width={width}
      height={height}
      border={border}
      objectfit={objectfit}
    />
  );
};

export default LogoImg;
