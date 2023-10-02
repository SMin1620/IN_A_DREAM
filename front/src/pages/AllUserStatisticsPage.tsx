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

  if (isLoading) return <div>Loading...</div>;
  if (isError || !response) return <div>Error occurred</div>;
  return (
    <div>
      <div>CircleGraph</div>
      <div>
        <CircleGraph data={chartData} />
        <iframe
          title="vimeo-player"
          src="https://player.vimeo.com/video/870217449?h=4e51cf5daf"
          width="640"
          height="360"
          frameBorder={0} // 수정된 부분
          allowFullScreen // 수정된 부분
        ></iframe>
      </div>
    </div>
  );
};

export default AllUserStatisticsPage;
