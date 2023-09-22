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
  open: boolean;
  sale: boolean;
  createdAt: string;
  emotion: string;
  // 맴버 나중에 타입바꿔주삼
  member: any;
}

export interface UserInfo {
  id: number;
  email: string;
  birth: string;
  gender: string;
  nickname: string;
  positivePoint: number;
  neutralPoint: number;
  negativePoint: number;
  isWrite: number;
}
export interface pageable {
  page: number;
  size: number;
  sort?: string[];
}
