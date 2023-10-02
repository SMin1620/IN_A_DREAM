import React from "react";
import { PieChart, Pie, Cell, LabelList } from "recharts";

interface PieData {
  name: string;
  value: number;
}

interface CircleGraphProps {
  data: PieData[];
}

const COLORS = ["#FF8080", "#BDBDBD", "#9180FF"];

const CircleGraph: React.FC<CircleGraphProps> = ({ data }) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx="50%"
        cy="40%"
        outerRadius={100}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}

        <LabelList dataKey="name" position="outside" />
      </Pie>
    </PieChart>
  );
};

export default CircleGraph;
