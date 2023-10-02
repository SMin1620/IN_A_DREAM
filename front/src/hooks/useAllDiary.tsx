import { useState } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import { fetchAllDiaries } from "../api/services/diaryAPI";
import { DiaryInfo, pageable } from "../types/ApiType";

export const useAllDiary = (pageable: pageable) => {
  return useQuery(["diaries", pageable], () => fetchAllDiaries(pageable));
};

export const useInfiniteAllDiary = (pageable: pageable) => {
  return useInfiniteQuery(
    ["diaries", pageable],
    ({ pageParam = 0 }) => fetchAllDiaries({ ...pageable, page: pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => allPages.length,
    }
  );
};
