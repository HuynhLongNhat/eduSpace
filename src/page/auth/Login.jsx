import LoginForm from "../../components/Auth/LoginForm";
import daihocquynhon from "@/assets/images/daihocquynhon.jpg";
const Login = () => {
  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${daihocquynhon})`,
      }}
    >
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="z-10 bg-transparent rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          Welcome Back
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
