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
      <CardDeck />
    </div>
  );
};

export default MainPageIntro;
