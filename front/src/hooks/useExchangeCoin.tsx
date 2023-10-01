import { exchangeEmotionTokens } from "../api/services/coinAPI";
import Swal from "sweetalert2";
type CoinType = "positive" | "neutral" | "negative";

const COIN_INFO: Record<CoinType, string> = {
  positive: "해피코인",
  neutral: "쏘쏘코인",
  negative: "새드코인",
};

const useExchangeCoin = () => {
  const exchangeTokens = async (feeling: CoinType, pay: number) => {
    try {
      const response = await exchangeEmotionTokens(feeling, pay);
      Swal.fire({
        icon: "success",
        title: "코인교환 성공",
        text: `${COIN_INFO[feeling]}으로 ${pay}개 교환을 성공했습니다.`,
      });
    } catch (error: any) {
      if (error.message === "Request failed with status code 409") {
        Swal.fire({
          icon: "error",
          title: "코인교환 실패",
          text: "코인 개수가 부족해 코인 교환 실패했습니다. 코인을 확인해주세요.",
        });
      }
      console.log(error);
    }
  };

  return { exchangeTokens };
};

export default useExchangeCoin;
