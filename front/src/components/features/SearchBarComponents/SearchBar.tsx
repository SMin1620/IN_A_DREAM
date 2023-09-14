import React, { useState } from "react";
import S from "styled-components";
import { LoginInput, LoginButton } from "../../../types/index";
import "./SearchBar.css";
import { SlideLeftSpan } from "../../common/SlideSpan";

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
        {/* <SlideLeftSpan margin="0 0.3rem" delay="0s">
          SEARCH{" "}
        </SlideLeftSpan>
        <SlideLeftSpan margin="0 0.3rem" delay="1.25s">
          SEARCH{" "}
        </SlideLeftSpan>
        <SlideLeftSpan margin="0 0.3rem" delay="2.5s">
          SEARCH{" "}
        </SlideLeftSpan>
        <SlideLeftSpan margin="0 0.3rem" delay="3.75s">
          SEARCH{" "}
        </SlideLeftSpan> */}
      </button>
    </div>
  );
};

export default SearchBar;
