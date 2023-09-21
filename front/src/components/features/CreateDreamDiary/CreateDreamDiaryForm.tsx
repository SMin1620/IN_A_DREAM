import React, { useState } from "react";
import Toggle from "../../common/Toggle";
import "./CreateDreamDiaryForm.css";
import useKarlo from "../../../hooks/useKarlo";
import Label from "./../../common/Label";
import Swal from "sweetalert2";

interface OwnProps {
  setDiaryImage: (value: boolean) => void;
  setImageUrl: (url: string | null) => void;
}

const CreateDreamDiaryForm = ({ setDiaryImage, setImageUrl }: OwnProps) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [mainText, setMainText] = useState<string | null>();
  const { imageUrl, fetchData } = useKarlo();
  const [sell, setSell] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);

  const inputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleMainText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMainText(e.target.value);
  };

  const handleCreateImage = () => {
    // 로직처리 후 다이어리 이미지 넣어주기
    if (mainText) {
      fetchData(mainText).then(setImageUrl);
      setDiaryImage(true);
      setClicked(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "그림생성에 실패하였습니다!",
        text: "내용을 입력후 다시 시도해 주세요!",
      });
    }
  };

  const postDiary = () => {
    // API 연동하기
  };

  console.log(sell, isPublic);
  return (
    <div className="create-dream-diary-form">
      <div className="create-dream-diary-form-top">
        <input type="text" placeholder="제목을 입력하세요" />
        <div className="create-dream-diary-form-toggle-box">
          <div>
            <div className="create-dream-diary-form-label-box">
              <Label marginBottom="0">판매</Label>
              <Label marginBottom="0">보관</Label>
            </div>
            <Toggle
              AbleColor="#C3BAA5"
              DisableColor="#E9DEC6"
              setSell={setSell}
            />
          </div>
          <div>
            <div className="create-dream-diary-form-label-box">
              <Label marginBottom="0">공개</Label>
              <Label marginBottom="0">비공개</Label>
            </div>
            <Toggle
              AbleColor="#EFBCAE"
              DisableColor="#F6E0DA"
              setIsPublic={setIsPublic}
            />
          </div>
        </div>
      </div>
      <textarea
        onChange={(e) => handleMainText(e)}
        className="create-dream-diary-form-textarea"
        placeholder="내용을 입력해 주세요"
      />
      <div className="create-dream-diary-form-button-box">
        {clicked ? (
          <div>
            <button
              className="create-diary-form-button"
              onClick={handleCreateImage}
            >
              다시생성
            </button>
            <button className="create-diary-form-button" onClick={postDiary}>
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
