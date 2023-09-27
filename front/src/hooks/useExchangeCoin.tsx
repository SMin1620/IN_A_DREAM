import { exchangeEmotionTokens } from "../api/services/coinAPI";
import Swal from "sweetalert2";

const useExchangeCoin = () => {
  const exchangeTokens = async (feeling: string, pay: number) => {
    try {
      const response = await exchangeEmotionTokens(feeling, pay);
      console.log("교환성공");
      Swal.fire({
        icon: "success",
        title: "코인교환 성공",
        text: `우하하하 코인교환했다. 우하하`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { exchangeTokens };
};

export default useExchangeCoin;
