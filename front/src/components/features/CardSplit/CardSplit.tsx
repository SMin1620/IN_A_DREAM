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
      className="dfdfdfdf"
      style={{ position: "relative", height: "100vh", width: "100vh" }}
    >
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "20vh" : "35vh",
          left: isLoaded ? "10vw" : "45vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image1.png" width="14vw" height="24vh" />
      </div>
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "10vh" : "37vh",
          left: isLoaded ? "35vw" : "47vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image2.png" width="9vw" height="23vh" />
      </div>
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "5vh" : "39vh",
          left: isLoaded ? "55vw" : "49vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image3.png" width="11vw" height="17vh" />
      </div>
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "20vh" : "41vh",
          left: isLoaded ? "80vw" : "51vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image4.png" width="13vw" height="22vh" />
      </div>
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "80vh" : "43vh",
          left: isLoaded ? "80vw" : "53vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image5.png" width="12vw" height="24vh" />
      </div>
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "82vh" : "45vh",
          left: isLoaded ? "63vw" : "55vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image6.png" width="11vw" height="18vh" />
      </div>
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "80vh" : "47vh",
          left: isLoaded ? "30vw" : "57vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image7.png" width="13vw" height="21vh" />
      </div>
      <div
        style={{
          position: "absolute",
          top: isLoaded ? "79vh" : "49vh",
          left: isLoaded ? "12vw" : "59vw",
          transition: "all 0.5s",
        }}
      >
        <ImgCard image="/CardSplit/image8.png" width="11vw" height="18vh" />
      </div>
      {/* Add more ImgCards as needed */}
    </div>
  );
};

export default CardSplit;
