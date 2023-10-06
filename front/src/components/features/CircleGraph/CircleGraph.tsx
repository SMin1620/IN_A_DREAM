import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PieData {
  name: string;
  value: number;
}

interface CircleGraphProps {
  data: PieData[];
}

const COLORS = ["#9180FF", "#FF8080", "#BDBDBD"];

const CircleGraph: React.FC<CircleGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="99%" height="99%">
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cy="30%"
          outerRadius="50%"
          fill="#8884d8"
          stroke="#646464"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}

          <LabelList
            dataKey="name"
            position="outside"
            fontSize="1rem"
            fontFamily="Godo"
            fontWeight="lighter"
            offset={10}
            fill="black"
            stroke="#646464"
          />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CircleGraph;
