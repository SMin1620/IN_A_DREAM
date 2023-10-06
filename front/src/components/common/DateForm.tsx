import React from "react";
import S from "styled-components";
import { LoginButton } from "../../types/index";
import DateBox from "./DateBox";

const DateForm = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0");

  return <DateBox>{`${year}.${month}.${day}`}</DateBox>;
};

export default DateForm;
