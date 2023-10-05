import React, { useEffect, useState } from "react";
import _ from "lodash";
import CardList from "../components/features/Card/CardList";
import { DiaryInfo } from "../types/ApiType";
import { useAllDiary, useInfiniteDiary } from "../hooks/useAllDiary";
import Navbar from "../components/features/NavbarComponents/Navbar";
import "./styles/DreamShopPage.css";

const DreamShopPage = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteDiary({ page: 0, size: 24 });

  useEffect(() => {
    const handleScroll = _.throttle(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop <
          document.documentElement.offsetHeight - 50 ||
        !hasNextPage
      )
        return;

      fetchNextPage();
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  const diaries =
    data?.pages
      .flatMap((pageData) => pageData.data.data.diaryList)
      .filter((diary) => diary.sale === true) || [];

  return (
    <div>
      <Navbar />
      <div className="dreamShoptitle">
        DREAM <br />
        SHOP <br />
        🌜🎪🌕
      </div>

      <CardList diaries={diaries} />
    </div>
  );
};

export default DreamShopPage;
