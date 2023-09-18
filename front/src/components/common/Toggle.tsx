import S from "styled-components";
import { LoginButton } from "../../types";

export interface ToggleProps extends LoginButton {
  borderRadius?: string;
  padding?: string;
}

const StyledToggleButton = S.button<ToggleProps>`
  background-color: ${(props) => props.backgroundColor};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border: ${(props) => props.border};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  border-radius: ${(props) => props.borderRadius};
`;

const ToggleButton: React.FC<ToggleProps> = ({
  onClick,
  children,
  width,
  height,
  border,
  margin,
  backgroundColor,
  color,
  borderRadius,
  padding,
}) => {
  return (
    <StyledToggleButton
      onClick={onClick}
      width={width}
      height={height}
      border={border}
      margin={margin}
      backgroundColor={backgroundColor}
      color={color}
      borderRadius={borderRadius}
      padding={padding}
    >
      {children}
    </StyledToggleButton>
  );
};

export default ToggleButton;
