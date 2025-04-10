import React from "react";
import { Calendar, TrendingUp, Award } from "lucide-react";

const LeaderboardHeader = ({ timeFilter, setTimeFilter }) => {
  return (
    <div className="mb-12 dark:bg-gray-800 bg-white dark:text-white text-gray-800 rounded-lg shadow-lg p-6">
      <div className="text-center mb-8 ">
        <h1 className="text-4xl font-bold mb-2">Bảng Xếp Hạng</h1>
        <p className="dark:text-white text-gray-600">
          Top sinh viên xuất sắc trong lập trình
        </p>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setTimeFilter("weekly")}
          className={`px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 ${
            timeFilter === "weekly"
              ? "bg-blue-600 text-white shadow-lg"
              : "dark:bg-gray-700 dark:hover:bg-gray-600 bg-white hover:bg-gray-50 dark:text-gray-300 text-gray-600"
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span>Tuần này</span>
        </button>

        <button
          onClick={() => setTimeFilter("monthly")}
          className={`px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 ${
            timeFilter === "monthly"
              ? "bg-blue-600 text-white shadow-lg"
              : "dark:bg-gray-700 dark:hover:bg-gray-600 bg-white hover:bg-gray-50 dark:text-gray-300 text-gray-600"
          }`}
        >
          <TrendingUp className="h-5 w-5" />
          <span>Tháng này</span>
        </button>

        <button
          onClick={() => setTimeFilter("allTime")}
          className={`px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 ${
            timeFilter === "allTime"
              ? "bg-blue-600 text-white shadow-lg"
              : "dark:bg-gray-700 dark:hover:bg-gray-600 bg-white hover:bg-gray-50 dark:text-gray-300 text-gray-600"
          }`}
        >
          <Award className="h-5 w-5" />
          <span>Tổng thể</span>
        </button>
      </div>
    </div>
  );
};

export default LeaderboardHeader;
