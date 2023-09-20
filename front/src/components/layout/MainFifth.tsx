import React from "react";
import "./styles/MainFifth.css";
import useKarlo from "../../hooks/useKarlo";

const MainFifth = () => {
  return (
    <div className="MainFifth">
      <div className="FifthTitleBox">
        <h1>DREAM</h1>
        <h1>share your dreams</h1>
      </div>
      <div className="GamsungBox">
        <div className="Gamsungleft">왼쪽감성글</div>
        <div className="Gamsungright">오른쪽감성글</div>
      </div>
      <div className="KeywordImgBox">
        <div className="HappyBox">해피이미지</div>
        <div className="SadBox">새드이미지</div>
        <div className="BalancedBox">발란스이미지</div>
        위에 것들 크기 컴포넌트 만들어서 넣고 맞추기
      </div>
    </div>
  );
};

export default MainFifth;
