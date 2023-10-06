import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      navigate("/main");
    } else {
      navigate("/intro");
    }
  }, [navigate]);
  return <div></div>;
};

export default StartPage;
