import React, { useEffect, useState } from "react";
import cloud from "../../../assets/image/cloud.png";
import "./styles/Card.css";
import DateBox from "../../common/DateBox";
import { DiaryInfo } from "../../../types/ApiType";

interface CardProps {
  diary: DiaryInfo;
  index: number;
}

const Card: React.FC<CardProps> = (props) => {
  const [scrollY, setScrollY] = useState<number>(props.index * 10);
  //   const [scrollY, setScrollY] = useState<number>(props.index);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollNum = window.scrollY;
    const remScrollY = parseFloat((scrollNum / 160).toFixed(2));

    setScrollY(remScrollY);
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너를 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const translateY = -(scrollY - 15);
  const cardStyle = {
    transform: `translateY(${translateY}rem)`,
  };

  return (
    <div className="card-wrapper" style={cardStyle}>
      <img src={cloud} alt="" style={{ width: "20vw" }} />
      <div className="card-date">
        <DateBox>{props.diary.createdAt}</DateBox>
      </div>
      <div className="card-content">
        <div className="card-nickname">{props.diary.member.nickname}</div>
        <div className="card-title">{props.diary.title}</div>
      </div>
    </div>
  );
};

export default Card;
