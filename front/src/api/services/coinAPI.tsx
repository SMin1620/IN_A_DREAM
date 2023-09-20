import api1 from "../instances/api1";

//감정 토큰 조회
export const fetchEmotionTokens = (memberId: number) =>
  api1.get(`/api/emotion/${memberId}`);
//감정 토큰 교환
export const exchangeEmotionTokens = (
  memberId: number,
  send: { positivePoint: number; neutralPoint: number; negativePoint: number },
  receive: {
    positivePoint: number;
    neutralPoint: number;
    negativePoint: number;
  }
) =>
  api1.post(`/api/emotion/exchange`, {
    memberId,
    send,
    receive,
  });
//감정 토큰 리롤
export const rerollEmotionImage = (memberId: number) =>
  api1.post("/api/emotion/reroll", { memberId });
