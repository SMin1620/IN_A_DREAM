import { useQuery } from "react-query";
import { fetchEmotionStatistics } from "../api/services/statisticsAPI";

export const useEmotionStatistics = (fromDate?: string, toDate?: string) => {
  return useQuery(["EmotionStatistics", fromDate, toDate], () =>
    fetchEmotionStatistics(fromDate, toDate)
  );
};
