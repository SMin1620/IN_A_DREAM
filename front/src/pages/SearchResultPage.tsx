import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardList from "../components/features/Card/CardList";
import Navbar from "../components/features/NavbarComponents/Navbar";
import "./styles/SearchResultPage.css";
import { useDiarywithKeyword } from "../hooks/useDiarywithKeyword";
import { DiaryInfo } from "../types/ApiType";

const SearchResultPage = () => {
  const { keyword } = useParams();
  const { data: diarieswithKeyword, isLoading } = useDiarywithKeyword(keyword);

  const [diaries, setDiaries] = useState<DiaryInfo[]>([]);
  useEffect(() => {
    if (diarieswithKeyword) {
      setDiaries(diarieswithKeyword.data.data);
    }
  }, [diarieswithKeyword]);

  return (
    <div className="search-result-wrapper">
      <Navbar />
      {diaries.length === 0 ? (
        <p style={{ color: "white", fontSize: "200px" }}>
          검색 결과가 없습니다.
        </p>
      ) : (
        <CardList diaries={diaries} />
      )}
    </div>
  );
};

export default SearchResultPage;
