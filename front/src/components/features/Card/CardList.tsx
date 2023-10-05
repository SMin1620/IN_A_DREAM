import React from "react";
import Card from "./Card";
import "./styles/CardList.css";
import cloud from "../../../assets/image/cloud.png";
import { DiaryInfo } from "../../../types/ApiType";

interface CardListProps {
  diaries: Array<DiaryInfo>;
}

const CardList: React.FC<CardListProps> = (props) => {
  return (
    <div className="card-list-wrapper">
      {props.diaries.map((diary, index) => (
        <Card key={index} index={index} diary={diary} />
      ))}
    </div>
  );
};

export default CardList;
