import { useQuery } from "react-query";
import { fetchEmotionSaleCorrelation } from "../api/services/diaryAPI";

const useEmotionSaleCorrelation = () => {
  return useQuery("emotionSaleCorrelation", fetchEmotionSaleCorrelation);
};

export default useEmotionSaleCorrelation;
