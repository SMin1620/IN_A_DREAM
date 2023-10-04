import React, { useState, useEffect } from "react";
import Toggle from "../../common/Toggle";
import "./CreateDreamDiaryForm.css";
import useKarlo from "../../../hooks/useKarlo";
import Swal from "sweetalert2";
import useMakeDiary from "../../../hooks/useMakeDiary";
import useGPT from "../../../hooks/useGPT";
import useRerollCoin from "../../../hooks/useRerollCoin";

interface OwnProps {
  setDiaryImage: (value: boolean) => void;
  setImageUrl: (url: string | null) => void;
  fetchData: (prompt: string) => Promise<string | null>;
  KarloimageUrl: string | null;
  imageUrl: string | null;
}

const CreateDreamDiaryForm: React.FC<OwnProps> = ({
  setDiaryImage,
  setImageUrl,
  fetchData,
  KarloimageUrl,
  imageUrl,
}: OwnProps) => {
  const {
    diaryData,
    handleTitleChange,
    handleContentChange,
    setDiaryData,
    postDiary,
  } = useMakeDiary();

  // const { KarloimageUrl, fetchData } = useKarlo();
  const [sell, setSell] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [post, setPost] = useState<boolean>(false);

  const { GPTresponse, GPTloading, fetchGPTData } = useGPT();

  const { rerollCoin } = useRerollCoin();

  const handleCreateImage = async () => {
    // 로직처리 후 다이어리 이미지 넣어주기
    console.log("클릭했음");
    setDiaryImage(true);
    setImageUrl(null);

    if (diaryData.content && diaryData.title) {
      const gptResult = await fetchGPTData(diaryData.content);

      if (gptResult !== null) {
        const finalResponse =
          "Cute, Pastel tone, Animation, Fantasy " + gptResult;
        console.log(finalResponse);
        fetchData(finalResponse).then(setImageUrl);
      }
    } else if (!diaryData.title) {
      Swal.fire({
        icon: "error",
        title: "그림생성에 실패하였습니다!",
        text: "제목을 입력후 다시 시도해 주세요!",
      });
    } else if (!diaryData.content) {
      Swal.fire({
        icon: "error",
        title: "그림생성에 실패하였습니다!",
        text: "내용을 입력후 다시 시도해 주세요!",
      });
    }
  };

  const saveDiary = () => {
    setDiaryData((prev) => ({
      ...prev,
      sale: sell,
      open: isPublic,
      image: KarloimageUrl,
    }));
    setPost(true);
  };

  useEffect(() => {
    if (post === true) {
      postDiary(diaryData);
    }
  }, [post]);

  const showCoinDeductionAlert = () => {
    Swal.fire({
      title: "코인 차감",
      text: "다시 생성 시 코인이 5개씩 차감됩니다. 계속하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니오",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await rerollCoin();
          handleCreateImage();
        } catch (error) {
          console.error(error);
          // 이미지 생성하지 않고 에러 처리
        }
      }
    });
  };

  return (
    <div className="create-dream-diary-form">
      <div className="create-dream-diary-form-top">
        <input
          type="text"
          placeholder="제목을 입력하세요."
          onChange={handleTitleChange}
        />
        <div className="create-dream-diary-form-toggle-box">
          <div>
            <div className="create-dream-diary-form-label-box"></div>
            <Toggle
              AbleColor="#C3BAA5"
              DisableColor="#E9DEC6"
              ToggleType="sell"
              status={sell}
              setSell={setSell}
              data1="판  매"
              data2="보  관"
            />
          </div>
          <div>
            <div className="create-dream-diary-form-label-box"></div>
            {!sell ? (
              <Toggle
                AbleColor="#EFBCAE"
                DisableColor="#F6E0DA"
                ToggleType="public"
                status={isPublic}
                setIsPublic={setIsPublic}
                data1="공  개"
                data2="비공개"
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <textarea
        onChange={handleContentChange}
        className="create-dream-diary-form-textarea"
        placeholder="내용을 입력해 주세요."
      />
      <div className="create-dream-diary-form-button-box">
        {imageUrl ? (
          <div>
            <button
              className="create-diary-form-button"
              onClick={showCoinDeductionAlert}
            >
              다시생성
            </button>
            <button className="create-diary-form-button" onClick={saveDiary}>
              저장하기
            </button>
          </div>
        ) : (
          <button
            className="create-diary-form-button"
            onClick={handleCreateImage}
          >
            그림생성
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateDreamDiaryForm;
