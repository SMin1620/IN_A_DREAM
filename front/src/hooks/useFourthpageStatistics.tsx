import { useState, useEffect } from "react";
import {
  fetchMyTransactionCount,
  fetchAllTransactionCount,
  fetchMyDiaryCount,
} from "../api/services/diaryAPI";

const useFourthpageStatistics = () => {
  const [myTransactionCount, setMyTransactionCount] = useState(null);
  const [allTransactionCount, setAllTransactionCount] = useState(null);
  const [myDiaryCount, setMyDiaryCount] = useState(null);

  useEffect(() => {
    Promise.all([
      fetchMyTransactionCount(),
      fetchAllTransactionCount(),
      fetchMyDiaryCount(),
    ])
      .then(([myTransRes, allTransRes, myDiaryRes]) => {
        setMyTransactionCount(myTransRes.data.data.count);
        setAllTransactionCount(allTransRes.data.data.count);
        setMyDiaryCount(myDiaryRes.data.data.count);
      })
      .catch((error) => console.error(error));
  }, []);

  return { myTransactionCount, allTransactionCount, myDiaryCount };
};

export default useFourthpageStatistics;
