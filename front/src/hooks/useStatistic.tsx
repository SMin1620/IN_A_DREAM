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
  WhenFalse: number;
  WhenTrue: number;
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
        WhenFalse: data.avgNegativeWhenFalse,
        WhenTrue: data.avgNegativeWhenTrue,
      },
      {
        name: "Neutral",
        WhenFalse: data.avgNeutralWhenFalse,
        WhenTrue: data.avgNeutralWhenTrue,
      },
      {
        name: "Positive",
        WhenFalse: data.avgPositiveWhenFalse,
        WhenTrue: data.avgPositiveWhenTrue,
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
