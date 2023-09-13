import React from "react";
import ImgCard from "../common/imgCard";
import CardDeck from "../features/cardDeck";

const MainPageIntro = () => {
  return (
    <div>
      <ImgCard
        image="/card/dff.png"
        width="8rem"
        height="16rem"
        border="3px solid black"
        borderRadius="20px"
      />
      <CardDeck
        images={[
          "/card/background1.png",
          "/card/dff.png",
          "/card/ggum3.jpg",
          "/card/igi4_tam5_210723.jpg",
          "/card/background1.png",
          "/card/dff.png",
          "/card/ggum3.jpg",
        ]}
        imgCardProps={{
          width: "8rem",
          height: "16rem",
          border: "3px solid black",
          borderRadius: "20px",
        }}
      />
    </div>
  );
};

export default MainPageIntro;
