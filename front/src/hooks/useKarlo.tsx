import { useState, useEffect } from "react";
import axios from "axios";

interface ImageResponse {
  id: string;
  model_version: string;
  images: [
    {
      id: string;
      image: string;
      seed: number;
      nsfw_content_detected?: any;
      nsfw_score?: any;
    }
  ];
}

const useKarlo = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fetchData = async (prompt: string): Promise<string | null> => {
    try {
      const response = await axios.post<ImageResponse>(
        "https://api.kakaobrain.com/v2/inference/karlo/t2i",
        { prompt },
        {
          headers: {
            Authorization: process.env.REACT_APP_KAKAO_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.images && response.data.images[0]) {
        setImageUrl(response.data.images[0].image);
        return response.data.images[0].image;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  return { imageUrl, fetchData };
};

export default useKarlo;
