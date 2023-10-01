import React, { useEffect, useState } from "react";

import CardList from "../components/features/Card/CardList";
import { DiaryInfo } from "../types/ApiType";
import { useAllDiary, useInfiniteAllDiary } from "../hooks/useAllDiary";
import Navbar from "../components/features/NavbarComponents/Navbar";
import useMousePosition from "../hooks/useMousPosition";

const DreamShopPage = () => {
  const [diaries, setDiaries] = useState<DiaryInfo[]>([]);
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteAllDiary({ page: diaries.length / 100, size: 100 });

  useEffect(() => {
    if (data && data.pages[data.pages.length - 1]) {
      setDiaries((prevData) => [
        ...prevData,
        ...data.pages[data.pages.length - 1].data.data,
      ]);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        !hasNextPage
      )
        return;
      fetchNextPage();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage]);

  return (
    <div>
      <Navbar />
      <div>{diaries && <CardList diaries={diaries} />}</div>
    </div>
  );
};

export default DreamShopPage;
