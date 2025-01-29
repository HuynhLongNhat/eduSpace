import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const TeacherRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.role === "teacher" ? (
    <Outlet />
  ) : (
    <Navigate to="/student" replace />
  );
};

export default TeacherRoute;
