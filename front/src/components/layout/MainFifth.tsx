import React from "react";
import "./styles/MainFifth.css";
import useKarlo from "../../hooks/useKarlo";

const MainFifth = () => {
  return (
    <div className="main-fifth-wrapper">
      <div className="main-fifth-title-box">
        <h1>DREAM</h1>
        <h2>share your dreams</h2>
      </div>
      <div className="main-fifth-gamsung-box">
        <div className="main-fifth-gamsung-left">
          <div className="main-fifth-gamsung-title ">KEEP YOUR DREAM DIARY</div>
          <div>
            Unveil the narratives of your dreamscape, pen down the whimsical
            tales that unfold in the theater of your mind.
          </div>
          <br />
          <br />
          <br />
          <div>PURCHASE A DREAM DIARY</div>
          <div>
            Purchase a dream diary, for who knows? When you buy a good dream,
            perhaps good things may unfold.
          </div>
        </div>
        <div className="main-fifth-gamsung-right">
          Dreams, they are whispers from the subconscious, a mystical blend of
          imagination and memory. They are the echoes of our deepest desires and
          fears, painted on the canvas of our minds. A nocturnal theater where
          reality is reimagined, and every waking thought is transformed into a
          surreal narrative. Dreams are the intimate stories we tell ourselves
          in silence; they're not just figments of sleep but profound
          expressions of our inner selves.
        </div>
      </div>
      <div className="KeywordImgBox">
        <div className="main-fifth-gamsung-more">MORE</div>
        <div className="HappyBox">
          해피이미지
          <span>HAPPY</span>
          해피이미지
        </div>
        <div className="SadBox">
          <span>SAD</span>
          해피이미지
          <span>SAD</span>
        </div>
        <div className="BalancedBox">
          발란스이미지
          <span>BALANCED</span>
          발란스이미지
        </div>
        위에 것들 크기 컴포넌트 만들어서 넣고 맞추기
      </div>
    </div>
  );
};

export default MainFifth;
