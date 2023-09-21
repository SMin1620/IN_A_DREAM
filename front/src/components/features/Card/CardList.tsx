import React from "react";
import Card from "./Card";
import "./styles/CardList.css";
import cloud from "../../../assets/image/cloud.png";

const data = [
  {
    id: 1,
    img: cloud,
  },
  {
    id: 2,
    img: cloud,
  },
  {
    id: 3,
    img: cloud,
  },
];

const CardList = () => {
  return (
    <div className="card-list-wrapper">
      <div className="card-list-row">
        {data.map((d, index) => (
          <Card key={index} id={d.id} img={d.img} index={index} />
        ))}
      </div>
      <div className="card-list-row">
        {data.map((d, index) => (
          <Card key={index} id={d.id} img={d.img} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
