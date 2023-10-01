import React, { useState, useEffect } from "react";
import "./styles/NavbarModal.css";
import Box from "../../common/Box";
import { isModalOpen } from "../../../types/index";
import { SlideSpan } from "../../common/SlideSpan";
import SearchBar from "../SearchBarComponents/SearchBar";

const NavbarModal: React.FC<isModalOpen> = ({ isNavbarModalOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isNavbarModalOpen) {
      setIsOpen(true);
    } else {
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  }, [isNavbarModalOpen]);

  // 박스 닫힐 때 애니메이션 클래스 추가

  return (
    <Box
      open={isOpen}
      position="fixed"
      width={80}
      height={70}
      // left={0}
      top={15}
      textwrap="nowrap"
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
      <div className="navbar-statistics">
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
      </div>

      <div className="navbar-body-search">
        <SearchBar />
      </div>
    </Box>
  );
};

export default NavbarModal;
