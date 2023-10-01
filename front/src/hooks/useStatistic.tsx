import React, { useState } from "react";
import { fetchStaticStrict } from "../api/services/statisticsAPI";

interface Ownprops {
  registDate: string;
}

const useStatistic = () => {
  const [userActivity, setUserActivity] = useState<string[]>([]);

  const getStrict = async () => {
    const response = await fetchStaticStrict();
    if (response) {
      response.data.data.map((data: Ownprops) =>
        setUserActivity((prev: string[]) => [...prev, data.registDate])
      );
    }
  };

  return {
    getStrict,
    setUserActivity,
    userActivity,
  };
};

export default useStatistic;
