import React from "react";
import CircleGraph from "../components/features/CircleGraph/CircleGraph";
import { useEmotionStatistics } from "../hooks/useEmotionStatistics";
import useExchangeCoin from "../hooks/useExchangeCoin";
const AllUserStatisticsPage = () => {
  //일단 날짜 하드코딩 나중에 바꾸자
  const {
    data: response,
    isLoading,
    isError,
  } = useEmotionStatistics("2023-01-01", "2023-12-01");

  const data = response?.data.data;
  const chartData = data?.map((item: any) => ({
    name: item.emotion,
    value: item.count,
  }));

  const { exchangeTokens } = useExchangeCoin();

  const handleClick = () => {
    exchangeTokens("negative", 100); // 'happy'와 '10'은 예시입니다. 실제 필요한 값을 넣어주세요.
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !response) return <div>Error occurred</div>;
  return (
    <div>
      <div>CircleGraph</div>
      <button onClick={handleClick}>버튼</button>
      <div>
        <CircleGraph data={chartData} />
      </div>
    </div>
  );
};

export default AllUserStatisticsPage;
