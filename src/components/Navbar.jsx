import { NavLink } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Navbar({ onToggleSidebar }) {
  const [darkMode, setDarkMode] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/70 backdrop-blur border-b border-gray-200 dark:bg-gray-900/70 dark:border-gray-800 text-gray-900 dark:text-white sticky top-0 z-40"
    >
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          <span className="text-lg font-bold tracking-tight">Chat Summariser</span>
        </div>

        <div className="hidden md:flex gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-indigo-600 dark:hover:text-indigo-400 transition ${
                isActive ? "text-indigo-600 dark:text-indigo-400" : ""
              }`
            }
          >
            Chat
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `hover:text-indigo-600 dark:hover:text-indigo-400 transition ${
                isActive ? "text-indigo-600 dark:text-indigo-400" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/query"
            className={({ isActive }) =>
              `hover:text-indigo-600 dark:hover:text-indigo-400 transition ${
                isActive ? "text-indigo-600 dark:text-indigo-400" : ""
              }`
            }
          >
            Intelligent Query
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode((p) => !p)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 px-4 pb-3">
          <div className="flex flex-col py-2 text-sm">
            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Chat
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/query"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Intelligent Query
            </NavLink>
          </div>
        </div>
      )}
    </motion.nav>
  );
}

export default Navbar;
