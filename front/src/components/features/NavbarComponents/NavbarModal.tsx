import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/NavbarModal.css";
import Box from "../../common/Box";
import { isModalOpen } from "../../../types/index";
import { SlideSpan } from "../../common/SlideSpan";
import SearchBar from "../SearchBarComponents/SearchBar";
import { useMediaQuery } from "react-responsive";
import positive from "../../../assets/coin/positive.png";
import neutral from "../../../assets/coin/neutral.png";
import negative from "../../../assets/coin/negative.png";
import S from "styled-components";
import Swal from "sweetalert2";
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
interface UserInfo {
  positiveCoin?: number;
  neutralCoin?: number;
  negativeCoin?: number;
  // Add other possible properties here...
}

const CoinComponent = S.div`
  width:20%;
  height:100%/;
  // background-color:#fff;
  margin-left:1rem;
  display:flex;
  align-items: center;
  justify-content: center;
  font-size:1rem
`;

const NavbarModal: React.FC<isModalOpen> = ({ isNavbarModalOpen, onClose }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isMobileView = useMediaQuery({
    query: "(max-width:768px)",
  });
  const closeModal = () => setIsModalOpen(false);
  const deleteToken = () => {
    Swal.fire({
      title: "로그아웃",
      text: "정말 로그아웃 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/Login");
      }
    });
  };

  useEffect(() => {
    if (isNavbarModalOpen) {
      setIsOpen(true);
    } else {
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  }, [isNavbarModalOpen]);
  const userInfo = useSelector((state: RootState) => state.userInfo.data);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Box
      open={isOpen}
      position="fixed"
      width={80}
      height={70}
      // left={0}
      top={15}
      textwrap="nowrap"
      ismobile={isMobileView}
    >
      <a className="navbar-mypage" href="/mypage">
        <SlideSpan
          startposition={-100}
          endposition={100}
          speed={40}
          width="90%"
        >
          <span className="navbar-font1">MYPAGE</span>
          <span>{"   "}</span>
          <span className="navbar-font2">MYPAGE</span>
          <span>{"    "}</span>
          <span className="navbar-font6">MYPAGE</span>
          <span>{"    "}</span>
          <span className="navbar-font8">MYPAGE</span>
          <span>{"    "}</span>
          <span className="navbar-font3">MYPAGE</span>
          <span>{"    "}</span>
          <span className="navbar-font1">MYPAGE</span>
          <span>{"   "}</span>
          <span className="navbar-font5">MYPAGE</span>
          <span>{"    "}</span>
          <span className="navbar-font4">MYPAGE</span>
          <span>{"    "}</span>
          <span className="navbar-font5">MYPAGE</span>
          <span>{"    "}</span>
          <span className="navbar-font2">MYPAGE</span>
          <span>{"    "}</span>
          <span className="navbar-font1">MYPAGE</span>
          <span>{"    "}</span>
          <span className="navbar-font4">MYPAGE</span>
          <span>{"    "}</span>
        </SlideSpan>
      </a>

      <a className="navbar-shop" href="/DreamShop">
        <SlideSpan startposition={10} endposition={-120} speed={38} width="90%">
          <span className="navbar-font6">SHOP</span>
          <span>{"   "}</span>
          <span className="navbar-font2">SHOP</span>
          <span>{"    "}</span>
          <span className="navbar-font3">SHOP</span>
          <span>{"    "}</span>
          <span className="navbar-font4">SHOP</span>
          <span>{"    "}</span>
          <span className="navbar-font5">SHOP</span>
          <span>{"    "}</span>
          <span className="navbar-font1">SHOP</span>
          <span>{"    "}</span>
          <span className="navbar-font7">SHOP</span>
          <span>{"    "}</span>
          <span className="navbar-font8">SHOP</span>
          <span>{"    "}</span>
          <span className="navbar-font2">SHOP</span>
          <span>{"    "}</span>
          <span className="navbar-font5">SHOP</span>
          <span>{"    "}</span>
          <span className="navbar-font7">SHOP</span>
          <span>{"   "}</span>
          <span className="navbar-font1">SHOP</span>
          <span>{"   "}</span>
        </SlideSpan>
      </a>

      <a className="navbar-diary" href="/createDreamDiary">
        <SlideSpan
          startposition={-100}
          endposition={100}
          speed={42}
          width="90%"
        >
          <span className="navbar-font5">DIARY</span>
          <span>{"    "}</span>
          <span className="navbar-font3">DIARY</span>
          <span>{"    "}</span>
          <span className="navbar-font2">DIARY</span>
          <span>{"    "}</span>
          <span className="navbar-font1">DIARY</span>
          <span>{"   "}</span>
          <span className="navbar-font7">DIARY</span>
          <span>{"    "}</span>
          <span className="navbar-font3">DIARY</span>
          <span>{"    "}</span>
          <span className="navbar-font1">DIARY</span>
          <span>{"   "}</span>
          <span className="navbar-font6">DIARY</span>
          <span>{"    "}</span>
          <span className="navbar-font2">DIARY</span>
          <span>{"    "}</span>
          <span className="navbar-font3">DIARY</span>
          <span>{"    "}</span>
          <span className="navbar-font4">DIARY</span>
          <span>{"    "}</span>
          <span className="navbar-font8">DIARY</span>
          <span>{"    "}</span>
        </SlideSpan>
      </a>
      <a className="navbar-statistics" href="/AllUserStatistics">
        <SlideSpan startposition={10} endposition={-120} speed={39} width="90%">
          <span className="navbar-font1">STATISTICS</span>
          <span>{"   "}</span>
          <span className="navbar-font7">STATISTICS</span>
          <span>{"    "}</span>
          <span className="navbar-font4">STATISTICS</span>
          <span>{"    "}</span>
          <span className="navbar-font3">STATISTICS</span>
          <span>{"    "}</span>
          <span className="navbar-font2">STATISTICS</span>
          <span>{"    "}</span>
          <span className="navbar-font1">STATISTICS</span>
          <span>{"   "}</span>
          <span className="navbar-font2">STATISTICS</span>
          <span>{"    "}</span>
          <span className="navbar-font8">STATISTICS</span>
          <span>{"    "}</span>
          <span className="navbar-font4">STATISTICS</span>
          <span>{"    "}</span>
          <span className="navbar-font1">STATISTICS</span>
          <span>{"   "}</span>
          <span className="navbar-font4">STATISTICS</span>
          <span>{"    "}</span>
        </SlideSpan>
      </a>

      {isMobileView ? (
        <div>
          <div className="coin-box-mobile">
            {Object.keys(COIN_INFO).map((key) => (
              <CoinComponent>
                <img src={COIN_INFO[key].imgSrc} alt={`${key} Coin`} />
                <span className="coin-box-count">
                  {userInfo && userInfo[(key + "Coin") as keyof UserInfo]}
                </span>
              </CoinComponent>
            ))}
          </div>
          {isModalOpen && <ExchangeCoin closeModal={closeModal} />}

          <span onClick={() => setIsModalOpen(true)}>
            <div className="navbar-exchange">
              <SlideSpan
                startposition={-100}
                endposition={100}
                speed={40}
                width="90%"
              >
                <span className="navbar-font2">EXCHANGE</span>
                <span>{"   "}</span>
                <span className="navbar-font4">EXCHANGE</span>
                <span>{"    "}</span>
                <span className="navbar-font5">EXCHANGE</span>
                <span>{"    "}</span>
                <span className="navbar-font3">EXCHANGE</span>
                <span>{"    "}</span>
                <span className="navbar-font1">EXCHANGE</span>
                <span>{"    "}</span>
                <span className="navbar-font8">EXCHANGE</span>
                <span>{"   "}</span>
                <span className="navbar-font7">EXCHANGE</span>
                <span>{"    "}</span>
                <span className="navbar-font6">EXCHANGE</span>
                <span>{"    "}</span>
                <span className="navbar-font3">EXCHANGE</span>
                <span>{"    "}</span>
                <span className="navbar-font2">EXCHANGE</span>
                <span>{"   "}</span>
                <span className="navbar-font1">EXCHANGE</span>
                <span>{"    "}</span>
              </SlideSpan>
            </div>
          </span>
          <a className="navbar-main" href="/main">
            <SlideSpan
              startposition={10}
              endposition={-120}
              speed={39}
              width="90%"
            >
              <span className="navbar-font3">MAIN</span>
              <span>{"   "}</span>
              <span className="navbar-font1">MAIN</span>
              <span>{"    "}</span>
              <span className="navbar-font7">MAIN</span>
              <span>{"    "}</span>
              <span className="navbar-font6">MAIN</span>
              <span>{"    "}</span>
              <span className="navbar-font5">MAIN</span>
              <span>{"    "}</span>
              <span className="navbar-font2">MAIN</span>
              <span>{"   "}</span>
              <span className="navbar-font4">MAIN</span>
              <span>{"    "}</span>
              <span className="navbar-font6">MAIN</span>
              <span>{"    "}</span>
              <span className="navbar-font8">MAIN</span>
              <span>{"    "}</span>
              <span className="navbar-font1">MAIN</span>
              <span>{"   "}</span>
              <span className="navbar-font2">MAIN</span>
              <span>{"    "}</span>
            </SlideSpan>
          </a>
          <button className="mobile-modal-logout" onClick={deleteToken}>
            Logout
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="navbar-body-search">
        <SearchBar />
      </div>
    </Box>
  );
};

export default NavbarModal;
