export interface DiaryInfo {
  content: string;
  createdAt: string;
  emotion: string;
  id: number;
  image: string;
  likeCount: number;
  member: UserInfo;
  myLike: boolean;
  negativePoint: number;
  neutralPoint: number;
  open: boolean;
  owner: UserInfo;
  positivePoint: number;
  sale: boolean;
  title: string;
  positive: number;
  neutral: number;
  negative: number;
  liked: boolean;
}

export interface UserInfo {
  birth: string;
  email: string;
  gender: string;
  id: number;
  isWrite: number; // 오늘 일기 작성 여부
  negativeCoin: number;
  neutralCoin: number;
  nickname: string;
  positiveCoin: number;
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
