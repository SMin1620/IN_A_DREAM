import React, { useState } from "react";
import "./ExchangeCoin.css";
import positive from "../../../assets/coin/positive.png";
import neutral from "../../../assets/coin/neutral.png";
import negative from "../../../assets/coin/negative.png";
import Button from "../../common/Button2";
import Input from "../../common/Input";
import useExchangeCoin from "../../../hooks/useExchangeCoin";
import useFetchAndStoreUserInfo from "../../../hooks/useFetchAndStoreUserInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/stores";

type CoinType = "positive" | "neutral" | "negative";

const COIN_INFO: CoinInfo = {
  positive: { name: "해피코인", imgSrc: positive },
  neutral: { name: "쏘쏘코인", imgSrc: neutral },
  negative: { name: "새드코인", imgSrc: negative },
};

interface CoinInfo {
  [key: string]: {
    name: string;
    imgSrc: string;
  };
}
interface ExchangeCoinProps {
  closeModal: () => void;
}
interface UserInfo {
  positiveCoin?: number;
  neutralCoin?: number;
  negativeCoin?: number;
  // Add other possible properties here...
}

const ExchangeCoin: React.FC<ExchangeCoinProps> = ({ closeModal }) => {
  const [selectCoin, setSelectCoin] = useState<
    "positive" | "neutral" | "negative" | null
  >(null);
  const [step, setStep] = useState(1);
  const [coin, setCoin] = useState(0);
  const handleCoin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoin(parseFloat(e.target.value));
  };
  const { exchangeTokens } = useExchangeCoin();
  const { getUserInfo } = useFetchAndStoreUserInfo();
  const handleExchangeCoin = async () => {
    await exchangeTokens(selectCoin as CoinType, coin);
    await getUserInfo();
    closeModal();
  };

  const userInfo = useSelector(
    (state: RootState) => state.userInfo.data as UserInfo
  );

  return (
    <div className="exchange-wrapper">
      <p className="exchange-close" onClick={closeModal}>
        X
      </p>
      {step === 1 ? (
        <>
          <h1>수령할 코인을 선택하세요.</h1>
          <div className="exchange-coin-box">
            {Object.keys(COIN_INFO).map((key) => (
              <div className="exchange-coin" key={key}>
                <div
                  className={
                    selectCoin === key
                      ? "exchange-coin-selected"
                      : "exchange-coin-nonselected"
                  }
                >
                  <img
                    src={COIN_INFO[key].imgSrc}
                    alt={`${key} Coin`}
                    onClick={() => setSelectCoin(key as CoinType)}
                  />
                </div>
                {userInfo && userInfo[(key + "Coin") as keyof UserInfo]}
                <span>{COIN_INFO[key].name}</span>
              </div>
            ))}
          </div>
          {selectCoin && (
            <div className="exchange-button">
              <Button
                backgroundcolor="#B4A88F"
                width="4rem"
                height="3rem"
                borderradius="10px"
                onClick={() => setStep(2)}
              >
                다음
              </Button>
            </div>
          )}
        </>
      ) : step === 2 && selectCoin ? (
        <>
          <div className="exchange-result">
            <div className="exchange-rest-coin-box">
              {Object.keys(COIN_INFO)
                .filter((key) => key !== selectCoin)
                .map((key) => (
                  <div key={key} className="exchange-rest-coin">
                    <img src={COIN_INFO[key].imgSrc} alt={`${key} Coin`} />
                    <p>{coin}</p>
                    <p>/</p>
                    <p>
                      {userInfo && userInfo[(key + "Coin") as keyof UserInfo]}
                    </p>
                  </div>
                ))}
            </div>

            <div className="exchange-change-coin">
              <h1>개수를 입력하세요.</h1>

              <img
                src={COIN_INFO[selectCoin].imgSrc}
                alt={`${COIN_INFO[selectCoin].name}`}
              />
              {userInfo && userInfo[(selectCoin + "Coin") as keyof UserInfo]}
              <Input
                type="number"
                placeholder="0"
                onChange={handleCoin}
                width="8vw"
              ></Input>
            </div>
          </div>

          {coin > 0 && (
            <div className="exchange-button">
              <Button
                backgroundcolor="#B4A88F"
                width="6rem"
                height="3rem"
                borderradius="10px"
                onClick={handleExchangeCoin}
              >
                교환하기
              </Button>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default ExchangeCoin;
