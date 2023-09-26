import React, { useContext } from "react";
import "./styles/MainFifth.css";
import image10 from "../../assets/image/image10.png";
import image9 from "../../assets/image/image9.png";
import image8 from "../../assets/image/image8.png";
import image4 from "../../assets/image/image4.jpg";
import image6 from "../../assets/image/image6.jpg";
import image7 from "../../assets/image/image7.png";

import { Link } from "react-router-dom";

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
        {/* <div className="main-fifth-box"> */}
        <Link to={`/gallery/positivePoint`} className="main-fifth-box">
          <img src={image7} alt="happyimg1" />
          <span>HAPPY</span>
          <img src={image6} alt="happyimg2" />
        </Link>
        {/* </div> */}
        <hr />
        <Link to={`/gallery/negativePoint`} className="main-fifth-box">
          {/* <div className="main-fifth-box"> */}
          <span>SAD</span>
          <img src={image9} alt="sadimg" />
          <span>SAD</span>
        </Link>

        {/* </div> */}
        <hr />
        <Link to={`/gallery/neutralPoint`} className="main-fifth-box">
          {/* <div className="main-fifth-box"> */}
          <img src={image4} alt="" />
          <span>BALANCED</span>
          <img src={image8} alt="" />
        </Link>

        {/* </div> */}
      </div>
    </div>
  );
};

export default MainFifth;
