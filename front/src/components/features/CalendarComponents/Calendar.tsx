import React, { useState, useEffect } from "react";
import useStatistic from "../../../hooks/useStatistic";
import "./Calendar.css";

const Calendar = () => {
  // 날짜정보 이용해서 달력만들기
  const date = new Date();
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const startDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

  useEffect(() => {
    getStrict();
  }, []);

  const { getStrict, userActivity } = useStatistic();

  console.log(userActivity);

  let daysArray = [];

  for (let i = 0; i < startDayOfMonth; i++) {
    daysArray.push(<div className="day empty-day" key={`empty-${i}`}></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dayString = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(i).padStart(2, "0")}`;

    // console.log(dayString);
    if (userActivity.includes(dayString)) {
      daysArray.push(
        <div
          className="day active-day"
          key={i}
          title={`User was active on ${dayString}`}
        ></div>
      );
    } else {
      daysArray.push(<div className="day" key={i}></div>);
    }
  }

  return <div className="calendar-main">{daysArray}</div>;
};

export default Calendar;
