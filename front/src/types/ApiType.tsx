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
  owner: any;
}

export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  birth: string;
  gender: string;
  isWrite: number;
  positiveCoin: number;
  negativeCoin: number;
  neutralCoin: number;
}

export interface pageable {
  page: number;
  size: number;
  sort?: string[];
}

// export interface UserState {
//   data: UserInfo;
// }

// export interface RootState {
//   userInfo: UserState;
// }

export interface ApiResponse {
  status: string;
  message: string;
  data: UserInfo;
}
export interface UserResponse {
  data: ApiResponse;
}
