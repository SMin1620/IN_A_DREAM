import React from "react";
import "./styles/MainFifth.css";
import useKarlo from "../../hooks/useKarlo";
import image10 from "../../assets/image/image10.png";
import image9 from "../../assets/image/image9.png";
import image8 from "../../assets/image/image8.png";

const MainFifth = () => {
  return (
    <div className="main-fifth-wrapper">
      <div className="main-fifth-title-box">
        <h1>DREAM</h1>
        <h2>share your dreams</h2>
      </div>
      <div className="main-fifth-gamsung-box">
        <div className="main-fifth-gamsung-left">
          <div className="main-fifth-gamsung-title">
            ● KEEP YOUR DREAM DIARY
          </div>

          <div className="main-fifth-gamsung-content">
            Unveil the narratives of your dreamscape, pen down the whimsical
            tales that unfold in the theater of your mind.
          </div>
          <br />
          <br />
          <br />
          <div className="main-fifth-gamsung-title">
            ● PURCHASE A DREAM DIARY
          </div>

          <div className="main-fifth-gamsung-content">
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
      <div className="main-fifth-keyword-imgbox">
        <div className="main-fifth-gamsung-more">MORE</div>
        <div className="HappyBox">
          <img src={image10} alt="" />
          <span>HAPPY</span>
          <img src={image10} alt="" />
        </div>
        <div className="SadBox">
          <span>SAD</span>
          <img src={image9} alt="" />
          <span>SAD</span>
        </div>
        <div className="BalancedBox">
          <img src={image8} alt="" />
          <span>BALANCED</span>
          <img src={image8} alt="" />
        </div>
      </div>
    </div>
  );
};

export default MainFifth;
