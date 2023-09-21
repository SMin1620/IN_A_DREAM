import { useState } from "react";
import { createDiary } from "../api/services/diaryAPI";

interface DiaryData {
  title: string;
  content: string;
  isPublic: boolean;
  sell: boolean;
  imageUrl: string | null;
}

const useMakeDiary = () => {
  const [diaryData, setDiaryData] = useState<DiaryData>({
    title: "",
    content: "",
    isPublic: false,
    sell: false,
    imageUrl: "",
  });
  // console.log(diaryData);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiaryData({ ...diaryData, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDiaryData({ ...diaryData, content: e.target.value });
  };

  const postDiary = async (diaryData: object) => {
    try {
      const response = await createDiary(diaryData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    diaryData,
    handleTitleChange,
    handleContentChange,
    setDiaryData,
    postDiary,
  };
};

export default useMakeDiary;
