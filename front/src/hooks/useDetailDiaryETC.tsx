import React, { useState } from "react";
import { toggleLikeDiary } from "../api/services/diaryAPI";
import { updateDiaryVisibility } from "../api/services/diaryAPI";
import { updateDiarySaleStatus } from "../api/services/diaryAPI";

const useDetailDiaryETC = () => {
  const postLiked = async (diaryId: string | undefined) => {
    try {
      const response = await toggleLikeDiary(diaryId);
    } catch (error) {
      console.error(error);
    }
  };

  const visibility = async (diaryId: string, isPublic: boolean) => {
    try {
      const response = await updateDiaryVisibility(diaryId, isPublic);
    } catch (error) {
      console.error(error);
    }
  };

  const saleStatus = async (diaryId: string, isSale: boolean) => {
    try {
      const response = await updateDiarySaleStatus(diaryId, isSale);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    postLiked,
    visibility,
    saleStatus,
  };
};

export default useDetailDiaryETC;
