import { UserResponse } from "../../types/ApiType";
import api1 from "../instances/api1";

export const loginUser = (email: string, password: string) =>
  api1.post(`/api/members/login`, { email, password });

export const createUser = (
  email: string,
  password: string,
  birth: string,
  gender: string,
  nickname: string
) =>
  api1.post(`/api/members/register`, {
    email,
    password,
    birth,
    gender,
    nickname,
  });

export const checkEmailExists = (email: string) =>
  api1.get(`/api/members/email`, { params: { email } });

export const checkNicknameExists = (nickname: string) =>
  api1.get(`/api/members/nickname`, { params: { nickname } });

export const userInfo = (): Promise<UserResponse> => {
  return api1.get(`/api/members`);
};
