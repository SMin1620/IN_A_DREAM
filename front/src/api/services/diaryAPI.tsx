import api1 from "../instances/api1";
import { pageable } from "../../types/ApiType";
import { DiaryData } from "./../../hooks/useMakeDiary";

// 모든 일기 목록 조회
export const fetchAllDiaries = (pageable: pageable) =>
  api1.get(`/api/diary`, {
    params: pageable,
  });

// 내 일기 목록 조회 수정예상 유저id없음
export const fetchMyDiaries = (pageable: pageable) =>
  api1.get(`/api/diary/my`, {
    params: pageable,
  });

// 일기 상세 조회
export const fetchDiaryDetail = (diaryId: string | undefined) =>
  api1.get(`/api/diary/${diaryId}`);

// 일기 최종 생성 다이어리 데이터타입 나중에 어떤식으로해야할지 정해지면 따로정의해줘야할듯
export const createDiary = (diaryData: DiaryData) =>
  api1.post(`/api/diary`, {
    image: diaryData.image,
    title: diaryData.title,
    content: diaryData.content,
    open: diaryData.open,
    sale: diaryData.sale,
  });

// 일기 좋아요 + 취소
export const toggleLikeDiary = (diaryId: string | undefined) =>
  api1.post(`/api/diary/like`);

// 다이어리 키워드 검색
export const searchDiaries = (keyword: string, filter: string) =>
  api1.get(`/api/diary`, { params: { search: keyword, filter } });

// 일기 내용 키워드 분석 및 키워드 추출 걍 이거 이상함 나중에 고쳐야할듯
export const analyzeKeywordsInDiaryContent = (content: string) =>
  api1.post("/api/diary/keyword", { content });

// 일기 공개 설정
export const updateDiaryVisibility = (
  diaryId: string | undefined,
  isPublic: boolean | undefined
) => api1.put(`api/diary/public`, { diaryId, isPublic });

// 일기 판매 설정
export const updateDiarySaleStatus = (
  diaryId: string | undefined,
  isSale: boolean | undefined
) => api1.put("api/dairy/sale");

// 일기 구매
export const buyDiary = (
  diaryId: number | undefined,
  sellerEmail: string | undefined,
  positivePoint: number | undefined,
  neutralPoint: number | undefined,
  negativePoint: number | undefined
) =>
  api1.post("api/transaction", {
    diaryId,
    sellerEmail,
    positivePoint,
    neutralPoint,
    negativePoint,
  });
