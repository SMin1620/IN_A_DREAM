import React, { useCallback, memo, useState, useEffect } from "react";
import WordCloud from "react-d3-cloud";
import {
  useKeywordStatistics,
  useMyKeywordStatistics,
} from "../../../hooks/useKeywordStatistics";
import S from "styled-components";

interface Item {
  keyword: string;
  count: number;
}

interface KeywordCloudProps {
  startDate?: string;
  endDate?: string;
  mydate: boolean;
  width?: string;
  height?: string;
}

const KeywordCloudWrapper = S.div<{ width?: string; height?: string }>`
  background-color: #fff;
  width: ${(props) => props.width || "30vw"};
  height: ${(props) => props.height || "25vw"};
  overflow: hidden;
  border-radius: 20px;
  @media (max-width: 768px) {
    width: 80vw;
    height: 80vw;
  }
`;

const KeywordCloud: React.FC<KeywordCloudProps> = ({
  startDate,
  endDate,
  mydate,
  width,
  height,
}) => {
  const response = useKeywordStatistics(startDate, endDate);
  const myResponse = useMyKeywordStatistics();

  console.log(response, "response");

  const fontSize = useCallback(
    // (word: { value: number }) => Math.log2(word.value) * 5,
    (word: { value: number }) => word.value,
    []
  );

  if (!response.data) {
    return <div>Loading...</div>;
  } else if (!myResponse.data) {
    return <div>Loading...</div>;
  }

  const data = response.data?.data?.data;
  const myData = myResponse.data?.data?.data;

  const transformData = (data: Item[]) =>
    data?.map(({ keyword, count }) => ({ text: keyword, value: count }));

  if (!data) {
    return <div>Loading...</div>;
  } else if (!myData) {
    return <div>Loading...</div>;
  }

  const words = transformData(mydate ? myData : data);

  return (
    <KeywordCloudWrapper width={width} height={height}>
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
    </KeywordCloudWrapper>
  );
};

export default memo(KeywordCloud);
