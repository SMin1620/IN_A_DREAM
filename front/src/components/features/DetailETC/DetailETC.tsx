import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DiaryInfo } from "../../../types/ApiType";
import { useSelector } from "react-redux";
import useDetailDiaryETC from "./../../../hooks/useDetailDiaryETC";
import useDetailDiary from "../../../hooks/useDetailDiary";
import "./DetailETC.css";
import Toggle from "../../common/Toggle";

interface OwnProps {
  diaryDetail: DiaryInfo;
  diaryId: number;
}

const DetailETC: React.FC<OwnProps> = ({ diaryDetail, diaryId }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const currentUser = useSelector((state: any) => state.userInfo.data);
  const {
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
  } = useDetailDiaryETC();

  useEffect(() => {
    setSale(diaryDetail.sale);
    setOpen(diaryDetail.open);
    setLikeCount(diaryDetail.likeCount);
  }, [diaryDetail]);

  return (
    <div className="detail-etc">
      {isLiked ? (
        <FavoriteIcon
          onClick={() => postLiked(diaryId)}
          style={{ fontSize: "2.5vw" }}
          className="like-icon"
        />
      ) : (
        <FavoriteBorderIcon
          onClick={() => postLiked(diaryId)}
          style={{ fontSize: "2.5vw" }}
          className="like-icon"
        />
      )}

      <span className="like-count">{likeCount}</span>

      {diaryDetail.owner.id === currentUser.id ? (
        <div></div>
      ) : (
        <>
          {diaryDetail.sale ? (
            <button
              onClick={() => {
                postBuyDiary(
                  diaryDetail,
                  diaryDetail.id,
                  diaryDetail.owner.email,
                  diaryDetail.positivePoint,
                  diaryDetail.neutralPoint,
                  diaryDetail.negativePoint
                );
              }}
              className="etc-buy"
            >
              구 매
            </button>
          ) : (
            <div></div>
          )}
        </>
      )}
      {diaryDetail.owner.id === currentUser.id ? (
        <>
          <Toggle
            AbleColor="#C3BAA5"
            DisableColor="#E9DEC6"
            ToggleType="sell"
            status={sale}
            data1="판  매"
            data2="보  관"
            onClick={() => {
              if (
                diaryId !== undefined &&
                sale !== undefined &&
                open !== undefined
              ) {
                saleStatus(diaryId, sale, open);
              }
            }}
          />

          <Toggle
            AbleColor="#EFBCAE"
            DisableColor="#F6E0DA"
            ToggleType="public"
            status={open}
            data1="공개"
            data2="비공개"
            onClick={() => {
              if (diaryId !== undefined && open !== undefined) {
                visibility(diaryId, open);
              }
            }}
          />
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DetailETC;
