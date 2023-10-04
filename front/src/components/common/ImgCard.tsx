import React, { useEffect, useState } from "react";

export interface ImgCardProps {
  image: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  border?: string;
  objectFit?: any;
}

const ImgCard: React.FC<ImgCardProps> = ({
  image,
  width = "100px",
  height = "100px",
  borderRadius = "0",
  border = "none",
  objectFit = "cover",
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 768);
    });
  }, []);

  if (isMobile) {
    borderRadius = "8px";
    width = "20vw";
    height = "15vw";
  }

  const cardStyle: React.CSSProperties = {
    width,
    height,
    borderRadius,
    border,
    objectFit,
  };

  return <img src={image} style={cardStyle} alt="" />;
};

export default ImgCard;
