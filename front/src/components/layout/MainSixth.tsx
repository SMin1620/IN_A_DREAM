import React, { useState } from "react";
import SearchBar from "../features/SearchBarComponents/SearchBar";
import "./styles/MainSixth.css";
import cloud from "../../assets/image/cloud.png";
import sleep1 from "../../assets/image/sleep1.png";
import sleep2 from "../../assets/image/sleep2.png";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

interface ImgProps {
  $isHovered: boolean;
}
const ImageRight = styled.img<ImgProps>`
  position: relative;
  width: 15vw;
  border-radius: 20px;
  left: 10%;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.$isHovered ? "rotate(-30deg)" : "rotate(-20deg)"};
`;
const ImageLeft = styled.img<ImgProps>`
  position: relative;
  width: 15vw;
  border-radius: 20px;
  right: 10%;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.$isHovered ? "rotate(30deg)" : "rotate(20deg)"};
`;

const MainSixth = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="main-sixth-wrapper">
      <div className="main-sixth-box">
        <div>Let's see all dream</div>
      </div>
      <div className="SixthMainBox">
        <div className="main-sixth-left" onClick={() => navigate("/cloud")}>
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
            $isHovered={isHovered}
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
            $isHovered={isHovered}
          />
        </div>
      </div>
      <div className="main-sixth-searchbar">
        <SearchBar />
      </div>
    </div>
  );
};

export default MainSixth;
