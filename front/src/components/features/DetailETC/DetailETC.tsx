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

  return (
    <div className="detail-etc">
      {!isLiked ? (
        <FavoriteIcon onClick={() => postLiked(diaryId)} />
      ) : (
        <FavoriteBorderIcon onClick={() => postLiked(diaryId)} />
      )}

      <button>구매</button>
      {/* 모달창 떠서 이만큼의 코인이 차감됩니다 하면서 내 코인 보여주면서 깍이기 */}
      {
        // 조건으로 현재 로그인 유저와 소유자 유저 정보가 일치할때 아래 버튼들 보임
        !status ? (
          <span>
            <span>
              <button>공개</button>
              <button>비공개</button>
            </span>
            <span>
              <button>판매</button>
              <button>보관</button>
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
