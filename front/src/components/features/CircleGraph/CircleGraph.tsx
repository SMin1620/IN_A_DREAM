import React from "react";
import { PieChart, Pie, Cell, LabelList } from "recharts";

interface PieData {
  name: string;
  value: number;
}

interface CircleGraphProps {
  data: PieData[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const CircleGraph: React.FC<CircleGraphProps> = ({ data }) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}

        <LabelList dataKey="name" position="inside" />
      </Pie>
    </PieChart>
  );
};

export default CircleGraph;
