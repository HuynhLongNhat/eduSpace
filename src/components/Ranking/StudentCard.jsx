/* eslint-disable react/prop-types */
import React from "react";
import { Crown, Trophy, Medal, Flame } from "lucide-react";

const StudentCard = ({ student, position, isList = false }) => {
  const getRankIcon = (pos) => {
    switch (pos) {
      case 1:
        return <Crown className="h-8 w-8 text-yellow-400" />;
      case 2:
        return <Trophy className="h-8 w-8 text-gray-400" />;
      case 3:
        return <Medal className="h-8 w-8 text-amber-600" />;
      default:
        return <span className="text-2xl font-bold text-gray-600">#{pos}</span>;
    }
  };

  if (isList) {
    return (
      <div className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
        <div className="flex items-center justify-center w-12">
          {getRankIcon(position)}
        </div>
        <img
          src={student.avatar}
          alt={student.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4 flex-1">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {student.name}
          </h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Flame className="h-4 w-4 text-orange-500 mr-1" />
            {student.streak} ngày liên tiếp
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-blue-600 dark:text-blue-400">
            {student.points} điểm
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            {student.badges} huy hiệu
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-purple-500 text-white py-2 px-6 rounded-bl-2xl">
        {getRankIcon(position)}
      </div>

      <div className="flex flex-col items-center mb-4 pt-8">
        <img
          src={student.avatar}
          alt={student.name}
          className="w-24 h-24 rounded-full border-4 border-blue-500 dark:border-blue-400"
        />
        <h3 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
          {student.name}
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Điểm số:</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {student.points}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Streak:</span>
          <div className="flex items-center">
            <Flame className="h-5 w-5 text-orange-500 mr-1" />
            <span className="font-bold">{student.streak} ngày</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Tiến độ:</span>
          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 dark:bg-green-600 rounded-full"
              style={{ width: `${student.progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {student.languages.map((lang, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-blue-300 rounded-full text-sm"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
