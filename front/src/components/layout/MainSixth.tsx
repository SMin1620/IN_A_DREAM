import React, { useState, useContext } from "react";
import SearchBar from "../features/SearchBarComponents/SearchBar";
import "./styles/MainSixth.css";
import cloud from "../../assets/image/cloud.png";
import sleep1 from "../../assets/image/sleep1.png";
import sleep2 from "../../assets/image/sleep2.png";
import { styled } from "styled-components";

interface ImgProps {
  ishoverd: boolean;
}

const ImageRight = styled.img<ImgProps>`
  position: relative;
  width: 15vw;
  border-radius: 20px;
  left: 10%;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.ishoverd ? "rotate(-30deg)" : "rotate(-20deg)"};
`;
const ImageLeft = styled.img<ImgProps>`
  position: relative;
  width: 15vw;
  border-radius: 20px;
  right: 10%;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.ishoverd ? "rotate(30deg)" : "rotate(20deg)")};
`;

const MainSixth = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="main-sixth-wrapper">
      <div className="main-sixth-box">
        <div>Let's see all dream</div>
      </div>
      <div className="SixthMainBox">
        <div className="main-sixth-left">
          <h2>IN A</h2>
          <h1
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            DREAM
          </h1>
        </div>
        <div className="main-sixth-right">
          <ImageRight
            src={sleep1}
            alt=""
            // className="main-sixth-right-img-right"
            ishoverd={isHovered}
          />
          <img
            src={cloud}
            alt=""
            style={{ width: "15vw" }}
            className="main-sixth-right-img-middle"
          />
          <ImageLeft
            src={sleep2}
            alt=""
            // style={{ width: "15rem" }}
            // className="main-sixth-right-img-left"
            ishoverd={isHovered}
          />
        </div>
      </div>
      <div className="main-sixth-searchbar">
        <SearchBar />
        {/* <h1>검색바 넣으면될듯</h1> */}
      </div>
    </div>
  );
};

export default MainSixth;
