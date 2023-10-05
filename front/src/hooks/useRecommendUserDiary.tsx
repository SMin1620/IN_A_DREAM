import React from "react";
import { useQuery } from "react-query";
import { recommendedUserDiaries } from "../api/services/diaryAPI";

export const useRecommendUserDiary = () => {
  return useQuery("recommendUserdiaries", recommendedUserDiaries);
};
