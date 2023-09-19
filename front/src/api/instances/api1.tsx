import axios from "axios";

// Axios 인스턴스 생성
const api1 = axios.create({
  baseURL: "http://52.78.186.98:8082", // API의 기본 URL
});

// 요청 인터셉터 설정
api1.interceptors.request.use(
  (config) => {
    // 여기에 원하는 요청 전처리 로직을 추가할 수 있습니다.
    // 예를 들어, 토큰을 헤더에 추가하거나 요청 데이터를 수정할 수 있습니다.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
api1.interceptors.response.use(
  (response) => {
    // 여기에 원하는 응답 후처리 로직을 추가할 수 있습니다.
    // 예를 들어, 응답 데이터를 가공하거나 에러 처리를 수행할 수 있습니다.
    // console.log(response);
    return response;
  },
  (error) => {
    // 에러 처리 로직을 추가합니다.
    return Promise.reject(error);
  }
);

export default api1;
