import React from "react";
import S, { keyframes } from "styled-components";

export interface SlideSpanProps {
  animation?: any;
  children: React.ReactNode;
  margin?: string;
  width?: string;
  height?: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  backgroundColor?: string;
  speed?: number;
  padding?: string;
  display?: string;
  startposition: number;
  endposition: number;
}

const slide = (startposition: number, endposition: number) => keyframes`
0% {
  transform: translateX(${startposition}%);
}

100% {
  transform: translateX(${endposition}%);
}
`;

export const SlideSpan = S.span<SlideSpanProps>`
  
  animation: ${(props) => slide(props.startposition, props.endposition)} ${(
  props
) => props.speed || 15}s linear infinite;
  margin:${(props) => props.margin};
  width:${(props) => props.width};
  height:${(props) => props.height};
  color:${(props) => props.color}; 
  font-size :${(props) => props.fontSize};
  font-family :${(props) => props.fontFamily};
  background-color :${(props) => props.backgroundColor};
  padding :${(props) => props.padding};
  display :${(props) => props.display};
`;
