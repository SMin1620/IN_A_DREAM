import React, { useCallback, memo } from "react";
import WordCloud from "react-d3-cloud";
import { useKeywordStatistics } from "../../../hooks/useKeywordStatistics";
import "./KeywordCloud.css";

interface Item {
  keyword: string;
  count: number;
}

interface KeywordCloudProps {
  startDate: string;
  endDate: string;
}

const KeywordCloud: React.FC<KeywordCloudProps> = ({ startDate, endDate }) => {
  const response = useKeywordStatistics(startDate, endDate);

  const fontSize = useCallback(
    (word: { value: number }) => Math.log2(word.value) * 5,
    []
  );

  if (!response.data) {
    return <div>Loading...</div>;
  }

  const data = response.data?.data?.data;

  const transformData = (data: Item[]) =>
    data?.map(({ keyword, count }) => ({ text: keyword, value: count * 100 }));

  if (!data) {
    return <div>Loading...</div>;
  }

  const words = transformData(data);

  return (
    <div className="keyword-cloud-wrapper">
      <WordCloud
        data={words}
        fontSize={fontSize}
        // fontSize={(word) => Math.log2(word.value) * 5}
        rotate={() => 0}
        font="BMDOHYEON"
        fontWeight="bold"
        spiral="archimedean" // 중심에 있는 단어가 중요함
        padding={10}
        onWordClick={(event, d) => {
          console.log(`onWordClick: ${d.text} ${d.value}`);
        }}
      />
    </div>
  );
};

export default memo(KeywordCloud);
