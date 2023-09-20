import React, { useState } from "react";
import Navbar from "../components/features/NavbarComponents/Navbar";
import "./styles/CreateDreamDiaryPage.css";
import CreateDreamDiaryForm from "../components/features/CreateDreamDiary/CreateDreamDiaryForm";

const CreateDreamDiaryPage = () => {
  const [sell, setSell] = useState<boolean>(false);
  const [diaryImage, setDiaryImage] = useState<boolean>(false);

  return (
    <div className="create-dream-diary">
      <Navbar />
      <div className="create-dream-diary-main">
        <div
          className={`create-dream-diary-left ${diaryImage ? "on-diary" : ""}`}
        >
          <div className="create-dream-diary-left-top">top</div>
          <div className="create-dream-diary-left-bottom">bottom</div>
        </div>

        <div className="create-dream-diary-right">
          <CreateDreamDiaryForm setDiaryImage={setDiaryImage} />
        </div>
      </div>
    </div>
  );
};

export default CreateDreamDiaryPage;
