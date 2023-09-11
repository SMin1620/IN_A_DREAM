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
