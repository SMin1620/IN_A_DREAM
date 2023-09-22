import React, { useState } from "react";
import styled from "styled-components";
import { useMyDiaries } from "../../../hooks/useMyDiary";

export interface Diary {
  id: number;
  author: string;
  title: string;
  emotion: string[];
  keyword: string;
  imageURL: string;
}

interface DiaryDrrListProps {
  diaries: Diary[];
}

const DiaryContainer = styled.div<{ selected?: boolean }>`
  /* width: 80%;
  height: 5%; */
  overflow: hidden;
  position: relative;
  /* transform-origin: top; // To scale from the top of the div */
  transform: ${(props) => (props.selected ? "scaleY(3)" : "scaleY(1)")};
  /* transition: "transform 0.5s ease-in-out"; */
  background-color: blue; // Light blue color: ;
  margin: 10px;
`;

const Image = styled.img`
  position: absolute;
  top: "0";
  left: "0";
  width: "100%";
  height: "100%";
`;

const DiaryDrrList = ({ diaries }: DiaryDrrListProps) => {
  const [selectedDiaryId, setSelectedDiaryId] = useState<number | null>(null);

  const {
    data: response,
    isLoading,
    error,
  } = useMyDiaries({ page: 0, size: 1 });

  console.log("response", response);
  console.log("isLoading", isLoading);
  console.log("error", error);
  console.log("datadatadatadatadatadatadatadatadatadata");

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
          <p>{diary.author}</p>

          {/* Show image only when the diary is selected */}
          {selectedDiaryId === diary.id && (
            <Image src={diary.imageURL} alt={diary.title} />
          )}
        </DiaryContainer>
      ))}
    </div>
  );
};

export default DiaryDrrList;
