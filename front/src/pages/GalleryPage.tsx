import React, { useState, useEffect } from "react";
import "./styles/GalleryPage.css";
import { ImageGallery } from "../components/features/GalleryComponents/ImageGallery";
import { useAllDiary } from "../hooks/useAllDiary";
import { DiaryInfo } from "../types/ApiType";
import { SERVER_URL } from "../constants";
import Navbar from "../components/features/NavbarComponents/Navbar";
// import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const GalleryPage = () => {
  const [diaries, setDiaries] = useState<DiaryInfo[]>([]);
  const { sortKey } = useParams<string>();
  const validSortKey = sortKey || "";

  const {
    data: response,
    isLoading,
    error,
  } = useAllDiary({ page: 0, size: 8, sort: ["likeCount", validSortKey] });

  const images =
    diaries.length > 1
      ? [
          // Back
          {
            position: [-0.8, 0, -0.6],
            rotation: [0, 0, 0],
            url: SERVER_URL + "/" + diaries[0].image,
            title: diaries[0].title,
            nickname: diaries[0].member.nickname,
          },
          {
            position: [0.8, 0, -0.6],
            rotation: [0, 0, 0],
            url: SERVER_URL + "/" + diaries[1].image,
            title: diaries[1].title,
            nickname: diaries[1].member.nickname,
          },
          // Left
          {
            position: [-1.75, 0, 0.25],
            rotation: [0, Math.PI / 2.5, 0],
            url: SERVER_URL + "/" + diaries[2].image,
            title: diaries[2].title,
            nickname: diaries[2].member.nickname,
          },
          {
            position: [-2.15, 0, 1.5],
            rotation: [0, Math.PI / 2.5, 0],
            url: SERVER_URL + "/" + diaries[3].image,
            title: diaries[3].title,
            nickname: diaries[3].member.nickname,
          },
          {
            position: [-2, 0, 2.75],
            rotation: [0, Math.PI / 2.5, 0],
            url: SERVER_URL + "/" + diaries[4].image,
            title: diaries[4].title,
            nickname: diaries[4].member.nickname,
          },
          // Right
          {
            position: [1.75, 0, 0.25],
            rotation: [0, -Math.PI / 2.5, 0],
            url: SERVER_URL + "/" + diaries[5].image,
            title: diaries[5].title,
            nickname: diaries[5].member.nickname,
          },
          {
            position: [2.15, 0, 1.5],
            rotation: [0, -Math.PI / 2.5, 0],
            url: SERVER_URL + "/" + diaries[6].image,
            title: diaries[6].title,
            nickname: diaries[6].member.nickname,
          },
          {
            position: [2, 0, 2.75],
            rotation: [0, -Math.PI / 2.5, 0],
            url: SERVER_URL + "/" + diaries[7].image,
            title: diaries[7].title,
            nickname: diaries[7].member.nickname,
          },
        ]
      : [];

  useEffect(() => {
    if (response && response.data && response.data.data) {
      // console.log(response);
      // console.log(response.data.data);
      setDiaries(response.data.data);
    }
  }, [response]);

  return (
    <div className="gallery-wrapper">
      <Navbar />
      <div className="gallery" id="gallery">
        {images && <ImageGallery images={images} />}
      </div>
    </div>
  );
};

export default GalleryPage;
