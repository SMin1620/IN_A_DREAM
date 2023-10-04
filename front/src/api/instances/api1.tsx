import axios from "axios";
import { SERVER_URL } from "../../constants";
import qs from "qs";
// Axios 인스턴스 생성
const api1 = axios.create({
  // baseURL: "http://52.78.186.98:8082", // API의 기본 URL
  // baseURL: "http://192.168.30.162:8080", // API의 기본 URL
  baseURL: SERVER_URL, // API의 기본 URL
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});

// 요청 인터셉터 설정
api1.interceptors.request.use(
  (config) => {
    // 여기에 원하는 요청 전처리 로직을 추가할 수 있습니다.
    // 예를 들어, 토큰을 헤더에 추가하거나 요청 데이터를 수정할 수 있습니다.
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = token;
    }
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
  async (error) => {
    // 에러 처리 로직을 추가합니다.
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshtoken");
      const token = localStorage.getItem("token");
      console.log("401에러감지감지");

      try {
        // refreshToken으로 새 accessToken 받아오는 API 호출
        console.log("시도시도");
        const res = await api1.post(
          "/api/members/refresh",
          {},
          {
            headers: { Authorization: token, refreshToken: refreshToken },
          }
        );

        // 새 accessToken 저장
        localStorage.setItem("token", res.headers.Authorization);
        localStorage.setItem("refreshtoken", res.headers.refreshToken);
        console.log("리프레쉬도즈언!!");

        // 실패한 요청 다시 보내기
        return api1(originalRequest);
      } catch (err) {
        console.log(err);
        console.log("리프레쉬실패임");
        // 필요하다면 여기서 로그아웃 처리 등의 추가적인 작업 진행
      }
    }
    return Promise.reject(error);
  }
);

export default api1;
