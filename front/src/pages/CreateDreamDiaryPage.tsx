import { useState } from "react";
import Navbar from "../components/features/NavbarComponents/Navbar";
import "./styles/CreateDreamDiaryPage.css";
import CreateDreamDiaryForm from "../components/features/CreateDreamDiary/CreateDreamDiaryForm";
import DateForm from "../components/common/DateForm";
import { border } from "./../../node_modules/@mui/system/index.d";
import useKarlo from "../hooks/useKarlo";
import Loading from "../components/features/LoadingComponents/Loading";
import ProgressiveImage from "react-progressive-graceful-image";
import placeholderSrc from "../assets/background/loading4.png";

const CreateDreamDiaryPage = () => {
  const [sell, setSell] = useState<boolean>(false);
  const [diaryImage, setDiaryImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { KarloimageUrl, fetchData, Karloloading } = useKarlo();

  return (
    <div className="create-dream-diary">
      <Navbar />
      <div className="create-dream-diary-main">
        <div
          className={`create-dream-diary-left ${diaryImage ? "on-diary" : ""}`}
        >
          <div className="create-dream-diary-left-top">
            <ProgressiveImage
              src={imageUrl as string}
              placeholder={placeholderSrc}
            >
              {(src, loading) => (
                <img
                  className={`image${loading ? " loading" : " loaded"}`}
                  src={src}
                  alt="diagram"
                  width="700"
                  height="465"
                />
              )}
            </ProgressiveImage>
            {/* {Karloloading ? (
              <div>
                <Loading />
              </div>
            ) : (
              imageUrl && <img src={imageUrl} alt="diagram" />
            )} */}
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
            imageUrl={imageUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateDreamDiaryPage;
