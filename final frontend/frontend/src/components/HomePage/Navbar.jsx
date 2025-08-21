import { motion } from "framer-motion";
import { HeartIcon, XMarkIcon, Bars3Icon, ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Prediction", path: "/predict" },
    { name: "Community", path: "/community" },
    { name: "Feedback", path: "/feedback" },
    { name: "Contact", path: "/contact-us" },
    { name: "About us", path: "/about-us" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const userString = localStorage.getItem("user");
      const userObj = JSON.parse(userString);
      setUser(userObj);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => (window.location.href = "/"), 2000);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <HeartIcon className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-blue-800">
              CardioCare<span className="text-red-500">AI</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}>
                <motion.a
                  whileHover={{ scale: 1.05, color: "#3B82F6" }}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  {link.name}
                </motion.a>
              </Link>
            ))}

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <span>Hi, {user?.first_name} {user?.last_name}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>

                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100"
                  >
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link to="/login-register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                  Get Started
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-4"
          >
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}>
                <motion.a
                  whileHover={{ x: 5 }}
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  {link.name}
                </motion.a>
              </Link>
            ))}
            {isLoggedIn ? (
              <div className="space-y-2">
                <Link to="/dashboard">
                  <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="w-full bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login-register">
                <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 flex items-center space-x-2">
                  <ArrowRightIcon className="h-5 w-5" />
                  Get Started
                </button>
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
