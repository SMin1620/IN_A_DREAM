import React, { useState, useEffect } from "react";
import ImgCard, { ImgCardProps } from "../../common/ImgCard";

interface CardDeckProps {
  images: string[];
  imgCardProps?: Omit<ImgCardProps, "image">;
}

const CardDeck: React.FC<CardDeckProps> = ({ images, imgCardProps }) => {
  const [visibleCards, setVisibleCards] = useState<number>(0);
  const [intervalTime, setIntervalTime] = useState<number>(500);
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCards((prevCount) => prevCount + 1);
      setIntervalTime((prevInterval) => Math.max(100, prevInterval * 0.9)); // Decrease interval by 10%, minimum of 100ms
    }, intervalTime);

    return () => clearInterval(timer);
  }, [intervalTime]);

  const deckStyle: React.CSSProperties = {
    position: "relative",
    width: "100px",
    height: "100px",
  };

  return (
    <div style={deckStyle}>
      {images.slice(0, visibleCards).map((image, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `${index * 0.5}px`,
            left: `${index * 0.5}px`,
            transform: `rotate(${(index % 2 === 0 ? index : -index) * 0.5}deg)`, // Alternate between rotating to the left and right
          }}
        >
          <ImgCard image={image} {...imgCardProps} />
        </div>
      ))}
    </div>
  );
};

export default CardDeck;
