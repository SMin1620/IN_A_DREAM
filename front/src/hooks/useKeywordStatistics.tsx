import { useQuery } from "react-query";
import { fetchKeywordStatistics } from "../api/services/statisticsAPI";

export const useKeywordStatistics = (fromDate: string, toDate: string) => {
  return useQuery(["KeywordStatistics", fromDate, toDate], () =>
    fetchKeywordStatistics(fromDate, toDate)
  );
};
