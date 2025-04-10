import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeeklyProgress = () => {
  const data = [
    { name: "T2", points: 320 },
    { name: "T3", points: 280 },
    { name: "T4", points: 450 },
    { name: "T5", points: 390 },
    { name: "T6", points: 480 },
    { name: "T7", points: 300 },
    { name: "CN", points: 200 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-xl dark:shadow-gray-900/20 p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Tiến độ trong tuần
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              className="text-xs"
              tick={{
                fill: "#6b7280",
                className: "dark:[fill:#e5e7eb]",
              }}
            />
            <YAxis
              stroke="#6b7280"
              tick={{
                fill: "#6b7280",
                className: "dark:[fill:#e5e7eb]",
              }}
            />
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                color: "#1f2937",
              }}
              itemStyle={{ color: "#1f2937" }}
              wrapperClassName="dark:!bg-gray-700 dark:!border-gray-600 dark:!text-gray-100"
            />
            <Bar
              dataKey="points"
              fill="#3b82f6"
              className="dark:[fill:#60a5fa]"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyProgress;
