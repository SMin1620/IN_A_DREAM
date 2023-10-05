import { useState } from "react";
import { createDiary } from "../api/services/diaryAPI";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export interface DiaryData {
  title: string;
  content: string;
  open: boolean;
  sale: boolean;
  image: string | null;
}

const useMakeDiary = () => {
  const navigate = useNavigate();
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
    console.log(diaryData);
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
      });

      Swal.showLoading();

      const response = await createDiary(diaryData);
      console.log("반응", response.data.data);

      Swal.close();

      const { neutralPoint, positivePoint, negativePoint } = response.data.data;

      await Swal.fire({
        title: "Coins 획득!",
        html: `
        <p style="font-size: 1.2em">HAPPY COIN <strong>${positivePoint}</strong>개 획득</p>
          <p style="font-size: 1.2em">SOSO COIN <strong>${neutralPoint}</strong>개 획득</p>
          <p style="font-size: 1.2em">SAD COIN <strong>${negativePoint}</strong>개 획득</p>
        `,
        icon: "success",
      });

      navigate(`/DreamDetail/${response.data.data.id}`);
    } catch (error) {
      Swal.close();
      console.error(error);

      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Spark BOOM!",
      });
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
