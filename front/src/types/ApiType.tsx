export interface DiaryInfo {
  id: number;
  image: string;
  title: string;
  content: string;
  positive: number;
  neutral: number;
  negative: number;
  positivePoint: number;
  neutralPoint: number;
  negativePoint: number;
  likeCount: number;
  open: Boolean;
  sale: Boolean;
  createdAt: string;
  emotion: string;
  member: object;
}

export interface UserInfo {
  email: string;
  password: string;
  birth: string;
  gender: string;
  nickname: string;
  positivePoint: number;
  neutralPoint: number;
  negativePoint: number;
  today: boolean;
}
