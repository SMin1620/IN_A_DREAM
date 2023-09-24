import React, { useState, useEffect } from "react";
import "./styles/GalleryPage.css";
import { ImageGallery } from "../components/features/GalleryComponents/ImageGallery";
import { useAllDiary } from "../hooks/useAllDiary";
import { DiaryInfo } from "../types/ApiType";
import { SERVER_URL } from "../constants";
import Navbar from "../components/features/NavbarComponents/Navbar";

const pexel = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;
// const images = [
//   // Front
//   // { position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel(1103970) },
//   // Back
//   { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(416430) },
//   { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452) },
//   // Left
//   {
//     position: [-1.75, 0, 0.25],
//     rotation: [0, Math.PI / 2.5, 0],
//     url: pexel(327482),
//   },
//   { position: [-2.15, 0, 1.5],
//     rotation: [0, Math.PI / 2.5, 0],
//     url: pexel(325185),
//   },
//   {
//     position: [-2, 0, 2.75],
//     rotation: [0, Math.PI / 2.5, 0],
//     url: pexel(358574),
//   },
//   // Right
//   {
//     position: [1.75, 0, 0.25],
//     rotation: [0, -Math.PI / 2.5, 0],
//     url: pexel(227675),
//   },
//   {
//     position: [2.15, 0, 1.5],
//     rotation: [0, -Math.PI / 2.5, 0],
//     url: pexel(911738),
//   },
//   {
//     position: [2, 0, 2.75],
//     rotation: [0, -Math.PI / 2.5, 0],
//     url: pexel(1738986),
//   },
// ];

const GalleryPage = () => {
  const [diaries, setDiaries] = useState<DiaryInfo[]>([]);

  const {
    data: response,
    isLoading,
    error,
  } = useAllDiary({ page: 0, size: 10 });

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
        ]
      : [];

  useEffect(() => {
    if (response && response.data && response.data.data) {
      console.log(response.data.data);
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
