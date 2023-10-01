import { useState } from "react";
import Navbar from "../components/features/NavbarComponents/Navbar";
import "./styles/CreateDreamDiaryPage.css";
import CreateDreamDiaryForm from "../components/features/CreateDreamDiary/CreateDreamDiaryForm";
import DateForm from "../components/common/DateForm";
import { border } from "./../../node_modules/@mui/system/index.d";
import useKarlo from "../hooks/useKarlo";
import useMousePosition from "../hooks/useMousPosition";

const CreateDreamDiaryPage = () => {
  const [sell, setSell] = useState<boolean>(false);
  const [diaryImage, setDiaryImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { KarloimageUrl, fetchData, Karloloading } = useKarlo();
  const { x, y } = useMousePosition();
  console.log(Karloloading);
  console.log("KarloloadingKarloloadingKarloloading");

  return (
    <div className="create-dream-diary">
      <Navbar />
      <div className="create-dream-diary-main">
        <div
          className={`create-dream-diary-left ${diaryImage ? "on-diary" : ""}`}
        >
          <div className="create-dream-diary-left-top">
            {Karloloading ? (
              <p>
                로딩중입니다.로딩중입니다.로딩중입니다.로딩중입니다.로딩중입니다.로딩중입니다.로딩중입니다.로딩중입니다.
              </p>
            ) : (
              imageUrl && <img src={imageUrl} alt="diagram" />
            )}
          </div>
        </div>

        <div className="create-dream-diary-right">
          <div className="create-dream-diary-date-box">
            <DateForm />
          </div>
          <CreateDreamDiaryForm
            setDiaryImage={setDiaryImage}
            setImageUrl={setImageUrl}
            fetchData={fetchData}
            KarloimageUrl={KarloimageUrl}
          />
        </div>
      </div>
      <div
        className="mouse-cursor"
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      ></div>
      <div
        className="mouse-image"
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      ></div>
    </div>
  );
};

export default CreateDreamDiaryPage;
