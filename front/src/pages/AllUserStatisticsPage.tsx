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
  const [sDate, setSDate] = useState(formatDate(new Date()));
  const [eDate, setEDate] = useState(formatDate(new Date()));

  const {
    data: response,
    isLoading,
    isError,
  } = useEmotionStatistics(sDate, eDate);

  const data = response?.data.data;
  const chartData = data?.map((item: any) => ({
    name: item.emotion,
    value: item.count,
  }));

  function formatDate(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const [totalKeyword, setTotalKeyword] = useState<boolean>(false);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (event: any) => {
    setSDate(formatDate(event.selection.startDate));
    setEDate(formatDate(event.selection.endDate));
    setState([
      {
        startDate: event.selection.startDate,
        endDate: event.selection.endDate,
        key: "selection",
      },
    ]);
  };

  console.log("sDate", sDate);
  console.log("eDate", eDate);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !response) return <div>Error occurred</div>;
  return (
    <div className="statistics-main">
      <div className="date-picker">
        <p onClick={() => setTotalKeyword(!totalKeyword)}>
          날짜를 선택해 주세요!
        </p>
        <div className={totalKeyword ? "open" : "close"}>
          <DateRangePicker
            locale={ko}
            showSelectionPreview={true}
            months={2}
            direction="horizontal"
            ranges={state}
            onChange={(event) => handleSelect(event)}
          />
        </div>
      </div>

      <div>
        <CircleGraph data={chartData} />
      </div>
    </div>
  );
};

export default AllUserStatisticsPage;
