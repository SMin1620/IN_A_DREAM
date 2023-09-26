import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useDetailDiary from "../hooks/useDetailDiary";
import "./styles/DreamDetailPage.css";
import Navbar from "../components/features/NavbarComponents/Navbar";
import DateForm from "../components/common/DateForm";
import negative from "../assets/coin/negative.png";
import neutral from "../assets/coin/neutral.png";
import postive from "../assets/coin/positive.png";
import DetailETC from "../components/features/DetailETC/DetailETC";
import { SERVER_URL } from "../constants";
import { useSelector } from "react-redux";

const DreamDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const numberId = id ? parseInt(id) : undefined;
  const { getDiaryDetail, diaryDetail } = useDetailDiary();

  const userInfo = useSelector((state: any) => state);
  console.log(userInfo, "uy");

  useEffect(() => {
    if (numberId !== undefined) {
      getDiaryDetail(numberId);
    }
  }, [numberId]);

  return (
    <div className="diary-detail">
      <Navbar />
      <div className="diary-detail-main">
        <div className="diary-detail-left">
          <div className="diary-detail-left-top">
            <img
              className="diary-image"
              src={`${SERVER_URL}/${diaryDetail?.image}`}
              alt="일기일기"
            />
            <DateForm />
          </div>
          <div className="diary-detail-left-bottom">
            <div className="coin-wraper">
              <img src={postive} alt="" />
              <img src={neutral} alt="" />
              <img src={negative} alt="" />
            </div>
            <div className="coin-count-wraper">
              <p>{diaryDetail?.positivePoint}</p>
              <p>{diaryDetail?.neutralPoint}</p>
              <p>{diaryDetail?.negativePoint}</p>
            </div>

            <div className="diary-detail-left-bottom-etc">
              {diaryDetail && numberId !== undefined && (
                <DetailETC diaryDetail={diaryDetail} diaryId={numberId} />
              )}
            </div>
          </div>
        </div>

        <div className="diary-detail-right">
          <div className="diary-detail-right-top">
            <h1 className="diary-title">{diaryDetail?.title}</h1>
            <div className="diary-member">
              <div>
                <p>작성자</p>
                <p className="diary-writer">
                  {diaryDetail?.member.nickname}
                </p>{" "}
              </div>

              <div>
                <p>소유자</p>
                <p className="diary-buyer">
                  {diaryDetail?.member.nickname}
                </p>{" "}
              </div>
            </div>
          </div>
          <div className="diary-detail-right-bottom">
            <p>{diaryDetail?.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamDetailPage;
