import { useState, useEffect } from "react";
import clImage from "../assets/background/CLcloud.jpg";
import Cloud from "../components/features/CloudComponents/Cloud";
import IntroCloud from "../components/features/CloudComponents/IntroCloud";
import { useCloudAllDiary } from "../hooks/useCloudAllDiary";
import { DiaryInfo } from "../types/ApiType";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../constants";
import Navbar from "../components/features/NavbarComponents/Navbar";
import cloudMore from "../assets/image/cloudMore.png";

import "./styles/CloudPage.css";

interface CloudProps {
  children?: React.ReactNode;
}

function Overlay({ children }: CloudProps) {
  return (
    <div
      style={{
        zIndex: -9000,
        backgroundImage: `url(${clImage})`,
        backgroundRepeat: "repeat",
        backgroundSize: "50vw 75vh",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "200vw",
        height: "150vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // ES6 구조 분해 할당을 사용하여 스왑
  }
  return array;
}

function CloudPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [showCloud, setShowCloud] = useState(false);
  const [diaries, setDiaries] = useState<DiaryInfo[]>([]);
  const [shuffledDiaries, setShuffledDiaries] = useState<DiaryInfo[]>([]);
  const { sortKey } = useParams<string>();
  // const validSortKey = sortKey || "";

  const {
    data: response,
    isLoading,
    error,
  } = useCloudAllDiary({ page: 0, size: 500 });

  const images =
    shuffledDiaries.length > 1
      ? shuffledDiaries.slice(0, 50).map((diary) => ({
          url: SERVER_URL + "/" + diary.image,
          title: diary.title,
          nickname: diary.member.nickname,
          content: diary.content,
        }))
      : [];

  useEffect(() => {
    // 페이지가 로드되면 뷰포트 중앙으로 스크롤
    const centerOfWidth =
      document.documentElement.scrollWidth / 2 - window.innerWidth / 2;
    const centerOfHeight =
      document.documentElement.scrollHeight / 2 - window.innerHeight / 2;
    window.scrollTo(centerOfWidth, centerOfHeight);

    const cloudTimer = setTimeout(() => {
      setShowCloud(true);
    }, 2000); // After 2 seconds

    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 5000); // After 5 seconds

    return () => {
      clearTimeout(introTimer);
      clearTimeout(cloudTimer);
    }; // Clean up on unmount
  }, []);

  // 응답으로 받은 다이어리 데이터 세팅
  useEffect(() => {
    if (response && response.data && response.data.data.diaryList) {
      setDiaries(response.data.data.diaryList);
    }
  }, [response]);

  // diaries가 변경될 때마다, shuffledDiaries 업데이트
  useEffect(() => {
    setShuffledDiaries(shuffleArray([...diaries]));
  }, [diaries]);

  const reShuffleDiaries = () => {
    console.log("reShuffle");
    setShuffledDiaries(shuffleArray([...shuffledDiaries]));
    // IntroCloud를 잠시 보여줍니다.
    setShowIntro(true);

    // 일정시간 후 렌더링 시작

    // 일정 시간 후에 다시 숨깁니다.
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 5000); // 예를 들어 5초 후에 숨깁니다.

    // 컴포넌트가 언마운트되면 타이머를 클리어합니다.
    return () => {
      clearTimeout(introTimer);
    };
  };

  return (
    <>
      <img
        src={cloudMore}
        alt="more"
        className="random"
        onClick={reShuffleDiaries}
      ></img>
      <Navbar />
      <div className="cloud-wrapper">
        <Overlay>
          <div className="cloud">
            {showIntro && <IntroCloud />}
            {showCloud && images && <Cloud images={images} />}
          </div>
        </Overlay>
      </div>
    </>
  );
}

export default CloudPage;
