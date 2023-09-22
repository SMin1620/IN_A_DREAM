import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DiaryInfo } from "../../../types/ApiType";
import useDetailDiaryETC from "./../../../hooks/useDetailDiaryETC";
import "./DetailETC.css";

interface OwnProps {
  diaryDetail: DiaryInfo | undefined;
  diaryId: string | undefined;
}

const DetailETC: React.FC<OwnProps> = ({ diaryDetail, diaryId }) => {
  const [status, setStatus] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { postLiked, visibility, saleStatus } = useDetailDiaryETC();
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

      <button onClick={postBuy} className="etc-buy">
        구매
      </button>
      {/* 모달창 떠서 이만큼의 코인이 차감됩니다 하면서 내 코인 보여주면서 깍이기 */}
      {
        // 조건으로 현재 로그인 유저와 소유자 유저 정보가 일치할때 아래 버튼들 보임
        !status ? (
          <span>
            <span>
              {/* diaryDetail.open 데이터 따라서 className 다르게 설정 */}
              <button
                className={
                  diaryDetail?.open ? "public-able-btn" : "public-disable-btn"
                }
                onClick={() => visibility(diaryId, diaryDetail?.open)}
              >
                공개
              </button>
              <button
                className={
                  diaryDetail?.open ? "public-disable-btn" : "public-able-btn"
                }
                onClick={() => visibility(diaryId, diaryDetail?.open)}
              >
                비공개
              </button>
            </span>
            <span>
              <button
                className={
                  diaryDetail?.sale ? "sale-able-btn" : "sale-disable-btn"
                }
                onClick={() => saleStatus(diaryId, diaryDetail?.sale)}
              >
                판매
              </button>
              <button
                className={
                  diaryDetail?.sale ? "sale-disable-btn" : "sale-able-btn"
                }
                onClick={() => saleStatus(diaryId, diaryDetail?.sale)}
              >
                보관
              </button>
            </span>
          </span>
        ) : (
          <div></div>
        )
      }
    </div>
  );
};

export default DetailETC;
