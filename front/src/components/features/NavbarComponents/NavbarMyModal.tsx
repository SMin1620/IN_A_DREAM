import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "../../common/Box";
import { isModalOpen } from "../../../types/index";
import S from "styled-components";
import "./styles/NavbarMyModal.css";
import positive from "../../../assets/coin/positive.png";
import neutral from "../../../assets/coin/neutral.png";
import negative from "../../../assets/coin/negative.png";
import useFetchAndStoreUserInfo from "../../../hooks/useFetchAndStoreUserInfo";

import { RootState } from "../../../stores/stores";
import { useSelector } from "react-redux";
import ExchangeCoin from "../ExchageCoin/ExchangeCoin";

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
interface CoinPropsComponent {}

const CoinComponent = S.div<CoinPropsComponent>`
  width:20%;
  height:100%/;
  // background-color:#fff;
  margin-left:1rem;
  display:flex;
  align-items: center;
  justify-content: center;
  font-size:1.2rem
`;

interface UserInfo {
  positiveCoin?: number;
  neutralCoin?: number;
  negativeCoin?: number;
  // Add other possible properties here...
}

const NavbarMyModal: React.FC<isModalOpen> = ({
  isNavbarModalOpen,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userInfo = useSelector(
    (state: RootState) => state.userInfo.data as UserInfo
  );

  const { getUserInfo } = useFetchAndStoreUserInfo();

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (isNavbarModalOpen) {
      setIsOpen(true);
    } else {
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  }, [isNavbarModalOpen]);

  const closeModal = () => setIsModalOpen(false);
  return (
    <Box
      position="fixed"
      width={50}
      height={5}
      left={3}
      bottom={1}
      open={isOpen}
    >
      {isModalOpen && <ExchangeCoin closeModal={closeModal} />}
      <div className="coin-box">
        {Object.keys(COIN_INFO).map((key) => (
          <CoinComponent key={key}>
            <img src={COIN_INFO[key].imgSrc} alt={`${key} Coin`} />
            <span className="coin-box-count">
              {userInfo && userInfo[(key + "Coin") as keyof UserInfo]}
            </span>
          </CoinComponent>
        ))}
        <CoinComponent>
          <span onClick={() => setIsModalOpen(true)}> 코인교환 &gt;&gt;</span>
        </CoinComponent>
      </div>
    </Box>
  );
};

export default NavbarMyModal;
