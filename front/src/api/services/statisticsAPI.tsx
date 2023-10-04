import api1 from "../instances/api1";

//  키워드 통계
export const fetchKeywordStatistics = (fromDate?: string, toDate?: string) => {
  if (fromDate && toDate) {
    return api1.get(`/api/statistic/daily`, {
      params: {
        from: fromDate,
        to: toDate,
      },
    });
  } else {
    return api1.get("/api/statistic/daily");
  }
};

//  감정 통계
export const fetchEmotionStatistics = (fromDate?: string, toDate?: string) => {
  if (fromDate && toDate) {
    return api1.get(`/api/statistic/emotion`, {
      params: {
        from: fromDate,
        to: toDate,
      },
    });
  } else {
    return api1.get("/api/statistic/emotion");
  }
};

// 일별 전체 감정 통계
export const fetchAllDailyEmotionStatistics = () =>
  api1.get(`/api/statistics/emotion/all/today`);

// 개인 감정 통계
export const fetchIndividualEmotionStatistics = (
  fromDate?: string,
  toDate?: string
) => {
  if (fromDate && toDate) {
    return api1.get(`api/statistic/emotion/me`, {
      params: {
        from: fromDate,
        to: toDate,
      },
    });
  } else {
    console.log("여기실행");
    return api1.get("api/statistic/emotion/me");
  }
};

// 개인 키워드 통계
export const fetchIndividualKeywordStatistics = () =>
  api1.get("api/statistic/daily/me");

// 사용자 활동기록 통계
export const fetchStaticStrict = () => api1.get("api/statistic/strict");

// 감정코인과 sale 의 상관관계
export const fetchEmotionCoinAndSalesRelation = () =>
  api1.get("api/statistic/relation");
