import api1 from "../instances/api1";

// 월별 전체 카테고리 통계
export const fetchMonthlyCategoryStatistics = () =>
  api1.get(`/api/statistics/category`);

// 월별 전체 감정 통계
export const fetchAllMonthlyEmotionStatistics = () =>
  api1.get(`/api/statistics/emotion/all/month`);

// 일별 전체 감정 통계
export const fetchAllDailyEmotionStatistics = () =>
  api1.get(`/api/statistics/emotion/all/today`);

// 월별 개인 감정 통계
export const fetchIndividualMonthlyEmotionStatistics = (memberId: number) =>
  api1.get(`api/statistics/emotion/${memberId}/month`);
