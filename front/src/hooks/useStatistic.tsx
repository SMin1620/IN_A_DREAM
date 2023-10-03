import React, { useState } from "react";
import {
  fetchStaticStrict,
  fetchIndividualEmotionStatistics,
} from "../api/services/statisticsAPI";

interface Ownprops {
  registDate: string;
}

interface StaticsData {
  count: number;
  emotion: string;
  momberId: string | null;
}

const useStatistic = () => {
  const [userActivity, setUserActivity] = useState<string[]>([]);
  const [userStatics, setUserStatics] = useState<StaticsData[]>([]);

  const getStrict = async () => {
    const response = await fetchStaticStrict();
    console.log(response);
    if (response) {
      response.data.data.map((data: Ownprops) =>
        setUserActivity((prev: string[]) => [...prev, data.registDate])
      );
    }
  };

  const getStatics = async () => {
    const response = await fetchIndividualEmotionStatistics();
    setUserStatics(response.data.data);
  };

  return {
    getStrict,
    getStatics,
    userStatics,
    setUserActivity,
    userActivity,
  };
};

export default useStatistic;
