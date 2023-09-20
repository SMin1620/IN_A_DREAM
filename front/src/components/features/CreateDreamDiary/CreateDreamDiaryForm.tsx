import React, { useState } from "react";
import Toggle from "../../common/Toggle";
import "./CreateDreamDiaryForm.css";

interface OwnProps {
  setDiaryImage: (value: boolean) => void;
}

const CreateDreamDiaryForm = ({ setDiaryImage }: OwnProps) => {
  const [mainText, setMainText] = useState<string>("");
  console.log(mainText);

  const inputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleMainText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMainText(e.target.value);
  };

  const handleCreateImage = () => {
    // 로직처리 후 다이어리 이미지 넣어주기
    setDiaryImage(true);
  };
  return (
    <div className="create-dream-diary-form">
      <div className="create-dream-diary-form-top">
        <input type="text" placeholder="제목을 입력하세요" />
        <div className="create-dream-diary-form-toggle-box">
          <Toggle AbleColor="#C3BAA5" DisableColor="#E9DEC6" />
          <Toggle AbleColor="#EFBCAE" DisableColor="#F6E0DA" />
        </div>
      </div>
      <textarea
        onChange={(e) => handleMainText(e)}
        className="create-dream-diary-form-textarea"
        placeholder="내용을 입력해 주세요"
      />
      <button onClick={handleCreateImage}>그림생성</button>
    </div>
  );
};

export default CreateDreamDiaryForm;
