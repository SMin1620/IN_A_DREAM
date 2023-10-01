import { useQuery } from "react-query";
import { fetchMyDiaries } from "../api/services/diaryAPI"; // replace this with the actual path to your api calls file
import { pageable } from "../types/ApiType";
export const useMyDiaries = (pageable: pageable) => {
  return useQuery(["myDiaries", pageable], () => fetchMyDiaries(pageable));
};
