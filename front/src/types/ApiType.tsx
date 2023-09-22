export interface DiaryInfo {
  id: number;
  title: string;
  createUser: string;
  createdAt: string;
  positive: number;
  neutral: number;
  negative: number;
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
