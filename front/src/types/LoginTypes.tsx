export interface LoginInput {
  type?: string;
  placeholder: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  backgroundColor?: string;
  height?: string;
  width?: string;
  border?: string;
  marginBottom?: string;
}

export interface LoginLabel {
  htmlFor?: string;
  children?: React.ReactNode;
  fontSize?: string;
  fontWeight?: string;
  marginBottom?: string;
}

export interface LoginButton {
  onClick?: (event: React.ChangeEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  border?: string;
  marginBottom?: string;
  backgroundColor?: string;
  color?: string;
}
