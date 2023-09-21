import { useState } from "react";
import api1 from "../api/instances/api1";

const useMakeDiary = () => {
  const [DiaryData, setDiaryData] = useState(null);

  const createDiary = async (diaryData: object) => {
    try {
      const response = await api1.post(`/api/diary`, diaryData);
      setDiaryData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { DiaryData, createDiary };
};

export default useMakeDiary;
