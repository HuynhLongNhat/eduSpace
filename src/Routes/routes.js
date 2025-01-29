import { lazy } from "react";
import { AdminRoute } from "./AdminRoute";
import { LecturerRoute } from "./LecturerRoute";
import { StudentRoute } from "./StudentRoute";

// Admin Pages
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const UserManagement = lazy(() => import("../pages/admin/UserManagement"));

// Lecturer Pages
const LecturerDashboard = lazy(() => import("../pages/lecturer/Dashboard"));
const ClassManagement = lazy(() => import("../pages/lecturer/ClassManagement"));
const ExerciseManagement = lazy(() =>
  import("../pages/lecturer/ExerciseManagement")
);
const TestManagement = lazy(() => import("../pages/lecturer/TestManagement"));
const MeetingManagement = lazy(() =>
  import("../pages/lecturer/MeetingManagement")
);
const LecturerStatistics = lazy(() => import("../pages/lecturer/Statistics"));

// Student Pages
const StudentDashboard = lazy(() => import("../pages/student/Dashboard"));
const StudentClasses = lazy(() => import("../pages/student/Classes"));
const StudentLectures = lazy(() => import("../pages/student/Lectures"));
const StudentExercises = lazy(() => import("../pages/student/Exercises"));
const StudentMeetings = lazy(() => import("../pages/student/Meetings"));

export const routes = [
  {
    path: "/admin",
    element: <AdminRoute />,
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "users", element: <UserManagement /> },
    ],
  },
  {
    path: "/lecturer",
    element: <LecturerRoute />,
    children: [
      { path: "", element: <LecturerDashboard /> },
      { path: "classes", element: <ClassManagement /> },
      { path: "exercises", element: <ExerciseManagement /> },
      { path: "tests", element: <TestManagement /> },
      { path: "meetings", element: <MeetingManagement /> },
      { path: "statistics", element: <LecturerStatistics /> },
    ],
  },
  {
    path: "/student",
    element: <StudentRoute />,
    children: [
      { path: "", element: <StudentDashboard /> },
      { path: "classes", element: <StudentClasses /> },
      { path: "lectures", element: <StudentLectures /> },
      { path: "exercises", element: <StudentExercises /> },
      { path: "meetings", element: <StudentMeetings /> },
    ],
  },
];
