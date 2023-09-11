import React from "react";
import S from "styled-components";

interface ButtonPropsComponent {
  position: string;
  bottom?: number;
  top?: number;
  right?: number;
  left?: number;
}

const StyledButton = S.button<ButtonPropsComponent>`
position: ${(props) => props.position}%;
top: ${(props) => props.top}%;
bottom: ${(props) => props.bottom}%;
right: ${(props) => props.right}%;
left: ${(props) => props.left}%;


outline: none;
border-radius: 15px;
font-weight: bold;
padding-left: 1rem;
padding-right: 1rem;
background-color:transparent;

height: 2rem;
width: 6rem;
font-size: 1rem;
`;

const Button = (props: ButtonPropsComponent) => {
  return <StyledButton {...props}>Button</StyledButton>;
};

export default Button;
