import React from "react";
import StudentList from "./StudentList";

const StudentPage = () => {
  // Dữ liệu mẫu
  const students = [
    { id: 1, name: "Alice Smith", email: "alice@example.com" },
    { id: 2, name: "Bob Johnson", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Student Management
      </h1>
      <p className="text-gray-600 mb-6">
        View and manage student information below.
      </p>
      {/* Render StudentList với dữ liệu */}
      <StudentList students={students} />
    </div>
  );
};

export default StudentPage;
