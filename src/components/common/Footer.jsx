import { Facebook, Twitter, Linkedin } from "lucide-react"; // Importing icons from lucide-react

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Links Section */}
        <div className="flex flex-col md:flex-row md:space-x-8 mb-4 md:mb-0">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
          <a href="/contact" className="hover:underline">
            Contact Us
          </a>
          <a href="/about" className="hover:underline">
            About Us
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook className="w-6 h-6 hover:text-blue-500 transition" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <Twitter className="w-6 h-6 hover:text-blue-400 transition" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6 hover:text-blue-600 transition" />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} LearnCode University. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
