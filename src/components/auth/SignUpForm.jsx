import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { useState } from "react";
import { User, Mail, Lock, CheckCircle, EyeOff, Eye } from "lucide-react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add validation and API call here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6 shadow-lg bg-black bg-opacity-40 border-black border-opacity-40 rounded-lg">
      <h2 className="text-3xl font-bold text-center text-slate-100">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="relative">
          <Label
            htmlFor="fullName"
            className="text-sm font-medium text-slate-100"
          >
            Full Name
          </Label>
          <div className="flex items-center">
            <User className="absolute left-3 h-5 w-5 text-slate-100" />
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="pl-10 text-slate-100"
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <Label htmlFor="email" className="text-sm font-medium text-slate-100">
            Email
          </Label>
          <div className="flex items-center">
            <Mail className="absolute left-3 h-5 w-5 text-slate-100" />
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="pl-10 text-slate-100"
            />
          </div>
        </div>

        {/* Password */}
        <div className="relative">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-slate-100"
          >
            Password
          </Label>
          <div className="flex items-center">
            <Lock className="absolute left-3 h-5 w-5 text-slate-100" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
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

        {/* Confirm Password */}
        <div className="relative">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-slate-100"
          >
            Confirm Password
          </Label>
          <div className="flex items-center">
            <CheckCircle className="absolute left-3 h-5 w-5 text-slate-100" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="pl-10 text-slate-100"
            />
            <button
              type="button"
              className="absolute right-3 focus:outline-none"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
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
          <span>Sign Up</span>
        </Button>
      </form>
      <p className="text-sm text-center text-white">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 underline">
          Login here
        </a>
      </p>
    </Card>
  );
};

export default SignupForm;
