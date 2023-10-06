import React, { useState } from "react";
import S from "styled-components";
import { LoginInput, LoginButton } from "../../../types/index";
import "./SearchBar.css";
import { SlideSpan } from "../../common/SlideSpan";
import { useNavigate } from "react-router-dom";

export interface SearchBarInput extends LoginInput {
  color?: string;
}

export interface SearchBarButton extends LoginButton {}

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const navigate = useNavigate();
  const postSearch = () => {
    // API 요청
    navigate(`/SearchResult/${searchKeyword}`);
    setSearchKeyword("");
  };

  const postEnterSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`/SearchResult/${searchKeyword}`);
      setSearchKeyword("");
    }
  };

  return (
    <div className="search-main">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyUp={(event) => postEnterSearch(event)}
      />
      <button onClick={postSearch}>
        <span>
          <SlideSpan
            startposition={200}
            endposition={-520}
            speed={10}
            padding="0 0.3rem"
            fontFamily="IAMAPLAYER"
          >
            search
          </SlideSpan>
          <SlideSpan
            startposition={200}
            endposition={-520}
            speed={10}
            padding="0 0.3rem"
            fontFamily="IAMAPLAYER"
          >
            search
          </SlideSpan>
          <SlideSpan
            startposition={200}
            endposition={-520}
            speed={10}
            padding="0 0.3rem"
            fontFamily="IAMAPLAYER"
          >
            search
          </SlideSpan>
          <SlideSpan
            startposition={200}
            endposition={-520}
            speed={10}
            padding="0 0.3rem"
            fontFamily="IAMAPLAYER"
          >
            search
          </SlideSpan>
        </span>
      </button>
    </div>
  );
};

export default SearchBar;
