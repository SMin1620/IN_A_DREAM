import React, { useState, useEffect } from "react";
import { buyDiary, toggleLikeDiary } from "../api/services/diaryAPI";
import { updateDiaryVisibility } from "../api/services/diaryAPI";
import { updateDiarySaleStatus } from "../api/services/diaryAPI";
import Swal from "sweetalert2";

const useDetailDiaryETC = () => {
  const [likeCount, setLikeCount] = useState<number>();
  const [sale, setSale] = useState<boolean>();
  const [open, setOpen] = useState<boolean>();

  const postLiked = async (diaryId: number) => {
    try {
      const response = await toggleLikeDiary(diaryId);
      setLikeCount(response.data.data.likeCount);
    } catch (error) {
      console.error(error);
    }
  };

  const postBuyDiary = async (
    diaryId: number,
    sellerEmail: string,
    positivePoint: number,
    neutralPoint: number,
    negativePoint: number
  ) => {
    try {
      const response = await buyDiary(
        diaryId,
        sellerEmail,
        positivePoint,
        neutralPoint,
        negativePoint
      );
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

  const visibility = async (diaryId: number, open: boolean) => {
    try {
      const response = await updateDiaryVisibility(diaryId, !open);
      setOpen(response.data.data.open);
      Swal.fire({
        icon: "success",
        title: "공개여부가 변경되었습니다!",
        text: `공개여부가 ${!open ? "공개" : "비공개"} 로 변경되었습니다.`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const saleStatus = async (diaryId: number, sale: boolean) => {
    try {
      const response = await updateDiarySaleStatus(diaryId, !sale);
      setSale(response.data.data.sale);
      Swal.fire({
        icon: "success",
        title: "판매여부가 변경되었습니다!",
        text: `판매여부가 ${!sale ? "판매" : "보관으"}로 변경되었습니다.`,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return {
    postLiked,
    visibility,
    saleStatus,
    postBuyDiary,
    setLikeCount,
    likeCount,
    setOpen,
    open,
    setSale,
    sale,
  };
};

export default useDetailDiaryETC;
