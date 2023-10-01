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
import { padNumber } from "../hooks";

import RecommendedDiary from "../components/features/RecommendedDiary/RecommendedDiary";
import useMousePosition from "../hooks/useMousPosition";

const DreamDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const numberId = id ? parseInt(id) : undefined;
  const { getDiaryDetail, diaryDetail } = useDetailDiary();
  const { x, y } = useMousePosition();

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
            <div className="coin-wrapper">
              <div className="diary-coin-box">
                <img src={postive} alt="" />
                <div>{padNumber(diaryDetail?.positivePoint)}</div>
              </div>
              <div className="diary-coin-box">
                <img src={neutral} alt="" />
                <div>{padNumber(diaryDetail?.neutralPoint)}</div>
              </div>
              <div className="diary-coin-box">
                <img src={negative} alt="" />
                <div>{padNumber(diaryDetail?.negativePoint)}</div>
              </div>
            </div>
            {/* <div className="coin-count-wrapper"> */}
            {/* </div> */}

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
                  {diaryDetail?.owner.nickname}
                </p>{" "}
              </div>
            </div>
          </div>
          <div className="diary-detail-right-bottom">
            <p>{diaryDetail?.content}</p>
          </div>
        </div>
      </div>
      {numberId !== undefined && <RecommendedDiary diaryId={numberId} />}
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

export default DreamDetailPage;
