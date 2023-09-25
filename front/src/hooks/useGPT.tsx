import { useEffect, useState } from "react";
import axios from "axios";

const useGPT = (prompt: string) => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const apiUrl =
          "https://api.openai.com/v1/engines/text-davinci-002/completions";
        const apiKey = process.env.REACT_APP_GPT_KEY; // 여기에 본인의 OpenAI API 키를 입력하세요.
        const maxTokens = 180; // 생성된 응답의 최대 길이

        let requestBody;

        requestBody = {
          prompt: `${prompt} Please summarize the previous information within 180 in English`,
          max_tokens: maxTokens,
        };

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        };

        const response = await axios.post(apiUrl, requestBody, { headers });

        setResponse(response.data.choices[0].text.trim());
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [prompt]);

  return { response, loading };
};

export default useGPT;
