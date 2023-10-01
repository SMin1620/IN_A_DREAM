import React, { useState } from "react";
import "./ExchangeCoin.css";
import positive from "../../../assets/coin/positive.png";
import neutral from "../../../assets/coin/neutral.png";
import negative from "../../../assets/coin/negative.png";
import Button from "../../common/Button2";
import Input from "../../common/Input";

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

const ExchangeCoin = () => {
  const [selectCoin, setSelectCoin] = useState<
    "positive" | "neutral" | "negative" | null
  >(null);
  const [step, setStep] = useState(1);
  const [coin, setCoin] = useState(0);
  const handleCoin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoin(parseFloat(e.target.value));
  };

  return (
    <div className="exchange-wrapper">
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
                    style={{ width: "5vw", height: "5vw" }}
                    onClick={() => setSelectCoin(key as CoinType)}
                  />
                </div>
              </div>
            ))}
          </div>
          {selectCoin && (
            <div className="exchange-button">
              <Button
                backgroundcolor="#B4A88F"
                width="5vw"
                height="3vw"
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
                    <img
                      src={COIN_INFO[key].imgSrc}
                      alt={`${key} Coin`}
                      style={{ width: "5vw", height: "5vw" }}
                    />
                    <p>{coin}</p>
                  </div>
                ))}
            </div>

            <div className="exchange-change-coin">
              <img
                src={COIN_INFO[selectCoin].imgSrc}
                alt={`${COIN_INFO[selectCoin].name}`}
                style={{ width: "5vw", height: "5vw" }}
              />
              <Input
                type="number"
                // placeholder="개수를 입력해주세요."
                onChange={handleCoin}
                width="8vw"
              ></Input>
            </div>
          </div>

          {coin > 0 && (
            <div className="exchange-button">
              <Button
                backgroundcolor="#B4A88F"
                width="6vw"
                height="3vw"
                borderradius="10px"
                // onClick={() => setStep(2)}
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