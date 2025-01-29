import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import StudentRoute from "./StudentRoute";

// Public Pages
import HomePage from "@/page/HomePage";
import Login from "@/page/auth/Login";
import SignUp from "@/page/auth/SignUp";
// Teacher Pages

import ExerciseManagement from "@/page/Teacher/ExerciseManagement";
import TestManagement from "@/page/Teacher/TestManagement";
import MeetingManagement from "@/page/Teacher/MeetingManagement";
import Statistics from "@/page/Teacher/Statistics";
import Classes from "@/page/Student/Classes";
import Exercises from "@/page/Student/Exercises";
import StudentDashboard from "@/page/Student/StudentDashboard";
import Tests from "@/page/Student/Tests";
import Meetings from "@/page/Student/Meetings";
import Profile from "@/page/Student/Profile";
import RankingPage from "@/page/Student/Ranking/RankingPage";
import TeacherDashboard from "@/page/Teacher/TeacherDashboard";
import ClassList from "@/page/Teacher/ClassList";
import CreateClass from "@/page/Teacher/CreateClass";
import ClassDetails from "@/page/Teacher/ClassDetail";
import EditClass from "@/page/Teacher/EditClass";

//Admin
import ClassListAdmin from "@/page/Admin/ClassManagement/ClassListAdmin";
import ClassDetailAdmin from "@/page/Admin/ClassManagement/ClassDetailAdmin";
import CreateClassAdmin from "@/page/Admin/ClassManagement/CreateClassAdmin";
import EditClassAdmin from "@/page/Admin/ClassManagement/EditClassAdmin";
import AdminDashboard from "@/page/Admin/AdminDashboard";
import UserList from "@/page/Admin/UserManagement/UserList";
import UserDetail from "@/page/Admin/UserManagement/UserDetail";
import CreateUser from "@/page/Admin/UserManagement/CreateUser";
import LecturesListAdmin from "@/page/Admin/LecturesManagement/LecturesListAdmin";
import CreateLectureAdmin from "@/page/Admin/LecturesManagement/CreateLectureAdmin";
import LectureDetailAdmin from "@/page/Admin/LecturesManagement/LectureDetailAdmin";
import EditLectureAdmin from "@/page/Admin/LecturesManagement/EditLectureAdmin";
import AssignmentsList from "@/page/Admin/AssignmentsManagement/AssignmentsList";
import AssignmentsDetail from "@/page/Admin/AssignmentsManagement/AssignmentsDetail";
import CreateAssignmentAdmin from "@/page/Admin/AssignmentsManagement/CreateAssignmentAdmin";
import EditAssignmentAdmin from "@/page/Admin/AssignmentsManagement/EditAssignmentAdmin";
import ExamsList from "@/page/Admin/ExamManagement/ExamList";
import ExamsDetail from "@/page/Admin/ExamManagement/ExamDetail";
import CreateExam from "@/page/Admin/ExamManagement/CreateExam";
import EditExam from "@/page/Admin/ExamManagement/EditExam";
// Student Pages

const AppRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* <Route element={<TeacherRoute />}> */}

      <Route path="/teacher" element={<TeacherDashboard />}>
        <Route path="classes" element={<ClassList />} />
        <Route path="classes/:classId" element={<ClassDetails />} />
        <Route path="classes/create" element={<CreateClass />} />
        <Route path="classes/edit/:classId" element={<EditClass />} />
      </Route>

      {/* <Route path="/teacher/classes/:id" element={<ClassManagement />} /> */}
      <Route path="/teacher/exercises" element={<ExerciseManagement />} />
      {/* <Route path="/teacher/exercises/:id" element={<ExerciseManagement />} /> */}
      <Route path="/teacher/tests" element={<TestManagement />} />
      {/* <Route path="/teacher/tests/:id" element={<TestManagement />} /> */}
      <Route path="/teacher/meetings" element={<MeetingManagement />} />
      {/* <Route path="/teacher/meetings/:id" element={<MeetingManagement />} /> */}
      <Route path="/teacher/statistics" element={<Statistics />} />
      {/* </Route> */}

      {/* Student Routes */}
      <Route element={<StudentRoute />}>
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/classes" element={<Classes />} />
        {/* <Route path="/student/classes/:id" element={<Classes />} /> */}
        <Route path="/student/exercises" element={<Exercises />} />
        {/* <Route path="/student/exercises/:id" element={<Exercises />} /> */}
        <Route path="/student/tests" element={<Tests />} />
        {/* <Route path="/student/tests/:id" element={<Tests />} /> */}
        {/* <Route path="/student/tests/result/:id" element={<TestResult />} /> */}
        <Route path="/student/meetings" element={<Meetings />} />
        {/* <Route path="/student/meetings/:id" element={<Meetings />} /> */}
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/rankings" element={<RankingPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/dashboard"
          element={
            <Navigate
              to={user?.role === "teacher" ? "/teacher" : "/student"}
              replace
            />
          }
        />
      </Route>
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<Navigate to="users" replace />} />
        {/* User Management */}
        <Route path="users" element={<UserList />} />
        <Route path="users/create" element={<CreateUser />} />
        <Route path="users/:userId" element={<UserDetail />} />
        {/* Class Management */}
        <Route path="classes" element={<ClassListAdmin />} />
        <Route path="classes/:classId" element={<ClassDetailAdmin />} />
        <Route path="classes/create" element={<CreateClassAdmin />} />
        <Route path="classes/edit/:classId" element={<EditClassAdmin />} />
        {/* Lecture Management */}
        <Route path="lectures" element={<LecturesListAdmin />} />
        <Route path="lectures/create" element={<CreateLectureAdmin />} />
        <Route path="lectures/:lectureId" element={<LectureDetailAdmin />} />
        <Route path="lectures/edit/:lectureId" element={<EditLectureAdmin />} />
        <Route path="assignments" element={<AssignmentsList />} />
        <Route
          path="assignments/:assignmentId"
          element={<AssignmentsDetail />}
        />
        <Route path="assignments/create" element={<CreateAssignmentAdmin />} />
        <Route
          path="assignments/edit/:assignmentId"
          element={<EditAssignmentAdmin />}
        />
        <Route path="exams" element={<ExamsList />} />
        <Route path="exams/:examId" element={<ExamsDetail />} />
        <Route path="exams/create" element={<CreateExam />} />
        <Route path="exams/edit/:examId" element={<EditExam />} />
      </Route>

      {/* Catch all - 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
