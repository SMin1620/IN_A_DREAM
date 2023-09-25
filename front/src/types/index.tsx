// 그냥 모달 오픈 클로우즈 용도
export interface isModalOpen {
  isNavbarModalOpen: boolean;
  onClose: () => void;
}
export interface LoginInput {
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  backgroundcolor?: string;
  height?: string;
  width?: string;
  border?: string;
  marginbottom?: string;
}

export interface LoginLabel {
  htmlFor?: string;
  children?: React.ReactNode;
  fontsize?: string;
  fontweight?: string;
  marginbottom?: string;
}

export interface LoginButton {
  onClick?: (event: React.ChangeEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  border?: string;
  margin?: string;
  backgroundcolor?: string;
  color?: string;
  borderradius?: string;
}
