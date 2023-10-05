import React, { useState, useEffect } from "react";
import CircleGraph from "../components/features/CircleGraph/CircleGraph";
import { useEmotionStatistics } from "../hooks/useEmotionStatistics";
import useStatistic from "../hooks/useStatistic";
import useExchangeCoin from "../hooks/useExchangeCoin";
import "./styles/AllUserStatisticsPage.css";
import KeywordCloud from "../components/features/KeywordCloud/KeywordCloud";
import Navbar from "../components/features/NavbarComponents/Navbar";
import Swal from "sweetalert2";

import { DateRangePicker } from "react-date-range-ts";
import "react-date-range-ts/dist/styles.css";
import "react-date-range-ts/dist/theme/default.css";
import { ko } from "date-fns/locale";
import BarGraph from "./../components/features/BarGraph/BarGraph";

const AllUserStatisticsPage = () => {
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
  const [sDate2, setSDate2] = useState("");
  const [eDate2, setEDate2] = useState("");

  const {
    data: response,
    isLoading,
    isError,
  } = useEmotionStatistics(sDate, eDate);

  const { getStatics, userStatics } = useStatistic();

  useEffect(() => {
    getStatics(sDate2, eDate2);
  }, [sDate2, eDate2]);

  const data = response?.data.data;

  function formatDate(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const [totalKeyword, setTotalKeyword] = useState<boolean>(false);
  const [individualKeyword, setIndividualKeyword] = useState<boolean>(false);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [state2, setState2] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (event: any) => {
    if (formatDate(event.selection.endDate) === formatDate(new Date())) {
      Swal.fire({
        icon: "warning",
        title: "마지막날짜를 변경해 주시기 바랍니다!",
        text: "마지막날짜는 오늘 이외의 날을 선택해 주시기 바랍니다.",
      });
    } else {
      setSDate(formatDate(event.selection.startDate));
      setEDate(formatDate(event.selection.endDate));
      setState([
        {
          startDate: event.selection.startDate,
          endDate: event.selection.endDate,
          key: "selection",
        },
      ]);
    }
  };
  const handleSelect2 = (event: any) => {
    setSDate2(formatDate(event.selection.startDate));
    setEDate2(formatDate(event.selection.endDate));
    setState2([
      {
        startDate: event.selection.startDate,
        endDate: event.selection.endDate,
        key: "selection",
      },
    ]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !response) return <div>Error occurred</div>;
  return (
    <div className="statistics-main">
      <Navbar></Navbar>
      <div className="keyword-statistics">
        <div className="keyword-statistics-left">
          <p onClick={() => setTotalKeyword(!totalKeyword)}>
            날짜를 선택해 주세요!
          </p>
          <div className={totalKeyword ? "open" : "close"}>
            <DateRangePicker
              locale={ko}
              showSelectionPreview={true}
              months={1}
              direction="horizontal"
              ranges={state}
              // maxDate={new Date()}
              onChange={(event) => handleSelect(event)}
            />
          </div>

          <i>All User Keyword</i>
          <KeywordCloud startDate={sDate} endDate={eDate} mydate={false} />
          <div className="emotion-statistics-left">
            <i>All User Emotion</i>
            <CircleGraph
              data={[
                { name: data[1]?.emotion, value: data[1]?.count },
                { name: data[0]?.emotion, value: data[0]?.count },
                { name: data[2]?.emotion, value: data[2]?.count },
              ]}
            />
          </div>
        </div>
        <div className="keyword-statistics-left">
          <p onClick={() => setIndividualKeyword(!individualKeyword)}>
            날짜를 선택해 주세요!
          </p>
          <div className={individualKeyword ? "open" : "close"}>
            <DateRangePicker
              locale={ko}
              showSelectionPreview={true}
              months={1}
              direction="horizontal"
              ranges={state2}
              // maxDate={new Date()}
              onChange={(event) => handleSelect2(event)}
            />
          </div>
          <i>My Keyword</i>
          <KeywordCloud startDate={sDate2} endDate={eDate2} mydate={true} />
          <div className="emotion-statistics-left">
            <i>My Emotion</i>
            <CircleGraph
              data={[
                { name: userStatics[1]?.emotion, value: userStatics[1]?.count },
                { name: userStatics[0]?.emotion, value: userStatics[0]?.count },
                { name: userStatics[2]?.emotion, value: userStatics[2]?.count },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="bar-statistics">
        <i>감정코인별 판매와 보관 비율</i>
        <div className="bar-statics-main">
          <BarGraph />
        </div>
      </div>
    </div>
  );
};

export default AllUserStatisticsPage;
