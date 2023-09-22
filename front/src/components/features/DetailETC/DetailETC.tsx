import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DiaryInfo } from "../../../types/ApiType";

interface OwnProps {
  diaryDetail: DiaryInfo | undefined;
}

const DetailETC: React.FC<OwnProps> = ({ diaryDetail }) => {
  const [status, setStatus] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const putLiked = () => {
    console.log("테스트");
  };

  const putDisliked = () => {
    console.log("테스트2");
  };

  return (
    <div>
      {!isLiked ? (
        <FavoriteIcon onClick={putDisliked} />
      ) : (
        <FavoriteBorderIcon onClick={putLiked} />
      )}

      <div>구매버튼</div>
      {/* 모달창 떠서 이만큼의 코인이 차감됩니다 하면서 내 코인 보여주면서 깍이기 */}
      {
        // 조건으로 현재 로그인 유저와 소유자 유저 정보가 일치할때 아래 버튼들 보임
        !status ? (
          <div>
            <div>공개/비공개</div>
            <div>판매/보관</div>
          </div>
        ) : (
          <div></div>
        )
      }
    </div>
  );
};

export default DetailETC;
