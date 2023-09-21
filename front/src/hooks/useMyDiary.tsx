import { useQuery } from "react-query";
import { fetchMyDiaries } from "../api/services/diaryAPI"; // replace this with the actual path to your api calls file
import { pageable } from "../types";
import axios from "axios";
export const useMyDiaries = (pageable: pageable) => {
  console.log(axios.defaults.headers.common["Authorization"]);
  console.log("토큰있는지 확인좀요");
  return useQuery(["myDiaries", pageable], () => fetchMyDiaries(pageable));
};
