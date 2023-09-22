import React, { useState } from "react";
import Navbar from "../components/features/NavbarComponents/Navbar";
import "./styles/CreateDreamDiaryPage.css";
import CreateDreamDiaryForm from "../components/features/CreateDreamDiary/CreateDreamDiaryForm";
import DateForm from "../components/common/DateForm";
import { border } from "./../../node_modules/@mui/system/index.d";

const CreateDreamDiaryPage = () => {
  const [sell, setSell] = useState<boolean>(false);
  const [diaryImage, setDiaryImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="create-dream-diary">
      <Navbar />
      <div className="create-dream-diary-main">
        <div
          className={`create-dream-diary-left ${diaryImage ? "on-diary" : ""}`}
        >
          <div className="create-dream-diary-left-top">
            {imageUrl && <img src={imageUrl} alt="diagram" />}
          </div>
        </div>

        <div className="create-dream-diary-right">
          {/* <div className="date-box">
            <DateForm />
          </div> */}
          <CreateDreamDiaryForm
            setDiaryImage={setDiaryImage}
            setImageUrl={setImageUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateDreamDiaryPage;
