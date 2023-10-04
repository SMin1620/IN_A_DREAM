import { useState } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import { fetchAllDiaries } from "../api/services/diaryAPI";
import { DiaryInfo, pageable } from "../types/ApiType";

export const useAllDiary = (pageable: pageable) => {
  return useQuery(["diaries", pageable], () => fetchAllDiaries(pageable), {
    staleTime: 60 * 1000, // 1 분
  });
};

export const useInfiniteDiary = (pageable: pageable) => {
  return useInfiniteQuery(
    ["infiniteDiaries", pageable],
    ({ pageParam = 0 }) => fetchAllDiaries({ ...pageable, page: pageParam }),
    {
      staleTime: 60 * 1000,
      getNextPageParam: (lastPage) => {
        // 현재 페이지가 마지막 페이지보다 작으면 다음 페이지 번호를 반환
        if (lastPage.data.data.currPage + 1 < lastPage.data.data.totalPage) {
          return lastPage.data.data.currPage + 1;
        }
        //  첫 번째 페이지로 돌아감
        else {
          return 0;
        }
      },
    }
  );
};
