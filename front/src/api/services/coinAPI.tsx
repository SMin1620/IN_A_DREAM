import api1 from "../instances/api1";

//감정 토큰 조회
export const fetchEmotionTokens = (memberId: number) =>
  api1.get(`/api/emotion/${memberId}`);
//감정 토큰 교환
export const exchangeEmotionTokens = (feeling: string, pay: number) =>
  api1.post(`/api/exchange`, {
    kind: feeling,
    coin: pay,
  });
//감정 토큰 리롤
export const rerollEmotionImage = (memberId: number) =>
  api1.post("/api/emotion/reroll", { memberId });
