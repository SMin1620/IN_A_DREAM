import { useQuery } from "react-query";
import { fetchDiaryWithKeyword } from "../api/services/diaryAPI";

export const useDiarywithKeyword = (keyword: string | undefined) => {
  return useQuery(["diarieswithKeyword", keyword], () =>
    fetchDiaryWithKeyword(keyword)
  );
};
