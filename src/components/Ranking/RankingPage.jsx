import React, { useState } from "react";
import { Crown, Trophy, Medal, Star, Flame, Award } from "lucide-react";
import LeaderboardHeader from "./LeaderBoardHeader";
import StudentCard from "./StudentCard";
import WeeklyProgress from "./WeeklyProgress";

const RankingPage = () => {
  const [timeFilter, setTimeFilter] = useState("weekly");

  const students = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "https://ui-avatars.com/api/?name=A",
      points: 2500,
      streak: 15,
      rank: 1,
      progress: 95,
      badges: 12,
      languages: ["Python", "JavaScript", "Java"],
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "https://ui-avatars.com/api/?name=B",
      points: 2300,
      streak: 12,
      rank: 2,
      progress: 88,
      badges: 10,
      languages: ["JavaScript", "React", "TypeScript"],
    },
    {
      id: 3,
      name: "Lê Văn C",
      avatar: "https://ui-avatars.com/api/?name=C",
      points: 2100,
      streak: 10,
      rank: 3,
      progress: 82,
      badges: 8,
      languages: ["Python", "C++"],
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50 p-6 dark:bg-blue-950">
      <div className="max-w-6xl mx-auto">
        <LeaderboardHeader
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {students.slice(0, 3).map((student, index) => (
            <div
              key={student.id}
              className={`transform hover:scale-105 transition-transform duration-200 ${
                index === 0 ? "md:-mt-4" : ""
              }`}
            >
              <StudentCard student={student} position={index + 1} />
            </div>
          ))}
        </div>

        {/* <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Sinh viên xuất sắc khác
          </h3>
          {students.slice(3).map((student, index) => (
            <StudentCard
              key={student.id}
              student={student}
              position={index + 4}
              isList={true}
            />
          ))}
        </div> */}

        <WeeklyProgress />
      </div>
    </div>
  );
};

export default RankingPage;
