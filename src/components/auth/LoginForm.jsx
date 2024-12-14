import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Mail, Lock, LogIn, EyeOff, Eye } from "lucide-react";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-sm p-6 space-y-6 shadow-lg bg-black bg-opacity-40 border-black border-opacity-40 rounded-lg">
      <h2 className="text-3xl font-bold text-center text-slate-100">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="relative">
          <Label htmlFor="email" className="text-sm font-medium text-slate-100">
            Your Email
          </Label>
          <div className="flex items-center">
            <Mail className="absolute left-3 h-5 w-5 text-slate-100" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="pl-10  text-slate-100 "
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="relative">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-slate-100"
          >
            Your Password
          </Label>
          <div className="flex items-center">
            <Lock className="absolute left-3 h-5 w-5 text-slate-100" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="pl-10 text-slate-100"
            />
            <button
              type="button"
              className="absolute right-3 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-slate-100" />
              ) : (
                <Eye className="h-5 w-5 text-slate-100" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 bg-slate-50 text-black rounded-lg flex items-center justify-center space-x-2 hover:bg-black hover:text-white transition duration-200"
        >
          <LogIn className="h-5 w-5" />
          <span>Login</span>
        </Button>
      </form>
      <p className="text-sm text-center text-white">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-blue-500 underline">
          Sign up
        </a>
      </p>
    </Card>
  );
};

export default LoginForm;
