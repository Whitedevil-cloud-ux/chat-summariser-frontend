import { NavLink } from "react-router-dom";
import { Moon, Sun, Menu } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-gray-900 dark:to-gray-800 text-white py-4 px-6 flex justify-between items-center sticky top-0 z-20 shadow-lg"
    >
      {/* Left Section - Brand */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight">Chat Summariser</span>
      </div>

      {/* Middle Section - Navigation Links */}
      <div className="hidden md:flex gap-6 text-sm font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:opacity-80 transition ${
              isActive ? "underline underline-offset-4 font-semibold" : ""
            }`
          }
        >
          Chat
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `hover:opacity-80 transition ${
              isActive ? "underline underline-offset-4 font-semibold" : ""
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/dashboard/query"
          className={({ isActive }) =>
            `hover:opacity-80 transition ${
              isActive ? "underline underline-offset-4 font-semibold" : ""
            }`
          }
        >
          Intelligent Query
        </NavLink>
      </div>

      {/* Right Section - Theme & Profile buttons */}
      <div className="flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </motion.button>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-9 h-9 rounded-full bg-white/30 dark:bg-gray-700"
          title="Profile (future feature)"
        ></motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
