import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardList from "../components/features/Card/CardList";
import Navbar from "../components/features/NavbarComponents/Navbar";
import "./styles/SearchResultPage.css";
import { useDiarywithKeyword } from "../hooks/useDiarywithKeyword";
import { DiaryInfo } from "../types/ApiType";
import SearchBar from "./../components/features/SearchBarComponents/SearchBar";

const SearchResultPage = () => {
  const { keyword } = useParams();
  const { data: diarieswithKeyword, isLoading } = useDiarywithKeyword(keyword);
  const [diaries, setDiaries] = useState<DiaryInfo[]>([]);
  const [correctedKeyword, setCorrectedKeyword] = useState<string | null>(null);

  useEffect(() => {
    if (diarieswithKeyword) {
      setDiaries(diarieswithKeyword.data.data);
      if (diarieswithKeyword.data.data.length > 0) {
        setCorrectedKeyword(diarieswithKeyword.data.data[0].correctKeyword);
      }
    }
  }, [diarieswithKeyword]);
  console.log(diarieswithKeyword);

  return (
    <div className="search-result-wrapper">
      <Navbar />
      <div className="search-result-search-bar">
        <SearchBar />
      </div>
      {keyword !== correctedKeyword && correctedKeyword ? (
        <p
          style={{
            color: "white",
            fontSize: "30px",
            marginTop: "5%",
            marginBottom: "5%",
          }}
        >
          수정된 검색어로 검색한 결과: "{correctedKeyword}"
        </p>
      ) : (
        <p
          style={{
            color: "white",
            fontSize: "30px",
            marginTop: "5%",
            marginBottom: "5%",
          }}
        >
          {keyword} 으로 검색한 결과
        </p>
      )}
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
