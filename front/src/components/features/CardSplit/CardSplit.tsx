import React, { useEffect, useState } from "react";
import ImgCard from "../../common/ImgCard";

const CardSplit = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="cardSplit"
      style={{ position: "relative", height: "100vh", width: "100vw" }}
    >
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "20vh" : "30vh",
          left: isLoaded ? "10vw" : "50vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image1.png" width="14vw" height="24vh" />
      </div>
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "10vh" : "35vh",
          left: isLoaded ? "35vw" : "60vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image2.png" width="9vw" height="23vh" />
      </div>
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "5vh" : "50vh",
          left: isLoaded ? "55vw" : "70vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image3.png" width="11vw" height="17vh" />
      </div>
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "20vh" : "65vh",
          left: isLoaded ? "80vw" : "60vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image4.png" width="13vw" height="22vh" />
      </div>
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "80vh" : "70vh",
          left: isLoaded ? "80vw" : "50vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image5.png" width="12vw" height="24vh" />
      </div>
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "82vh" : "65vh",
          left: isLoaded ? "63vw" : "40vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image6.png" width="11vw" height="18vh" />
      </div>
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "80vh" : "50vh",
          left: isLoaded ? "30vw" : "30vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image7.png" width="13vw" height="21vh" />
      </div>
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "79vh" : "35vh",
          left: isLoaded ? "12vw" : "40vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image8.png" width="11vw" height="18vh" />
      </div>
    </div>
  );
};

export default CardSplit;
