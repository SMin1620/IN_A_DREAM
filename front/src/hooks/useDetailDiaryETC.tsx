import React, { useState } from "react";
import { toggleLikeDiary } from "../api/services/diaryAPI";

const useDetailDiaryETC = () => {
  const postLiked = async (diaryId: string | undefined) => {
    try {
      const response = await toggleLikeDiary(diaryId);
    } catch (error) {
      console.error(error);
    }
  };
  return <div></div>;
};

export default useDetailDiaryETC;
