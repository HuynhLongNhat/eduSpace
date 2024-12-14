import { Button } from "@/components/ui/button"; // Assuming you have a Button component in your UI library
import { useState } from "react";
import { ChevronDown } from "lucide-react"; // Importing an icon for dropdown

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <a href="/">LearnCode University</a>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-600 hover:text-blue-600 transition">
            Home
          </a>
          <a
            href="/courses"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Courses
          </a>
          <a
            href="/about"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Contact
          </a>

          {/* Dropdown for User Options */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-600 hover:text-blue-600 transition"
            >
              User Options <ChevronDown className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="/logout"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Login/Signup Button */}
        <div className="hidden md:block">
          <Button variant="primary">Login/Signup</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            {/* Icon for mobile menu (hamburger icon) */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col p-4 space-y-2">
            <a
              href="/"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Home
            </a>
            <a
              href="/courses"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Courses
            </a>
            <a
              href="/about"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Contact
            </a>
            <Button variant="primary" className="mt-2">
              Login/Signup
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
