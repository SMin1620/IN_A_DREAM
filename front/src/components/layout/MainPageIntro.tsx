import React from "react";
import styles from "./styles/MainPageIntro.module.css";

interface CardProps {
  image: string;
}

const Card: React.FC<CardProps> = ({ image }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt="card" />
    </div>
  );
};

const CardStack: React.FC = () => {
  const images = [
    "/card/background1.png",
    "/card/dff.png",
    "/card/igi4_tam5_210723.jpg",

    // ...더 많은 이미지들
  ];

  return (
    <div className={styles.cardStack}>
      {images.map((image, index) => (
        <Card key={index} image={image} />
      ))}
    </div>
  );
};

export default CardStack;
