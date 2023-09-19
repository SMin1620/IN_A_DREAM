import React, { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Navbar from "../components/features/NavbarComponents/Navbar";
import "./styles/CreateDreamDiaryPage.css";
import Toggle from "../components/common/Toggle";
import Button2 from "../components/common/Button2";

const CreateDreamDiaryPage = () => {
  const [sell, setSell] = useState<boolean>(false);
  const [diaryImage, setDiaryImage] = useState<boolean>(false);
  const [mainText, setMainText] = useState<string>("");

  const inputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleMainText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMainText(e.target.value);
  };

  console.log(mainText);

  const handleCreateImage = () => {
    // 로직처리 후 다이어리 이미지 넣어주기
    setDiaryImage(true);
  };

  return (
    <div>
      <Navbar />
      <div className="create-dream-diary">
        <div
          className={`create-dream-diary-left ${diaryImage ? "on-diary" : ""}`}
        >
          <div className="create-dream-diary-left-top">top</div>
          <div className="create-dream-diary-left-bottom">bottom</div>
        </div>

        <div className="create-dream-diary-right">
          <div className="create-dream-diary-right-head">
            <input type="text" />
            <Toggle />
            <Toggle />
          </div>
          <textarea
            onChange={(e) => handleMainText(e)}
            className="create-dream-diary-textarea"
          />
          <button onClick={handleCreateImage}>그림생성</button>
        </div>
      </div>
    </div>
  );
};

export default CreateDreamDiaryPage;
