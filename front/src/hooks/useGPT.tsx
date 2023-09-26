import { useState } from "react";
import axios from "axios";

const useGPT = () => {
  const [GPTresponse, setGPTResponse] = useState<string | null>(null);
  const [GPTloading, setGPTloading] = useState(false);

  const fetchGPTData = async (content: string) => {
    setGPTloading(true);
    let responseContent = null;

    try {
      const apiUrl = "https://api.openai.com/v1/chat/completions";
      const apiKey = process.env.REACT_APP_GPT_KEY;
      let requestBody;

      requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "다음 내용의 핵심 키워드만 뽑아서 영어 단어로 알려줘",
          },
          { role: "user", content: content },
        ],
        temperature: 0.7,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      const response = await axios.post(apiUrl, requestBody, { headers });
      responseContent = response.data.choices[0].message.content.trim();
      setGPTResponse(responseContent);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setGPTloading(false);

    return responseContent;
  };

  return { GPTresponse, GPTloading, fetchGPTData };
};

export default useGPT;
