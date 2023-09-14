import React from "react";
import S, { keyframes } from "styled-components";

const slideRight = keyframes`
  0% {
    transform: translateX(-300%);
  }
  100% {
    transform: translateX(300%);
  }
`;

const slideLeft = keyframes`
0% {
  transform: translateX(160px);
}
100% {
  transform: translateX(-160px);
}
`;

export interface SlideSpanProps {
  animation?: any;
  delay: string;
  children: React.ReactNode;
  margin?: string;
  width?: string;
  height?: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  backgroundColor?: string;
  speed?: number;
}

export const SlideRightSpan = S.span<SlideSpanProps>`
animation: ${slideRight} ${(props) => props.speed || 3}s linear infinite;
  margin:${(props) => props.margin};
  width:${(props) => props.width};
  height:${(props) => props.height};
  color:${(props) => props.color};
  font-size:${(props) => props.fontSize};
  font-family:${(props) => props.fontFamily};
  background-color:${(props) => props.backgroundColor};
`;

export const SlideLeftSpan = S.span<SlideSpanProps>`
  
animation: ${slideLeft} ${(props) => props.speed || 3}s linear infinite;
  margin:${(props) => props.margin};
  width:${(props) => props.width};
  height:${(props) => props.height};
  color:${(props) => props.color}; 
  font-size :${(prop) => prop.fontSize};
  font-family :${(prop) => prop.fontFamily};
  background-color :${(prop) => prop.backgroundColor};
`;
