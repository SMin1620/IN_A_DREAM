import React from "react";
import CardList from "../components/features/Card/CardList";
import Navbar from "../components/features/NavbarComponents/Navbar";
import "./styles/SearchResultPage.css";

const SearchResultPage = () => {
  return (
    <div className="search-result-wrapper">
      <Navbar />
      <CardList />
      <CardList />
      <CardList />
      <CardList />
    </div>
  );
};

export default SearchResultPage;
