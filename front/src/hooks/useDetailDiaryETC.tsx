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
    diaryId: string | undefined,
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
      if (positivePoint) {
        // 내 소유 긍정포인트가 부족하면 예외처리
      }
      if (neutralPoint) {
        // 내 소유 중립포인트가 부족하면 예외처리
      }
      if (negativePoint) {
        // 내 소유 부정포인트가 부족하면 예외처리
      }
    } catch (error) {
      console.error(error);
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
