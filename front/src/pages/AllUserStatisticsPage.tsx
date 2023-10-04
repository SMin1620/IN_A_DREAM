import React, { useState } from "react";
import CircleGraph from "../components/features/CircleGraph/CircleGraph";
import { useEmotionStatistics } from "../hooks/useEmotionStatistics";
import useExchangeCoin from "../hooks/useExchangeCoin";
import "./styles/AllUserStatisticsPage.css";

import { DateRangePicker } from "react-date-range-ts";
import "react-date-range-ts/dist/styles.css";
import "react-date-range-ts/dist/theme/default.css";
import { ko } from "date-fns/locale";

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

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const handleSelect = (event: any) => {
    console.log("start", event.selection.startDate);
    console.log("end", event.selection.endDate);
    setState([
      {
        startDate: event.selection.startDate,
        endDate: event.selection.endDate,
        key: "selection",
      },
    ]);
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !response) return <div>Error occurred</div>;
  return (
    <div>
      <div>CircleGraph</div>
      <div className="date-picker">
        <DateRangePicker
          locale={ko}
          showSelectionPreview={true}
          months={2}
          direction="horizontal"
          ranges={state}
          onChange={(event) => handleSelect(event)}
        />
      </div>

      <div>
        <CircleGraph data={chartData} />
      </div>
    </div>
  );
};

export default AllUserStatisticsPage;
