import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buyDiary, toggleLikeDiary } from "../api/services/diaryAPI";
import { updateDiaryVisibility } from "../api/services/diaryAPI";
import { updateDiarySaleStatus } from "../api/services/diaryAPI";
import Swal from "sweetalert2";
import { DiaryInfo } from "./../types/ApiType";
import useDetailDiary from "./useDetailDiary";

const useDetailDiaryETC = () => {
  const [likeCount, setLikeCount] = useState<number>();
  const [sale, setSale] = useState<boolean>();
  const [open, setOpen] = useState<boolean>();
  const [isLiked, setIsLiked] = useState<boolean>();
  const { setDiaryDetail } = useDetailDiary();
  const navigate = useNavigate();

  const postLiked = async (diaryId: number) => {
    try {
      const response = await toggleLikeDiary(diaryId);
      console.log(response);
      setLikeCount(response.data.data.likeCount);
      setIsLiked(response.data.data.liked);
    } catch (error) {
      console.error(error);
    }
  };

  const postBuyDiary = async (
    diaryDetail: DiaryInfo,
    diaryId: number,
    sellerEmail: string,
    positivePoint: number,
    neutralPoint: number,
    negativePoint: number
  ) => {
    if (diaryDetail.sale) {
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
        }).then(() => window.location.reload());
      } catch (error: any) {
        if (error.response && error.response.data.message === "Coin Lack") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "코인이 없어용",
          }).then(() => navigate("/main"));
          // 코인 교환소로 가게 설정하기
        }
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "구매할 수 없는 일기입니다!",
        text: "정보가 변경되었습니다.",
      }).then(() => window.location.reload());
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

  const saleStatus = async (diaryId: number, sale: boolean, open: boolean) => {
    if (open === false) {
      Swal.fire({
        icon: "warning",
        title: "변경이 불가능 합니다!",
        text: "비공개 상태일 때는 판매여부를 판매로 설정할 수 없습니다!!",
      });
    } else {
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
    isLiked,
    setIsLiked,
  };
};

export default useDetailDiaryETC;
