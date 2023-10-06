import React, { useEffect, useState } from "react";
import useStatistic from "./../../../hooks/useStatistic";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#9180FF", "#FF8080", "#BDBDBD"];

const BarGraph: React.FC = () => {
  const { getRelationData, relationData } = useStatistic();

  useEffect(() => {
    getRelationData();
  }, []);

  return (
    <ResponsiveContainer width="99%" height="99%">
      <BarChart width={500} height={300} data={relationData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="보관비율" fill="#8884d8" />
        <Bar dataKey="판매비율" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
