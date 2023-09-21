// DiaryDrrList.tsx
import React, { useState } from "react";

interface Diary {
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

const DiaryDrrList: React.FC<DiaryDrrListProps> = ({ diaries }) => {
  const [hoveredDiary, setHoveredDiary] = useState<Diary | null>(null);

  const handleMouseEnter = (diary: Diary) => {
    setHoveredDiary(diary);
  };

  const handleMouseLeave = () => {
    setHoveredDiary(null);
  };

  return (
    <div>
      {diaries.map((diary) => (
        <div
          key={diary.id}
          className="diary-item"
          onMouseEnter={() => handleMouseEnter(diary)}
          onMouseLeave={handleMouseLeave}
        >
          <p>작성자: {diary.author}</p>
          <p>제목: {diary.title}</p>
          <p>키워드: {diary.keyword}</p>
          <p>감정: {diary.emotion}</p>
          {/* 이미지를 추가하고, hoveredDiary 상태에 따라 가시성을 제어 */}
          <div className="diary-image">
            {hoveredDiary === diary && (
              <img src={diary.imageURL} alt={`이미지 - ${diary.title}`} />
            )}
          </div>
          {/* 여기에 필요한 다른 정보 표시 */}
        </div>
      ))}
    </div>
  );
};

export default DiaryDrrList;
