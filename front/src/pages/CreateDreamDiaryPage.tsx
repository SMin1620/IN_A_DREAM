import React, { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Navbar from "../components/features/NavbarComponents/Navbar";
import "./styles/CreateDreamDiaryPage.css";
import Toggle from "../components/common/Toggle";

const CreateDreamDiaryPage = () => {
  const [sell, setSell] = useState<boolean>(false);
  const [diaryImage, setDiaryImage] = useState(false);

  const inputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

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
          <textarea className="create-dream-diary-textarea" />
          <button onClick={handleCreateImage}>그림생성</button>
        </div>
      </div>
    </div>
  );
};

export default CreateDreamDiaryPage;
