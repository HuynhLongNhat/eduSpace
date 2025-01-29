import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const StudentRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.role === "student" ? (
    <Outlet />
  ) : (
    <Navigate to="/teacher" replace />
  );
};

export default StudentRoute;
