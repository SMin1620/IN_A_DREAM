import React, { useState, useEffect } from "react";
import "./styles/MainSecond.css";

const MainSecond = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      let scaleValue = window.scrollY / 600;
      if (scaleValue > 1) scaleValue = 1.35;
      if (scaleValue < 0.5) scaleValue = 0.5;
      setScale(scaleValue);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="MainSecond">
      <div className="VideoBox" style={{ transform: `scale(${scale})` }}>
        <video width="100%" height="100%" autoPlay loop muted>
          <source src="/Video/dreamVideo.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default MainSecond;
