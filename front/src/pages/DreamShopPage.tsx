import React, { useEffect, useState } from "react";

import CardList from "../components/features/Card/CardList";
import { DiaryInfo } from "../types/ApiType";
import { useAllDiary } from "../hooks/useAllDiary";

const DreamShopPage = () => {
  const [diaries, setDiaries] = useState<DiaryInfo[]>([]);
  const {
    data: response,
    isLoading,
    error,
  } = useAllDiary({ page: 0, size: 9 });

  useEffect(() => {
    if (response) {
      setDiaries(response.data.data);
    }
  }, [response]);

  return (
    <div>
      DreamShopPage
      <div>{diaries && <CardList diaries={diaries} />}</div>
    </div>
  );
};

export default DreamShopPage;
