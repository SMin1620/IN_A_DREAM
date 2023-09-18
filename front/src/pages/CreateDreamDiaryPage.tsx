import React, { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Navbar from "../components/features/NavbarComponents/Navbar";
import "./styles/CreateDreamDiaryPage.css";
import ToggleButton from "../components/common/Toggle";

const CreateDreamDiaryPage = () => {
  const [sell, setSell] = useState(false);

  const inputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSell = () => {
    console.log("눌림");
  };

  console.log(sell);

  return (
    <div>
      <Navbar />
      <div className="create-dream-diary">
        <div className="create-dream-diary-left">
          <div className="create-dream-diary-left-top">top</div>
          <div className="create-dream-diary-left-bottom">bottom</div>
        </div>

        <div className="create-dream-diary-right">
          <ToggleButton onClick={handleSell}>on</ToggleButton>
          <ToggleButton onClick={() => setSell(false)}>off</ToggleButton>
          <button onClick={handleSell}>ㅇㅇ</button>
        </div>
      </div>
    </div>
  );
};

export default CreateDreamDiaryPage;
