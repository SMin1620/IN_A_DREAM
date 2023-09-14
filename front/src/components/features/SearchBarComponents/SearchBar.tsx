import React, { useState } from "react";
import S from "styled-components";
import { LoginInput, LoginButton } from "../../../types/index";
import "./SearchBar.css";
import { SlideSpan } from "../../common/SlideSpan";

export interface SearchBarInput extends LoginInput {
  color?: string;
}

export interface SearchBarButton extends LoginButton {}

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  console.log(searchKeyword);

  return (
    <div className="search-main">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <button>
        <span>
          <SlideSpan
            startPosition={200}
            endPosition={-420}
            speed={10}
            padding="0 0.3rem"
            fontFamily="IAMAPLAYER"
          >
            search
          </SlideSpan>
          <SlideSpan
            startPosition={200}
            endPosition={-420}
            speed={10}
            padding="0 0.3rem"
            fontFamily="IAMAPLAYER"
          >
            search
          </SlideSpan>
          <SlideSpan
            startPosition={200}
            endPosition={-420}
            speed={10}
            padding="0 0.3rem"
            fontFamily="IAMAPLAYER"
          >
            search
          </SlideSpan>
          <SlideSpan
            startPosition={200}
            endPosition={-420}
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
