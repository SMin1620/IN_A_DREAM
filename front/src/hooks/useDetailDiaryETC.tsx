import React, { useState } from "react";
import { buyDiary, toggleLikeDiary } from "../api/services/diaryAPI";
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

  const postBuyDiary = async (
    diaryId: number | undefined,
    sellerEmail: string | undefined,
    positivePoint: number | undefined,
    neutralPoint: number | undefined,
    negativePoint: number | undefined
  ) => {
    try {
      const response = await buyDiary(
        diaryId,
        sellerEmail,
        positivePoint,
        neutralPoint,
        negativePoint
      );
      console.log("거래성공>>>???");
      console.log(response);
    } catch (error) {
      console.error(error);
      console.log("머고");
    }
  };

  const visibility = async (
    diaryId: string | undefined,
    isPublic: boolean | undefined
  ) => {
    try {
      const response = await updateDiaryVisibility(diaryId, isPublic);
    } catch (error) {
      console.error(error);
    }
  };

  const saleStatus = async (
    diaryId: string | undefined,
    isSale: boolean | undefined
  ) => {
    try {
      console.log("눌림");
      const response = await updateDiarySaleStatus(diaryId, isSale);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    postLiked,
    visibility,
    saleStatus,
    postBuyDiary,
  };
};

export default useDetailDiaryETC;
