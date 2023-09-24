import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DiaryInfo } from "../../../types/ApiType";
import useDetailDiaryETC from "./../../../hooks/useDetailDiaryETC";
import "./DetailETC.css";
import Toggle from "../../common/Toggle";

interface OwnProps {
  diaryDetail: DiaryInfo | undefined;
  diaryId: string | undefined;
}

const DetailETC: React.FC<OwnProps> = ({ diaryDetail, diaryId }) => {
  const [sale, setSale] = useState<boolean | undefined>(diaryDetail?.sale);
  const [open, setOpen] = useState<boolean | undefined>(diaryDetail?.open);
  const [status, setStatus] = useState<boolean>(false); // 페이지 접속한 유저정보로 대체
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { postLiked, visibility, saleStatus, postBuyDiary } =
    useDetailDiaryETC();
  const postBuy = () => {
    console.log("구매요청 보내기");
  };

  return (
    <div className="detail-etc">
      {!isLiked ? (
        <FavoriteIcon onClick={() => postLiked(diaryId)} />
      ) : (
        <FavoriteBorderIcon onClick={() => postLiked(diaryId)} />
      )}
      <div>{diaryDetail && diaryDetail?.likeCount}</div>

      {
        // 페이지 접속 유저에 따라 일기의 주인은 버튼들 안보여주기
        !status ? (
          <>
            <button
              // onClick={() =>
              //   postBuyDiary(
              //     diaryId,
              //     sellerEmail,
              //     diaryDetail?.positivePoint,
              //     diaryDetail?.neutralPoint,
              //     diaryDetail?.negativePoint
              //   )
              // }
              className="etc-buy"
            >
              구매
            </button>

            <Toggle
              AbleColor="#C3BAA5"
              DisableColor="#E9DEC6"
              ToggleType="sell"
              setSell={setSale}
              data1="판  매"
              data2="보  관"
              onClick={() => {
                saleStatus(diaryId, sale);
                setSale(!sale);
              }}
            />

            <Toggle
              AbleColor="#EFBCAE"
              DisableColor="#F6E0DA"
              ToggleType="public"
              setIsPublic={setOpen}
              data1="공개"
              data2="비공개"
              onClick={() => {
                visibility(diaryId, open);
                setOpen(!open);
              }}
            />
          </>
        ) : (
          <div></div>
        )
      }
    </div>
  );
};

export default DetailETC;
