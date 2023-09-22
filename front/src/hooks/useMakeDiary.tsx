import { useState } from "react";
import { createDiary } from "../api/services/diaryAPI";

export interface DiaryData {
  title: string;
  content: string;
  open: boolean;
  sale: boolean;
  image: string | null;
}

const useMakeDiary = () => {
  const [diaryData, setDiaryData] = useState<DiaryData>({
    image: "",
    title: "",
    content: "",
    open: false,
    sale: false,
  });
  // console.log(diaryData);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiaryData({ ...diaryData, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDiaryData({ ...diaryData, content: e.target.value });
  };

  const postDiary = async (diaryData: DiaryData) => {
    try {
      const response = await createDiary(diaryData);
      console.log(response);
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
