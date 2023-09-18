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
  textWrap?: string;
}

const StyledBox = S.div<BoxPropsComponents>`
  position: ${(props) => props.position};
  top: ${(props) => props.top}%;
  bottom: ${(props) => props.bottom}%;
  left: ${(props) => props.left}%;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}%;
  text-wrap: ${(props) => props.textWrap};
  
  font-size: 1rem;
  background-color:#C3BAA5;
  border-radius:40px;
  border:none;
  color:#646464;
  z-index:5;
  `;

const Box = (props: BoxPropsComponents) => {
  return <StyledBox {...props}>{props.children}</StyledBox>;
};

export default Box;
