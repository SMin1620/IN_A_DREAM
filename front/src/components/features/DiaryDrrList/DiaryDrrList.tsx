import React, { useState } from "react";
import styled from "styled-components";
import { useMyDiaries } from "../../../hooks/useMyDiary";
import { DiaryInfo } from "../../../types/ApiType";

interface DiaryDrrListProps {
  diaries: DiaryInfo[];
}

const DiaryContainer = styled.div<{ selected?: boolean }>`
  /* width: 80%;
  height: 5%; */
  overflow: hidden;
  position: relative;
  /* transform-origin: top; // To scale from the top of the div */
  transform: ${(props) => (props.selected ? "scaleY(3)" : "scaleY(1)")};
  transition: transform 0.1s ease-in-out;
  background-color: blue; // Light blue color: ;
  margin: 20px;
  z-index: ${(props) => (props.selected ? "2" : "1")};
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
`;

const DiaryDrrList = ({ diaries }: DiaryDrrListProps) => {
  const [selectedDiaryId, setSelectedDiaryId] = useState<number | null>(null);

  return (
    <div>
      {diaries.map((diary) => (
        <DiaryContainer
          key={diary.id}
          onMouseEnter={() => setSelectedDiaryId(diary.id)}
          onMouseLeave={() => setSelectedDiaryId(null)}
          selected={selectedDiaryId === diary.id}
        >
          <h3>{diary.title}</h3>
          {/* <p>{diary.author}</p> */}

          {/* Show image only when the diary is selected */}
          {selectedDiaryId === diary.id && (
            <Image src={diary.image} alt={diary.title} />
          )}
        </DiaryContainer>
      ))}
    </div>
  );
};

export default DiaryDrrList;
