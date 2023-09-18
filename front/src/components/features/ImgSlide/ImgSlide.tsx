import React from "react";
import Slider from "react-slick";

interface ImageSliderProps {
  images: string[];
}

const ImageSlide: React.FC<ImageSliderProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 한 번에 보여줄 슬라이드의 수
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 원하는 시간 간격(ms) 설정
  };

  return (
    <div>
      <h2>Auto Play & Infinite Loop</h2>
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx}>
            <img src={img} alt="" width="100px" height="100px" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlide;
