import React, { useState } from "react";
import { buyDiary, toggleLikeDiary } from "../api/services/diaryAPI";
import { updateDiaryVisibility } from "../api/services/diaryAPI";
import { updateDiarySaleStatus } from "../api/services/diaryAPI";
import Swal from "sweetalert2";

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

      Swal.fire({
        icon: "success",
        title: "성공",
        text: "구매가 성공적으로 이루어졌습니다!",
      });
      console.log(response.data);
    } catch (error: any) {
      if (error.response && error.response.data.message === "Coin Lack") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "코인이 없어용",
        });
      }
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
