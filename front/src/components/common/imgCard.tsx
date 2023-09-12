import React from "react";

interface ImgCardProps {
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
