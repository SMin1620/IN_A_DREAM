import React from "react";
import { rerollEmotionImage } from "../api/services/coinAPI";
import Swal from "sweetalert2";

const useRerollCoin = () => {
  const rerollCoin = async () => {
    try {
      const response = await rerollEmotionImage();
      console.log("리롤 성공");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "코인없음",
        text: `우하하하 코인이 모잘라요. 우하하`,
      });

      throw error;
    }
  };
  return { rerollCoin };
};

export default useRerollCoin;
