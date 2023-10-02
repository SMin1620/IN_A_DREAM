import React from "react";
import S from "styled-components";

interface BoxPropsComponents {
  position: string;
  top?: number;
  bottom?: number;
  left?: number;
  width: number;
  height: number;
  children?: React.ReactNode;
  textwrap?: string;
  open?: boolean;
  ismobile?: boolean;
}

const StyledBox = S.div<BoxPropsComponents>`
  position: ${(props) => props.position};
  top: ${(props) => props.top}%;
  bottom: ${(props) => props.bottom}%;
  left: ${(props) => (props.open ? "0" : "-80")}%;

  width: ${(props) => (props.ismobile ? "100" : props.width)}%;
  height: ${(props) => props.height}%;
  text-wrap: ${(props) => props.textwrap};

  // 모바일
  transform: ${(props) =>
    props.ismobile
      ? `translateY(${props.open ? "-10%" : "-100%"})`
      : `translateX(${props.open ? "0" : "-100%"})`};

  transition: transform 1s ease-in-out;

  font-size: 1rem;
  background-color: #C3BAA5;
  border-radius: 40px;
  border: none;
  color: #646464;
  z-index: 5;
  `;

const Box = ({ ismobile, ...otherProps }: BoxPropsComponents) => {
  return (
    <StyledBox ismobile={ismobile} {...otherProps}>
      {otherProps.children}
    </StyledBox>
  );
};
export default Box;
