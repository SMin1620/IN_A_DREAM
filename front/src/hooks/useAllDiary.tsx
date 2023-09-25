import { useState } from "react";
import { useQuery } from "react-query";
import { fetchAllDiaries } from "../api/services/diaryAPI";
import { DiaryInfo, pageable } from "../types/ApiType";

export const useAllDiary = (pageable: pageable) => {
  return useQuery(["diaries", pageable], () => fetchAllDiaries(pageable));
};
