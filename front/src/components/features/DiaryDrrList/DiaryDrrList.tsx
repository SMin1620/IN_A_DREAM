import React, { useState } from "react";
import styled from "styled-components";
import { useMyDiaries } from "../../../hooks/useMyDiary";
import { DiaryInfo } from "../../../types/ApiType";
import { padNumber } from "../../../hooks";
import { SERVER_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";

interface DiaryDrrListProps {
  diaries: DiaryInfo[];
}

const DiaryContainer = styled.div<{ selected?: boolean }>`
  overflow: hidden;
  color: black;
  position: relative;

  padding-top: ${(props) => (props.selected ? "4%" : "1%")};
  padding-bottom: ${(props) => (props.selected ? "4%" : "1%")};

  transition: transform 0.1s ease-in-out;
  margin: 20px;
  z-index: ${(props) => (props.selected ? "2" : "1")};
  transition: padding-top 1s ease-in-out, padding-bottom 1s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  font-size: 1.2rem;
`;

const Image = styled.img`
  position: relative;
  top: 0;
  right: 0;
  width: 50%;
  height: auto;
`;

const DiaryDrrList = ({ diaries }: DiaryDrrListProps) => {
  const [selectedDiaryId, setSelectedDiaryId] = useState<number | null>(null);

  const colors = ["#E9E4D9", "#EFBCAE", "#FF7C7C"];

  const navigate = useNavigate();

  const getColor = (emotion: string) => {
    if (emotion === "POSITIVE") {
      return colors[2];
    } else if (emotion === "NEUTRAL") {
      return colors[1];
    } else {
      // assuming the only remaining emotion is "negative"
      return colors[0];
    }
  };

  return (
    <div className="diary-drrlist-wrapper">
      {diaries.map((diary) => {
        const color = getColor(diary.emotion);

        return (
          <DiaryContainer
            key={diary.id}
            onMouseEnter={() => setSelectedDiaryId(diary.id)}
            onMouseLeave={() => setSelectedDiaryId(null)}
            selected={selectedDiaryId === diary.id}
            style={{ backgroundColor: color }} // Set the background color here
          >
            <div className="diary-drrlist-nickname">
              {diary.member.nickname}
            </div>
            <div className="diary-drrlist-title">{diary.title}</div>
            <div className="diary-drrlist-img">
              {selectedDiaryId === diary.id && (
                <Image
                  src={`${SERVER_URL}/${diary.image}`}
                  onClick={() => navigate(`/DreamDetail/${diary.id}`)}
                ></Image>
              )}
            </div>

            <div className="diary-drrlist-point">
              <div>긍정 : {padNumber(diary.positivePoint)}</div>
              <div>중립 : {padNumber(diary.neutralPoint)}</div>
              <div>부정 : {padNumber(diary.negativePoint)}</div>
            </div>
            <div className="diary-drrlsit-keyword">{diary.emotion}</div>
          </DiaryContainer>
        );
      })}
    </div>
  );
};

export default DiaryDrrList;
