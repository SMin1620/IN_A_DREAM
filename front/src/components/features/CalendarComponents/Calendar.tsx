import React, { useState } from "react";
import "./Calendar.css";

const Calendar = () => {
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

  // Example user activity data
  const [userActivity] = useState(["2023-09-01", "2023-09-02", "2023-09-05"]);

  let daysArray = [];

  for (let i = 0; i < startDayOfMonth; i++) {
    daysArray.push(<div className="day empty-day" key={`empty-${i}`}></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dayString = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
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
