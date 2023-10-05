import React, { useState } from "react";
import {
  fetchStaticStrict,
  fetchIndividualEmotionStatistics,
  fetchEmotionCoinAndSalesRelation,
} from "../api/services/statisticsAPI";

interface Ownprops {
  registDate: string;
}

interface StaticsData {
  count: number;
  emotion: string;
  momberId: string | null;
}
interface BarData {
  name: string;
  보관비율: number;
  판매비율: number;
}

const useStatistic = () => {
  const [userActivity, setUserActivity] = useState<string[]>([]);
  const [userStatics, setUserStatics] = useState<StaticsData[]>([]);
  const [relationData, setRelationData] = useState<BarData[]>([]);

  const getStrict = async () => {
    const response = await fetchStaticStrict();
    if (response) {
      response.data.data.map((data: Ownprops) =>
        setUserActivity((prev: string[]) => [...prev, data.registDate])
      );
    }
  };

  const getStatics = async (fromDate?: string, toDate?: string) => {
    const response = await fetchIndividualEmotionStatistics(fromDate, toDate);
    setUserStatics(response.data.data);
  };

  const getRelationData = async () => {
    const response = await fetchEmotionCoinAndSalesRelation();
    const data = response.data.data;
    const transformedData: BarData[] = [
      {
        name: "Negative",
        보관비율: data.avgNegativeWhenFalse,
        판매비율: data.avgNegativeWhenTrue,
      },
      {
        name: "Neutral",
        보관비율: data.avgNeutralWhenFalse,
        판매비율: data.avgNeutralWhenTrue,
      },
      {
        name: "Positive",
        보관비율: data.avgPositiveWhenFalse,
        판매비율: data.avgPositiveWhenTrue,
      },
    ];
    setRelationData(transformedData);
  };

  return {
    getStrict,
    getStatics,
    userStatics,
    setUserActivity,
    userActivity,
    getRelationData,
    relationData,
  };
};

export default useStatistic;
