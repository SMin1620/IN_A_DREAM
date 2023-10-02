import React, { useEffect, useState } from "react";

import CardList from "../components/features/Card/CardList";
import { DiaryInfo } from "../types/ApiType";
import { useAllDiary, useInfiniteDiary } from "../hooks/useAllDiary";
import Navbar from "../components/features/NavbarComponents/Navbar";

const DreamShopPage = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteDiary({ page: 0, size: 9 });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop <
          document.documentElement.offsetHeight - 100 ||
        !hasNextPage
      )
        return;

      fetchNextPage();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>An error has occurred: {(error as Error).message}</div>;

  const diaries =
    data?.pages.flatMap((pageData) => pageData.data.data.diaryList) || [];
  console.log("hasNextPage", hasNextPage);
  return (
    <div>
      <Navbar />
      <CardList diaries={diaries} />
    </div>
  );
};

export default DreamShopPage;
