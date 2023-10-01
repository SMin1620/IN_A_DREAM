import api1 from "../instances/api1";

//  키워드 통계
export const fetchKeywordStatistics = (fromDate: string, toDate: string) =>
  api1.get(`/api/statistic/daily`, {
    params: {
      from: fromDate,
      to: toDate,
    },
  });

//  감정 통계
export const fetchEmotionStatistics = (fromDate: string, toDate: string) =>
  api1.get(`/api/statistic/emotion`, {
    params: {
      from: fromDate,
      to: toDate,
    },
  });

// 일별 전체 감정 통계
export const fetchAllDailyEmotionStatistics = () =>
  api1.get(`/api/statistics/emotion/all/today`);

// 월별 개인 감정 통계
export const fetchIndividualMonthlyEmotionStatistics = (memberId: number) =>
  api1.get(`api/statistics/emotion/${memberId}/month`);

// 사용자 활동기록 통계
export const fetchStaticStrict = () => api1.get("api/statistic/strict");
