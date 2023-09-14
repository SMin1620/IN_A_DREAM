import React from "react";
import S from "styled-components";
import { LoginInput, LoginButton } from "../../../types/index";
import "./SearchBar.css";
import { SlideLeftSpan } from "../../common/SlideSpan";

export interface SearchBarInput extends LoginInput {
  color?: string;
}

export interface SearchBarButton extends LoginButton {}

const SearchBar = () => {
  return (
    <div className="search-main">
      <input type="text" />
      <button>
        <SlideLeftSpan>검색</SlideLeftSpan>
      </button>
    </div>
  );
};

export default SearchBar;
